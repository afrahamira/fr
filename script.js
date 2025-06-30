
    import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
    import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader';
     // sizes
     const sizes = {
        width:  window.innerWidth,
        height: 250
    };
    //scene renderer
    const canvas = document.querySelector('#khatem');

    //scene renderer
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize( sizes.width , sizes.height);
 
    
    // our scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

   

    //camera
    const camera = new THREE.PerspectiveCamera( 75, sizes.width / sizes.height, 0.1, 1000 );
    camera.position.set(2.5, 5, 2.5);

    // ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    // directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    scene.add(directionalLight);

    // controls for orbiting around the object
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.addEventListener('change', () => {
        renderer.render(scene, camera)
    });
    controls.target.set(0, 0, 0);
    controls.enableZoom = false;
    controls.enableRotate  = false;
    controls.update();

    // load the object
    const loader = new GLTFLoader();
    loader.load('ring.glb', function(gtlf){
        const model = gtlf.scene;
        model.position.set(0,0,0);
        
        scene.add(model)

        // render the scene
        renderer.render(scene, camera);

        function animation(){
            model.rotation.y += 0.01 ;
            // model.rotation.y += 0.1 ;
            renderer.render(scene, camera)
        }
        renderer.setAnimationLoop(animation);
    }, undefined, function (error){
        console.error(error)
    });
   
