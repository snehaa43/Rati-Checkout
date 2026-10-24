// Indian Currency Formatter conforming to PRD (Tabular numerals, INR, 2 decimal places)

export function formatINR(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) {
    amount = 0;
  }
  // Standard Indian Rupee format with ₹ prefix, comma grouping and 2 decimal places
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return formatted;
}

export function formatShortINR(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) {
    amount = 0;
  }
  // Short format for headers or pills e.g. ₹2,399
  if (amount % 1 === 0) {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
  return formatINR(amount);
}
