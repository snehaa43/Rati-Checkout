'use client';

import React, { useState, useEffect } from 'react';
import { PINCODE_MAP, RETURNING_BUYER_DATA } from '@/constants/data';
import { trackEvent } from '@/utils/analytics';

export default function DeliveryAddress({
  isReturningBuyer,
  addressData,
  onAddressChange,
  onPincodeChange,
  highlightField,
}) {
  // Mode for returning buyer: 'saved' | 'editing'
  const [addressMode, setAddressMode] = useState(isReturningBuyer ? 'saved' : 'editing');
  const [pincodeError, setPincodeError] = useState('');
  const [isUnserviceable, setIsUnserviceable] = useState(false);

  // When switching returning/new buyer externally
  useEffect(() => {
    setAddressMode(isReturningBuyer ? 'saved' : 'editing');
  }, [isReturningBuyer]);

  // Handle pincode validation and city/state auto-fill
  const handlePincodeInput = (val) => {
    const cleanPin = val.replace(/\D/g, '').slice(0, 6);
    const updated = { ...addressData, pincode: cleanPin };

    if (cleanPin.length === 6) {
      if (PINCODE_MAP[cleanPin]) {
        const info = PINCODE_MAP[cleanPin];
        updated.city = info.city;
        updated.state = info.state;
        setPincodeError('');
        setIsUnserviceable(false);
        onPincodeChange(cleanPin, true);
      } else {
        updated.city = '';
        updated.state = '';
        setPincodeError("We don't deliver here yet");
        setIsUnserviceable(true);
        onPincodeChange(cleanPin, false);
      }
    } else {
      updated.city = '';
      updated.state = '';
      if (cleanPin.length > 0 && cleanPin.length < 6) {
        setPincodeError('Pincode must be 6 digits');
      } else {
        setPincodeError('');
      }
      setIsUnserviceable(false);
      onPincodeChange(cleanPin, false);
    }

    onAddressChange(updated);
  };

  const handleFieldChange = (field, value) => {
    onAddressChange({
      ...addressData,
      [field]: value,
    });
  };

  const handleConfirmAddress = () => {
    trackEvent('address_confirmed', {
      pincode: addressData.pincode,
      type: isReturningBuyer ? 'saved' : 'new',
    });
  };

  return (
    <section className="checkout-section" id="section-delivery-address" aria-labelledby="delivery-address-title">
      <div className="section-title">
        <h2 id="delivery-address-title" style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>
          Delivery Address
        </h2>
        {isReturningBuyer && addressMode === 'saved' && (
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
            Saved Address
          </span>
        )}
      </div>

      {/* Returning Buyer: Saved Address Card */}
      {isReturningBuyer && addressMode === 'saved' ? (
        <div
          id="saved-address-card"
          style={{
            padding: '14px',
            borderRadius: 'var(--radius-base)',
            border: 'var(--border-width) solid var(--color-border)',
            backgroundColor: 'var(--color-bg)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {addressData.fullName || RETURNING_BUYER_DATA.fullName}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  backgroundColor: 'var(--color-surface)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  border: '1px solid var(--color-border)',
                }}
              >
                {addressData.addressType || 'Home'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setAddressMode('editing')}
              id="btn-change-address"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-primary-sage)',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '0',
              }}
            >
              Change
            </button>
          </div>

          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.4, marginBottom: '6px' }}>
            {addressData.houseStreet || RETURNING_BUYER_DATA.houseStreet}
            {addressData.landmark ? `, ${addressData.landmark}` : ''}
            <br />
            {addressData.city || RETURNING_BUYER_DATA.city}, {addressData.state || RETURNING_BUYER_DATA.state} -{' '}
            <strong className="tabular-nums">{addressData.pincode || RETURNING_BUYER_DATA.pincode}</strong>
          </p>

          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
            Phone: <span className="tabular-nums">+91 {addressData.phone || RETURNING_BUYER_DATA.phone}</span>
          </div>

          <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px dashed var(--color-border)' }}>
            <button
              type="button"
              onClick={() => {
                onAddressChange({
                  fullName: '',
                  pincode: '',
                  houseStreet: '',
                  landmark: '',
                  city: '',
                  state: '',
                  addressType: 'Home',
                  phone: addressData.phone || '',
                });
                setAddressMode('editing');
              }}
              id="btn-add-new-address"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-primary-sage)',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: 0,
              }}
            >
              <span>+ Add new address</span>
            </button>
          </div>
        </div>
      ) : (
        /* New Buyer Address Form (or editing mode) */
        <div id="address-form" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Full Name */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="input-address-fullname" className="form-label">
              Full Name *
            </label>
            <input
              type="text"
              id="input-address-fullname"
              value={addressData.fullName || ''}
              onChange={(e) => handleFieldChange('fullName', e.target.value)}
              placeholder="e.g. Priya Sharma"
              className={`form-input ${highlightField === 'fullName' ? 'input-error' : ''}`}
            />
            {highlightField === 'fullName' && (
              <div className="field-error-text" role="alert">
                Full name is required
              </div>
            )}
          </div>

          {/* Pincode & City/State */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="input-address-pincode" className="form-label">
                Pincode *
              </label>
              <input
                type="text"
                id="input-address-pincode"
                inputMode="numeric"
                maxLength={6}
                value={addressData.pincode || ''}
                onChange={(e) => handlePincodeInput(e.target.value)}
                placeholder="6-digit pincode"
                className={`form-input tabular-nums ${pincodeError || highlightField === 'pincode' ? 'input-error' : ''}`}
              />
              {pincodeError && (
                <div className="field-error-text" id="pincode-inline-error" role="alert">
                  {pincodeError}
                </div>
              )}
              {!pincodeError && highlightField === 'pincode' && (
                <div className="field-error-text" role="alert">
                  Pincode is required
                </div>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="input-address-city" className="form-label">
                City & State
              </label>
              <input
                type="text"
                id="input-address-city"
                disabled
                value={
                  addressData.city && addressData.state
                    ? `${addressData.city}, ${addressData.state}`
                    : ''
                }
                placeholder="Auto-filled from pincode"
                className="form-input"
                style={{ backgroundColor: 'var(--color-bg)', cursor: 'not-allowed', color: 'var(--color-text-secondary)' }}
              />
            </div>
          </div>

          {/* House and Street */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="input-address-housestreet" className="form-label">
              House, Flat no., Building & Street *
            </label>
            <input
              type="text"
              id="input-address-housestreet"
              value={addressData.houseStreet || ''}
              onChange={(e) => handleFieldChange('houseStreet', e.target.value)}
              placeholder="e.g. Flat 402, Green Glen Layout"
              className={`form-input ${highlightField === 'houseStreet' ? 'input-error' : ''}`}
            />
            {highlightField === 'houseStreet' && (
              <div className="field-error-text" role="alert">
                Street address is required
              </div>
            )}
          </div>

          {/* Optional Landmark */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="input-address-landmark" className="form-label">
              Landmark (Optional)
            </label>
            <input
              type="text"
              id="input-address-landmark"
              value={addressData.landmark || ''}
              onChange={(e) => handleFieldChange('landmark', e.target.value)}
              placeholder="e.g. Near Central Mall"
              className="form-input"
            />
          </div>

          {/* Home or Work Selector */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <span className="form-label">Address Type</span>
            <div style={{ display: 'flex', gap: '10px', marginTop: '2px' }}>
              {['Home', 'Work'].map((type) => {
                const isSelected = (addressData.addressType || 'Home') === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleFieldChange('addressType', type)}
                    id={`btn-address-type-${type.toLowerCase()}`}
                    style={{
                      padding: '6px 16px',
                      borderRadius: 'var(--radius-base)',
                      border: `var(--border-width) solid ${isSelected ? 'var(--color-primary-sage)' : 'var(--color-border)'}`,
                      backgroundColor: isSelected ? 'var(--color-sage-tint)' : 'var(--color-surface)',
                      color: isSelected ? 'var(--color-primary-sage)' : 'var(--color-text-primary)',
                      fontWeight: isSelected ? 600 : 400,
                      fontSize: '13px',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Returning buyer cancel editing link */}
          {isReturningBuyer && (
            <div style={{ marginTop: '4px' }}>
              <button
                type="button"
                onClick={() => setAddressMode('saved')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-text-secondary)',
                  fontSize: '12px',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: 0,
                }}
              >
                Cancel and use saved address
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
