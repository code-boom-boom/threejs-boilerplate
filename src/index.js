import * as THREE from 'three'
import '../style.css'
import colors from './color.js'
import { OrbitControls } from 'three/addons'

let scene, camera, renderer, fieldOfView, aspectRatio, near, far

let WIDTH, HEIGHT

let light

let object

let controls

const container = document.querySelector('.world')

const createScene = () => {
  WIDTH = window.innerWidth
  HEIGHT = window.innerHeight

  scene = new THREE.Scene()

  aspectRatio = WIDTH / HEIGHT
  fieldOfView = 60
  near = 1
  far = 100
  camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far)
  camera.position.set(0, 0, 10)

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

  renderer.setSize(WIDTH, HEIGHT)
  renderer.shadowMap.enabled = true

  container.appendChild(renderer.domElement)

  window.addEventListener('resize', handleWindowResize, false)
}

const handleWindowResize = () => {
  WIDTH = window.innerWidth
  HEIGHT = window.innerHeight
  renderer.setSize(WIDTH, HEIGHT)
  camera.aspect = WIDTH / HEIGHT
  camera.updateProjectionMatrix()
}

const createLight = () => {
  light = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9)

  scene.add(light)
}

const createControls = () => {
  controls = new OrbitControls(camera, renderer.domElement)
}

const createObject = () => {
  const geom = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({
    color: colors.red,
  })

  object = new THREE.Mesh(geom, material)

  scene.add(object)
}

const loop = () => {
  renderer.render(scene, camera)

  controls.update()

  requestAnimationFrame(loop)
}

const init = () => {
  createScene()
  createLight()
  createControls()
  createObject()
  loop()
}

init()
