import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Globe: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 2.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    
    const container = mountRef.current;
    const updateSize = () => {
      const size = Math.min(container.clientWidth, container.clientHeight);
      renderer.setSize(size, size);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };
    
    updateSize();
    container.appendChild(renderer.domElement);

    // Globe Geometry - Latitude and Longitude lines
    // We use a SphereGeometry and WireframeGeometry to get the grid
    const radius = 1;
    const widthSegments = 24; // Longitude lines
    const heightSegments = 12; // Latitude lines
    
    const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    const wireframe = new THREE.WireframeGeometry(geometry);
    
    const material = new THREE.LineBasicMaterial({
      color: 0x00ffcc,
      transparent: true,
      opacity: 0.6,
      linewidth: 1
    });
    
    const globe = new THREE.LineSegments(wireframe, material);
    scene.add(globe);

    // Add a subtle inner sphere for depth
    const innerGeometry = new THREE.SphereGeometry(radius * 0.98, widthSegments, heightSegments);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0x002233,
      transparent: true,
      opacity: 0.2,
    });
    const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(innerSphere);

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Smooth rotation
      globe.rotation.y += 0.005;
      innerSphere.rotation.y += 0.005;
      
      // Slight tilt
      globe.rotation.x = 0.2;
      innerSphere.rotation.x = 0.2;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      wireframe.dispose();
      material.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full flex items-center justify-center overflow-hidden"
      id="globe-container"
    />
  );
};

export default Globe;
