import { Color4, FreeCamera, HDRCubeTexture } from '@babylonjs/core'
import { useEngine, useScene } from 'react-babylonjs'

const BabylonScene = () => {
  const scene = useScene()
  const engine = useEngine()

  if (engine && scene?.activeCamera) {
    scene.clearColor = new Color4(0, 0, 0, 0);
    const hdrTexture = new HDRCubeTexture(
      `/models/index/clarens_midday_1k.hdr`,
      scene,
      23
    );
    scene.environmentTexture = hdrTexture;
    scene.environmentTexture.level = 0.7;

    const camera = scene.activeCamera as FreeCamera;

    scene.beforeRender = function () {
      if (camera.rotation.x > 0) {
        camera.rotation.x = 0;
      } else if (camera.rotation.x < 0) {
        camera.rotation.x = 0;
      }

      const detaview = document.body.offsetWidth / 1200;
      let angle = 0;
      if (detaview < 0.5) {
        angle = detaview / 1.2;
      } else if (detaview < 1) {
        angle = detaview / 3.2;
      }
      if (camera.rotation.y > Math.PI + angle) {
        camera.rotation.y = Math.PI + angle;
      } else if (camera.rotation.y < Math.PI - angle) {
        camera.rotation.y = Math.PI - angle;
      }
    };
  }

  return <></>
}

export default BabylonScene;