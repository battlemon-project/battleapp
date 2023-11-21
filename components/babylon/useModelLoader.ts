import { Dispatch, SetStateAction, useRef } from "react"
import { Scene, CreateScreenshot, Engine } from '@babylonjs/core';
import {
  S3Client,
  PutObjectCommand
} from "@aws-sdk/client-s3";
import { PropertiesType } from "lemon";
import { Buffer } from "buffer";
import { getRandomProps } from "utils/properties";
function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


export function useModelLoader() {
  const engineRef = useRef<Engine>()
  const sceneRef = useRef<Scene>()
  const s3Client = useRef<S3Client>()
  let searchParams = new URLSearchParams(document.location.search)
  const bucket = searchParams.get('bucket')
  const storageLink = searchParams.get('storageLink')
  const endpoint = searchParams.get('endpoint')
  const accessKeyId = searchParams.get('accessKeyId')
  const secretAccessKey = searchParams.get('secretAccessKey')
  const folderLemons = searchParams.get('folderLemons')

  const onModelReady = async (engine: Engine, scene: Scene, properties: PropertiesType, setProperties?: Dispatch<SetStateAction<PropertiesType>>) => {
    if (!sceneRef.current) {
      sceneRef.current = scene;
    }
    if (!engineRef.current) {
      engineRef.current = engine;
    }

    if (!s3Client.current) {
      s3Client.current = new S3Client({
        region: 'auto',
        endpoint: 'https://' + endpoint,
        credentials: {
          accessKeyId: accessKeyId || '',
          secretAccessKey: secretAccessKey || ''
        }
      });
    }

    (window as any).generateLemon = async function (lemonId: number) {
      const props = getRandomProps();
      await setProperties?.(props);
      await timeout(50);
      await putPic(lemonId, props);
      //await Promise.all([putPic(lemonId, props), putFile(lemonId, props)])
    }
  }

  const putPic = async (id: number, properties: PropertiesType) => {
    if (!engineRef.current || !sceneRef.current?.activeCamera) return
    sceneRef.current.render();
    await new Promise((resolve) => {
      CreateScreenshot(engineRef.current!, sceneRef.current!.activeCamera!, 512, async (data) => {
        const raw = data.replace(/^data:image\/\w+;base64,/, "");
        const base64Data = Buffer.from(raw, 'base64');
        const type = data.split(';')[0].split('/')[1];
        const params = {
          Bucket: bucket || '',
          Key: `${folderLemons}/${id}.png`,
          Body: base64Data,
          ContentEncoding: 'base64',
          ContentType: `image/${type}`,
          CacheControl: 'public, max-age=1',
          Metadata: properties as {[key: string]: string}
        };
  
        const result = await s3Client.current?.send(
          new PutObjectCommand(params)
        )
        console.log(!!result);
        resolve(!!result);
      }, 'image/png', false);
    });
  }

  const putFile = async (id: number, properties: PropertiesType) => {
    const obj = {
      name: `Lemon #${id}`,
      description: "Brutal.. savage.. yellow. Don't even try to squeeze him!",
      image: `https://${storageLink}/${folderLemons}/${id}.png`,
      properties
    };

    const buf = Buffer.from(JSON.stringify(obj));
    
    const params = {
        Bucket: bucket || '',
        Key: `${folderLemons}/${id}`,
        Body: buf,
        ContentEncoding: 'base64',
        ContentType: 'application/json',
        CacheControl: 'public, max-age=1'
    };

    const result = await s3Client.current?.send(
      new PutObjectCommand(params)
    )
    
    console.log(!!result);
    return !!result;
  }

  return {
    onModelReady
  }
}