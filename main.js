// --------------------------import--------------------------
// import all three.js module
import * as THREE from './libs/three.module.js';

// import ColladaLoader to load the UCC Quad
import { ColladaLoader } from './libs/ColladaLoader.js';

// import FBXLoader to load characters
import { FBXLoader } from './libs/FBXLoader.js';

// import OrbitControls to enable the mouse control of the camera
import { OrbitControls } from './libs/OrbitControls.module.js';

// import GUI to control various aspect of scene
import { GUI } from './libs/dat.gui.module.js';

// import Stats to print system performance statistics
import Stats from './libs/stats.module.js';

// import to create flare
import { Lensflare, LensflareElement } from './libs/Lensflare.js';


// --------------------------define variables--------------------------
var scene
var renderer
var camera
var cameraControl
var pointLight, spotLight, posSound
var mixer1, mixer2, mixer3, mixer4
// define a variable named "group" to contain music
var group = new THREE.Group()
// set the place of playing music
group.position.set(0, 0, 0)
// difine a variable named "listener" to make the spatial sound
var listener = new THREE.AudioListener()
var stats

// ----print out system performance statistics to the screen----
function createStats() {
    console.log("Start createStats")
    stats = Stats()
    stats.showPanel(0)
    document.body.appendChild(stats.dom)
    console.log("End createStats")
}

// --------------------------create music--------------------------
function createPositionSound() {
    console.log("Start createPositionSound")
    posSound = new THREE.PositionalAudio(listener)
    var audioLoader = new THREE.AudioLoader()
    audioLoader.load('./assets/audio.mp3', function (buffer) {
        posSound.setBuffer(buffer)
        posSound.setLoop(true)
        posSound.setRefDistance(50)
    })
    group.add(posSound)
    scene.add(group)
    console.log("End createPositionSound")
}

// -----------------------create renderer-----------------------
function createRenderer() {
    console.log("Start createRenderer")
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(devicePixelRatio)
    renderer.setClearColor(0x000000, 1.0)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    document.body.appendChild(renderer.domElement)
    console.log("End createRenderer")
}

// ------------------------create camera------------------------
function createCamera() {
    console.log("Start createCamera")
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.x = 40
    camera.position.y = 30
    camera.position.z = 70
    camera.lookAt(scene.position)
    camera.add(listener)
    cameraControl = new OrbitControls(camera, renderer.domElement)
    cameraControl.maxPolarAngle = 0.9 * Math.PI / 2
    scene.add(camera)
    console.log("End createCamera")
}

// -------------------when resize the browser-------------------
function onWindowResize() {
    console.log("Start onWindowResize")
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize( window.innerWidth, window.innerHeight )
    console.log("End onWindowResize")
}

// --------------------------create three different types of lights--------------------------
function createLights() {
    console.log("Start createLight")

    // create ambient light
    var ambientLight = new THREE.AmbientLight(0x404040, 3.5)
    scene.add(ambientLight)
    console.log("End create ambientLight")

    // create point light and its shadows
    pointLight = new THREE.PointLight(0xaabbff, 0.5)
    pointLight.name = 'point'
    pointLight.castShadow = true
    pointLight.shadow.mapSize.width = 2048
    pointLight.shadow.mapSize.height = 2048
    pointLight.shadow.camera.near = 0.5
    pointLight.shadow.camera.far = 5000
    scene.add(pointLight)
    console.log("End create pointLight")
    createSun()

    // create spot light and its shadows
    spotLight = new THREE.SpotLight(0xffffff, 1)
    spotLight.position.set(-17.5, 1.5, -9)
    spotLight.rotation.z = -50
    spotLight.penumbra = 0.1
	spotLight.decay = 2
	spotLight.distance = 200
    spotLight.castShadow = true
    spotLight.shadow.mapSize.width = 2048
    spotLight.shadow.mapSize.height = 2048
    spotLight.shadow.camera.near = 0.5
    spotLight.shadow.camera.far = 5000
    spotLight.shadow.focus = 1
    scene.add(spotLight)
    console.log("End create spotLight")
    createLampLight()
}

