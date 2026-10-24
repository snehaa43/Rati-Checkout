'use client';

import React, { useState } from 'react';

export default function DemoControls({
  simulateFailure,
  onToggleSimulateFailure,
  isReturningBuyer,
  onToggleBuyerType,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      id="demo-controls-panel"
      style={{
        position: 'fixed',
        bottom: '16px',
        left: '16px',
        zIndex: 9999,
        fontFamily: 'var(--font-family-base, sans-serif)',
        fontSize: '13px',
      }}
      className="desktop-only-panel"
    >
      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-only-panel {
            display: none !important;
          }
        }
      `}</style>

      {/* Floating Pill when collapsed */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          id="btn-open-demo-controls"
          suppressHydrationWarning
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#2B2A26',
            color: '#FFFFFF',
            padding: '8px 14px',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '12px',
          }}
          title="Open Demo Controls"
        >
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#4F6F52',
            }}
          ></span>
          <span>Demo Controls</span>
        </button>
      )}

      {/* Collapsed/Expanded Panel */}
      {isOpen && (
        <div
          style={{
            width: '260px',
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            border: '1px solid #E6E1D6',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              backgroundColor: '#FAF8F4',
              borderBottom: '1px solid #E6E1D6',
            }}
          >
            <span style={{ fontWeight: 600, color: '#2B2A26', fontSize: '13px' }}>
              Demo Controls
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              id="btn-close-demo-controls"
              aria-label="Close demo controls"
              style={{
                background: 'none',
                border: 'none',
                color: '#6B685F',
                cursor: 'pointer',
                fontSize: '16px',
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>

          {/* Exactly two switches */}
          <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* Switch 1: Simulate Payment Failure */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 500, color: '#2B2A26' }}>Payment Failure</div>
                <div style={{ fontSize: '11px', color: '#6B685F' }}>Simulate failure on Buy Now</div>
              </div>
              <label style={{ position: 'relative', display: 'inline-block', width: '38px', height: '22px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  id="switch-simulate-failure"
                  checked={simulateFailure}
                  onChange={(e) => onToggleSimulateFailure(e.target.checked)}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: simulateFailure ? '#B0453A' : '#E6E1D6',
                    borderRadius: '22px',
                    transition: '0.2s',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      height: '16px',
                      width: '16px',
                      left: simulateFailure ? '19px' : '3px',
                      bottom: '3px',
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      transition: '0.2s',
                    }}
                  />
                </span>
              </label>
            </div>

            {/* Switch 2: Switch between Returning and New Buyer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #FAF8F4', paddingTop: '12px' }}>
              <div>
                <div style={{ fontWeight: 500, color: '#2B2A26' }}>Buyer Type</div>
                <div style={{ fontSize: '11px', color: '#6B685F' }}>
                  {isReturningBuyer ? 'Returning (9876543210)' : 'New Buyer (Empty form)'}
                </div>
              </div>
              <button
                type="button"
                onClick={onToggleBuyerType}
                id="btn-toggle-buyer-type"
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid #4F6F52',
                  backgroundColor: '#E8EFE6',
                  color: '#4F6F52',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Switch
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
