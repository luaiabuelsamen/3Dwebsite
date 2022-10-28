import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

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
const bigRect = new THREE.CylinderGeometry( 0.125, 0.125, 3, 100 );


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
const pointLight2 = new THREE.PointLight(0xff0000, 4)
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

const addChildren = () =>
{
    const smallerRectangle = new THREE.CylinderGeometry( 0.025, 0.025, 1, 10 );
    const childBranch = new THREE.Mesh(smallerRectangle,material)
    childBranch.translateX(0.25)
    scene.add(childBranch) 
}

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    mainBranch.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera)
    addChildren()

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}


tick()
