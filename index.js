import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;

const renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 10);
camera.position.z = 2;

const cena = new THREE.Scene();
new OrbitControls(camera, renderer.domElement);

const loader = new THREE.TextureLoader();
const geometria = new THREE.IcosahedronGeometry(1, 14);
const mat  = new THREE.MeshStandardMaterial({
  map: loader.load('./texturas/00_earthmap1k.jpg'),
});

const terra = new THREE.Mesh(geometria, mat);
cena.add(terra);

const luz = new THREE.HemisphereLight(0xFFFFFF, 3);
cena.add(luz);

function animate() {
  requestAnimationFrame(animate);
  terra.rotation.x += 0.001;
  terra.rotation.y += 0.002;
  renderer.render(cena, camera);
}
animate();
