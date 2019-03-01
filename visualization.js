function createCanvas(number, time, source, destination, protocol, length) {
    let canvas = createHDCanvas(256, 256);
    let context = canvas.getContext('2d');
    context.font = '18px Arial';

    context.beginPath();
    context.rect(0, 0, 256, 256);
    context.fillStyle = 'gray';
    context.fill();

    context.fillStyle = 'white';
    context.fillText("Number: " + number, 5, 20);
    context.strokeStyle = 'white';
    context.strokeText("Number: " + number, 5, 20);

    context.fillStyle = 'white';
    context.fillText("Time: " + time, 5, 45);
    context.strokeStyle = 'white';
    context.strokeText("Time: " + time, 5, 45);

    context.fillStyle = 'white';
    context.fillText("Source: " + source, 5, 70);
    context.strokeStyle = 'white';
    context.strokeText("Source: " + source, 5, 70);

    context.fillStyle = 'white';
    context.fillText("Destination: " + destination, 5, 95);
    context.strokeStyle = 'white';
    context.strokeText("Destination: " + destination, 5, 95);

    context.fillStyle = 'white';
    context.fillText("Protocol: " + protocol, 5, 120);
    context.strokeStyle = 'white';
    context.strokeText("Protocol: " + protocol, 5, 120);

    context.fillStyle = 'white';
    context.fillText("Length: " + length, 5, 145);
    context.strokeStyle = 'white';
    context.strokeText("Length: " + length, 5, 145);

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

function addNode(number, time, source, destination, protocol, length) {
    let canvas = createCanvas(number, time, source, destination, protocol, length);
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
    let jsonData = JSON.parse(response);
    for(let i=0; i<jsonData.length; i++) {
        let obj = jsonData[i];
        addNode(
            obj["No."],
            obj["Time"],
            obj["Source"],
            obj["Destination"],
            obj["Protocol"],
            obj["Length"]
        );
    }
});

animate();