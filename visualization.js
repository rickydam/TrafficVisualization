// To actually be able to display anything with three.js
// We need three things: scene, camera, and renderer

let scene = new THREE.Scene();
// Params: field of view, aspect ratio, near, far
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let text = 'Hello world!';
let canvas = document.createElement('canvas');
canvas.width = 200;
canvas.height = 100;

let context = canvas.getContext('2d');
context.font = '30px Arial';

context.beginPath();
context.rect(0, 0, 200, 100);
context.fillStyle = 'gray';
context.fill();

context.fillStyle = 'white';
context.fillText(text, 0, 30);
context.strokeStyle = 'white';
context.strokeText(text, 0, 30);

let texture = new THREE.Texture(canvas);
texture.needsUpdate = true;

let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({map: texture});

let node = new THREE.Mesh(geometry, material);
scene.add(node);

camera.position.z = 5;
renderer.render(scene, camera);