// --------------------------create skybox--------------------------
const uniforms1 = {
    topColor: {
        value: new THREE.Color(0x0077ff)
    },
    bottomColor: {
        value: new THREE.Color(0xffffff)
    },
    offset: {
        value: 500
    },
    exponent: {
        value: 0.8
    }
}

function createSky() {
    console.log("Start createSky")
    const vertexShader = document.getElementById('vertexShaderS').textContent
    const fragmentShader = document.getElementById('fragmentShaderS').textContent

    // create a box as 3D world
    // const skyboxGeo = new THREE.BoxGeometry(500, 500, 500);
    // var boxMaterials = [
    // new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load( 'rainbow_rt.png' ), side: THREE.DoubleSide} ), // right
    // new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load( 'rainbow_lf.png' ), side: THREE.DoubleSide} ), // left
    // new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load( 'rainbow_up.png' ), side: THREE.DoubleSide} ), // top
    // new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load( 'rainbow_dn.png' ), side: THREE.DoubleSide} ), // bottom
    // new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load( 'rainbow_ft.png' ), side: THREE.DoubleSide} ), // front
    // new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load( 'rainbow_bk.png' ), side: THREE.DoubleSide} ), // back
    // ];
    // var skyboxMaterial = new THREE.MeshFaceMaterial( boxMaterials );
    // var skybox = new THREE.Mesh( skyboxGeo, skyboxMaterial );
    // scene.add(skybox);


    const skyGeo = new THREE.BoxGeometry(500, 500, 500)
    const skyMat = new THREE.ShaderMaterial({
        uniforms: uniforms1,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.BackSide
    })

    const sky = new THREE.Mesh(skyGeo, skyMat)
    sky.position.set(0, 249, -13)
    scene.add(sky)
    console.log("End createSky")
}

// --------------------------create sun--------------------------
var textureloader = new THREE.TextureLoader()
var textureFlare0 = textureloader.load("./assets/lensflare0.png")
var textureFlare3 = textureloader.load("./assets/lensflare3.png")

function createSun() {
    console.log("Start createSun")
    var lensflare = new Lensflare()
    lensflare.addElement(new LensflareElement(textureFlare0, 500, 0, new THREE.Color(1, 1, 1)))
    lensflare.addElement(new LensflareElement(textureFlare3, 60, 0.1, new THREE.Color(1, 0.5, 1)))
    lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.2, new THREE.Color(1, 1, 0.5)))
    lensflare.addElement(new LensflareElement(textureFlare3, 120, 0.5, new THREE.Color(0.5, 1, 1)))
    lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.8, new THREE.Color(1, 1, 1)))
    pointLight.add(lensflare)
    console.log("End createSun")
}

// create the light of lamp
function createLampLight() {
    console.log("Start createLampLight")
    var lensflare2 = new Lensflare()
    lensflare2.addElement(new LensflareElement(textureFlare0, 200, 0, new THREE.Color(0.9, 0.9, 1)))
    lensflare2.addElement(new LensflareElement(textureFlare3, 30, 0.1, new THREE.Color(0.5, 0.5, 1)))
    lensflare2.addElement(new LensflareElement(textureFlare3, 40, 0.2, new THREE.Color(1, 0.5, 0.5)))
    lensflare2.addElement(new LensflareElement(textureFlare3, 70, 0.3, new THREE.Color(0.5, 1, 0.8)))
    lensflare2.addElement(new LensflareElement(textureFlare3, 50, 0.5, new THREE.Color(1, 1, 1)))
    spotLight.add(lensflare2)
    console.log("End createLampLight")
}

