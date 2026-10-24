'use client';

import React, { useState } from 'react';
import { formatINR } from '@/utils/formatters';

export default function OrderSummary({
  product,
  onProductQuantityChange,
  activeAddonsList = [],
  onRemoveAddon,
  calculations,
  hasItems,
}) {
  // Price details visible on single page by default
  const [isPriceDetailsExpanded, setIsPriceDetailsExpanded] = useState(true);

  // If cart is completely empty
  if (!hasItems) {
    return (
      <section className="checkout-section" aria-labelledby="order-summary-title">
        <h2 id="order-summary-title" className="section-title">
          <span>Order Summary</span>
        </h2>
        <div
          style={{
            padding: '24px 16px',
            textAlign: 'center',
            backgroundColor: 'var(--color-bg)',
            borderRadius: 'var(--radius-base)',
            border: 'var(--border-width) dashed var(--color-border)',
          }}
          id="empty-cart-state"
        >
          <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
            Your cart is empty
          </p>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
            Add an item or recommended add-on to proceed with checkout.
          </p>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => onProductQuantityChange(1)}
            id="btn-restore-product"
          >
            Restore Kumkumadi Face Oil
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-section" aria-labelledby="order-summary-title">
      <div className="section-title">
        <h2 id="order-summary-title" style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>
          Order Summary
        </h2>
        <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
          {calculations.itemCount} {calculations.itemCount === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Main Product Tile (if quantity > 0) */}
      {product.quantity > 0 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: activeAddonsList.length > 0 ? '12px' : '0',
            borderBottom: activeAddonsList.length > 0 ? 'var(--border-width) solid var(--color-border)' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
            {/* Product Image with initials fallback */}
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                width="52"
                height="52"
                style={{
                  width: '52px',
                  height: '52px',
                  minWidth: '52px',
                  borderRadius: '12px',
                  objectFit: 'cover',
                  border: '1px solid var(--color-border)',
                }}
              />
            ) : (
              <div className="initials-tile" aria-hidden="true">
                {product.initials}
              </div>
            )}
            <div style={{ minWidth: 0, flex: 1 }}>
              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  marginBottom: '2px',
                }}
              >
                {product.name}
              </h3>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-primary-sage)' }} className="tabular-nums">
                {formatINR(product.price)}
              </div>
            </div>
          </div>

          {/* Stepper with remove capability */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '12px' }}>
            <div className="stepper-btn-group" aria-label="Product quantity stepper">
              <button
                type="button"
                className="stepper-btn"
                onClick={() => onProductQuantityChange(product.quantity - 1)}
                aria-label="Decrease quantity"
                id="btn-decrement-main-product"
              >
                −
              </button>
              <span className="stepper-count tabular-nums" aria-live="polite">
                {product.quantity}
              </span>
              <button
                type="button"
                className="stepper-btn"
                onClick={() => onProductQuantityChange(product.quantity + 1)}
                aria-label="Increase quantity"
                id="btn-increment-main-product"
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Add-ons in Summary */}
      {activeAddonsList.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '10px' }}>
          {activeAddonsList.map((addon) => (
            <div
              key={addon.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                {addon.image ? (
                  <img
                    src={addon.image}
                    alt={addon.name}
                    width="42"
                    height="42"
                    style={{
                      width: '42px',
                      height: '42px',
                      minWidth: '42px',
                      borderRadius: '10px',
                      objectFit: 'cover',
                      border: '1px solid var(--color-border)',
                    }}
                  />
                ) : (
                  <div className="initials-tile small" aria-hidden="true">
                    {addon.initials}
                  </div>
                )}
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: 500,
                      color: 'var(--color-text-primary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {addon.name}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }} className="tabular-nums">
                    {formatINR(addon.price)} × {addon.quantity}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600 }} className="tabular-nums">
                  {formatINR(addon.price * addon.quantity)}
                </span>
                <button
                  type="button"
                  onClick={() => onRemoveAddon(addon.id)}
                  aria-label={`Remove ${addon.name}`}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-text-secondary)',
                    cursor: 'pointer',
                    padding: '4px',
                    fontSize: '16px',
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Price Details Section */}
      <div style={{ marginTop: '16px', borderTop: 'var(--border-width) solid var(--color-border)', paddingTop: '12px' }}>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsPriceDetailsExpanded(!isPriceDetailsExpanded);
          }}
          aria-expanded={isPriceDetailsExpanded}
          id="btn-toggle-price-details"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-primary-sage)',
            fontWeight: 600,
            fontSize: '13px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '2px 0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>Price Details</span>
            <span style={{ fontSize: '12px', color: 'var(--color-primary-sage)' }}>
              ({isPriceDetailsExpanded ? 'Hide' : 'View'})
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {!isPriceDetailsExpanded && (
              <span className="tabular-nums" style={{ fontWeight: 700, color: 'var(--color-primary-sage)', fontSize: '14px' }}>
                {formatINR(calculations.totalPayable)}
              </span>
            )}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{
                transform: isPriceDetailsExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform var(--transition-fast)',
              }}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </button>

        {/* Expander Content: Always visible by default on single page */}
        {isPriceDetailsExpanded && (
          <div
            id="price-details-expander-content"
            style={{
              marginTop: '12px',
              paddingTop: '10px',
              borderTop: '1px dashed var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              fontSize: '13px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Item Total</span>
              <span className="tabular-nums" style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>
                {formatINR(calculations.itemsTotal)}
              </span>
            </div>

            {calculations.couponDiscount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-primary-sage)' }}>
                <span>Coupon Discount ({calculations.appliedCouponCode})</span>
                <span className="tabular-nums" style={{ fontWeight: 600 }}>
                  −{formatINR(calculations.couponDiscount)}
                </span>
              </div>
            )}

            {calculations.prepaidSaving > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-accent-clay)' }}>
                <span>Prepaid Saving (5%)</span>
                <span className="tabular-nums" style={{ fontWeight: 600 }}>
                  −{formatINR(calculations.prepaidSaving)}
                </span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Shipping Fee</span>
              <span style={{ fontWeight: 600, color: '#16A34A' }}>
                {calculations.shippingFee === 0 ? 'FREE' : formatINR(calculations.shippingFee)}
              </span>
            </div>

            {calculations.codFee > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>COD Handling Fee</span>
                <span className="tabular-nums" style={{ fontWeight: 500 }}>
                  +{formatINR(calculations.codFee)}
                </span>
              </div>
            )}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '10px',
                marginTop: '4px',
                borderTop: 'var(--border-width) solid var(--color-border)',
                fontWeight: 700,
                fontSize: '15px',
                color: 'var(--color-text-primary)',
              }}
            >
              <span>Total Payable</span>
              <span className="tabular-nums price-pulse" style={{ color: 'var(--color-primary-sage)', fontSize: '16px', fontWeight: 700 }}>
                {formatINR(calculations.totalPayable)}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
