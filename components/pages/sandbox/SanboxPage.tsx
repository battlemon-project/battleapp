
import { Scene as BabylonScene, Color4, SceneLoader, Vector3, CubeTexture } from '@babylonjs/core'
import { Engine, Scene } from 'react-babylonjs'
import { type GLTFFileLoader, GLTFLoaderAnimationStartMode } from '@babylonjs/loaders';
import { Suspense } from 'react';
import LemonModel from './LemonModel';
import ItemModel from './ItemModel';
import { useIsMounted } from 'hooks/useIsMounted';

export default function SanboxPage() {
  const mounted = useIsMounted()
  
  const onSceneMount = ({ scene }: {scene: BabylonScene}) => {
    if (!scene) return;
    SceneLoader.OnPluginActivatedObservable.add(function (loader) {
      (loader as GLTFFileLoader).animationStartMode = GLTFLoaderAnimationStartMode.NONE;
    });

    scene.clearColor = new Color4(0, 0, 0, 0);
    const hdrTexture = CubeTexture.CreateFromPrefilteredData(
      `/models/lemon/environmentSpecular.env`,
      scene
    );
    scene.environmentTexture = hdrTexture;
    scene.environmentTexture.level = 1;
  }

  return (
    <div style={{width: '512px', height: '512px'}}>
      {mounted && <Engine antialias canvasId="lemon-canvas">
        <Scene onSceneMount={onSceneMount}>
          <arcRotateCamera
            name='camera1' 
            alpha={Math.PI / 2.3} 
            beta={Math.PI / 1.9} 
            radius={4} 
            lowerRadiusLimit={4}
            upperRadiusLimit={4}
            lowerBetaLimit={1.6}
            upperBetaLimit={1.6}
            target={new Vector3(0,0,0)}
            minZ={1}
          />

          <hemisphericLight
            name="light1"
            intensity={0.7}
            direction={new Vector3(0, 1, 0)}
          />
          
          <Suspense>
            <LemonModel 
              properties={{
                teeth: 'Teeth_Grga',
                eyes: 'Eyes_Blue',
                exo_top: 'ExoTop_Snowwhite',
                exo_bot: 'ExoBot_Steel',
                feet: 'Feet_Snowwhite',
                hands: 'Hands_Snowwhite',
                head: 'Head_Fresh_Lemon',
                scar: 'Scar_Gaul_R',
                hair: 'Hair_Curly_Gray',
              }}
            >
              <ItemModel 
                key="FireArms_Assault_Rifle_A" 
                name="FireArms_Assault_Rifle_A" 
                placeholderName="fire_arms"
              />
              <ItemModel 
                key="Mask_Cowboy_Scarf" 
                name="Mask_Cowboy_Scarf" 
                placeholderName="mask"
              />
              <ItemModel 
                key="ColdArms_Katana" 
                name="ColdArms_Katana" 
                placeholderName="cold_arms"
              />
            </LemonModel>
          </Suspense>

          {/* <DebugLayer /> */}
        </Scene>
      </Engine>}
    </div>
  )
}