import React, { useEffect } from 'react';
import './Spline3D.css';

function Spline3D() {
  useEffect(() => {
    // Load the Spline viewer script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.10.99/build/spline-viewer.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script if needed
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="spline-container">
      <spline-viewer url="https://prod.spline.design/8QpWcZeUq1Kvrl/scene.splinecode"></spline-viewer>
    </div>
  );
}

export default Spline3D;
