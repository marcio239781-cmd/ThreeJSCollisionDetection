import * as THREE from "three";

// Cena
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Render
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Player
const player = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
scene.add(player);

// Target
const target = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
target.position.set(2, 2, 0);
scene.add(target);

// Movimento
let speed = 0.07;
let move = { up: false, down: false, left: false, right: false };

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") move.up = true;
    if (e.key === "ArrowDown") move.down = true;
    if (e.key === "ArrowLeft") move.left = true;
    if (e.key === "ArrowRight") move.right = true;
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowUp") move.up = false;
    if (e.key === "ArrowDown") move.down = false;
    if (e.key === "ArrowLeft") move.left = false;
    if (e.key === "ArrowRight") move.right = false;
});

// Colisão
function checkCollision() {
    const pBox = new THREE.Box3().setFromObject(player);
    const tBox = new THREE.Box3().setFromObject(target);
    return pBox.intersectsBox(tBox);
}

// Mensagem
const messageBox = document.getElementById("messageBox");

// Loop
let collided = false;

function animate() {
    requestAnimationFrame(animate);

    if (!collided) {
        if (move.up) player.position.y += speed;
        if (move.down) player.position.y -= speed;
        if (move.left) player.position.x -= speed;
        if (move.right) player.position.x += speed;

        if (checkCollision()) {
            collided = true;
            target.material.color.set(0x0000ff);
            messageBox.style.display = "block";

            setTimeout(() => {
                window.location.href = "mindar.html";
            }, 1500);
        }
    }

    renderer.render(scene, camera);
}

animate();