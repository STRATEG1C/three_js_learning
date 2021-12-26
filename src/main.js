import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.124/build/three.module.js';

import { ground } from './ground.js';
import { player } from './player.js';
import { world } from './world.js';
import { background } from './background.js';

class MainWorld {
    constructor() {
        this._Initialize();
        this._gameStarted = false;
        document.getElementById('game-menu').onclick = () => this._OnStart();
        // document.getElementById('play-again').onclick = () => this._OnStart();
    }

    _OnStart() {
        this.gameOver_ = false;
        this._gameStarted = true;

        document.getElementById('game-over').parentElement.style.zIndex = 1;
        document.getElementById('game-over').classList.remove('active');
        document.getElementById('game-menu').style.display = 'none';
        document.getElementById('game-menu1').style.display = 'none';

        const container = document.getElementById('container');
        container.requestFullscreen().catch(() => false);

        setTimeout(() => {
            document.getElementById('game-tip').classList.toggle('hidden');
        }, 3000);
    }

    _Initialize() {
        this.treejs_ = new THREE.WebGLRenderer({
            antialias: true,
        });

        this.treejs_.outputEncoding = THREE.sRGBEncoding;
        this.treejs_.gammaFactor = 2.2;

        this.treejs_.shadowMap.enabled = true;

        this.treejs_.setPixelRatio(window.devicePixelRatio);
        this.treejs_.setSize(window.innerWidth, window.innerHeight);

        document.getElementById('container').appendChild(this.treejs_.domElement);

        window.addEventListener('resize', () => {
            this.OnWindowResize_();
        }, false);

        const fov = 60;
        const aspect = 1920/1080;
        const near = 1.0;
        const far = 2000.0;
        this.camera_ = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this.camera_.position.set(-15, 7, 10);
        this.camera_.lookAt(120, -20, 10);

        this.scene_ = new THREE.Scene();

        const color = 0xFFFFFF;
        const intensity = 0.6;
        const light = new THREE.AmbientLight(color, intensity);

        light.position.x = 1200;
        light.position.y = 3;

        this.scene_.add(light);

        this.scene_.background = new THREE.Color(0x000000);
        this.scene_.fog = new THREE.FogExp2(0x000000, 0.00125);

        this.ground = new ground.Ground({ scene: this.scene_ });
        this.world = new world.WorldManager({ scene: this.scene_ });
        this.player = new player.Player({ scene: this.scene_, world: this.world });
        this.background = new background.Background({ scene: this.scene_ });

        this.gameOver_ = false;
        this.previouseRAF_ = null;

        this.RAF_();
        this.OnWindowResize_();
    }

    OnWindowResize_() {
        this.camera_.aspect = window.innerWidth / window.innerHeight;
        this.camera_.updateProjectionMatrix();
        this.treejs_.setSize(window.innerWidth, window.innerHeight);
    }

    RAF_() {
        requestAnimationFrame((time) => {
            if (this.previouseRAF_ === null) {
                this.previouseRAF_ = time;
            }

            this.RAF_();

            this.Step_((time - this.previouseRAF_) / 1000.0);
            this.treejs_.render(this.scene_, this.camera_);
            this.previouseRAF_ = time;
        });
    }

    Step_(timeElapsed) {
        if (this.gameOver_ || !this._gameStarted) {
            return;
        }

        this.ground.Update(timeElapsed);
        this.player.Update(timeElapsed);
        this.world.Update(timeElapsed);
        this.background.Update(timeElapsed);

        if (this.player.gameOver && !this.gameOver_) {
            this.gameOver_ = true;
            this._gameStarted = false;
            this.player.gameOver = false;
            document.getElementById('game-over').classList.toggle('active');
            document.getElementById('game-over').parentElement.style.zIndex = 10;
            document.exitFullscreen().catch(() => false);
        }
    }
}

let _App = null;

window.addEventListener('DOMContentLoaded', () => {
    _App = new MainWorld();
});
