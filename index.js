import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import getConstelação from './src/getConstelação.js';

const w = window.innerWidth;
const h = window.innerHeight;
const cena = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const terraGrupo = new THREE.Group();
terraGrupo.rotation.z = -23.4 * Math.PI / 180;
cena.add(terraGrupo);

new OrbitControls(camera, renderer.domElement);

const loader = new THREE.TextureLoader();
const geometria = new THREE.IcosahedronGeometry(1, 14);
const mat  = new THREE.MeshStandardMaterial({
  map: loader.load('./texturas/00_earthmap1k.jpg'),
});

const terra = new THREE.Mesh(geometria, mat);
terraGrupo.add(terra);

const estrelas = getConstelação({ numEstrelas: 2000 });
cena.add(estrelas);

const luz = new THREE.HemisphereLight(0xFFFFFF, 3);
cena.add(luz);

function animate() {
  requestAnimationFrame(animate);
  terra.rotation.y += 0.002;
  renderer.render(cena, camera);
}
animate();

function handleWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);
