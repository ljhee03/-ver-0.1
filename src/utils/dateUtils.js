export function getDaysRemaining(expDate) {
  if (!expDate) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const exp = new Date(expDate);
  exp.setHours(0, 0, 0, 0);
  return Math.round((exp - today) / 86400000);
}

export function formatDate(dateStr) {
  if (!dateStr) return '없음';
  return dateStr;
}

export function todayString() {
  const d = new Date();
  const p = n => String(n).padStart(2, '0');
  return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
}