// --------------------------create ground--------------------------
function createGround() {
    // create stone floor
    console.log("Start create ground floor")
    var floor = textureloader.load('./assets/stone floor.png')
    floor.wrapS = THREE.RepeatWrapping;
    floor.wrapT = THREE.RepeatWrapping;
    floor.repeat.set(25, 25)
    var geometry = new THREE.PlaneGeometry(100, 100, 32)
    var material = new THREE.MeshStandardMaterial({ map: floor })
    var floorPlane = new THREE.Mesh(geometry, material)
    floorPlane.position.set(0, 0, -13)
    floorPlane.rotation.x = -Math.PI / 2
    floorPlane.rotation.z = 2.05
    floorPlane.receiveShadow = true
    scene.add(floorPlane)
    console.log("End create ground floor")

    // create grass (bottom)
    console.log("Start create grass")
    var grass = textureloader.load('./assets/rainbow_dn.png')
    var grassGeometry = new THREE.PlaneGeometry(500, 500)
    var grassMaterial = new THREE.MeshStandardMaterial({ map: grass })
    var glassPlane = new THREE.Mesh(grassGeometry, grassMaterial)
    glassPlane.position.set(0, -0.1, -13)
    glassPlane.rotation.x = Math.PI / 2
    glassPlane.rotation.y = Math.PI
    glassPlane.rotation.z = Math.PI / 2
    glassPlane.receiveShadow = true
    scene.add(glassPlane)
    console.log("End create grass")

    // create 3D world (top)
    console.log("Start create 3D world")
    var topSide = textureloader.load('./assets/rainbow_up.png')
    var topGeometry = new THREE.PlaneGeometry(500, 500)
    var topMaterial = new THREE.MeshStandardMaterial({ map: topSide })
    var topPlane = new THREE.Mesh(topGeometry, topMaterial)
    topPlane.position.set(0, 498, -13)
    topPlane.rotation.x = Math.PI / 2
    topPlane.rotation.z = Math.PI / 2
    topPlane.receiveShadow = true
    scene.add(topPlane)

    // create 3D world (left)
    var leftSide = textureloader.load('./assets/rainbow_lf.png')
    var leftGeometry = new THREE.PlaneGeometry(500, 500)
    var leftMaterial = new THREE.MeshStandardMaterial({ map: leftSide })
    var leftPlane = new THREE.Mesh(leftGeometry, leftMaterial)
    leftPlane.position.set(-249, 250, -13)
    leftPlane.rotation.x = -Math.PI / 2
    leftPlane.rotation.y = Math.PI / 2
    leftPlane.rotation.z = Math.PI / 2
    leftPlane.receiveShadow = true
    scene.add(leftPlane)

    // create 3D world (right)
    var rightSide = textureloader.load('./assets/rainbow_rt.png')
    var rightGeometry = new THREE.PlaneGeometry(500, 500)
    var rightMaterial = new THREE.MeshStandardMaterial({ map: rightSide })
    var rightPlane = new THREE.Mesh(rightGeometry, rightMaterial)
    rightPlane.position.set(249, 250, -13)
    rightPlane.rotation.x = Math.PI / 2
    rightPlane.rotation.y = -Math.PI / 2
    rightPlane.rotation.z = Math.PI / 2
    rightPlane.receiveShadow = true
    scene.add(rightPlane)

    // create 3D world (front)
    var frontSide = textureloader.load('./assets/rainbow_ft.png')
    var frontGeometry = new THREE.PlaneGeometry(500, 500)
    var frontMaterial = new THREE.MeshStandardMaterial({ map: frontSide })
    var frontPlane = new THREE.Mesh(frontGeometry, frontMaterial)
    frontPlane.position.set(0, 250, 236)
    frontPlane.rotation.x = Math.PI
    frontPlane.rotation.z = Math.PI
    frontPlane.receiveShadow = true
    scene.add(frontPlane)

    // create 3D world (back)
    var bgSide = textureloader.load('./assets/rainbow_bk.png')
    var bgGeometry = new THREE.PlaneGeometry(500, 500)
    var bgMaterial = new THREE.MeshStandardMaterial({ map: bgSide })
    var bgPlane = new THREE.Mesh(bgGeometry, bgMaterial)
    bgPlane.position.set(0, 250, -262)
    bgPlane.rotation.x = -Math.PI
    bgPlane.rotation.y = -Math.PI
    bgPlane.rotation.z = Math.PI
    bgPlane.receiveShadow = true
    scene.add(bgPlane)
    console.log("End create 3D world")
}

