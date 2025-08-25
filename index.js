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
const geometria = new THREE.IcosahedronGeometry(1, 12);
const mat  = new THREE.MeshStandardMaterial({
  map: loader.load('./texturas/00_earthmap1k.jpg'),
});

const terraMesh = new THREE.Mesh(geometria, mat);
terraGrupo.add(terraMesh);

const estrelas = getConstelação({ numEstrelas: 2000 });
cena.add(estrelas);

const luzMat = new THREE.MeshBasicMaterial({
  map: loader.load('./texturas/03_earthlights1k.jpg'),
  blending: THREE.AdditiveBlending,
});

const luzMesh = new THREE.Mesh(geometria, luzMat);
terraGrupo.add(luzMesh);

const nuvensMat = new THREE.MeshStandardMaterial({
  map: loader.load('./texturas/04_earthcloudmap.jpg'),
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending,
});

const nuvensMesh = new THREE.Mesh(geometria, nuvensMat);
nuvensMesh.scale.set(1.01, 1.01, 1.01);
terraGrupo.add(nuvensMesh);

const luzSolar = new THREE.DirectionalLight(0xffffff);
luzSolar.position.setScalar(1.003);
cena.add(luzSolar);

function animate() {
  requestAnimationFrame(animate);
  terraMesh.rotation.y += 0.002;
  luzMesh.rotation.y += 0.002;
  nuvensMesh.rotation.y += 0.002;
  // estrelas.rotation.y -= 0.002;
  renderer.render(cena, camera);
}
animate();

function handleWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);
