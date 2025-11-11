import { useEffect, useState, useRef } from 'react';

export default function Spline3DSection() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const loadSplineScript = () => {
      if (!document.querySelector('#spline-viewer-script')) {
        const script = document.createElement('script');
        script.id = 'spline-viewer-script';
        script.type = 'module';
        script.src = 'https://unpkg.com/@splinetool/viewer/build/spline-viewer.js';
        script.onload = () => {
          setScriptLoaded(true);
        };
        script.onerror = () => {
          console.error('Failed to load Spline viewer script');
        };
        document.body.appendChild(script);
      } else {
        setScriptLoaded(true);
      }
    };

    loadSplineScript();
  }, []);

  useEffect(() => {
    if (scriptLoaded && containerRef.current) {
      const viewer = document.createElement('spline-viewer');
      viewer.setAttribute('url', 'https://prod.spline.design/8QpWcZeBUq1Kvri4/scene.splinecode');
      viewer.style.width = '100%';
      viewer.style.height = '100%';
      viewer.style.position = 'absolute';
      viewer.style.top = '0';
      viewer.style.left = '0';
      viewer.style.zIndex = '0';
      
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(viewer);
    }
  }, [scriptLoaded]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '600px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {!scriptLoaded && <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', width: '100%', height: '100%' }} />}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        textAlign: 'center',
        color: '#fff',
        pointerEvents: 'none',
        maxWidth: '90%'
      }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 'bold',
          margin: '0',
          lineHeight: '1.2',
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)',
          letterSpacing: '-0.5px'
        }}>
          Innovating Your Future with Cloud Solutions
        </h2>
      </div>
    </div>
  );
}
