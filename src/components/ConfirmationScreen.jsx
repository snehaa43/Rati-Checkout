'use client';

import React from 'react';
import { DEMO_CONFIG } from '@/constants/data';
import { formatINR } from '@/utils/formatters';

export default function ConfirmationScreen({
  orderState, // 'confirmed' | 'failed'
  calculations,
  paymentMethod,
  addressData,
  deliveryDate,
  orderedItems = [],
  buyerPhone,
  onTryAgain,
  onChangePaymentMethod,
}) {
  const getMethodLabel = (method) => {
    switch (method) {
      case 'upi': return 'UPI';
      case 'cards': return 'Credit / Debit Card';
      case 'netbanking': return 'Netbanking';
      case 'cod': return 'Cash on Delivery';
      default: return 'Online Payment';
    }
  };

  // Payment Failed State
  if (orderState === 'failed') {
    return (
      <div className="checkout-content animate-fade-in" style={{ maxWidth: '440px', margin: '0 auto', width: '100%' }}>
        <div
          className="checkout-section"
          style={{
            textAlign: 'center',
            padding: '28px 16px',
            border: 'var(--border-width) solid var(--color-danger)',
          }}
          id="payment-failed-state"
        >
          {/* Failure Mark */}
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-danger-tint)',
              color: 'var(--color-danger)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>

          <h1 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
            Payment Failed
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '24px', lineHeight: 1.4 }}>
            We could not complete your payment via {getMethodLabel(paymentMethod)}. Your cart and address details have been preserved.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              type="button"
              onClick={onTryAgain}
              id="btn-payment-try-again"
              className="btn-primary"
            >
              Try Again
            </button>
            <button
              type="button"
              onClick={onChangePaymentMethod}
              id="btn-choose-another-method"
              className="btn-secondary"
            >
              Choose Another Method
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Confirmation Success State
  return (
    <div className="checkout-content animate-fade-in" style={{ maxWidth: '440px', margin: '0 auto', width: '100%' }}>
      <div className="checkout-section" id="order-confirmed-state" style={{ padding: '24px 16px' }}>
        {/* Success Check Mark */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-sage-tint)',
              color: 'var(--color-primary-sage)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>

          <h1 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
            Order Confirmed!
          </h1>
          <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            Order ID: <strong style={{ color: 'var(--color-text-primary)' }} className="tabular-nums" id="confirmation-order-id">{DEMO_CONFIG.orderId}</strong>
          </div>
        </div>

        {/* WhatsApp Notification Message */}
        <div
          style={{
            backgroundColor: 'var(--color-bg)',
            borderRadius: 'var(--radius-base)',
            border: 'var(--border-width) solid var(--color-border)',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px',
            fontSize: '12px',
            color: 'var(--color-text-secondary)',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-sage)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
          <span>
            Order updates and tracking link will be sent via WhatsApp to <strong>+91 {buyerPhone}</strong>.
          </span>
        </div>

        {/* Order Details Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
          {/* Estimated Delivery */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
            <span style={{ color: 'var(--color-text-secondary)' }}>Estimated Delivery</span>
            <span style={{ fontWeight: 600, color: 'var(--color-primary-sage)' }}>{deliveryDate}</span>
          </div>

          {/* Amount Paid */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
            <span style={{ color: 'var(--color-text-secondary)' }}>Amount Paid</span>
            <span className="tabular-nums" style={{ fontWeight: 600, color: 'var(--color-text-primary)', fontSize: '14px' }}>
              {formatINR(calculations.totalPayable)}
            </span>
          </div>

          {/* Payment Method */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
            <span style={{ color: 'var(--color-text-secondary)' }}>Payment Method</span>
            <span style={{ fontWeight: 500 }}>{getMethodLabel(paymentMethod)}</span>
          </div>

          {/* Delivery Address */}
          <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
            <div style={{ color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Delivery Address</div>
            <div style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>{addressData.fullName}</div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '12px', lineHeight: 1.4 }}>
              {addressData.houseStreet}
              {addressData.landmark ? `, ${addressData.landmark}` : ''}
              <br />
              {addressData.city}, {addressData.state} - {addressData.pincode}
            </div>
          </div>

          {/* Ordered Items */}
          <div>
            <div style={{ color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Ordered Items</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {orderedItems.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span className="tabular-nums" style={{ fontWeight: 500 }}>
                    {formatINR(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Track Order Button */}
        <div style={{ marginTop: '24px' }}>
          <button
            type="button"
            id="btn-track-order"
            className="btn-primary"
            onClick={() => {
              // Non-functional mock button conforming to PRD (do not invent external tracking page)
              alert(`Order ${DEMO_CONFIG.orderId} is registered with Blue Dart. Courier tracking will initiate upon pickup.`);
            }}
          >
            Track Order
          </button>
        </div>
      </div>
    </div>
  );
}
