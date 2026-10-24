'use client';

import React, { useState } from 'react';
import { formatINR } from '@/utils/formatters';
import { trackEvent } from '@/utils/analytics';

// Crisp Bank Logos (Matches Screenshot 1)
function AxisLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M12 3L3 21H9L12 14.5L15 21H21L12 3Z" fill="#97144D" />
      <path d="M12 9.5L9.5 15.5H14.5L12 9.5Z" fill="#FFFFFF" />
    </svg>
  );
}

function HdfcLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <rect width="24" height="24" rx="3" fill="#004C8F" />
      <rect x="4" y="4" width="16" height="16" fill="#ED232A" />
      <rect x="8" y="8" width="8" height="8" fill="#FFFFFF" />
      <rect x="10" y="4" width="4" height="16" fill="#004C8F" />
      <rect x="4" y="10" width="16" height="4" fill="#004C8F" />
    </svg>
  );
}

function IciciLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="11" fill="#F37021" />
      <path d="M12 6C8.686 6 6 8.686 6 12C6 15.314 8.686 18 12 18C14.5 18 16.6 16.5 17.5 14.3H14.8C14.2 15.3 13.2 16 12 16C9.8 16 8 14.2 8 12C8 9.8 9.8 8 12 8C13.2 8 14.2 8.7 14.8 9.7H17.5C16.6 7.5 14.5 6 12 6Z" fill="#A41C2B" />
      <circle cx="12" cy="2.2" fill="#FFFFFF" />
    </svg>
  );
}

function KotakLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="11" fill="#EE272C" />
      <path d="M7 12C7 9.5 9 8 11.5 8C13.5 8 15 9.5 15.5 11H13.2C12.8 10.2 12.2 9.8 11.5 9.8C10.1 9.8 9 10.8 9 12C9 13.2 10.1 14.2 11.5 14.2C12.2 14.2 12.8 13.8 13.2 13H15.5C15 14.5 13.5 16 11.5 16C9 16 7 14.5 7 12Z" fill="#FFFFFF" />
      <path d="M15 8L18 12L15 16H17.5L19.5 12L17.5 8H15Z" fill="#1C3F94" />
    </svg>
  );
}

function SbiLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="11" fill="#00A5DF" />
      <circle cx="12" cy="10" r="3.2" fill="#FFFFFF" />
      <rect x="10.8" y="10" width="2.4" height="9" fill="#FFFFFF" />
    </svg>
  );
}

// UPI App Logos
function GpayLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <rect width="24" height="24" rx="6" fill="#FFFFFF" stroke="#E2E8F0" />
      <path d="M12 10.8V13.5H16.2C15.8 14.8 14.6 15.8 12 15.8C9.5 15.8 7.5 13.8 7.5 11.3C7.5 8.8 9.5 6.8 12 6.8C13.2 6.8 14.2 7.2 15 8L17 6C15.7 4.7 14 3.9 12 3.9C7.9 3.9 4.6 7.2 4.6 11.3C4.6 15.4 7.9 18.7 12 18.7C16.3 18.7 19.1 15.7 19.1 11.5C19.1 10.9 19 10.3 18.9 9.8H12V10.8Z" fill="#4285F4" />
      <path d="M5.5 8.9L7.9 10.7C8.6 8.5 10.1 6.8 12 6.8C13.2 6.8 14.2 7.2 15 8L17 6C15.7 4.7 14 3.9 12 3.9C9.3 3.9 6.9 5.4 5.5 8.9Z" fill="#EA4335" />
      <path d="M12 18.7C14 18.7 15.8 18 17.1 16.7L14.8 14.8C14 15.4 13.1 15.8 12 15.8C9.4 15.8 8.2 14.1 7.8 12.8L5.4 14.6C6.8 17.1 9.2 18.7 12 18.7Z" fill="#34A853" />
      <path d="M7.8 12.8C7.6 12.3 7.5 11.8 7.5 11.3C7.5 10.8 7.6 10.3 7.8 9.8L5.4 8C4.9 9 4.6 10.1 4.6 11.3C4.6 12.5 4.9 13.6 5.4 14.6L7.8 12.8Z" fill="#FBBC05" />
    </svg>
  );
}

function PhonepeLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <rect width="24" height="24" rx="6" fill="#5F259F" />
      <text x="6" y="17" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
        पे
      </text>
    </svg>
  );
}

function PaytmLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <rect width="24" height="24" rx="6" fill="#FFFFFF" stroke="#E2E8F0" />
      <text x="2" y="15" fill="#002E6E" fontSize="9" fontWeight="900" fontFamily="sans-serif">
        Pay
      </text>
      <text x="14" y="15" fill="#00BAF2" fontSize="9" fontWeight="900" fontFamily="sans-serif">
        tm
      </text>
    </svg>
  );
}

function BhimLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <rect width="24" height="24" rx="6" fill="#FFFFFF" stroke="#E2E8F0" />
      <path d="M8 5L5 19H10L13 5H8Z" fill="#00A651" />
      <path d="M14 5L11 19H16L19 5H14Z" fill="#F15A24" />
    </svg>
  );
}

function UpiIdIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="11" fill="#F3F0FE" stroke="#5C33E6" strokeWidth="1.5" />
      <text x="7.5" y="16" fill="#5C33E6" fontSize="13" fontWeight="700" fontFamily="sans-serif">
        @
      </text>
    </svg>
  );
}

// UPI Header Logo
function UpiHeaderLogo() {
  return (
    <svg width="28" height="20" viewBox="0 0 48 24" fill="none" style={{ flexShrink: 0 }}>
      <text x="0" y="17" fill="#1E1B2E" fontSize="16" fontWeight="800" fontStyle="italic" fontFamily="sans-serif">
        UPI
      </text>
      <path d="M34 5L28 19H34L40 5H34Z" fill="#097939" />
      <path d="M40 5L34 19H40L46 5H40Z" fill="#ED752E" />
    </svg>
  );
}