// --------------------------load the UCC Quad--------------------------
function createQuad() {
    console.log("Start createQuad")
    var loader = new ColladaLoader()
    loader.load('./assets/UCC_Quad_Model_DAE/quad.dae', function (object) {
        object.scene.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
        })
        scene.add(object.scene)
    })
    console.log("End createQuad")
}

// --------------------------create carpet--------------------------
function createCarpet() {
    console.log("Start createCarpet")
    var carpet = textureloader.load('./assets/carpet.jpeg')
    carpet.wrapS = THREE.RepeatWrapping
    carpet.wrapT = THREE.RepeatWrapping
    carpet.repeat.set(25, 25)
    var geometry = new THREE.PlaneGeometry(30, 30, 5)
    var material = new THREE.MeshStandardMaterial({ map: carpet })
    var carpetPlane = new THREE.Mesh(geometry, material)
    carpetPlane.position.set(15, 0.1, 5)
    carpetPlane.rotation.x = -Math.PI / 2
    carpetPlane.rotation.z = 2.05
    carpetPlane.receiveShadow = true
    scene.add(carpetPlane)
    console.log("End createCarpet")
}

// --------------------------load the characters--------------------------
function createCharacters() {
    console.log("Start createCharacters")
    var loader = new FBXLoader()

    // hip pop girl
    loader.load('./assets/Brooklyn Uprock.fbx', function (object) {
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
        })
        object.scale.set(0.03, 0.03, 0.03)
        object.position.set(25, 0, 0)
        object.rotation.y = 1.5
        mixer1 = new THREE.AnimationMixer(object)
        var animationAction1 = mixer1.clipAction(object.animations[0])
        animationAction1.play()
        scene.add(object)
    })
    console.log("Hip pop girl finished!")

    // breakdance girl
    loader.load('./assets/Breakdance Freeze Var 3.fbx', function (object) {
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
        })
        object.scale.set(0.03, 0.03, 0.03)
        object.position.set(8, 0, 5)
        object.rotation.y = 1.5
        mixer2 = new THREE.AnimationMixer(object)
        var animationAction2 = mixer2.clipAction(object.animations[0])
        animationAction2.play()
        scene.add(object)
    })
    console.log("Breakdance girl finished!")

    // dancing boy
    loader.load('./assets/Flair.fbx', function (object) {
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
        })
        object.scale.set(0.03, 0.03, 0.03)
        object.position.set(18, 0, 10)
        object.rotation.y = 1.5
        mixer3 = new THREE.AnimationMixer(object)
        var animationAction3 = mixer3.clipAction(object.animations[0])
        animationAction3.play()
        scene.add(object)
    })
    console.log("Dancing boy finished!")

    // clapping girl
    loader.load('./assets/Clapping.fbx', function (object) {
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
        })
        object.scale.set(0.04, 0.04, 0.04)
        object.position.set(-5, 0, 20)
        object.rotation.y = 90
        mixer4 = new THREE.AnimationMixer(object)
        var animationAction4 = mixer4.clipAction(object.animations[0])
        animationAction4.play()
        scene.add(object)
    })
    console.log("Clapping girl finished!")
}

// --------------------------load the tree--------------------------
function createTree() {
    console.log("Start createTree")
    var loader = new FBXLoader()
    loader.load('./assets/Tree/Tree.fbx', function (object) {
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
        })
        object.scale.set(5, 5, 5)
        object.position.set(-15, 0, 45)
        object.rotation.y = 1
        scene.add(object)
    })
    console.log("End createTree")
}

// --------------------------load the lamp--------------------------
function createLamp() {
    console.log("Start createLamp")
    var loader = new FBXLoader()
    loader.load('./assets/StageLight-11-FBX/StageLight_11_fbx.FBX', function (object) {
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
        })
        object.scale.set(0.3, 0.3, 0.3)
        object.position.set(-18, 1, -10)
        object.rotation.z = -50
        scene.add(object)
    })
    console.log("End createLamp")
}

