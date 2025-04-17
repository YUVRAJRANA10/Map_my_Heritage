// Initialize Three.js scene
const scene = new THREE.Scene();
scene.background = null; // Make background transparent

// Create camera with adjusted position for better viewing
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(20, 15, 20); 

// Create renderer with transparency and improved shadows
const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true 
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.physicallyCorrectLights = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

// Get the canvas container
const container = document.getElementById('canvas-container');
if (container) {
    container.appendChild(renderer.domElement);
}

// Add lights
// Ambient light for overall illumination
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Main directional light representing the sun
const sunLight = new THREE.DirectionalLight(0xfff5e0, 1.5);
sunLight.position.set(30, 50, 20); // Positioned like morning sun
sunLight.castShadow = true;
// Improve shadow quality
sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;
sunLight.shadow.camera.near = 0.5;
sunLight.shadow.camera.far = 500;
sunLight.shadow.bias = -0.0005;
// Set the area that casts shadows
sunLight.shadow.camera.left = -50;
sunLight.shadow.camera.right = 50;
sunLight.shadow.camera.top = 50;
sunLight.shadow.camera.bottom = -50;
scene.add(sunLight);

// Add a golden hour warm fill light from the opposite side
const fillLight = new THREE.DirectionalLight(0xffe0b3, 0.8);
fillLight.position.set(-30, 20, -20);
fillLight.castShadow = false; // Only main light casts shadow for performance
scene.add(fillLight);

// Add a subtle blue-ish hemisphere light to simulate sky lighting
const hemiLight = new THREE.HemisphereLight(0xaaccff, 0xffffff, 0.6);
hemiLight.position.set(0, 50, 0);
scene.add(hemiLight);

// Add gentle spotlight to create a highlight on the Taj Mahal dome
const spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(0, 40, 10);
spotLight.angle = Math.PI / 6;
spotLight.penumbra = 0.5;
spotLight.decay = 2;
spotLight.distance = 100;
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
scene.add(spotLight);

// Create a target for the spotlight
const targetObject = new THREE.Object3D();
targetObject.position.set(0, 10, 0);
scene.add(targetObject);
spotLight.target = targetObject;

// Add sun lens flare effect
function addSunLensFlare() {
    const textureLoader = new THREE.TextureLoader();
    const textureFlare0 = textureLoader.load('../images/lensflare0.png');
    const textureFlare3 = textureLoader.load('../images/lensflare3.png');
    
    const lensflare = new THREE.Lensflare();
    lensflare.addElement(new THREE.LensflareElement(textureFlare0, 700, 0, sunLight.color));
    lensflare.addElement(new THREE.LensflareElement(textureFlare3, 60, 0.6));
    lensflare.addElement(new THREE.LensflareElement(textureFlare3, 70, 0.7));
    lensflare.addElement(new THREE.LensflareElement(textureFlare3, 120, 0.9));
    lensflare.addElement(new THREE.LensflareElement(textureFlare3, 70, 1));
    
    sunLight.add(lensflare);
}

// Try to add lens flare if the module is available
try {
    if (THREE.Lensflare) {
        addSunLensFlare();
    }
} catch (e) {
    console.log('Lensflare effect not available');
}

// Create a marble ground plane
function createMarbleGround() {
    const textureLoader = new THREE.TextureLoader();
    
    // Load marble textures
    const marbleBaseTexture = textureLoader.load('../images/marble_ground.jpg');
    marbleBaseTexture.wrapS = marbleBaseTexture.wrapT = THREE.RepeatWrapping;
    marbleBaseTexture.repeat.set(4, 4);
    marbleBaseTexture.anisotropy = 16;
    
    // Create marble material
    const marbleMaterial = new THREE.MeshStandardMaterial({
        map: marbleBaseTexture,
        roughness: 0.1,
        metalness: 0.1,
        envMapIntensity: 1.0
    });
    
    // Create a circular platform
    const platformGeometry = new THREE.CylinderGeometry(20, 20, 0.5, 64);
    const platform = new THREE.Mesh(platformGeometry, marbleMaterial);
    platform.position.y = -0.25;
    platform.receiveShadow = true;
    
    scene.add(platform);
    
    // Add water reflection pool in front of Taj Mahal
    const poolGeometry = new THREE.PlaneGeometry(15, 8);
    const poolMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x0066cc,
        roughness: 0.1,
        metalness: 0.1,
        transmission: 0.9,
        transparent: true,
        opacity: 0.7,
        envMapIntensity: 1.5
    });
    
    const pool = new THREE.Mesh(poolGeometry, poolMaterial);
    pool.rotation.x = -Math.PI / 2;
    pool.position.set(0, -0.20, 6);
    pool.receiveShadow = true;
    scene.add(pool);
    
    return { platform, pool };
}

