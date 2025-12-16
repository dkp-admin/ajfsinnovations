import { useEffect, useState, useRef } from 'react';

export default function Spline3DSection() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const textOverlayRef = useRef(null);

  useEffect(() => {
    const loadSplineScript = () => {
      if (!document.querySelector('#spline-viewer-script')) {
        const script = document.createElement('script');
        script.id = 'spline-viewer-script';
        script.type = 'module';
        script.src = 'https://unpkg.com/@splinetool/viewer@1.10.99/build/spline-viewer.js';
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
    if (scriptLoaded && containerRef.current && !viewerRef.current) {
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
      viewerRef.current = viewer;

      if (textOverlayRef.current) {
        containerRef.current.appendChild(textOverlayRef.current);
      }
    }
  }, [scriptLoaded]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '500px',
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'hidden'
      }}
    >
      {!scriptLoaded && <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', width: '100%', height: '100%' }} />}
    </div>
  );
}
