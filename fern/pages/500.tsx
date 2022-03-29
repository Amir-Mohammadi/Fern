import FooterContainer from '@Containers/footer-container';
import React from 'react';

// pages/500.js
export default function Custom500() {
  return (
    <div style={{ flexDirection: 'column' }}>
      <h1
        style={{
          margin: 'auto',
          minHeight: '-webkit-fill-available',
        }}>
        500 - Server-side error{' '}
      </h1>
      <FooterContainer />
    </div>
  );
}
