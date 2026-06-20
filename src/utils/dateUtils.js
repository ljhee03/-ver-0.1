export function getDday(expiryDate) {
  if (!expiryDate) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDate);
  expiry.setHours(0, 0, 0, 0);
  const diff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  return diff;
}

export function getDdayLabel(dday) {
  if (dday === null) return null;
  if (dday < 0) return '지남';
  if (dday === 0) return 'D-0';
  return `D-${dday}`;
}

export function getDdayColor(dday) {
  if (dday === null) return null;
  if (dday < 0) return 'var(--dday-past)';
  if (dday === 0) return 'var(--dday-0)';
  if (dday === 1) return 'var(--dday-1)';
  if (dday === 2) return 'var(--dday-2)';
  return null;
}

export function shouldShowDday(dday) {
  return dday !== null && dday <= 2;
}

export function isImminent(expiryDate) {
  const dday = getDday(expiryDate);
  return dday !== null && dday <= 1;
}

export function isDepleted(quantity) {
  return quantity === 0;
}

export function formatDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

export function todayString() {
  return new Date().toISOString().split('T')[0];
}
