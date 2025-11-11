import { useEffect } from 'react';

export default function Spline3DSection() {
  useEffect(() => {
    if (!document.querySelector('#spline-viewer-script')) {
      const script = document.createElement('script');
      script.id = 'spline-viewer-script';
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.11.3/build/spline-viewer.js';
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
      <spline-viewer
        url="https://prod.spline.design/8QpWcZeBUq1Kvri4/scene.splinecode"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      ></spline-viewer>
    </div>
  );
}
