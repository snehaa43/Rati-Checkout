// Analytics Event Definitions as specified in PRD Section 16
// Events are defined and mock-logged; no external analytics service is called.

export function trackEvent(eventName, properties = {}) {
  const timestamp = new Date().toISOString();
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log(`[Rati Analytics] ${eventName}`, {
      timestamp,
      ...properties,
    });
  }
}