// define a variable named "uniforms" for the shader
var uniforms = {
    time: {
        value: 1.0
    }
}

// --------------------------create ring--------------------------
function createRing() {
    console.log("Start createRing")
    var geometry = new THREE.TorusGeometry(2, 0.5, 8, 100)
    var material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: document.getElementById('vertexShader1').textContent,
        fragmentShader: document.getElementById('fragmentShader1').textContent
    })
    var mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true
    mesh.rotation.x = 0.9
    mesh.rotation.y = 0.45
    mesh.position.set(-18, 23, -23)
    scene.add(mesh)
    console.log("End createRing")
}

// --------------------------add text--------------------------
function createText() {
    console.log("Start createText")
    var loader = new THREE.FontLoader()
    loader.load('./libs/helvetiker_regular.typeface.json', function (font) {
        var geometry = new THREE.TextGeometry('A Day in University College Cork', {
            font: font,
            size: 3.5,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
		    bevelThickness: 3,
		    bevelSize: 3,
		    bevelOffset: 0,
        })
        var material = new THREE.ShaderMaterial({
            uniforms,
            vertexShader: document.getElementById('vertexShader2').textContent,
            fragmentShader: document.getElementById('fragmentShader2').textContent
        })
        var text = new THREE.Mesh(geometry, material)
        text.rotation.y = 0.45
        text.position.set(-35, 30, -15)
        text.castShadow = true
        scene.add(text)
    })
    console.log("End createText")
}

// --------------------------create colorful lighting--------------------------
function createColorLights() {
    console.log("Start createColorLights")
    var geometry = new THREE.CylinderGeometry(1, 2, 3, 32)
    var material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: document.getElementById('vertexShader3').textContent,
        fragmentShader: document.getElementById('fragmentShader3').textContent
    })
    var mesh1 = new THREE.Mesh(geometry, material)
    mesh1.rotation.y = 2
    var mesh2 = mesh1.clone()
    var mesh3 = mesh1.clone()
    var mesh4 = mesh1.clone()
    var mesh5 = mesh1.clone()
    mesh1.position.set(-10, 1, 45)
    mesh2.position.set(5, 1, 37.5)
    mesh3.position.set(20, 1, 30)
    mesh4.position.set(35, 1, 22)
    mesh5.position.set(50, 1, 14.5)
    scene.add(mesh1)
    scene.add(mesh2)
    scene.add(mesh3)
    scene.add(mesh4)
    scene.add(mesh5)
    console.log("End createColorLights")
}

// --------------------------create billboard--------------------------
function createBillboard() {
    console.log("Start createBillboard")
    var video = document.getElementById('video')
    video.onended = function () {
        video.play()
    }

    // create the display
    var texture = new THREE.VideoTexture(video)
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.format = THREE.RGBFormat
    var geometry = new THREE.PlaneGeometry(16 * 1.7, 9 * 1.7, 32)
    var material = new THREE.MeshBasicMaterial({ map: texture })
    var plane = new THREE.Mesh(geometry, material)
    plane.castShadow = true
    plane.rotation.y = -0.3
    plane.position.set(21, 10.2, -22)
    scene.add(plane)

    // create the back of video plane
    var geometry1 = new THREE.BoxGeometry(16 * 1.8, 9 * 1.8, 1, 32)
    var material1 = new THREE.MeshStandardMaterial({ color: 0x666666 })
    var box1 = new THREE.Mesh(geometry1, material1)
    box1.rotation.y = -0.3
    box1.position.set(21.1, 10.2, -22.6)
    scene.add(box1)

    // create the bottom of video plane
    var geometry2 = new THREE.BoxGeometry(16 * 1.9, 2 * 1.9, 4, 32)
    var material2 = new THREE.MeshStandardMaterial({ color: 0x666666 })
    var box2 = new THREE.Mesh(geometry2, material2)
    box2.rotation.y = -0.3
    box2.position.set(20.9, 1, -22.4)
    scene.add(box2)
    console.log("End createBillboard")
}

