function SceneInstaller(scene)
{
	const objectList = 
	[
		new createLight(scene),
		new SceneObject(scene)
	];

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
		var mesh = new THREE.Object3D();
		
		mesh.add( new THREE.Mesh(

				new THREE.Geometry(),

				new THREE.MeshPhongMaterial( {
					color: 0x156289,
					emissive: 0x072534,
					side: THREE.DoubleSide,
					flatShading: true
				} )

			) );
			
		IcosahedronBufferGeometry( mesh )
		mesh.position.set(0, 0, 0);

		scene.add(mesh);
		
		this.update = function(time) {
			const scale = Math.sin(time)+2;

			mesh.scale.set(scale, scale, scale);
		}
	}

	function IcosahedronBufferGeometry( mesh ) 
	{
		var data = 
		{
			radius: 2,
			detail: 0
		};

		function generateGeometry() 
		{
			mesh.children[ 0 ].geometry.dispose();
			mesh.children[ 0 ].geometry = new THREE.IcosahedronBufferGeometry(data.radius, data.detail);
		}

		var folder = gui.addFolder( 'Parameters' );

		folder.add( data, 'radius', 1, 20 ).onChange( generateGeometry );
		folder.add( data, 'detail', 0, 5 ).step( 1 ).onChange( generateGeometry );

		generateGeometry();
	}

	return objectList;
}