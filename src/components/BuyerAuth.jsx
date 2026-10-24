'use client';

import React, { useState, useEffect, useRef } from 'react';
import { DEMO_CONFIG } from '@/constants/data';
import { trackEvent } from '@/utils/analytics';

// Crisp Indian Flag SVG
function IndiaFlag() {
  return (
    <svg width="20" height="15" viewBox="0 0 24 16" fill="none" style={{ borderRadius: '2px', flexShrink: 0 }}>
      <rect width="24" height="16" rx="2" fill="#FFFFFF" />
      <rect width="24" height="5.33" fill="#FF9933" />
      <rect y="10.67" width="24" height="5.33" fill="#138808" />
      <circle cx="12" cy="8" r="2.2" stroke="#000080" strokeWidth="0.8" fill="none" />
      <circle cx="12" cy="8" r="0.5" fill="#000080" />
    </svg>
  );
}

// Illustration for Mobile Number Screen
function MobileIllustration({ size = 92 }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
        <ellipse cx="60" cy="62" rx="46" ry="42" fill="#F0EBFE" />
        <ellipse cx="64" cy="56" rx="38" ry="38" fill="#EDE7FE" />

        <rect
          x="40"
          y="24"
          width="40"
          height="72"
          rx="9"
          fill="#FFFFFF"
          stroke="#2A2438"
          strokeWidth="2.5"
        />
        <line x1="54" y1="30" x2="66" y2="30" stroke="#2A2438" strokeWidth="2" strokeLinecap="round" />
        <line x1="53" y1="88" x2="67" y2="88" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />

        <g filter="drop-shadow(0px 3px 6px rgba(92, 51, 230, 0.25))">
          <path
            d="M52 38H76C79.3137 38 82 40.6863 82 44V58C82 61.3137 79.3137 64 76 64H59.5L52.5 70V64H52C48.6863 64 46 61.3137 46 58V44C46 40.6863 48.6863 38 52 38Z"
            fill="#5C33E6"
          />
          <path
            d="M61 48C59.34 48 58 49.34 58 51C58 54.31 60.69 57 64 57C65.66 57 67 55.66 67 54L65.5 52.5C65.1 52.1 64.5 52.1 64.1 52.5L63.5 53.1C62.1 52.4 61.6 51.9 60.9 50.5L61.5 49.9C61.9 49.5 61.9 48.9 61.5 48.5L61 48Z"
            fill="#FFFFFF"
          />
        </g>

        <line x1="86" y1="36" x2="90" y2="34" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
        <line x1="88" y1="44" x2="93" y2="44" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// Illustration for OTP Screen conforming exactly to reference design
function OtpIllustration({ size = 96 }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
        {/* Soft Lavender Background Glow */}
        <ellipse cx="60" cy="60" rx="46" ry="46" fill="#F0EBFE" />
        <ellipse cx="60" cy="60" rx="36" ry="36" fill="#EDE7FE" />

        {/* Small sparks on top left radiating outward */}
        <line x1="28" y1="36" x2="22" y2="33" stroke="#6D28D9" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="46" x2="18" y2="46" stroke="#6D28D9" strokeWidth="2" strokeLinecap="round" />
        <line x1="29" y1="56" x2="23" y2="60" stroke="#6D28D9" strokeWidth="2" strokeLinecap="round" />

        {/* Smartphone Body */}
        <rect
          x="41"
          y="22"
          width="42"
          height="74"
          rx="10"
          fill="#FFFFFF"
          stroke="#1E1B2E"
          strokeWidth="2.5"
        />
        {/* Top Speaker / Notch */}
        <line x1="56" y1="28" x2="68" y2="28" stroke="#1E1B2E" strokeWidth="2" strokeLinecap="round" />
        {/* Bottom Home Indicator */}
        <line x1="54" y1="89" x2="70" y2="89" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />

        {/* Message Bubble with Asterisks *** */}
        <g filter="drop-shadow(0px 3px 6px rgba(92, 51, 230, 0.2))">
          <path
            d="M48 37H74C77.3137 37 80 39.6863 80 43V55C80 58.3137 77.3137 61 74 61H58L52 67V61H48C44.6863 61 42 58.3137 42 55V43C42 39.6863 44.6863 37 48 37Z"
            fill="#5C33E6"
          />
          {/* Asterisks *** */}
          <text x="61" y="52" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="monospace" letterSpacing="2">
            ***
          </text>
        </g>

        {/* Subtle line inside phone screen */}
        <line x1="48" y1="68" x2="66" y2="68" stroke="#F1F5F9" strokeWidth="2" strokeLinecap="round" />

        {/* Shield with Checkmark Badge */}
        <g filter="drop-shadow(0px 2px 5px rgba(92, 51, 230, 0.25))">
          <path
            d="M74 53C74 53 82.5 50.5 83.5 46.5C84.5 54 82.5 64 74 68.5C65.5 64 63.5 54 64.5 46.5C65.5 50.5 74 53 74 53Z"
            fill="#5C33E6"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M70.5 58L73 60.5L77.5 55.5"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}

export default function BuyerAuth({
  phone,
  onPhoneChange,
  onVerifySuccess,
  brandName = 'Aarav Naturals',
  subStage: externalSubStage,
  onSubStageChange,
}) {
  const [internalSubStage, setInternalSubStage] = useState('phone');
  const subStage = externalSubStage !== undefined ? externalSubStage : internalSubStage;

  const setSubStage = (val) => {
    setInternalSubStage(val);
    if (onSubStageChange) {
      onSubStageChange(val);
    }
  };

  const [phoneError, setPhoneError] = useState('');

  // 4 individual OTP boxes
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [otpAttempts, setOtpAttempts] = useState(0);

  // 30-second resend countdown
  const [countdown, setCountdown] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const otpInputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Validate phone number as user types
  const handlePhoneInputChange = (e) => {
    const rawVal = e.target.value.replace(/\D/g, '');
    if (rawVal.length <= 10) {
      onPhoneChange(rawVal);
      validatePhone(rawVal);
    }
  };

  const validatePhone = (num) => {
    if (!num) {
      setPhoneError('');
      return false;
    }
    if (num.length > 0 && parseInt(num[0], 10) < 6) {
      setPhoneError('Mobile number must start with 6, 7, 8, or 9');
      return false;
    }
    if (num.length < 10) {
      setPhoneError('Please enter a valid 10-digit mobile number');
      return false;
    }
    if (num.length === 10) {
      setPhoneError('');
      return true;
    }
    return false;
  };

  const isPhoneValid = phone.length === 10 && parseInt(phone[0], 10) >= 6;

  const handlePhoneSubmit = (e) => {
    if (e) e.preventDefault();
    if (!isPhoneValid) {
      setPhoneError('Please enter a valid 10-digit mobile number');
      return;
    }

    const isReturning = phone === DEMO_CONFIG.returningBuyerNumber;
    trackEvent('otp_requested', {
      brand: brandName,
      buyer_type: isReturning ? 'returning' : 'new',
    });

    setSubStage('otp');
    setOtpValues(['', '', '', '']);
    setOtpError('');
    setCountdown(30);
    setIsResendDisabled(true);

    setTimeout(() => {
      otpInputRefs[0].current?.focus();
    }, 100);
  };

  useEffect(() => {
    let timer;
    if (subStage === 'otp' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setIsResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [subStage, countdown]);

  useEffect(() => {
    if (subStage === 'phone') {
      setOtpValues(['', '', '', '']);
      setOtpError('');
    }
  }, [subStage]);

  // Robust OTP input handling
  const handleOtpBoxChange = (index, value) => {
    const clean = value.replace(/\D/g, '');

    // Handle pasting or multiple chars typed at once
    if (clean.length > 1) {
      const digits = clean.slice(0, 4).split('');
      const nextOtp = [...otpValues];
      digits.forEach((d, i) => {
        if (index + i < 4) nextOtp[index + i] = d;
      });
      setOtpValues(nextOtp);
      setOtpError('');
      const nextFocus = Math.min(index + digits.length, 3);
      otpInputRefs[nextFocus].current?.focus();
      return;
    }

    const digit = clean.slice(-1);
    const nextOtp = [...otpValues];
    nextOtp[index] = digit;
    setOtpValues(nextOtp);
    setOtpError('');

    if (digit && index < 3) {
      otpInputRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otpValues[index] && index > 0) {
        otpInputRefs[index - 1].current?.focus();
      } else if (otpValues[index]) {
        const nextOtp = [...otpValues];
        nextOtp[index] = '';
        setOtpValues(nextOtp);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      otpInputRefs[index - 1].current?.focus();
    } else if (e.key === 'ArrowRight' && index < 3) {
      otpInputRefs[index + 1].current?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (pastedData.length > 0) {
      const nextOtp = ['', '', '', ''];
      for (let i = 0; i < pastedData.length; i++) {
        nextOtp[i] = pastedData[i];
      }
      setOtpValues(nextOtp);
      setOtpError('');
      const nextIndex = Math.min(pastedData.length, 3);
      otpInputRefs[nextIndex].current?.focus();
    }
  };

  const verifyOtpCode = (code) => {
    const attempts = otpAttempts + 1;
    setOtpAttempts(attempts);

    if (code === DEMO_CONFIG.demoOtp) {
      trackEvent('otp_verified', { attempts });
      const isReturning = phone === DEMO_CONFIG.returningBuyerNumber;
      onVerifySuccess(phone, isReturning);
    } else {
      setOtpError('Incorrect code. Please enter 1234 for demo.');
      setIsShaking(true);
      setOtpValues(['', '', '', '']);
      setTimeout(() => {
        setIsShaking(false);
        otpInputRefs[0].current?.focus();
      }, 450);
    }
  };

  const handleResendOtp = () => {
    if (isResendDisabled) return;
    setCountdown(30);
    setIsResendDisabled(true);
    setOtpValues(['', '', '', '']);
    setOtpError('');
    otpInputRefs[0].current?.focus();
  };

  const handleChangeNumber = () => {
    setSubStage('phone');
    setOtpError('');
    setOtpValues(['', '', '', '']);
  };

  const formattedCountdown = `00:${countdown < 10 ? `0${countdown}` : countdown}`;
  const isOtpComplete = otpValues.every((v) => v !== '');

  return (
    <div
      className="animate-fade-in"
      style={{
        maxWidth: '440px',
        margin: '0 auto',
        width: '100%',
        padding: subStage === 'otp' ? '6px 20px 36px' : '24px 20px 36px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}
    >
      {/* SCREEN 1: Enter Mobile Number */}
      {subStage === 'phone' && (
        <div style={{ width: '100%' }}>
          <MobileIllustration />

          <h1
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#1E1B2E',
              marginBottom: '10px',
              lineHeight: 1.25,
            }}
          >
            Enter Mobile Number
          </h1>

          <p
            style={{
              fontSize: '14px',
              color: '#64748B',
              marginBottom: '28px',
              lineHeight: 1.5,
            }}
          >
            We&apos;ll send you a 4 digit OTP to verify your mobile number and proceed with your order.
          </p>

          <form onSubmit={handlePhoneSubmit} noValidate>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                border: `1.5px solid ${phoneError ? '#DC2626' : '#E2E8F0'}`,
                borderRadius: '12px',
                backgroundColor: phoneError ? '#FEF2F2' : '#FFFFFF',
                padding: '4px 6px',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  cursor: 'default',
                  userSelect: 'none',
                }}
              >
                <IndiaFlag />
                <span style={{ fontSize: '15px', fontWeight: 600, color: '#1E1B2E' }}>
                  +91
                </span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>

              <div
                style={{
                  width: '1px',
                  height: '24px',
                  backgroundColor: '#E2E8F0',
                  marginRight: '12px',
                }}
              />

              <input
                id="input-mobile-number"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                pattern="[0-9]*"
                value={phone}
                onChange={handlePhoneInputChange}
                placeholder="Mobile number"
                maxLength={10}
                className="tabular-nums"
                suppressHydrationWarning
                style={{
                  flex: 1,
                  border: 'none',
                  padding: '10px 4px',
                  fontSize: '16px',
                  fontFamily: 'inherit',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  color: '#1E1B2E',
                  fontWeight: 500,
                }}
              />
            </div>

            {phoneError && (
              <div
                className="field-error-text"
                id="phone-inline-error"
                role="alert"
                style={{ marginTop: '8px', color: '#DC2626', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>{phoneError}</span>
              </div>
            )}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '12px',
                color: '#64748B',
                fontSize: '12px',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>Your mobile number is safe with us.</span>
            </div>

            <div style={{ marginTop: '32px' }}>
              <button
                type="submit"
                id="btn-continue-phone"
                disabled={!isPhoneValid}
                suppressHydrationWarning
                style={{
                  width: '100%',
                  height: '52px',
                  borderRadius: '12px',
                  backgroundColor: isPhoneValid ? '#5C33E6' : '#C4B5FD',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: isPhoneValid ? 'pointer' : 'not-allowed',
                  transition: 'background-color 0.2s ease',
                  boxShadow: isPhoneValid ? '0 4px 14px rgba(92, 51, 230, 0.3)' : 'none',
                }}
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SCREEN 2: Verify Mobile Number conforming to reference design */}
      {subStage === 'otp' && (
        <div style={{ width: '100%' }} className={isShaking ? 'animate-shake' : ''}>
          <OtpIllustration size={96} />

          <h1
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#1E1B2E',
              marginBottom: '8px',
              lineHeight: 1.25,
              letterSpacing: '-0.01em',
            }}
          >
            Verify Mobile Number
          </h1>

          <p
            style={{
              fontSize: '14px',
              color: '#64748B',
              marginBottom: '24px',
              lineHeight: 1.5,
            }}
          >
            We&apos;ve sent a 4 digit OTP to your mobile number for verification.
          </p>

          {/* Phone Number Confirmation Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 16px',
              borderRadius: '12px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              marginBottom: '28px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="3" ry="3"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
              </svg>
              <span style={{ fontSize: '15px', fontWeight: 600, color: '#1E1B2E', letterSpacing: '0.01em' }} className="tabular-nums">
                +91 {phone.length === 10 ? `${phone.slice(0, 5)} ${phone.slice(5)}` : phone}
              </span>
            </div>

            <button
              type="button"
              onClick={handleChangeNumber}
              id="link-change-number"
              style={{
                background: 'none',
                border: 'none',
                color: '#5C33E6',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                padding: '4px 6px',
                transition: 'opacity 0.15s ease',
              }}
            >
              Change
            </button>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); verifyOtpCode(otpValues.join('')); }}>
            <div style={{ marginBottom: '14px' }}>
              <label
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#1E1B2E',
                  display: 'block',
                }}
              >
                Enter OTP
              </label>
            </div>

            {/* 4 square OTP boxes */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
                marginBottom: '16px',
                width: '100%',
              }}
              onPaste={handleOtpPaste}
            >
              {otpValues.map((val, idx) => {
                const isBoxFilled = Boolean(val);
                return (
                  <input
                    key={idx}
                    ref={otpInputRefs[idx]}
                    id={`otp-input-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={val}
                    onChange={(e) => handleOtpBoxChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    onFocus={(e) => e.target.select()}
                    aria-label={`Digit ${idx + 1} of 4`}
                    className={`tabular-nums ${otpError ? 'input-error' : ''}`}
                    suppressHydrationWarning
                    style={{
                      width: '56px',
                      height: '58px',
                      minWidth: '56px',
                      maxWidth: '56px',
                      textAlign: 'center',
                      fontSize: '22px',
                      fontWeight: 600,
                      borderRadius: '12px',
                      border: `1.5px solid ${otpError ? '#DC2626' : isBoxFilled ? '#5C33E6' : '#E2E8F0'}`,
                      backgroundColor: otpError ? '#FEF2F2' : '#FFFFFF',
                      color: '#1E1B2E',
                      outline: 'none',
                      transition: 'all 0.15s ease',
                      boxShadow: isBoxFilled ? '0 0 0 2px rgba(92, 51, 230, 0.1)' : 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                );
              })}
            </div>

            {/* Resend and Countdown Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '13px',
                marginBottom: otpError ? '14px' : '36px',
              }}
            >
              <div>
                <span style={{ color: '#64748B' }}>Didn&apos;t receive the OTP? </span>
                {isResendDisabled ? (
                  <span style={{ color: '#94A3B8', fontWeight: 600, cursor: 'not-allowed' }}>
                    Resend OTP
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    id="btn-resend-otp"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#5C33E6',
                      fontWeight: 600,
                      cursor: 'pointer',
                      padding: 0,
                      fontSize: '13px',
                    }}
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <div style={{ color: '#64748B', fontWeight: 500 }} className="tabular-nums">
                {formattedCountdown}
              </div>
            </div>

            {otpError && (
              <div
                className="field-error-text"
                id="otp-inline-error"
                role="alert"
                style={{ color: '#DC2626', fontSize: '13px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>{otpError}</span>
              </div>
            )}

            <div>
              <button
                type="submit"
                id="btn-verify-otp"
                disabled={!isOtpComplete}
                suppressHydrationWarning
                style={{
                  width: '100%',
                  height: '52px',
                  borderRadius: '12px',
                  backgroundColor: isOtpComplete ? '#5C33E6' : '#CBD5E1',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: isOtpComplete ? 'pointer' : 'not-allowed',
                  transition: 'background-color 0.2s ease',
                  boxShadow: isOtpComplete ? '0 4px 14px rgba(92, 51, 230, 0.3)' : 'none',
                }}
              >
                Verify & Continue
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