// --------------------------create GUI--------------------------
var sunPosition = {
    pi: 90
}

function createGUI() {
    console.log("Start createGUI")
    var gui = new GUI()

    // create the control of video
    var playVideo = {
        play: function () {
            document.getElementById("video").play()
        }
    }

    var stopVideo = {
        pause: function () {
            document.getElementById("video").pause()
        }
    }

    var videoFolder = gui.addFolder("Video")
    videoFolder.add(playVideo, 'play')
    videoFolder.add(stopVideo, 'pause')
    videoFolder.close()

    // create the control of music
    var playSound = {
        play: function () {
            if (!posSound.isPlaying) {
                posSound.play()
            }
        }
    }

    var stopSound = {
        stop: function () {
            if (posSound.isPlaying) {
                posSound.stop()
            }
        }
    }

    var audioFolder = gui.addFolder("Music")
    audioFolder.add(playSound, 'play')
    audioFolder.add(stopSound, 'stop')
    audioFolder.close()

    // create the control of sun position
    var sunFolder = gui.addFolder("Sun Position")
    sunFolder.add(sunPosition, "pi", 5, 175, 1).name("Position")
    sunFolder.close()

    // create the control of spot light
    const params = {
        'light color': spotLight.color.getHex(),
        intensity: spotLight.intensity,
        distance: spotLight.distance,
        angle: spotLight.angle,
        penumbra: spotLight.penumbra,
        decay: spotLight.decay,
        focus: spotLight.shadow.focus
    }

    gui.addColor( params, 'light color' ).onChange( function ( val ) {
        spotLight.color.setHex( val )
        render()
    } )

    gui.add( params, 'intensity', 0, 5 ).onChange( function ( val ) {
        spotLight.intensity = val
        render()
    } )

    gui.add( params, 'distance', 50, 500 ).onChange( function ( val ) {
        spotLight.distance = val
        render()
    } )

    gui.add( params, 'angle', 0, Math.PI / 3 ).onChange( function ( val ) {
        spotLight.angle = val
        render();
    } )

    gui.add( params, 'penumbra', 0, 1 ).onChange( function ( val ) {
        spotLight.penumbra = val
        render()
    } )

    gui.add( params, 'decay', 1, 2 ).onChange( function ( val ) {
        spotLight.decay = val
        render()
    } )

    gui.add( params, 'focus', 0, 1 ).onChange( function ( val ) {
        spotLight.shadow.focus = val
        render()
    } )

    // create the control of flag
    var armFolder = gui.addFolder("Rotate Flag")
    armFolder.add({
        left: function () {
            armMovement = -1
        }
    }, 'left')
    armFolder.add({
        right: function () {
            armMovement = 1
        }
    }, 'right')
    armFolder.add({
        stop: function () {
            armMovement = 0
        }
    }, 'stop')
    armFolder.close()

    console.log("End createGUI")
}

// --------------------------create basic physics--------------------------
// define some physics variables 
const gravityConstant = -9.8
var physicsWorld, transformAux1, cloth, hinge
var armMovement = 0
const rigidBodies = []
const margin = 0.05

// physics configuration
function initPhysics() {
    const collisionConfiguration = new Ammo.btSoftBodyRigidBodyCollisionConfiguration()
    const dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration)
    const broadphase = new Ammo.btDbvtBroadphase()
    const solver = new Ammo.btSequentialImpulseConstraintSolver()
    const softBodySolver = new Ammo.btDefaultSoftBodySolver()
    physicsWorld = new Ammo.btSoftRigidDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration, softBodySolver)
    physicsWorld.setGravity(new Ammo.btVector3(0, gravityConstant, 0))
    physicsWorld.getWorldInfo().set_m_gravity(new Ammo.btVector3(0, gravityConstant, 0))
 
    transformAux1 = new Ammo.btTransform()
    createObjects()
}
 
