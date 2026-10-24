'use client';

import React, { useState } from 'react';
import { COUPONS } from '@/constants/data';
import { trackEvent } from '@/utils/analytics';

export default function OffersCoupons({
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  itemsTotal,
}) {
  const [manualCodeInput, setManualCodeInput] = useState('');
  const [manualError, setManualError] = useState('');
  // By default, coupons list is HIDDEN until user clicks/focuses the coupon box
  const [isCouponsVisible, setIsCouponsVisible] = useState(false);

  const handleManualApply = (e) => {
    e.preventDefault();
    const cleanCode = manualCodeInput.trim().toUpperCase();
    if (!cleanCode) {
      setManualError('Please enter a coupon code');
      return;
    }

    const foundCoupon = COUPONS.find((c) => c.code === cleanCode);
    if (!foundCoupon) {
      setManualError(`Coupon "${cleanCode}" is invalid`);
      return;
    }

    if (foundCoupon.code === 'FREESHIP' && itemsTotal <= 999) {
      setManualError('FREESHIP requires an order value above ₹999');
      return;
    }

    setManualError('');
    setManualCodeInput('');
    onApplyCoupon(foundCoupon);
    trackEvent('coupon_applied', { code: foundCoupon.code });
  };

  const handleRowApply = (coupon) => {
    if (coupon.code === 'FREESHIP' && itemsTotal <= 999) {
      return;
    }
    setManualError('');
    onApplyCoupon(coupon);
    trackEvent('coupon_applied', { code: coupon.code });
  };

  return (
    <section className="checkout-section" aria-labelledby="coupons-section-title">
      <div className="section-title">
        <h2 id="coupons-section-title" style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>
          Offers & Coupons
        </h2>
        {appliedCoupon && (
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              backgroundColor: 'var(--color-sage-tint)',
              color: 'var(--color-primary-sage)',
              padding: '2px 8px',
              borderRadius: '12px',
            }}
          >
            1 Applied
          </span>
        )}
      </div>

      {/* Applied Coupon Banner (if already applied) */}
      {appliedCoupon && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            borderRadius: '10px',
            backgroundColor: '#F3F0FE',
            border: '1px solid #5C33E6',
            marginBottom: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5C33E6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#5C33E6', letterSpacing: '0.5px' }}>
                {appliedCoupon.code}
              </span>
              <span style={{ fontSize: '12px', color: '#64748B', marginLeft: '6px' }}>
                applied
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onRemoveCoupon}
            id="btn-remove-applied-coupon"
            style={{
              background: 'none',
              border: 'none',
              color: '#DC2626',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              padding: '2px 6px',
            }}
          >
            Remove
          </button>
        </div>
      )}

      {/* Enter Coupon Code Input Box - Clicking/focusing reveals available coupons */}
      <form onSubmit={handleManualApply}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            id="input-manual-coupon"
            value={manualCodeInput}
            onFocus={() => setIsCouponsVisible(true)}
            onClick={() => setIsCouponsVisible(true)}
            onChange={(e) => {
              setManualCodeInput(e.target.value);
              setManualError('');
            }}
            placeholder="Enter coupon code"
            className={`form-input ${manualError ? 'input-error' : ''}`}
            style={{
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              backgroundColor: '#FFFFFF',
              cursor: 'text',
            }}
            aria-label="Coupon code"
          />
          <button
            type="submit"
            id="btn-apply-manual-coupon"
            className="btn-secondary"
            style={{ whiteSpace: 'nowrap', minWidth: '80px' }}
          >
            Apply
          </button>
        </div>

        {manualError && (
          <div className="field-error-text" id="coupon-manual-error" role="alert" style={{ marginTop: '6px' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{manualError}</span>
          </div>
        )}
      </form>

      {/* View/Hide Offers Toggle Trigger */}
      <div style={{ marginTop: '10px' }}>
        <button
          type="button"
          onClick={() => setIsCouponsVisible(!isCouponsVisible)}
          id="btn-toggle-coupons-list"
          style={{
            background: 'none',
            border: 'none',
            color: '#5C33E6',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            padding: '2px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <span>{isCouponsVisible ? 'Hide available offers' : 'View available offers'}</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            style={{
              transform: isCouponsVisible ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
            }}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>

      {/* Available Coupons List (Hidden by default, visible after clicking coupon box) */}
      {isCouponsVisible && (
        <div
          id="available-coupons-container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginTop: '12px',
            paddingTop: '10px',
            borderTop: '1px dashed #E2E8F0',
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          {COUPONS.map((coupon) => {
            const isApplied = appliedCoupon && appliedCoupon.code === coupon.code;
            const isNotEligible = coupon.code === 'FREESHIP' && itemsTotal <= 999;

            return (
              <div
                key={coupon.code}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: `1px solid ${isApplied ? '#5C33E6' : '#E2E8F0'}`,
                  backgroundColor: isApplied ? '#F3F0FE' : isNotEligible ? '#F8FAFC' : '#FFFFFF',
                  opacity: isNotEligible ? 0.7 : 1,
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ minWidth: 0, flex: 1, paddingRight: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        fontSize: '13px',
                        color: isApplied ? '#5C33E6' : '#1E1B2E',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {coupon.code}
                    </span>
                    {isApplied && (
                      <span
                        style={{
                          fontSize: '11px',
                          color: '#5C33E6',
                          fontWeight: 600,
                          backgroundColor: '#FFFFFF',
                          padding: '1px 6px',
                          borderRadius: '4px',
                          border: '1px solid rgba(92, 51, 230, 0.3)',
                        }}
                      >
                        Applied
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>
                    {coupon.condition}
                  </div>
                  {isNotEligible && (
                    <div style={{ fontSize: '11px', color: '#DC2626', marginTop: '2px' }}>
                      Add ₹{(1000 - itemsTotal).toFixed(0)} more to unlock
                    </div>
                  )}
                </div>

                <div>
                  {isApplied ? (
                    <button
                      type="button"
                      onClick={onRemoveCoupon}
                      id={`btn-remove-coupon-${coupon.code.toLowerCase()}`}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#DC2626',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        padding: '4px 8px',
                      }}
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleRowApply(coupon)}
                      disabled={isNotEligible}
                      id={`btn-apply-coupon-${coupon.code.toLowerCase()}`}
                      className="btn-secondary"
                      style={{
                        padding: '5px 12px',
                        fontSize: '12px',
                      }}
                    >
                      Apply
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
