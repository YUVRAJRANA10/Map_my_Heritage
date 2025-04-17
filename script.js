// Initialize Three.js scene
const scene = new THREE.Scene();
scene.background = null; // Make background transparent

// Create camera with adjusted position for better viewing
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(20, 15, 20); 

// Create renderer with transparency
const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true 
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;

// Get the canvas container
const container = document.getElementById('canvas-container');
if (container) {
    container.appendChild(renderer.domElement);
}

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(15, 50, 17.5);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Add controls with adjusted settings
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 10;
controls.maxDistance = 50;
controls.maxPolarAngle = Math.PI / 2;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;
// Disable zoom to prevent breaking out of the scene
controls.enableZoom = false;

// Load the Taj Mahal GLB model
const loader = new THREE.GLTFLoader();
loader.load('../taj_mahal_3d_model.glb', (gltf) => {
    const model = gltf.scene;
    
    // Scale for hero section viewing
    model.scale.set(0.044, 0.044, 0.044);
    
    // Center the model properly
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.x = -center.x;
    model.position.y = -box.min.y;
    model.position.z = -center.z;
    
    scene.add(model);
    
    // Set target to center of model
    controls.target.copy(new THREE.Vector3(0, 2, 0));
    controls.update();
    
    console.log("Model loaded and positioned");
    
}, undefined, (error) => {
    console.error('An error happened while loading the model:', error);
});

// Handle window resize
function onResize() {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

window.addEventListener('resize', onResize);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    if (document.getElementById('canvas-container')) {
        renderer.render(scene, camera);
    }
}

// Check if we're on the page with the canvas container
if (document.getElementById('canvas-container')) {
    // Initial resize to fit container
    onResize();
    // Start animation loop
    animate();
}