// create physical objects
function createObjects() {
    const pos = new THREE.Vector3()
    const quat = new THREE.Quaternion()

    // flag
    const clothWidth = 10
    const clothHeight = 5
    const clothNumSegmentsZ = clothWidth * 5
    const clothNumSegmentsY = clothHeight * 5
    const clothPos = new THREE.Vector3(5, 12, 0)

    const clothGeometry = new THREE.PlaneGeometry(clothWidth, clothHeight, clothNumSegmentsZ, clothNumSegmentsY)

    const clothMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide })
    cloth = new THREE.Mesh(clothGeometry, clothMaterial)
    cloth.castShadow = true
    scene.add(cloth)
    textureloader.load("./assets/UCC.png", function (texture) {
        cloth.material.map = texture
        cloth.material.needsUpdate = true
    })

    // cloth physic object
    const softBodyHelpers = new Ammo.btSoftBodyHelpers()

    // four corners
    const clothCorner00 = new Ammo.btVector3(clothPos.x, clothPos.y + clothHeight, clothPos.z)
    const clothCorner01 = new Ammo.btVector3(clothPos.x, clothPos.y + clothHeight, clothPos.z - clothWidth)
    const clothCorner10 = new Ammo.btVector3(clothPos.x, clothPos.y, clothPos.z)
    const clothCorner11 = new Ammo.btVector3(clothPos.x, clothPos.y, clothPos.z - clothWidth)
    const clothSoftBody = softBodyHelpers.CreatePatch(physicsWorld.getWorldInfo(), clothCorner00, clothCorner01, clothCorner10, clothCorner11, clothNumSegmentsZ + 1, clothNumSegmentsY + 1, 0, true)
    const sbConfig = clothSoftBody.get_m_cfg()
    sbConfig.set_viterations(10)
    sbConfig.set_piterations(10)

    clothSoftBody.setTotalMass(0.9, false)
    Ammo.castObject(clothSoftBody, Ammo.btCollisionObject).getCollisionShape().setMargin(margin * 3)
    physicsWorld.addSoftBody(clothSoftBody, 1, -1)
    cloth.userData.physicsBody = clothSoftBody
    clothSoftBody.setActivationState(4)

    // the base
    const armMass = 2
    const armLength = 1 + clothWidth
    const pylonHeight = clothPos.y + clothHeight
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })
    pos.set(clothPos.x, 0.5 * pylonHeight, clothPos.z - armLength)
    const pylon = createParalellepiped(0.4, pylonHeight, 0.4, 0, pos, quat, baseMaterial)
    pylon.castShadow = true
    pylon.receiveShadow = true
    pos.set(clothPos.x, pylonHeight + 0.2, clothPos.z - 0.5 * armLength)
    const arm = createParalellepiped(0.4, 0.4, armLength + 0.4, armMass, pos, quat, baseMaterial)
    arm.castShadow = true
    arm.receiveShadow = true

    // glue the cloth to the arm
    const influence = 0.5
    clothSoftBody.appendAnchor(0, arm.userData.physicsBody, false, influence)
    clothSoftBody.appendAnchor(clothNumSegmentsZ, arm.userData.physicsBody, false, influence)

    // hinge constraint to move the arm
    const pivotA = new Ammo.btVector3(0, pylonHeight * 0.5, 0)
    const pivotB = new Ammo.btVector3(0, -0.2, -armLength * 0.5)
    const axis = new Ammo.btVector3(0, 1, 0)
    hinge = new Ammo.btHingeConstraint(pylon.userData.physicsBody, arm.userData.physicsBody, pivotA, pivotB, axis, axis, true)
    physicsWorld.addConstraint(hinge, true)
}

// create a flagpole
function createParalellepiped(sx, sy, sz, mass, pos, quat, material) {
    const threeObject = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz, 1, 1, 1), material)
    const shape = new Ammo.btBoxShape(new Ammo.btVector3(sx * 0.5, sy * 0.5, sz * 0.5))
    shape.setMargin(margin)
    createRigidBody(threeObject, shape, mass, pos, quat)
    return threeObject
}

