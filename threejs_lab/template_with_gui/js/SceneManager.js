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
	var objects = new SceneInstaller(scene);
	
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

    this.update = function() 
	{
        const elapsedTime = clock.getElapsedTime();

        for(let i=0; i<objects.length; i++)
		{
        	objects[i].update(elapsedTime);
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