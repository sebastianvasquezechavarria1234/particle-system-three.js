import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 15;

// Renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

renderer.setPixelRatio(
  window.devicePixelRatio
);

document.body.appendChild(
  renderer.domElement
);

// Controls
const controls = new OrbitControls(
  camera,
  renderer.domElement
);

controls.enableDamping = true;

// Particles
const particleCount = 10000;

const positions = new Float32Array(
  particleCount * 3
);

for (let i = 0; i < particleCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 80;
}

const geometry = new THREE.BufferGeometry();

geometry.setAttribute(
  'position',
  new THREE.BufferAttribute(
    positions,
    3
  )
);

const material = new THREE.PointsMaterial({
  size: 0.05,
  color: 0xffffff
});

const particles = new THREE.Points(
  geometry,
  material
);

scene.add(particles);

// Lights
const ambientLight = new THREE.AmbientLight(
  0xffffff,
  1
);

scene.add(ambientLight);

// Resize
window.addEventListener('resize', () => {
  camera.aspect =
    window.innerWidth /
    window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );
});

// Animation
function animate() {
  requestAnimationFrame(
    animate
  );

  particles.rotation.y += 0.0005;
  particles.rotation.x += 0.0002;

  controls.update();

  renderer.render(
    scene,
    camera
  );
}

animate();