// create rigid
function createRigidBody(threeObject, physicsShape, mass, pos, quat) {
    threeObject.position.copy(pos)
    threeObject.quaternion.copy(quat)

    const transform = new Ammo.btTransform()
    transform.setIdentity()
    transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z))
    transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w))
    const motionState = new Ammo.btDefaultMotionState(transform)

    const localInertia = new Ammo.btVector3(0, 0, 0)
    physicsShape.calculateLocalInertia(mass, localInertia)

    const rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, physicsShape, localInertia)
    const body = new Ammo.btRigidBody(rbInfo)

    threeObject.userData.physicsBody = body

    scene.add(threeObject)

    if (mass > 0) {
        rigidBodies.push(threeObject)
        body.setActivationState(4)
    }
    physicsWorld.addRigidBody(body)
}

// physics animation
function updatePhysics(deltaTime) {

    // hinge control
    hinge.enableAngularMotor(true, 0.8 * armMovement, 50)

    // step world
    physicsWorld.stepSimulation(deltaTime, 10)

    // update cloth
    const softBody = cloth.userData.physicsBody
    const clothPositions = cloth.geometry.attributes.position.array
    const numVerts = clothPositions.length / 3
    const nodes = softBody.get_m_nodes()
    let indexFloat = 0

    for (let i = 0; i < numVerts; i++) {
        const node = nodes.at(i)
        const nodePos = node.get_m_x()
        clothPositions[indexFloat++] = nodePos.x()
        clothPositions[indexFloat++] = nodePos.y()
        clothPositions[indexFloat++] = nodePos.z()
    }

    cloth.geometry.computeVertexNormals();
    cloth.geometry.attributes.position.needsUpdate = true
    cloth.geometry.attributes.normal.needsUpdate = true

    // update rigid bodies
    for (let i = 0, il = rigidBodies.length; i < il; i++) {
        const objThree = rigidBodies[i]
        const objPhys = objThree.userData.physicsBody
        const ms = objPhys.getMotionState()
        if (ms) {
            ms.getWorldTransform(transformAux1)
            const p = transformAux1.getOrigin()
            const q = transformAux1.getRotation()
            objThree.position.set(p.x(), p.y(), p.z())
            objThree.quaternion.set(q.x(), q.y(), q.z(), q.w())
        }
    }
}

// --------------------------to render all of things--------------------------
var clock = new THREE.Clock()

function render() {
    pointLight.position.set(90 * Math.cos(sunPosition.pi / 180 * Math.PI), 90 * Math.sin(sunPosition.pi / 180 * Math.PI), 25)
    var r = pointLight.color.r * Math.sin(sunPosition.pi / 180 * Math.PI)
    var g = pointLight.color.g * Math.sin(sunPosition.pi / 180 * Math.PI)
    var b = pointLight.color.b * Math.sin(sunPosition.pi / 180 * Math.PI)
    uniforms1.topColor.value.copy(new THREE.Color(r, g, b))
    cameraControl.update()
    requestAnimationFrame(render)
    var delta = clock.getDelta()
    updatePhysics(delta)
    if (mixer1) {
        mixer1.update(delta)
    }
    if (mixer2) {
        mixer2.update(delta)
    }
    if (mixer3) {
        mixer3.update(delta)
    }
    if (mixer4) {
        mixer4.update(delta)
    }
    uniforms.time.value += delta * 5
    stats.begin()
    renderer.render(scene, camera)
    stats.end()
}

// --------------------------to call all functions and show everthing--------------------------
function init() {
    scene = new THREE.Scene()
    createStats()
    createPositionSound()
    createRenderer()
    createCamera()
    createLights()
    createSky()
    createGround()
    createQuad()
    createCarpet()
    createCharacters()
    createTree()
    createLamp()
    createRing()
    createText()
    createColorLights()
    createBillboard()
    createGUI()
    initPhysics()
    window.addEventListener( 'resize', onWindowResize );
    render()
}

Ammo().then(function (AmmoLib) {

    Ammo = AmmoLib

    init()

})