import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { Cylindrical, MeshLambertMaterial } from 'three'

// Loading
const textureLoader = new THREE.TextureLoader() 
const normalTexture = textureLoader.load( '/textures/NormalMap.png')

// Debug
//const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const bigRect = new THREE.CylinderGeometry( 0.125, 0.125, 2.5, 100 );


// Materials
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture;
material.color = new THREE.Color(0x0000FF)

// Mesh
const mainBranch = new THREE.Mesh(bigRect,material)
scene.add(mainBranch)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)
const pointLight2 = new THREE.PointLight(0xFF0000, 4)
pointLight2.position.set(1,1,1)
pointLight2.intensity = 1
scene.add(pointLight2)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
 const controls = new OrbitControls(camera, canvas)
 controls.enableDamping = true
 controls.enableZoom = false
 controls.maxPolarAngle = 2*Math.PI
 controls.minPolarAngle = 0
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animate
 */

const clock = new THREE.Clock()

function addChildren(parent, depth, parentLength, childAngle, thetaIn=0, currentDepth=0)
{
    const parentPos = parent.position
    const parentRot = parent.rotation

    //setting parameters for child branches
    const childRadius = 0.125/2;
    const childLength = parentLength/2;

    //define the iteration parameters
    var smallerRectangle = new THREE.CylinderGeometry( childRadius, childRadius, childLength, 10 );
    const stepTheta = 2*Math.PI/depth;
    var stepZ = parentLength/(depth+1);
    var theta = 0;
    var z = -parentLength/2;
    for(var i = 0; i<depth; i++)
    {
        var childBranch = new THREE.Mesh(smallerRectangle,material);
        childBranch.rotation.copy(parentRot);
        scene.add(childBranch)
        //change orientation and height of branch
        z += stepZ;
        if(currentDepth == 0){
            theta += stepTheta;
        }
         

        //translate center to desired position in space
        const translatePhi = new THREE.Vector3();
        const translateZ = new THREE.Vector3();

        translateZ.setFromSphericalCoords(z, currentDepth*childAngle, theta + thetaIn);
        translatePhi.setFromSphericalCoords( childLength/2, (1+currentDepth)*childAngle, theta + thetaIn);
        
        //apply translation
        translateZ.add(translatePhi)
        translateZ.add(parentPos)
        childBranch.position.copy(translateZ);
        

        //rotate to desired angle
        if(currentDepth == 0){
            childBranch.rotateY(theta);
        }
        childBranch.rotateX(childAngle);
        
        if(currentDepth + 1 < 2)
        {   
            addChildren(childBranch, depth,parentLength/2, childAngle, theta, currentDepth + 1);
        }
        
    }
}

const tick = () =>
{ 
    //const axesHelper = new THREE.AxesHelper( 5 );
    //scene.add( axesHelper );

    const elapsedTime = clock.getElapsedTime()

    //mainBranch.rotation.y += .5 (targetX - mainBranch.rotation.y)
    // Update objects
    mainBranch.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}


addChildren(mainBranch, 3, 2.5, Math.PI/3)
tick()
