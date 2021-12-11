'use strict';

{
  var scene;
  var box;
  var sphere;
  var plane;
  var light;
  var ambient
  var camera;
  var gridHelper;
  var axisHelper;
  var lightHelper;
  var renderer;

  var controls;
  var shadowHelper;

  var obj;
  var mochi = 1;

  scene = new THREE.Scene();

  box = new THREE.Mesh(
    new THREE.BoxGeometry(50, 40, 50),
    new THREE.MeshToonMaterial({ color: 0xf1f1f1 })
  );
  box.position.set(0, -30, 0);
  box.scale.set(1.5, 0.7, 1);
  // scene.add(box);

  sphere = new THREE.Mesh(
    new THREE.SphereGeometry(mochi, 50, 50),
    new THREE.MeshToonMaterial({ color: 0xf1f1f1 })
  );
  sphere.position.set(0, mochi -25, 0);
  // scene.add(sphere);

  obj = new THREE.Group();
  obj.add(box);
  obj.add(sphere);
  scene.add(obj);

  plane = new THREE.Mesh(
    new THREE.PlaneGeometry(2000, 2000),
    new THREE.MeshToonMaterial({ color: 0xE60012, side: THREE.DoubleSide })
  );
  plane.position.set(0, -43, 0);
  plane.rotation.x = 90 * Math.PI / 180;
  plane.name = 'plane-1'
  scene.add(plane);


  light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(-80, 80, -20);
  scene.add(light);
  ambient = new THREE.AmbientLight(0x404040);
  scene.add(ambient);

  camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 10, 2000, -100);
  camera.position.set(500, 300, 900);
  camera.lookAt(scene.position);

  // gridHelper = new THREE.GridHelper(1000, 10);
  // scene.add(gridHelper);
  // axisHelper = new THREE.AxisHelper(1000);
  // scene.add(axisHelper);
  // lightHelper = new THREE.DirectionalLightHelper(light, 20);
  // scene.add(lightHelper);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(0xE60012);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById('stage') .appendChild(renderer.domElement);

  renderer.shadowMap.enabled = true;
  light. castShadow = true;
  light.shadow.camera.left = -200;
  light.shadow.camera.right = 200;
  light.shadow.camera.top = 200;
  light.shadow.camera.bottom = -200;
  // shadowHelper = new THREE.CameraHelper(light.shadow.camera);
  // scene.add(shadowHelper);
  box.castShadow = true;
  sphere.castShadow = true;
  sphere.castShadow = true;
  plane.receiveShadow = true;
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;
  

  controls = new THREE.OrbitControls(camera,renderer.domElement);
  controls.autoRotate = true;
  controls.enableDamping = true;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.maxPolarAngle = Math.PI/2.5; 
  controls.minPolarAngle = Math.PI/2.5; 

  
  document.addEventListener( 'mousedown', clickPosition, false );

  function clickPosition( event ) {
    var x = event.clientX;
    var y = event.clientY;
     
    var mouse = new THREE.Vector2();
    mouse.x =  ( x / window.innerWidth ) * 2 - 1;
    mouse.y = -( y / window.innerHeight ) * 2 + 1;
     
    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( obj.children );
     
    
    if ( intersects.length > 0 ) {
      if (mochi > 120) {
        mochi += 3;
        sphere.scale.x = mochi;
        sphere.scale.y = mochi;
        sphere.scale.z = mochi;
        sphere.position.y = mochi-25;
      } else if ( mochi > 100) {
        mochi += 5;
        sphere.scale.x = mochi;
        sphere.scale.y = mochi;
        sphere.scale.z = mochi;
        sphere.position.y = mochi-25;
      } else {
        mochi += 8;
        sphere.scale.x = mochi;
        sphere.scale.y = mochi;
        sphere.scale.z = mochi;
        sphere.position.y = mochi-25;
      }
    }
  };

  const persent = document.getElementById('persent');
  const sbow = document.getElementById('snow');
  const svg = document.getElementById('svg');
  const fade = document.getElementById('fade');
  const starttext = document.getElementById('starttext');
  
  function render() {
    requestAnimationFrame(render);

    controls.update();
    if (mochi > 1){
      mochi -= 0.1;
      sphere.scale.x = mochi;
      sphere.scale.y = mochi;
      sphere.scale.z = mochi;
      sphere.position.y = mochi-25;
      count.textContent = Math.floor(mochi / 150 * 100);
      persent.style.color = "#ffffff"
      starttext.classList.add('remove');
      sphere.material.color = new THREE.Color(0xffffff);
      box.material.color = new THREE.Color(0xffffff);

    }

    if(mochi > 100){
      persent.style.color = "#FFD600"
      sphere.material.color = new THREE.Color(0xfff4ba);
      box.material.color = new THREE.Color(0xfff4ba);
    }
    if(mochi > 130){
      persent.style.color = "#FF7800"
      sphere.material.color = new THREE.Color(0xffe791);
      box.material.color = new THREE.Color(0xffe791);
    }
    if(mochi > 140){
      persent.style.color = "#FF7800"
      sphere.material.color = new THREE.Color(0xffac4d);
      box.material.color = new THREE.Color(0xffac4d);
    }

    if (mochi > 152){
      scene.remove(obj);
      count.textContent = "100";
      persent.classList.add('remove');
      snow.classList.remove('hide');
      svg.classList.remove('hide');
      fade.classList.remove('hide');
      controls.autoRotate = false;
      mochi = 0;
    }

    renderer.render(scene, camera);
  }
  render();

  
  $(document).ready(function(){
		$("#snow").snowfall(
			{
			    flakeCount : 300,
			    flakeIndex : "888",
			    minSize : 1,
			    maxSize : 5,
			    minSpeed : 0.5,
			    maxSpeed : 1,
			    round : true,
			    shadow : false
			}
		);
	});

  $(function() {
    setTimeout(function(){
      $('.opening p').fadeIn(1600);
    },500);
    setTimeout(function(){
      $('.opening').fadeOut(1000);
    },2500);
  });


  onResize();
    window.addEventListener('resize', onResize);

    function onResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
  }
