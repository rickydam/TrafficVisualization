function loadVisualization() {
    // To actually be able to display anything with three.js
    // We need three things: scene, camera, and renderer

    let scene = new THREE.Scene();
    // Params: field of view, aspect ratio, near, far
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let canvas = createCanvas();
    let texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({map: texture});

    let node = new THREE.Mesh(geometry, material);
    scene.add(node);

    camera.position.z = 5;
    renderer.render(scene, camera);
}

function createCanvas() {
    let text = 'Hello world!';
    let canvas = createHDCanvas(100, 100);
    let context = canvas.getContext('2d');
    context.font = '20px Arial';

    context.beginPath();
    context.rect(0, 0, 100, 100);
    context.fillStyle = 'gray';
    context.fill();

    context.fillStyle = 'white';
    context.fillText(text, 0, 20);
    context.strokeStyle = 'white';
    context.strokeText(text, 0, 20);
    return canvas;
}

function createHDCanvas(width, height) {
    let dpr = window.devicePixelRatio;
    let bspr = 1;
    let ratio = dpr / bspr;
    let canvas = document.createElement('canvas');
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);
    return canvas;
}