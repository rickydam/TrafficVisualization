function createCanvas() {
    let text = 'Hello world!';
    let canvas = createHDCanvas(256, 256);
    let context = canvas.getContext('2d');
    context.font = '20px Arial';

    context.beginPath();
    context.rect(0, 0, 256, 256);
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

function getControls(camera, renderer) {
    let controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.zoomSpeed = 0.4;
    controls.panSpeed = 0.4;
    return controls;
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}

function addNode() {
    let canvas = createCanvas();
    let texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({map: texture});

    let node = new THREE.Mesh(geometry, material);
    scene.add(node);
}

function getCamera() {
    let fov = 75;
    let innerWidth = window.innerWidth;
    let innerHeight = window.innerHeight;
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

let loadJSON = (callback) => {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', 'sample_pcap.json', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState === 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
};

let scene = new THREE.Scene();
let camera = getCamera();
let renderer = getRenderer();
let controls = getControls(camera, renderer);
loadJSON(function(response) {
    console.log(response);
});
addNode();
animate();