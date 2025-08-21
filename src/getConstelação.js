import * as THREE from "three";

export default function getConstelação({ numEstrelas = 500 } = {}) {
  function randomSpherePoint() {
    const tamanho = Math.random() * 25 + 25;
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    let x = tamanho * Math.sin(phi) * Math.cos(theta);
    let y = tamanho * Math.sin(phi) * Math.sin(theta);
    let z = tamanho * Math.cos(phi);

    return {
      pos: new THREE.Vector3(x, y, z),
      hue: 0.6,
      minDist: tamanho,
    };
  }
  const verts = [];
  const cores = [];
  const posições = [];
  let col;
  for (let i = 0; i < numEstrelas; i += 1) {
    let p = randomSpherePoint();
    const { pos, hue } = p;
    posições.push(p);
    col = new THREE.Color().setHSL(hue, 0.2, Math.random());
    verts.push(pos.x, pos.y, pos.z);
    cores.push(col.r, col.g, col.b);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(cores, 3));
  const mat = new THREE.PointsMaterial({
    size: 0.2,
    vertexColors: true,
    map: new THREE.TextureLoader().load(
      "./texturas/estrelas/circle.png"
    ),
  });
  const pontos = new THREE.Points(geo, mat);
  return pontos;
}