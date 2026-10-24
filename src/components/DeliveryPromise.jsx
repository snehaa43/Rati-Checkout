'use client';

import React from 'react';
import { PINCODE_MAP, DEMO_CONFIG } from '@/constants/data';

export default function DeliveryPromise({ currentPincode, isPincodeServiceable }) {
  // Determine delivery date based on pincode
  const pincodeInfo = PINCODE_MAP[currentPincode];
  const deliveryDate = isPincodeServiceable && pincodeInfo
    ? pincodeInfo.deliveryDate
    : '2–4 business days';

  return (
    <section className="checkout-section" aria-labelledby="delivery-promise-title" id="section-delivery-promise">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-base)',
              backgroundColor: 'var(--color-sage-tint)',
              color: 'var(--color-primary-sage)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span id="delivery-promise-title" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {isPincodeServiceable ? `Estimated Delivery: ${deliveryDate}` : 'Delivery Unserviceable'}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  backgroundColor: 'var(--color-sage-tint)',
                  color: 'var(--color-primary-sage)',
                  padding: '1px 6px',
                  borderRadius: '4px',
                }}
              >
                Free Shipping
              </span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
              Shipped via {DEMO_CONFIG.courierName}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
