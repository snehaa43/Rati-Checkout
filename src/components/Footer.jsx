import React from 'react';

export default function Footer({ compact = false }) {
  return (
    <footer
      className="checkout-footer"
      role="contentinfo"
      style={compact ? { padding: '12px 16px 16px', marginTop: 'auto' } : undefined}
    >
      <span>Powered by Rati Logistics</span>
    </footer>
  );
}
