    // 1. setup
    const canvas = document.getElementById('scene');
    const themeBtn = document.querySelector('#theme-toggle');

    // 2. inisialisasi scene & animasi 3d three.js
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0d, 0.085);

    const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 9;

    const group = new THREE.Group();
    scene.add(group);

    const wireA = new THREE.MeshBasicMaterial({
      color: 0x15677,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });

    const wireB = new THREE.MeshBasicMaterial({
      color: 0x595959,
      wireframe: true,
      transparent: true,
      opacity: 0.72
    });

    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.8, 1), wireA);
    group.add(core);

    const ring = new THREE.Mesh(new THREE.TorusKnotGeometry(1.15, 0.24, 160, 20), wireB);
    ring.rotation.x = 1.2;
    group.add(ring);

    const particles = new THREE.BufferGeometry();
    const count = 1100;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 18;
      positions[i + 1] = (Math.random() - 0.5) * 12;
      positions[i + 2] = (Math.random() - 0.5) * 18;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x1e1e1f,
      size: 0.05,
      transparent: true,
      opacity: 0.8
    });

    const stars = new THREE.Points(particles, particleMaterial);
    scene.add(stars);

    function animate() {
      requestAnimationFrame(animate);

      core.rotation.x += 0.003;
      core.rotation.y += 0.005;
      ring.rotation.x -= 0.004;
      ring.rotation.y += 0.006;
      group.rotation.z += 0.0007;
      stars.rotation.y += 0.0008;
      stars.rotation.x += 0.0005;

      renderer.render(scene, camera);
    }

    animate();

    // 3. event handler untuk interaktivitas dinamis
    function toggleTheme() {
      const isDark = document.body.classList.toggle('dark-mode');
      themeBtn.textContent = isDark ? 'Light Mode' : 'Dark Mode';
      particleMaterial.color.setHex(isDark ? 0xf5f5f2 : 0x1e1e1f);
    }

    // 4. event listeners
    themeBtn.addEventListener('click', toggleTheme);

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });