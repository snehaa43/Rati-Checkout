'use client';

import React, { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import Header from '@/components/Header';
import BuyerAuth from '@/components/BuyerAuth';
import OrderSummary from '@/components/OrderSummary';
import OffersCoupons from '@/components/OffersCoupons';
import RecommendedAddons from '@/components/RecommendedAddons';
import DeliveryAddress from '@/components/DeliveryAddress';
import DeliveryPromise from '@/components/DeliveryPromise';
import PaymentSection from '@/components/PaymentSection';
import MobileStickyBar from '@/components/MobileStickyBar';
import ConfirmationScreen from '@/components/ConfirmationScreen';
import DemoControls from '@/components/DemoControls';

import {
  BRAND_CONFIG,
  INITIAL_PRODUCT,
  RECOMMENDED_ADDONS,
  DEMO_CONFIG,
  PINCODE_MAP,
  RETURNING_BUYER_DATA,
} from '@/constants/data';
import { trackEvent } from '@/utils/analytics';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const brandParam = searchParams.get('brand');
  const brandName = brandParam === 'aarav-naturals' ? 'Aarav Naturals' : BRAND_CONFIG.name;

  // Mount state to avoid SSR hydration mismatches caused by browser extensions injecting attributes (e.g. fdprocessedid)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Checkout Stage: 'auth' | 'checkout' | 'result'
  const [checkoutStage, setCheckoutStage] = useState('auth');
  // Auth Sub-Stage: 'phone' | 'otp'
  const [authSubStage, setAuthSubStage] = useState('phone');

  // Buyer Info
  const [buyerPhone, setBuyerPhone] = useState(DEMO_CONFIG.returningBuyerNumber);
  const [isReturningBuyer, setIsReturningBuyer] = useState(true);

  // Cart state: Main Product + Add-ons
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const [activeAddonsMap, setActiveAddonsMap] = useState({});

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Address and Pincode
  const [addressData, setAddressData] = useState(RETURNING_BUYER_DATA);
  const [currentPincode, setCurrentPincode] = useState(RETURNING_BUYER_DATA.pincode);
  const [isPincodeServiceable, setIsPincodeServiceable] = useState(true);
  const [highlightField, setHighlightField] = useState('');

  // Payment Method: 'upi' | 'cards' | 'netbanking' | 'cod'
  const [paymentMethod, setPaymentMethod] = useState('upi');

  // Order Result State: 'confirmed' | 'failed'
  const [orderResultState, setOrderResultState] = useState('confirmed');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Demo Controls: Simulate payment failure
  const [simulateFailure, setSimulateFailure] = useState(false);

  // Track initial checkout opened event
  useEffect(() => {
    trackEvent('checkout_opened', {
      brand: brandName,
      device: typeof window !== 'undefined' && window.innerWidth <= 480 ? 'mobile' : 'desktop',
      entry_source: 'direct',
    });
  }, [brandName]);

  // Derived: Active Add-ons List
  const activeAddonsList = useMemo(() => {
    return RECOMMENDED_ADDONS.filter((addon) => (activeAddonsMap[addon.id] || 0) > 0).map((addon) => ({
      ...addon,
      quantity: activeAddonsMap[addon.id],
    }));
  }, [activeAddonsMap]);

  // Derived: Has Items in cart
  const hasItems = product.quantity > 0 || activeAddonsList.length > 0;

  // Pricing calculations conforming to PRD Section 11
  const calculations = useMemo(() => {
    // 1. Items total = product + add-ons
    const productSubtotal = product.quantity * product.price;
    const addonsSubtotal = activeAddonsList.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemsTotal = productSubtotal + addonsSubtotal;

    const itemCount = product.quantity + activeAddonsList.reduce((sum, item) => sum + item.quantity, 0);

    // 2. Coupon discount
    let couponDiscount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.code === 'WELCOME10') {
        // 10% discount on items, capped at ₹250
        const rawDiscount = itemsTotal * 0.1;
        couponDiscount = Math.min(rawDiscount, 250);
      } else if (appliedCoupon.code === 'FREESHIP') {
        // Shipping is free when items exceed ₹999
        couponDiscount = 0;
      } else if (appliedCoupon.code === 'PREPAID5') {
        // PREPAID5 represents the 5% prepaid benefit and does not stack with automatic saving
        // If online method is chosen, automatic prepaid saving handles it; if not, coupon discount
        if (paymentMethod === 'cod') {
          couponDiscount = itemsTotal * 0.05;
        } else {
          couponDiscount = 0; // handled by prepaid saving to prevent double stacking
        }
      }
    }

    // 3. Prepaid saving: 5% when online payment method is selected (UPI, Cards, Netbanking)
    // On original ₹2,399 product, saving = ₹119.95. Removed under COD.
    let prepaidSaving = 0;
    if (paymentMethod !== 'cod') {
      prepaidSaving = itemsTotal * 0.05;
    }

    // 4. Shipping fee: Free for demo cart
    const shippingFee = 0;

    // 5. COD fee: ₹49 only when Cash on Delivery is selected
    const codFee = paymentMethod === 'cod' ? DEMO_CONFIG.codFee : 0;

    // Total Payable = Items - Coupon discount - Prepaid saving + Shipping + COD fee
    let totalPayable = itemsTotal - couponDiscount - prepaidSaving + shippingFee + codFee;
    if (totalPayable < 0) totalPayable = 0;

    // Round to 2 decimal places to avoid IEEE 754 precision issues
    totalPayable = Math.round(totalPayable * 100) / 100;
    couponDiscount = Math.round(couponDiscount * 100) / 100;
    prepaidSaving = Math.round(prepaidSaving * 100) / 100;

    return {
      itemsTotal,
      itemCount,
      couponDiscount,
      appliedCouponCode: appliedCoupon ? appliedCoupon.code : null,
      prepaidSaving,
      shippingFee,
      codFee,
      totalPayable,
    };
  }, [product, activeAddonsList, appliedCoupon, paymentMethod]);

  // Handlers for Cart
  const handleProductQuantityChange = (newQty) => {
    setProduct((prev) => ({
      ...prev,
      quantity: Math.max(0, newQty),
    }));
  };

  const handleAddAddon = (addon) => {
    setActiveAddonsMap((prev) => ({
      ...prev,
      [addon.id]: (prev[addon.id] || 0) + 1,
    }));
  };

  const handleUpdateAddonQuantity = (addonId, newQty) => {
    setActiveAddonsMap((prev) => {
      const updated = { ...prev };
      if (newQty <= 0) {
        delete updated[addonId];
      } else {
        updated[addonId] = newQty;
      }
      return updated;
    });
  };

  const handleRemoveAddon = (addonId) => {
    setActiveAddonsMap((prev) => {
      const updated = { ...prev };
      delete updated[addonId];
      return updated;
    });
  };

  // Coupons
  const handleApplyCoupon = (coupon) => {
    setAppliedCoupon(coupon);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  // OTP Verification Success
  const handleVerifySuccess = (verifiedPhone, isReturning) => {
    setBuyerPhone(verifiedPhone);
    setIsReturningBuyer(isReturning);

    if (isReturning) {
      setAddressData(RETURNING_BUYER_DATA);
      setCurrentPincode(RETURNING_BUYER_DATA.pincode);
      setIsPincodeServiceable(true);
    } else {
      setAddressData({
        fullName: '',
        pincode: '',
        houseStreet: '',
        landmark: '',
        city: '',
        state: '',
        addressType: 'Home',
        phone: verifiedPhone,
      });
      setCurrentPincode('');
      setIsPincodeServiceable(false);
    }

    setAuthSubStage('phone');
    setCheckoutStage('checkout');
  };

  // Address and Pincode Change
  const handlePincodeChange = (pincode, isServiceable) => {
    setCurrentPincode(pincode);
    setIsPincodeServiceable(isServiceable);
  };

  // Switch Buyer Type (Demo Controls)
  const handleToggleBuyerType = () => {
    const nextReturning = !isReturningBuyer;
    setIsReturningBuyer(nextReturning);

    if (nextReturning) {
      setBuyerPhone(DEMO_CONFIG.returningBuyerNumber);
      setAddressData(RETURNING_BUYER_DATA);
      setCurrentPincode(RETURNING_BUYER_DATA.pincode);
      setIsPincodeServiceable(true);
    } else {
      setBuyerPhone('9123456789');
      setAddressData({
        fullName: '',
        pincode: '',
        houseStreet: '',
        landmark: '',
        city: '',
        state: '',
        addressType: 'Home',
        phone: '9123456789',
      });
      setCurrentPincode('');
      setIsPincodeServiceable(false);
    }
  };

  // Buy Now validation and trigger
  const handleBuyNow = () => {
    if (!hasItems) return;

    // Validate Address fields
    if (!addressData.fullName || !addressData.fullName.trim()) {
      setHighlightField('fullName');
      const el = document.getElementById('input-address-fullname');
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el?.focus();
      return;
    }

    if (!addressData.pincode || addressData.pincode.length !== 6 || !isPincodeServiceable) {
      setHighlightField('pincode');
      const el = document.getElementById('input-address-pincode');
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el?.focus();
      return;
    }

    if (!addressData.houseStreet || !addressData.houseStreet.trim()) {
      setHighlightField('houseStreet');
      const el = document.getElementById('input-address-housestreet');
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el?.focus();
      return;
    }

    setHighlightField('');
    setIsProcessingPayment(true);

    trackEvent('buy_now_clicked', {
      amount: calculations.totalPayable,
      method: paymentMethod,
    });

    // 2-second spinner simulation as specified in PRD FR-25
    setTimeout(() => {
      setIsProcessingPayment(false);

      if (simulateFailure) {
        trackEvent('payment_failed', {
          method: paymentMethod,
          failure_reason: 'simulated_failure',
        });
        setOrderResultState('failed');
      } else {
        trackEvent('payment_succeeded', {
          method: paymentMethod,
        });
        trackEvent('order_created', {
          order_id: DEMO_CONFIG.orderId,
          brand: brandName,
          amount: calculations.totalPayable,
        });
        setOrderResultState('confirmed');
      }

      setCheckoutStage('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };

  // Ordered items summary list for confirmation screen
  const orderedItems = useMemo(() => {
    const items = [];
    if (product.quantity > 0) {
      items.push({
        name: product.name,
        quantity: product.quantity,
        price: product.price,
      });
    }
    activeAddonsList.forEach((addon) => {
      items.push({
        name: addon.name,
        quantity: addon.quantity,
        price: addon.price,
      });
    });
    return items;
  }, [product, activeAddonsList]);

  // Estimated delivery string
  const deliveryDateString = useMemo(() => {
    const info = PINCODE_MAP[currentPincode];
    return isPincodeServiceable && info ? info.deliveryDate : '2–4 business days';
  }, [currentPincode, isPincodeServiceable]);

  // Header Back Handler
  const handleHeaderBack = () => {
    if (checkoutStage === 'result') {
      setCheckoutStage('checkout');
    } else if (checkoutStage === 'checkout') {
      setCheckoutStage('auth');
    } else if (checkoutStage === 'auth' && authSubStage === 'otp') {
      // Return to enter phone number page from verify mobile number page
      setAuthSubStage('phone');
    } else {
      window.history.back();
    }
  };

  const isBuyNowDisabled = !hasItems || !isPincodeServiceable;

  if (!mounted) {
    return (
      <div className="checkout-wrapper">
        <header className="checkout-header" role="banner">
          <div className="header-left">
            <div className="brand-badge">
              <span className="brand-title">{brandName}</span>
            </div>
          </div>
          <div className="header-right" aria-label="Secure checkout">
            <span>Secure checkout</span>
          </div>
        </header>
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
          <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <span className="spinner dark" style={{ width: '24px', height: '24px' }}></span>
            <span style={{ fontSize: '14px', fontWeight: 500 }}>Loading checkout...</span>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="checkout-wrapper">
      {/* Header: minimal on verify mobile number page (arrow only, removes brand Aarav Naturals and Secure Checkout) */}
      <Header
        brandName={brandName}
        onBack={handleHeaderBack}
        minimal={checkoutStage === 'auth' && authSubStage === 'otp'}
      />

      {/* Main Flow */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Stage 1: Buyer Identification & OTP */}
        {checkoutStage === 'auth' && (
          <BuyerAuth
            phone={buyerPhone}
            onPhoneChange={setBuyerPhone}
            onVerifySuccess={handleVerifySuccess}
            brandName={brandName}
            subStage={authSubStage}
            onSubStageChange={setAuthSubStage}
          />
        )}

        {/* Stage 2: Full Scrolling Checkout Page (6 Sections strictly in order) */}
        {checkoutStage === 'checkout' && (
          <div className="checkout-content animate-fade-in">
            {/* Section 1: Order summary */}
            <OrderSummary
              product={product}
              onProductQuantityChange={handleProductQuantityChange}
              activeAddonsList={activeAddonsList}
              onRemoveAddon={handleRemoveAddon}
              calculations={calculations}
              hasItems={hasItems}
            />

            {/* If cart has items, render remaining 5 sections */}
            {hasItems && (
              <>
                {/* Section 2: Offers and coupons */}
                <OffersCoupons
                  appliedCoupon={appliedCoupon}
                  onApplyCoupon={handleApplyCoupon}
                  onRemoveCoupon={handleRemoveCoupon}
                  itemsTotal={calculations.itemsTotal}
                />

                {/* Section 3: Recommended add-ons */}
                <RecommendedAddons
                  activeAddonsMap={activeAddonsMap}
                  onAddAddon={handleAddAddon}
                  onUpdateAddonQuantity={handleUpdateAddonQuantity}
                />

                {/* Section 4: Delivery address */}
                <DeliveryAddress
                  isReturningBuyer={isReturningBuyer}
                  addressData={addressData}
                  onAddressChange={setAddressData}
                  onPincodeChange={handlePincodeChange}
                  highlightField={highlightField}
                />

                {/* Section 5: Delivery promise */}
                <DeliveryPromise
                  currentPincode={currentPincode}
                  isPincodeServiceable={isPincodeServiceable}
                />

                {/* Section 6: Payment */}
                <PaymentSection
                  selectedMethod={paymentMethod}
                  onSelectMethod={setPaymentMethod}
                  prepaidSaving={calculations.prepaidSaving}
                  codFee={DEMO_CONFIG.codFee}
                />
              </>
            )}
          </div>
        )}

        {/* Stage 3: Order Confirmation or Payment Failed */}
        {checkoutStage === 'result' && (
          <ConfirmationScreen
            orderState={orderResultState}
            calculations={calculations}
            paymentMethod={paymentMethod}
            addressData={addressData}
            deliveryDate={deliveryDateString}
            orderedItems={orderedItems}
            buyerPhone={buyerPhone}
            onTryAgain={() => {
              setCheckoutStage('checkout');
              handleBuyNow();
            }}
            onChangePaymentMethod={() => {
              setCheckoutStage('checkout');
              const el = document.getElementById('section-payment');
              el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          />
        )}

        {/* Mobile Sticky Bottom Bar (visible in checkout stage with items) */}
        {checkoutStage === 'checkout' && (
          <MobileStickyBar
            totalPayable={calculations.totalPayable}
            onBuyNow={handleBuyNow}
            isLoading={isProcessingPayment}
            isDisabled={isBuyNowDisabled}
            hasItems={hasItems}
          />
        )}
      </main>

      {/* Desktop-only Collapsed Demo Controls Panel */}
      <DemoControls
        simulateFailure={simulateFailure}
        onToggleSimulateFailure={setSimulateFailure}
        isReturningBuyer={isReturningBuyer}
        onToggleBuyerType={handleToggleBuyerType}
      />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center', color: '#6B685F' }}>Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
