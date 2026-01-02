import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const SIDEBAR_EXPANDED = 280; // must match Sidebar expanded width

  const [isMobile, setIsMobile] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(64);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Measure the actual header element height at runtime so the main
  // content is always offset correctly (prevents overlap when header
  // size changes or when styles differ between pages).
  useEffect(() => {
    function measure() {
      const el = document.querySelector('header');
      const h = el ? el.offsetHeight : 64;
      setHeaderHeight(h);
    }

    // measure on mount and when resizing
    measure();
    window.addEventListener('resize', measure);
    // also observe DOM changes in case header changes size dynamically
    const obs = new MutationObserver(measure);
    if (document.body) obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('resize', measure);
      obs.disconnect();
    };
  }, []);

  const mainStyle = {
    marginLeft: isMobile ? 0 : SIDEBAR_EXPANDED,
    marginTop: headerHeight,
    padding: '18px 36px 96px',
    backgroundColor: '#f7fbff',
    boxSizing: 'border-box',
    minHeight: `calc(100vh - ${headerHeight}px)`
  };

  return (
    <div style={{ minHeight: '100vh', display: 'block' }}>
      <Sidebar />

      <main style={mainStyle}>
        {children}
      </main>
    </div>
  );
};

export default Layout;