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

function addNode() {
    let canvas = createCanvas();
    let texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({map: texture});

    let node = new THREE.Mesh(geometry, material);
    scene.add(node);

    renderer.render(scene, camera);
}

function getCamera() {
    let fov = 75;

    let aspectRatio = innerWidth/innerHeight;
    let near = 0.1;
    let far = 1000;

    let camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
    camera.position.z = 5;
    return camera;
}

function getRenderer() {
    let innerWidth = window.innerWidth;
    let innerHeight = window.innerHeight;

    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(innerWidth, innerHeight);
    document.body.appendChild(renderer.domElement);
    return renderer;
}

let scene = new THREE.Scene();
let camera = getCamera();
let renderer = getRenderer();
addNode();