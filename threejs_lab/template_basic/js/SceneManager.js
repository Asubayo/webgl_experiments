function SceneManager(canvas) 
{
    const clock = new THREE.Clock();
    
    const screenDimensions = 
	{
        width: canvas.width,
        height: canvas.height
    }
    
    const scene = setupScene();
    const renderer = setupRenderer(screenDimensions);
    const camera = setupCamera(screenDimensions);
	
    const sceneObjects = 
	[
		new createLight(scene),
		new SceneObject(scene)
	];

    function setupScene() 
	{
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#000");
        return scene;
    }

    function setupRenderer({ width, height }) 
	{
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); 
        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);

        renderer.gammaInput = true;
        renderer.gammaOutput = true; 

		renderer.setClearColor( 0xdddddd, 1);
		
        return renderer;
    }

    function setupCamera({ width, height }) 
	{
        const aspectRatio = width / height;
        const fieldOfView = 60;
        const nearPlane = 0.1;
        const farPlane = 10000; 
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
		camera.position.set( -15, 10, 10 );
		camera.lookAt( scene.position );
        return camera;
    }

	function createLight(scene) 
	{
		
		const light = new THREE.PointLight( 0xFFFF00 );
		light.position.set( -10, 10, 10 );
		scene.add( light );
		
		this.update = function(time) {
			light.intensity = (Math.sin(time)+1.5)/1.5;
			light.color.setHSL( Math.sin(time), 0.5, 0.5 );
		}
	}
	
	function SceneObject(scene) 
	{
		
		const radius = 2;
		const mesh = new THREE.Mesh(new THREE.IcosahedronBufferGeometry(radius, 2), new THREE.MeshStandardMaterial({ flatShading: true }));

		mesh.position.set(0, 0, 0);

		scene.add(mesh);
		
		this.update = function(time) {
			const scale = Math.sin(time)+2;

			mesh.scale.set(scale, scale, scale);
		}
	}

    this.update = function() 
	{
        const elapsedTime = clock.getElapsedTime();

        for(let i=0; i<sceneObjects.length; i++)
		{
        	sceneObjects[i].update(elapsedTime);
		}

        renderer.render(scene, camera);
    }

    this.onWindowResize = function() 
	{
        const { width, height } = canvas;

        screenDimensions.width = width;
        screenDimensions.height = height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
    }
}