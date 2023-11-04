import { Color4, FreeCamera, HDRCubeTexture } from '@babylonjs/core'
import router from 'next/router';
import { useEngine, useScene } from 'react-babylonjs'

export default function BabylonScene() {
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

    const buildingStrokes: Record<
      string,
      { stroke: string[]; page?: string; newTab?: boolean }
    > = {
      factory: {
        stroke: ['factory_stroke'],
        page: '/city/defi',
      },
      craft: {
        stroke: [
          'craft_stroke',
          'craft_manipulator_stroke',
          'craft_manipulator7_stroke',
          'craft_manipulator8_stroke',
        ],
        page: '/city/labs',
      },
      stake: {
        stroke: ['stake_stroke', 'stake_coin_stroke'],
      },
      shop: {
        stroke: ['shop_stroke', 'windmill_stroke_01', 'windmill_stroke_02'],
        page: '/city/launchpad',
      },
      arena: {
        stroke: ['arena_stroke', 'arena_rotator_a_stroke'],
        page: '/hub',
      },
      download: {
        stroke: ['download_client_car_stroke', 'download_client_car_adv_stroke'],
      },
      lemterprise: {
        stroke: ['lemterprise_stroke'],
        page: 'https://battlemon.gitbook.io',
        newTab: true,
      },
      engines: {
        stroke: ['engines_stroke'],
      },
    };

    Object.values(buildingStrokes)
    .map((val) => val.stroke)
    .flat()
    .forEach((_stroke) => {
      const stroke = scene.getMeshByName(_stroke);
      if (stroke) stroke.visibility = 0;
    });

    let selectedBuilding: string = '';

    scene.onPointerMove = function (evt) {
      const pickResult = scene.pick(scene.pointerX, scene.pointerY);
      if (pickResult.hit && pickResult.pickedMesh) {
        const meshPrefix = pickResult.pickedMesh.name.split('_')[0];
        if (selectedBuilding !== meshPrefix) {
          const buildings = buildingStrokes[meshPrefix];
          if (buildings) {
            document.body.style.cursor = 'pointer';
            buildings.stroke.forEach((building) => {
              const newStrokeBuilding = scene.getMeshByName(building);
              if (newStrokeBuilding) newStrokeBuilding.visibility = 1;
            });
          }
          if (selectedBuilding) {
            const oldStrokeBuildings = buildingStrokes[selectedBuilding];
            if (oldStrokeBuildings) {
              document.body.style.cursor = 'default';
              oldStrokeBuildings.stroke.forEach((building) => {
                const oldStrokeBuilding = scene.getMeshByName(building);
                if (oldStrokeBuilding) oldStrokeBuilding.visibility = 0;
              });
            }
          }
          selectedBuilding = meshPrefix;
        }
      }
    };

    scene.onPointerPick = function (evt) {
      const picked = buildingStrokes[selectedBuilding];

      if (picked?.newTab) {
        window.open(picked.page, '_blank')?.focus();
        return;
      }

      if (picked?.page) {
        router.push(picked.page);
      }
    };
  }

  return <></>
}