// Create water reflections using MeshReflectorMaterial if available
function createReflectiveSurface() {
    try {
        // Check if MeshReflectorMaterial is available
        if (THREE.MeshReflectorMaterial) {
            const geometry = new THREE.PlaneGeometry(35, 35);
            const material = new THREE.MeshReflectorMaterial({
                color: 0x889999,
                roughness: 0.1,
                metalness: 0.25,
                blur: [500, 500], // Blur ground reflections (width, height)
                mixBlur: 30,
                mixStrength: 1.5,
                mixContrast: 1,
                resolution: 1024,
                mirror: 0.75,
                depthScale: 0.01,
                minDepthThreshold: 0.9,
                maxDepthThreshold: 1,
                depthToBlurRatioBias: 0.25
            });
            
            const reflector = new THREE.Mesh(geometry, material);
            reflector.rotation.x = -Math.PI / 2;
            reflector.position.y = -0.49;
            reflector.receiveShadow = true;
            
            scene.add(reflector);
            return reflector;
        }
    } catch (e) {
        console.log("MeshReflectorMaterial not available, using fallback");
        return null;
    }
    
    // Fallback to simple reflector if MeshReflectorMaterial is not available
    return null;
}

// Add subtle fog for depth and atmosphere
scene.fog = new THREE.FogExp2(0xc4cce0, 0.0075);

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

// Create marble ground
const ground = createMarbleGround();
const reflector = createReflectiveSurface();

// Add a subtle glow/bloom effect if possible
function addBloomEffect() {
    try {
        if (THREE.UnrealBloomPass && THREE.EffectComposer) {
            const composer = new THREE.EffectComposer(renderer);
            const renderPass = new THREE.RenderPass(scene, camera);
            
            const bloomPass = new THREE.UnrealBloomPass(
                new THREE.Vector2(window.innerWidth, window.innerHeight),
                0.75,   // strength
                0.5,    // radius
                0.7     // threshold
            );
            
            composer.addPass(renderPass);
            composer.addPass(bloomPass);
            
            return composer;
        }
    } catch (e) {
        console.log("Bloom effect not available");
        return null;
    }
    
    return null;
}

const bloomComposer = addBloomEffect();

// Create animated sun rays
function createSunRays() {
    const sunRayGeometry = new THREE.CylinderGeometry(0.1, 0.1, 40, 8);
    const sunRayMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffcc,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
    });
    
    const rays = [];
    const rayCount = 8;
    
    for (let i = 0; i < rayCount; i++) {
        const ray = new THREE.Mesh(sunRayGeometry, sunRayMaterial);
        const angle = (i / rayCount) * Math.PI * 2;
        
        ray.position.set(
            sunLight.position.x * 0.5 + Math.cos(angle) * 2,
            sunLight.position.y * 0.5,
            sunLight.position.z * 0.5 + Math.sin(angle) * 2
        );
        
        ray.rotation.z = Math.PI / 2; // Make rays perpendicular to sun
        ray.rotation.y = angle;
        
        scene.add(ray);
        rays.push({ mesh: ray, initialAngle: angle });
    }
    
    return rays;
}

const sunRays = createSunRays();

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
    
    // Apply material improvements
    model.traverse((node) => {
        if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
            
            // Enhance marble materials
            if (node.material) {
                if (node.material.map) {
                    node.material.roughness = 0.2;
                    node.material.metalness = 0.1;
                }
            }
        }
    });
    
    scene.add(model);
    
    // Set target to center of model
    controls.target.copy(new THREE.Vector3(0, 5, 0));
    spotLight.target.position.copy(new THREE.Vector3(0, 10, 0));
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
    
    // Update bloom composer if available
    if (bloomComposer) {
        bloomComposer.setSize(width, height);
    }
}

window.addEventListener('resize', onResize);

// Animate sun rays
function animateSunRays(time) {
    if (sunRays && sunRays.length > 0) {
        sunRays.forEach((ray, index) => {
            // Rotate the rays
            ray.mesh.rotation.y = ray.initialAngle + time * 0.0003;
            // Pulse the opacity
            const opacityPulse = 0.2 + Math.sin(time * 0.001 + index) * 0.1;
            ray.mesh.material.opacity = opacityPulse;
        });
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    const time = Date.now();
    
    // Animate sun rays
    animateSunRays(time);
    
    controls.update();
    
    if (document.getElementById('canvas-container')) {
        if (bloomComposer) {
            bloomComposer.render();
        } else {
            renderer.render(scene, camera);
        }
    }
}

// Check if we're on the page with the canvas container
if (document.getElementById('canvas-container')) {
    // Initial resize to fit container
    onResize();
    // Start animation loop
    animate();
}