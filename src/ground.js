import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/loaders/FBXLoader.js';

export const ground = (() => {
  class Ground {
    constructor(params) {
      this.params_ = params;
      this.load();
    }

    load = () => {
      const loader = new FBXLoader();

      loader.load('./src/models/ground.fbx', (fbx) => {
        fbx.castShadow = false;
        fbx.receiveShadow = true;
        fbx.position.y = -3;
        fbx.rotation.x = -Math.PI;
        fbx.rotation.y = -Math.PI / 2;
        fbx.scale.setScalar(0.09);

        this.mesh_ = fbx;

        this.params_.scene.add(fbx);
      });

      loader.load('./src/models/sun.fbx', (fbx) => {
        fbx.position.y = -200;
        fbx.position.x = 700;
        fbx.position.z = 10;
        fbx.rotation.y = Math.PI / 2

        fbx.scale.setScalar(0.026);

        this.mesh2_ = fbx;

        this.params_.scene.add(fbx);
      });

      loader.load('./src/models/skala.fbx', (fbx) => {
        fbx.position.y = -3;
        fbx.position.x = 300;
        fbx.position.z = 150;
        fbx.rotation.y = Math.PI / 2

        fbx.scale.setScalar(0.036);

        this.mesh3_ = fbx;

        this.params_.scene.add(fbx);

      });

      loader.load('./src/models/skala.fbx', (fbx) => {
        fbx.position.y = -3;
        fbx.position.x = 300;
        fbx.position.z = -150;
        fbx.rotation.y = Math.PI / 2

        fbx.scale.setScalar(0.036);

        this.mesh4_ = fbx;

        this.params_.scene.add(fbx);

      });
      loader.load('./src/models/skala.fbx', (fbx) => {
        fbx.position.y = -3;
        fbx.position.x = 500;
        fbx.position.z = -150;
        fbx.rotation.y = Math.PI / 2

        fbx.scale.setScalar(0.036);

        this.mesh4_ = fbx;

        this.params_.scene.add(fbx);
      });

      loader.load('./src/models/skala.fbx', (fbx) => {
        fbx.position.y = -3;
        fbx.position.x = 500;
        fbx.position.z = 150;
        fbx.rotation.y = Math.PI / 2

        fbx.scale.setScalar(0.036);

        this.mesh4_ = fbx

        this.params_.scene.add(fbx)
      });
    };

    Update(timeElapsed) {
      if (this.mesh_.position.x > -100) {
        this.mesh_.position.x -= 1;
      } else {
        this.mesh_.position.x = 1;
      }

      if (this.mesh2_.position.y < -3) {
        this.mesh2_.position.y += 0.05;
      }
    }
  }

  return {
    Ground: Ground
  };

})();
