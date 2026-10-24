'use client';

import React from 'react';
import { BRAND_CONFIG } from '@/constants/data';

export default function Header({
  brandName = BRAND_CONFIG.name,
  onBack,
  minimal = false,
}) {
  if (minimal) {
    return (
      <header
        className="checkout-header checkout-header-minimal"
        role="banner"
        style={{
          borderBottom: 'none',
          backgroundColor: 'transparent',
          padding: '12px 16px',
          minHeight: '48px',
          height: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <button
          type="button"
          className="back-btn"
          onClick={onBack}
          aria-label="Back to enter phone number"
          id="btn-header-back"
          suppressHydrationWarning
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            marginLeft: '-8px',
            color: '#1E1B2E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
      </header>
    );
  }

  return (
    <header className="checkout-header" role="banner">
      <div className="header-left">
        <button
          type="button"
          className="back-btn"
          onClick={onBack}
          aria-label="Go back"
          id="btn-header-back"
          suppressHydrationWarning
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>

        <div className="brand-badge">
          {BRAND_CONFIG.logo ? (
            <img
              src={BRAND_CONFIG.logo}
              alt={`${brandName} logo`}
              width="34"
              height="34"
              style={{
                borderRadius: '8px',
                objectFit: 'cover',
                border: '1px solid var(--color-border)',
              }}
            />
          ) : (
            <div className="brand-mark" aria-hidden="true">
              {BRAND_CONFIG.initials}
            </div>
          )}
          <span className="brand-title">{brandName}</span>
        </div>
      </div>

      <div className="header-right" aria-label="Secure checkout">
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <span>Secure checkout</span>
      </div>
    </header>
  );
}