export default function PaymentSection({
  selectedMethod,
  onSelectMethod,
  prepaidSaving,
  codFee,
}) {
  // IMPORTANT: All accordions are COLLAPSED BY DEFAULT (null) so UPI does not auto-open!
  const [openSection, setOpenSection] = useState(null);

  // Selected Bank for Net Banking
  const [selectedBank, setSelectedBank] = useState('HDFC');

  // Selected UPI App
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay');
  const [upiIdInput, setUpiIdInput] = useState('');

  // Card form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [saveCard, setSaveCard] = useState(true);

  const toggleSection = (sectionKey) => {
    if (openSection === sectionKey) {
      setOpenSection(null);
    } else {
      setOpenSection(sectionKey);
      onSelectMethod(sectionKey);
      trackEvent('payment_method_selected', { method: sectionKey });
    }
  };

  const handleSelectCod = () => {
    setOpenSection(null); // COD is a single selection row, not an expandable accordion
    onSelectMethod('cod');
    trackEvent('payment_method_selected', { method: 'cod' });
  };

  const formatCardNumber = (val) => {
    const raw = val.replace(/\D/g, '').slice(0, 16);
    const groups = raw.match(/.{1,4}/g);
    setCardNumber(groups ? groups.join(' ') : raw);
  };

  const formatExpiry = (val) => {
    const raw = val.replace(/\D/g, '').slice(0, 4);
    if (raw.length > 2) {
      setCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`);
    } else {
      setCardExpiry(raw);
    }
  };

  const formatCvv = (val) => {
    const raw = val.replace(/\D/g, '').slice(0, 4);
    setCardCvv(raw);
  };

  return (
    <section
      id="section-payment"
      aria-labelledby="payment-section-title"
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
      }}
    >
      {/* Payment Section Header - Inset 18px to perfectly align with Delivery Address */}
      <div
        style={{
          padding: '16px 18px',
          borderBottom: '1px solid #F1F5F9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h2
          id="payment-section-title"
          style={{
            fontSize: '15px',
            fontWeight: 600,
            color: '#1E1B2E',
            margin: 0,
          }}
        >
          Payment
        </h2>
        <span style={{ fontSize: '12px', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          100% Secure
        </span>
      </div>

      {/* ============================================================ */}
      {/* 1. UPI (Pay via any App) - COLLAPSED BY DEFAULT              */}
      {/* ============================================================ */}
      <div style={{ borderBottom: '1px solid #F1F5F9' }}>
        <button
          type="button"
          onClick={() => toggleSection('upi')}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 18px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <UpiHeaderLogo />
            <div>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#1E1B2E' }}>
                UPI (Pay via any App)
              </div>
              {prepaidSaving > 0 && openSection !== 'upi' && (
                <div style={{ fontSize: '12px', fontWeight: 400, color: '#059669', marginTop: '2px' }}>
                  Pay online and save {formatINR(prepaidSaving)}
                </div>
              )}
            </div>
          </div>

          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1E1B2E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: openSection === 'upi' ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
              flexShrink: 0,
            }}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        {/* UPI Pop Down (Formatted identical to Net Banking with logos, names & radio buttons) */}
        {openSection === 'upi' && (
          <div style={{ padding: '0 18px 18px', animation: 'fadeIn 0.2s ease-out' }}>
            
            {/* 1. Google Pay */}
            <div
              onClick={() => {
                setSelectedUpiApp('gpay');
                onSelectMethod('upi');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 0',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <GpayLogo />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 500, color: '#1E1B2E' }}>
                    Google Pay
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 400, color: '#059669', marginTop: '1px' }}>
                    Fastest checkout
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: `1.5px solid ${selectedUpiApp === 'gpay' ? '#5C33E6' : '#1E1B2E'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {selectedUpiApp === 'gpay' && (
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#5C33E6' }} />
                )}
              </div>
            </div>

            <div style={{ borderBottom: '1px dashed #E2E8F0' }} />

            {/* 2. PhonePe */}
            <div
              onClick={() => {
                setSelectedUpiApp('phonepe');
                onSelectMethod('upi');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 0',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <PhonepeLogo />
                <div style={{ fontSize: '15px', fontWeight: 500, color: '#1E1B2E' }}>
                  PhonePe
                </div>
              </div>

              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: `1.5px solid ${selectedUpiApp === 'phonepe' ? '#5C33E6' : '#1E1B2E'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {selectedUpiApp === 'phonepe' && (
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#5C33E6' }} />
                )}
              </div>
            </div>

            <div style={{ borderBottom: '1px dashed #E2E8F0' }} />

            {/* 3. Paytm */}
            <div
              onClick={() => {
                setSelectedUpiApp('paytm');
                onSelectMethod('upi');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 0',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <PaytmLogo />
                <div style={{ fontSize: '15px', fontWeight: 500, color: '#1E1B2E' }}>
                  Paytm
                </div>
              </div>

              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: `1.5px solid ${selectedUpiApp === 'paytm' ? '#5C33E6' : '#1E1B2E'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {selectedUpiApp === 'paytm' && (
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#5C33E6' }} />
                )}
              </div>
            </div>

            <div style={{ borderBottom: '1px dashed #E2E8F0' }} />

            {/* 4. BHIM */}
            <div
              onClick={() => {
                setSelectedUpiApp('bhim');
                onSelectMethod('upi');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 0',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <BhimLogo />
                <div style={{ fontSize: '15px', fontWeight: 500, color: '#1E1B2E' }}>
                  BHIM
                </div>
              </div>

              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: `1.5px solid ${selectedUpiApp === 'bhim' ? '#5C33E6' : '#1E1B2E'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {selectedUpiApp === 'bhim' && (
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#5C33E6' }} />
                )}
              </div>
            </div>

            <div style={{ borderBottom: '1px dashed #E2E8F0' }} />

            {/* 5. Pay with UPI ID */}
            <div
              onClick={() => {
                setSelectedUpiApp('upi_id');
                onSelectMethod('upi');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 0',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <UpiIdIcon />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 500, color: '#1E1B2E' }}>
                    Pay with UPI ID
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 400, color: '#64748B' }}>
                    Enter any valid UPI VPA
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: `1.5px solid ${selectedUpiApp === 'upi_id' ? '#5C33E6' : '#1E1B2E'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {selectedUpiApp === 'upi_id' && (
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#5C33E6' }} />
                )}
              </div>
            </div>

            {/* Expandable UPI ID Input field */}
            {selectedUpiApp === 'upi_id' && (
              <div style={{ margin: '4px 0 10px', padding: '10px 12px', backgroundColor: '#F8FAFC', borderRadius: '10px' }}>
                <input
                  type="text"
                  id="input-upi-id"
                  value={upiIdInput}
                  onChange={(e) => setUpiIdInput(e.target.value)}
                  placeholder="e.g. mobile@upi or username@okhdfcbank"
                  className="form-input"
                  style={{ fontSize: '13px', backgroundColor: '#FFFFFF', fontWeight: 400 }}
                  aria-label="Enter UPI ID"
                />
              </div>
            )}

            {/* Other UPI Apps Dropdown Pill (Matches Other Banks pill style) */}
            <div style={{ marginTop: '14px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#475569',
                }}
              >
                <span>More UPI Apps (WhatsApp, CRED, etc.)</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* 2. Credit/Debit Card                                         */}
      {/* ============================================================ */}
      <div style={{ borderBottom: '1px solid #F1F5F9' }}>
        <button
          type="button"
          onClick={() => toggleSection('cards')}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 18px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1E1B2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <rect x="2" y="5" width="20" height="14" rx="2" stroke="#1E1B2E" strokeWidth="2" />
              <line x1="2" y1="10" x2="22" y2="10" stroke="#1E1B2E" strokeWidth="2" />
            </svg>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#1E1B2E' }}>
                Credit/Debit Card
              </div>
              <div style={{ fontSize: '12px', fontWeight: 400, color: '#059669', marginTop: '2px' }}>
                {prepaidSaving > 0 ? `Pay online and save ${formatINR(prepaidSaving)} • 8 offers available` : 'Visa, Mastercard, RuPay'}
              </div>
            </div>
          </div>

          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1E1B2E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: openSection === 'cards' ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
              flexShrink: 0,
            }}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        {openSection === 'cards' && (
          <div
            style={{
              padding: '14px 18px 18px',
              borderTop: '1px solid #F8FAFC',
              backgroundColor: '#FAFAFD',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div>
              <label htmlFor="input-card-number" className="form-label" style={{ fontSize: '12px', fontWeight: 500 }}>
                Card Number
              </label>
              <input
                type="text"
                id="input-card-number"
                inputMode="numeric"
                value={cardNumber}
                onChange={(e) => formatCardNumber(e.target.value)}
                placeholder="4532 •••• •••• 8901"
                className="form-input tabular-nums"
                maxLength={19}
                style={{ backgroundColor: '#FFFFFF', fontWeight: 400 }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label htmlFor="input-card-expiry" className="form-label" style={{ fontSize: '12px', fontWeight: 500 }}>
                  Expiry (MM/YY)
                </label>
                <input
                  type="text"
                  id="input-card-expiry"
                  inputMode="numeric"
                  value={cardExpiry}
                  onChange={(e) => formatExpiry(e.target.value)}
                  placeholder="MM/YY"
                  className="form-input tabular-nums"
                  maxLength={5}
                  style={{ backgroundColor: '#FFFFFF', fontWeight: 400 }}
                />
              </div>

              <div>
                <label htmlFor="input-card-cvv" className="form-label" style={{ fontSize: '12px', fontWeight: 500 }}>
                  CVV
                </label>
                <input
                  type="password"
                  id="input-card-cvv"
                  inputMode="numeric"
                  value={cardCvv}
                  onChange={(e) => formatCvv(e.target.value)}
                  placeholder="•••"
                  className="form-input tabular-nums"
                  maxLength={4}
                  style={{ backgroundColor: '#FFFFFF', fontWeight: 400 }}
                />
              </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 400, color: '#64748B' }}>
              <input
                type="checkbox"
                checked={saveCard}
                onChange={(e) => setSaveCard(e.target.checked)}
                style={{ accentColor: '#5C33E6', width: '16px', height: '16px' }}
              />
              <span>Save card securely as per RBI guidelines</span>
            </label>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* 3. Net Banking                                               */}
      {/* ============================================================ */}
      <div style={{ borderBottom: '1px solid #F1F5F9' }}>
        <button
          type="button"
          onClick={() => toggleSection('netbanking')}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 18px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1E1B2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <polygon points="12 2 2 7 22 7 12 2" />
              <line x1="4" y1="10" x2="4" y2="18" />
              <line x1="9" y1="10" x2="9" y2="18" />
              <line x1="15" y1="10" x2="15" y2="18" />
              <line x1="20" y1="10" x2="20" y2="18" />
              <line x1="2" y1="18" x2="22" y2="18" />
              <line x1="2" y1="21" x2="22" y2="21" />
            </svg>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#1E1B2E' }}>
                Net Banking
              </div>
              {prepaidSaving > 0 && openSection !== 'netbanking' && (
                <div style={{ fontSize: '12px', fontWeight: 400, color: '#059669', marginTop: '2px' }}>
                  Pay online and save {formatINR(prepaidSaving)}
                </div>
              )}
            </div>
          </div>

          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1E1B2E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: openSection === 'netbanking' ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
              flexShrink: 0,
            }}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        {openSection === 'netbanking' && (
          <div style={{ padding: '0 18px 18px', animation: 'fadeIn 0.2s ease-out' }}>
            {/* Axis Bank */}
            <div
              onClick={() => {
                setSelectedBank('Axis');
                onSelectMethod('netbanking');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 0',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <AxisLogo />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 500, color: '#64748B' }}>
                    Axis Bank
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 400, color: '#EA580C', marginTop: '2px' }}>
                    Axis Bank is currently facing high failure rate.
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: `1.5px solid ${selectedBank === 'Axis' ? '#5C33E6' : '#94A3B8'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {selectedBank === 'Axis' && (
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#5C33E6' }} />
                )}
              </div>
            </div>

            <div style={{ borderBottom: '1px dashed #E2E8F0' }} />

            {/* HDFC Bank */}
            <div
              onClick={() => {
                setSelectedBank('HDFC');
                onSelectMethod('netbanking');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 0',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <HdfcLogo />
                <div style={{ fontSize: '15px', fontWeight: 500, color: '#1E1B2E' }}>
                  HDFC Bank
                </div>
              </div>

              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: `1.5px solid ${selectedBank === 'HDFC' ? '#5C33E6' : '#1E1B2E'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {selectedBank === 'HDFC' && (
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#5C33E6' }} />
                )}
              </div>
            </div>

            <div style={{ borderBottom: '1px dashed #E2E8F0' }} />

            {/* ICICI Bank */}
            <div
              onClick={() => {
                setSelectedBank('ICICI');
                onSelectMethod('netbanking');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 0',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <IciciLogo />
                <div style={{ fontSize: '15px', fontWeight: 500, color: '#1E1B2E' }}>
                  ICICI Bank
                </div>
              </div>

              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: `1.5px solid ${selectedBank === 'ICICI' ? '#5C33E6' : '#1E1B2E'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {selectedBank === 'ICICI' && (
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#5C33E6' }} />
                )}
              </div>
            </div>

            <div style={{ borderBottom: '1px dashed #E2E8F0' }} />

            {/* Kotak */}
            <div
              onClick={() => {
                setSelectedBank('Kotak');
                onSelectMethod('netbanking');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 0',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <KotakLogo />
                <div style={{ fontSize: '15px', fontWeight: 500, color: '#1E1B2E' }}>
                  Kotak
                </div>
              </div>

              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: `1.5px solid ${selectedBank === 'Kotak' ? '#5C33E6' : '#1E1B2E'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {selectedBank === 'Kotak' && (
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#5C33E6' }} />
                )}
              </div>
            </div>

            <div style={{ borderBottom: '1px dashed #E2E8F0' }} />

            {/* SBI */}
            <div
              onClick={() => {
                setSelectedBank('SBI');
                onSelectMethod('netbanking');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 0',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <SbiLogo />
                <div style={{ fontSize: '15px', fontWeight: 500, color: '#1E1B2E' }}>
                  SBI
                </div>
              </div>

              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: `1.5px solid ${selectedBank === 'SBI' ? '#5C33E6' : '#1E1B2E'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {selectedBank === 'SBI' && (
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#5C33E6' }} />
                )}
              </div>
            </div>

            {/* Other Banks Dropdown Pill */}
            <div style={{ marginTop: '14px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#475569',
                }}
              >
                <span>Other Banks</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* 4. Cash on Delivery (Cash/UPI)                               */}
      {/* ============================================================ */}
      <div>
        <div
          onClick={handleSelectCod}
          id="payment-option-cod-row"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 18px',
            cursor: 'pointer',
            backgroundColor: selectedMethod === 'cod' ? '#FAFAFD' : '#FFFFFF',
            transition: 'background-color 0.15s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <svg width="26" height="20" viewBox="0 0 28 20" fill="none" stroke="#1E1B2E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <rect x="1" y="2" width="26" height="16" rx="2" />
              <line x1="1" y1="7" x2="4" y2="7" />
              <line x1="24" y1="7" x2="27" y2="7" />
              <circle cx="14" cy="10" r="4" />
              <text x="12" y="13" fill="#1E1B2E" fontSize="9" fontWeight="700" fontFamily="sans-serif">₹</text>
            </svg>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#1E1B2E' }}>
                Cash on Delivery (Cash/UPI)
              </div>
              <div style={{ fontSize: '12px', fontWeight: 400, color: '#64748B', marginTop: '2px' }}>
                +₹{codFee} COD handling fee
              </div>
            </div>
          </div>

          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: `1.5px solid ${selectedMethod === 'cod' ? '#5C33E6' : '#1E1B2E'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {selectedMethod === 'cod' && (
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#5C33E6' }} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
