import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );

// Materials

const material = new THREE.MeshBasicMaterial()
material.color = new THREE.Color(0xff0000)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

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
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

var
    group;

init();
render();

function init() {

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.z = 5;

  geometry = new THREE.BoxGeometry( 1, 1, 1 );

  var leaveDarkMaterial = new THREE.MeshLambertMaterial( { color: 0x91E56E } );
  var leaveLightMaterial = new THREE.MeshLambertMaterial( { color: 0xA2FF7A } );
  var leaveDarkDarkMaterial = new THREE.MeshLambertMaterial( { color: 0x71B356 } );
  var stemMaterial = new THREE.MeshLambertMaterial( { color: 0x7D5A4F } );

  var light = new THREE.DirectionalLight( 0xEEFFD3, 1 );
  light.position.set( 0, 0, 1 );
  scene.add( light );

  var light = new THREE.DirectionalLight( 0xFF0000, 0.4 );
  light.position.set( 1, 0, 0 );
  scene.add( light );

  var light = new THREE.DirectionalLight( 0xFFFFFF, 0.2 );
  light.position.set( 0, 1, 0 );
  scene.add( light );

  var stem = new THREE.Mesh( geometry, stemMaterial );
  stem.position.set( 0, 0, 0 );
  stem.scale.set( 0.3, 1.5, 0.3 );

  var squareLeave01 = new THREE.Mesh( geometry, leaveDarkMaterial );
  squareLeave01.position.set( 0.5, 1.6, 0.5 );
  squareLeave01.scale.set( 0.8, 0.8, 0.8 );

  var squareLeave02 = new THREE.Mesh( geometry, leaveDarkMaterial );
  squareLeave02.position.set( -0.4, 1.3, -0.4 );
  squareLeave02.scale.set( 0.7, 0.7, 0.7 );

  var squareLeave03 = new THREE.Mesh( geometry, leaveDarkMaterial );
  squareLeave03.position.set( 0.4, 1.7, -0.5 );
  squareLeave03.scale.set( 0.7, 0.7, 0.7 );

  var leaveDark = new THREE.Mesh( geometry, leaveDarkMaterial );
  leaveDark.position.set( 0, 1.2, 0 );
  leaveDark.scale.set( 1, 2, 1 );

  var leaveLight = new THREE.Mesh( geometry, leaveLightMaterial );
  leaveLight.position.set( 0, 1.2, 0 );
  leaveLight.scale.set( 1.1, 0.5, 1.1 );

  var ground = new THREE.Mesh( geometry, leaveDarkDarkMaterial );
  ground.position.set( 0, -1, 0 );
  ground.scale.set( 2.4, 0.8, 2.4 );

  tree = new THREE.Group();
  tree.add( leaveDark );
  tree.add( leaveLight );
  tree.add( squareLeave01 );
  tree.add( squareLeave02 );
  tree.add( squareLeave03 );
  tree.add( ground );
  tree.add( stem );

  tree.rotation.y = 1;
  tree.rotation.x = 0.5;


  scene.add( tree );

  renderer =  new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  document.body.appendChild( renderer.domElement );

}

function render() {

  requestAnimationFrame( render );

  tree.rotation.y += 0.007;

  renderer.render( scene, camera );

}