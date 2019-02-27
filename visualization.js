// To actually be able to display anything with three.js
// We need three things: scene, camera, and renderer

let scene = new THREE.Scene();
// Params: field of view, aspect ratio, near, far
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let geometry = new THREE.BoxGeometry(2, 1, 0.2);

let material = new THREE.MeshBasicMaterial({color: 0x9C9C9C});
let node = new THREE.Mesh(geometry, material);
scene.add(node);
camera.position.z = 5;

renderer.render(scene, camera);