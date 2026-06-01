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

camera.position.set(0, 8, 25);

// Renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, 2)
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

// Galaxy Parameters
const particleCount = 25000;
const radius = 15;
const branches = 5;
const spin = 1;

const positions = new Float32Array(
  particleCount * 3
);

const colors = new Float32Array(
  particleCount * 3
);

const geometry =
  new THREE.BufferGeometry();

const insideColor =
  new THREE.Color('#00ffff');

const outsideColor =
  new THREE.Color('#ff00ff');

// Generate Galaxy

for (let i = 0; i < particleCount; i++) {

  const i3 = i * 3;

  const particleRadius =
    Math.random() * radius;

  const branchAngle =
    (i % branches) *
    ((Math.PI * 2) / branches);

  const spinAngle =
    particleRadius * spin;

  const randomX =
    (Math.random() - 0.5) *
    0.5 *
    particleRadius;

  const randomY =
    (Math.random() - 0.5) *
    0.5;

  const randomZ =
    (Math.random() - 0.5) *
    0.5 *
    particleRadius;

  positions[i3] =
    Math.cos(
      branchAngle + spinAngle
    ) *
      particleRadius +
    randomX;

  positions[i3 + 1] =
    randomY;

  positions[i3 + 2] =
    Math.sin(
      branchAngle + spinAngle
    ) *
      particleRadius +
    randomZ;

  const mixedColor =
    insideColor.clone();

  mixedColor.lerp(
    outsideColor,
    particleRadius / radius
  );

  colors[i3] =
    mixedColor.r;

  colors[i3 + 1] =
    mixedColor.g;

  colors[i3 + 2] =
    mixedColor.b;
}

geometry.setAttribute(
  'position',
  new THREE.BufferAttribute(
    positions,
    3
  )
);

geometry.setAttribute(
  'color',
  new THREE.BufferAttribute(
    colors,
    3
  )
);

// Material

const material =
  new THREE.PointsMaterial({
    size: 0.08,
    vertexColors: true,
    transparent: true,
    blending:
      THREE.AdditiveBlending,
    depthWrite: false
  });

// Galaxy

const galaxy =
  new THREE.Points(
    geometry,
    material
  );

scene.add(galaxy);

// Ambient Light

const ambientLight =
  new THREE.AmbientLight(
    0xffffff,
    2
  );

scene.add(ambientLight);

// Resize

window.addEventListener(
  'resize',
  () => {

    camera.aspect =
      window.innerWidth /
      window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );
  }
);

// Animation

function animate() {

  requestAnimationFrame(
    animate
  );

  galaxy.rotation.y += 0.0015;

  controls.update();

  renderer.render(
    scene,
    camera
  );
}

animate();