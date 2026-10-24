'use client';

import React from 'react';
import { RECOMMENDED_ADDONS } from '@/constants/data';
import { formatINR } from '@/utils/formatters';
import { trackEvent } from '@/utils/analytics';

export default function RecommendedAddons({
  activeAddonsMap,
  onAddAddon,
  onUpdateAddonQuantity,
}) {
  const handleAdd = (addon) => {
    onAddAddon(addon);
    trackEvent('addon_added', {
      product: addon.name,
      price: addon.price,
    });
  };

  return (
    <section className="checkout-section" aria-labelledby="addons-section-title">
      <div className="section-title">
        <h2 id="addons-section-title" style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>
          Recommended Add-ons
        </h2>
        <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
          Pairs well with Kumkumadi
        </span>
      </div>

      {/* Horizontal Scroller with exactly 4 add-on items with product pictures */}
      <div className="horizontal-scroll" tabIndex={0} aria-label="Recommended add-ons scroller">
        {RECOMMENDED_ADDONS.map((addon) => {
          const currentQty = activeAddonsMap[addon.id] || 0;
          const isAdded = currentQty > 0;

          return (
            <div
              key={addon.id}
              style={{
                minWidth: '220px',
                maxWidth: '220px',
                border: `1.5px solid ${isAdded ? '#5C33E6' : '#E2E8F0'}`,
                borderRadius: '12px',
                padding: '10px 12px',
                backgroundColor: isAdded ? '#F3F0FE' : '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                flexShrink: 0,
                transition: 'all 0.15s ease',
              }}
            >
              {/* Product Picture: Exactly 52px by 52px matching the order picture size */}
              {addon.image ? (
                <img
                  src={addon.image}
                  alt={addon.name}
                  width="52"
                  height="52"
                  style={{
                    width: '52px',
                    height: '52px',
                    minWidth: '52px',
                    borderRadius: '12px',
                    objectFit: 'cover',
                    border: '1px solid var(--color-border)',
                    flexShrink: 0,
                  }}
                />
              ) : (
                <div
                  className="initials-tile"
                  style={{
                    width: '52px',
                    height: '52px',
                    minWidth: '52px',
                    borderRadius: '12px',
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  {addon.initials}
                </div>
              )}

              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#1E1B2E',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    marginBottom: '2px',
                  }}
                  title={addon.name}
                >
                  {addon.name}
                </div>

                <div
                  className="tabular-nums"
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#5C33E6',
                    marginBottom: '6px',
                  }}
                >
                  {formatINR(addon.price)}
                </div>

                {/* Action Button: Add button or Quantity stepper */}
                <div>
                  {!isAdded ? (
                    <button
                      type="button"
                      onClick={() => handleAdd(addon)}
                      id={`btn-add-addon-${addon.id}`}
                      className="btn-secondary"
                      style={{
                        padding: '3px 10px',
                        fontSize: '12px',
                        fontWeight: 600,
                        borderRadius: '6px',
                        border: '1.5px solid #5C33E6',
                        backgroundColor: '#FFFFFF',
                      }}
                    >
                      + Add
                    </button>
                  ) : (
                    <div
                      className="stepper-btn-group"
                      style={{
                        display: 'inline-flex',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '6px',
                        border: '1px solid #5C33E6',
                        height: '26px',
                      }}
                      aria-label={`${addon.name} quantity stepper`}
                    >
                      <button
                        type="button"
                        className="stepper-btn"
                        onClick={() => onUpdateAddonQuantity(addon.id, currentQty - 1)}
                        aria-label="Decrease quantity"
                        id={`btn-decrement-addon-${addon.id}`}
                        style={{ width: '24px', height: '24px', fontSize: '13px' }}
                      >
                        −
                      </button>
                      <span
                        className="stepper-count tabular-nums"
                        style={{ width: '22px', fontSize: '12px', fontWeight: 600 }}
                        aria-live="polite"
                      >
                        {currentQty}
                      </span>
                      <button
                        type="button"
                        className="stepper-btn"
                        onClick={() => onUpdateAddonQuantity(addon.id, currentQty + 1)}
                        aria-label="Increase quantity"
                        id={`btn-increment-addon-${addon.id}`}
                        style={{ width: '24px', height: '24px', fontSize: '13px' }}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
