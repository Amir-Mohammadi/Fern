import FooterContainer from '@Containers/footer-container';
import React from 'react';

// pages/404.js
export default function Custom404() {
  return (
    <div style={{ flexDirection: 'column' }}>
      <h1
        style={{
          margin: 'auto',
          minHeight: '-webkit-fill-available',
        }}>
        404 - Page Not Found
      </h1>
      <FooterContainer />
    </div>
  );
}
