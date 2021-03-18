import * as THREE from 'three'; 

export default class car {
    scene;
    camera;
    renderer;
    plane;
    mesh;
    className;
    bgName;
    bg;
    dom;
    cameraP; //摄像机位置
    constructor(className,bgName,cameraP){
        this.className = className;
        this.bgName = bgName;
        this.cameraP = cameraP;
        this.dom = document.getElementsByClassName(this.className)[0];
    }
    init(){
        this.setScene();
        this.setCamera();
        this.setRenderer();
        this.drawObeject();
        this.animat();
    }
    setScene() {
		this.scene = new THREE.Scene();
    }
    setCamera() {
		this.camera = new THREE.PerspectiveCamera(10, this.dom.clientWidth / this.dom.clientHeight, 1, 1000);
        
        this.camera.position.set(this.cameraP[0],this.cameraP[1],this.cameraP[2]);
		this.camera.up.x = 0;
		this.camera.up.y = 1;
		this.camera.up.z = 0;
        this.camera.lookAt(0, 0, 0);
		this.scene.add(this.camera);
    }
    setRenderer() {
		this.renderer = new THREE.WebGLRenderer({ alpha: true,antialias: true });
		this.renderer.setPixelRatio(window.devicePixelRatio * 1);
        this.renderer.sortObjects = true; // 渲染顺序
        this.renderer.setClearColor( 0x000000, 0);
		this.renderer.setSize(this.dom.clientWidth, this.dom.clientHeight);
		document.getElementsByClassName(this.className)[0].appendChild(this.renderer.domElement);

		this.dom.addEventListener('resize', this.onWindowResize.bind(this), false);
	}
	onWindowResize() {
		this.camera.aspect = this.dom.innerWidth / this.dom.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(this.dom.innerWidth, this.dom.innerHeight);
    }
    drawObeject(){
        var texture = new THREE.TextureLoader().load( require(`../image/${this.bgName}`) );
        var material = new THREE.MeshBasicMaterial( { map: texture,transparent:true } );

        this.plane = new THREE.PlaneGeometry(80,80);
        this.mesh = new THREE.Mesh(this.plane,material);
        this.scene.add(this.mesh)
    }
    animat() {
        this.mesh.rotation.z+=0.001;
		requestAnimationFrame(this.animat.bind(this));
		this.renderer.render(this.scene, this.camera);
    }
}