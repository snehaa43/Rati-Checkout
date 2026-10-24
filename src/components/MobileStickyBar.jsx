'use client';

import React from 'react';
import { formatINR } from '@/utils/formatters';

export default function MobileStickyBar({
  totalPayable,
  onBuyNow,
  isLoading,
  isDisabled,
  hasItems,
}) {
  if (!hasItems) return null;

  return (
    <div
      id="mobile-sticky-bar"
      className="mobile-sticky-bar"
    >
      <div>
        <div style={{ fontSize: '11px', fontWeight: 500, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Total Payable
        </div>
        <div
          className="tabular-nums price-pulse"
          style={{ fontSize: '19px', fontWeight: 600, color: '#1E1B2E', marginTop: '2px' }}
        >
          {formatINR(totalPayable)}
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={onBuyNow}
          disabled={isDisabled || isLoading}
          id="btn-buy-now-sticky"
          className="btn-primary"
          style={{ padding: '12px 26px', fontSize: '15px', fontWeight: 600, borderRadius: '12px', minWidth: '150px' }}
          title={isDisabled ? 'Please select a payment option to continue' : ''}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              <span>Processing...</span>
            </>
          ) : (
            <span>Buy Now</span>
          )}
        </button>
      </div>
    </div>
  );
}
