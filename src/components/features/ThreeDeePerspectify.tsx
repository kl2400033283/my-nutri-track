'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

type ThreeDeePerspectifyProps = {
  lookAway: boolean;
};

export function ThreeDeePerspectify({ lookAway }: ThreeDeePerspectifyProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mountRef.current) return;

    const currentMount = mountRef.current;
    let renderer: THREE.WebGLRenderer;

    const init = () => {
      // Scene
      const scene = new THREE.Scene();

      // Camera
      const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
      camera.position.z = 2.5;

      // Renderer
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      currentMount.appendChild(renderer.domElement);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambientLight);
      const pointLight = new THREE.PointLight(0xBF00FF, 0.8, 100);
      pointLight.position.set(2, 3, 4);
      scene.add(pointLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(-2, -1, 3);
      scene.add(directionalLight);

      // 3D Object (Head and Eyes)
      const headGeometry = new THREE.IcosahedronGeometry(1, 2);
      const headMaterial = new THREE.MeshStandardMaterial({
        color: 0x4B0082,
        metalness: 0.1,
        roughness: 0.4,
      });
      const head = new THREE.Mesh(headGeometry, headMaterial);
      scene.add(head);

      const eyeSocketGeometry = new THREE.SphereGeometry(0.3, 16, 16);
      const eyeSocketMaterial = new THREE.MeshBasicMaterial({ color: 0x300052 });
      
      const eyeGeometry = new THREE.SphereGeometry(0.25, 32, 32);
      const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0xf0f0f0, roughness: 0.1 });

      const pupilGeometry = new THREE.SphereGeometry(0.1, 32, 32);
      const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x050505 });
      
      const createEye = () => {
        const eyeGroup = new THREE.Group();
        
        const eyeSocket = new THREE.Mesh(eyeSocketGeometry, eyeSocketMaterial);
        eyeGroup.add(eyeSocket);
        
        const eye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        eyeSocket.add(eye);
        
        const pupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
        pupil.position.z = 0.22;
        eye.add(pupil);

        return { eyeGroup, pupil };
      }

      const { eyeGroup: leftEyeGroup, pupil: leftPupil } = createEye();
      leftEyeGroup.position.set(-0.4, 0.1, 0.75);
      head.add(leftEyeGroup);
      
      const { eyeGroup: rightEyeGroup, pupil: rightPupil } = createEye();
      rightEyeGroup.position.set(0.4, 0.1, 0.75);
      head.add(rightEyeGroup);


      // Mouse tracking
      const mousePosition = new THREE.Vector2();
      const handleMouseMove = (event: MouseEvent) => {
        mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
        mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener('mousemove', handleMouseMove);

      // Animation loop
      const clock = new THREE.Clock();

      const animate = () => {
        if(!renderer) return;
        requestAnimationFrame(animate);

        const targetEuler = new THREE.Euler(
          lookAway ? Math.PI / 2 : mousePosition.y * 0.3,
          lookAway ? head.rotation.y + 0.01 : mousePosition.x * 0.3,
          0,
          'YXZ'
        );
        const targetQuaternion = new THREE.Quaternion().setFromEuler(targetEuler);

        head.quaternion.slerp(targetQuaternion, 0.08);
        
        const eyeTarget = new THREE.Vector3(mousePosition.x * 2, mousePosition.y * 2, 1);
        leftPupil.lookAt(eyeTarget);
        rightPupil.lookAt(eyeTarget);

        const elapsedTime = clock.getElapsedTime();
        head.position.y = Math.sin(elapsedTime * 1.5) * 0.05;

        renderer.render(scene, camera);
      };
      animate();

      // Handle resize
      const handleResize = () => {
        if (!renderer) return;
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      };
      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        if (renderer.domElement.parentNode === currentMount) {
          currentMount.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    }
    
    const cleanup = init();

    return cleanup;
  }, [lookAway]);

  return <div ref={mountRef} className="h-64 w-full" />;
}
