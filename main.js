import * as THREE from "three";
import "./style.css";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import { gsap, CSSPlugin } from "gsap";
const scene = new THREE.Scene();
//Create sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({ color: "#00ff83", roughness:0.5 });
//Mix all
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//Light
const light = new THREE.PointLight(0xffffff, 10, 100);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
light.position.set(0, 10, 10);
light.intensity = 300;
scene.add(light);
// scene.add(ambientLight);
//Camera

const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 20;
scene.add(camera);

//Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(3);
renderer.render(scene, camera);
//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableZoom = false
controls.enablePan = false
controls.enableDamping = true
controls.autoRotate = true
controls.autoRotateSpeed = 5
//resize:
window.addEventListener("resize", () => {
  //Update sizes
  // console.log(window.innerWidth)
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  //update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

//Timeline 
const t1 = gsap.timeline({defaults: {duration: 1}});
t1.fromTo(mesh.scale,{x:0,y:0,z:0},{x:1,y:1,z:1})
t1.fromTo("nav", {y: "-100%"}, {y: "0%"})
t1.fromTo(".title",{opacity: 0},{opacity: 1})

//Mouse animation columnRuleColor: 
let mouseDown = false;
let rgb= []
window.addEventListener("mousedown", () => { mouseDown = true; });
window.addEventListener("mouseup", () => { mouseDown = false; });

window.addEventListener("mousemove", (e) => {
  if(mouseDown){
    rgb = [
      Math.round((e.pageX/sizes.width)*255),
      Math.round((e.pageY/sizes.width)*255),
      150
    ]
    //animate  
    let newColor = new THREE.Color(`rgb(${rgb.join(',')})`)
    gsap.to(mesh.material.color, {r:newColor.r, g:newColor.g, b:newColor.b, duration: 1})
  }
})