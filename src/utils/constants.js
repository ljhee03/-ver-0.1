export const STORAGES = {
  refrigerator: { label: '냉장고', icon: '🧊' },
  cabinet: { label: '수납장', icon: '🗄️' },
  bathroom: { label: '화장실', icon: '🚿' },
};

export const SECTIONS = {
  refrigerator: [
    { value: 'top', label: '위칸' },
    { value: 'middle', label: '중간칸' },
    { value: 'vegetable', label: '야채칸' },
    { value: 'freezer', label: '냉동실' },
  ],
  cabinet: [
    { value: 'snack', label: '간편식' },
    { value: 'hygiene', label: '위생/소모품' },
  ],
  bathroom: [],
};

export const SECTION_LABELS = {
  top: '위칸',
  middle: '중간칸',
  vegetable: '야채칸',
  freezer: '냉동실',
  snack: '간편식',
  hygiene: '위생/소모품',
};

export const STORAGE_KEYS = ['refrigerator', 'cabinet', 'bathroom'];

export const SAMPLE_DATA = [
  { id: '1', name: '우유', image: null, storage: 'refrigerator', section: 'top', quantity: 1, expiryDate: (() => { const d = new Date(); d.setDate(d.getDate() + 2); return d.toISOString().split('T')[0]; })(), memo: '', createdAt: new Date().toISOString().split('T')[0] },
  { id: '2', name: '계란', image: null, storage: 'refrigerator', section: 'top', quantity: 8, expiryDate: null, memo: '', createdAt: new Date().toISOString().split('T')[0] },
  { id: '3', name: '버터', image: null, storage: 'refrigerator', section: 'top', quantity: 1, expiryDate: null, memo: '', createdAt: new Date().toISOString().split('T')[0] },
  { id: '4', name: '김치', image: null, storage: 'refrigerator', section: 'middle', quantity: 1, expiryDate: (() => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split('T')[0]; })(), memo: '', createdAt: new Date().toISOString().split('T')[0] },
  { id: '5', name: '두부', image: null, storage: 'refrigerator', section: 'middle', quantity: 2, expiryDate: (() => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split('T')[0]; })(), memo: '', createdAt: new Date().toISOString().split('T')[0] },
  { id: '6', name: '반찬', image: null, storage: 'refrigerator', section: 'middle', quantity: 3, expiryDate: null, memo: '', createdAt: new Date().toISOString().split('T')[0] },
  { id: '7', name: '양파', image: null, storage: 'refrigerator', section: 'vegetable', quantity: 1, expiryDate: (() => { const d = new Date(); d.setDate(d.getDate() - 1); return d.toISOString().split('T')[0]; })(), memo: '', createdAt: new Date().toISOString().split('T')[0] },
  { id: '8', name: '시금치', image: null, storage: 'refrigerator', section: 'vegetable', quantity: 1, expiryDate: (() => { const d = new Date(); d.setDate(d.getDate()); return d.toISOString().split('T')[0]; })(), memo: '', createdAt: new Date().toISOString().split('T')[0] },
  { id: '9', name: '당근', image: null, storage: 'refrigerator', section: 'vegetable', quantity: 3, expiryDate: null, memo: '', createdAt: new Date().toISOString().split('T')[0] },
  { id: '10', name: '만두', image: null, storage: 'refrigerator', section: 'freezer', quantity: 1, expiryDate: null, memo: '', createdAt: new Date().toISOString().split('T')[0] },
  { id: '11', name: '냉동밥', image: null, storage: 'refrigerator', section: 'freezer', quantity: 2, expiryDate: null, memo: '', createdAt: new Date().toISOString().split('T')[0] },
  { id: '12', name: '라면', image: null, storage: 'cabinet', section: 'snack', quantity: 5, expiryDate: null, memo: '', createdAt: new Date().toISOString().split('T')[0] },
  { id: '13', name: '즉석밥', image: null, storage: 'cabinet', section: 'snack', quantity: 8, expiryDate: null, memo: '', createdAt: new Date().toISOString().split('T')[0] },
  { id: '14', name: '컵밥', image: null, storage: 'cabinet', section: 'snack', quantity: 3, expiryDate: (() => { const d = new Date(); d.setDate(d.getDate() + 2); return d.toISOString().split('T')[0]; })(), memo: '', createdAt: new Date().toISOString().split('T')[0] },
  { id: '15', name: '참치캔', image: null, storage: 'cabinet', section: 'snack', quantity: 4, expiryDate: null, memo: '', createdAt: new Date().toISOString().split('T')[0] },
  { id: '16', name: '물티슈', image: null, storage: 'cabinet', section: 'hygiene', quantity: 1, expiryDate: null, memo: '', createdAt: new Date().toISOString().split('T')[0] },
  { id: '17', name: '키친타올', image: null, storage: 'cabinet', section: 'hygiene', quantity: 2, expiryDate: null, memo: '', createdAt: new Date().toISOString().split('T')[0] },
  { id: '18', name: '휴지', image: null, storage: 'bathroom', section: null, quantity: 3, expiryDate: null, memo: '', createdAt: new Date().toISOString().split('T')[0] },
  { id: '19', name: '칫솔', image: null, storage: 'bathroom', section: null, quantity: 5, expiryDate: null, memo: '', createdAt: new Date().toISOString().split('T')[0] },
  { id: '20', name: '치약', image: null, storage: 'bathroom', section: null, quantity: 3, expiryDate: null, memo: '', createdAt: new Date().toISOString().split('T')[0] },
  { id: '21', name: '샴푸', image: null, storage: 'bathroom', section: null, quantity: 1, expiryDate: null, memo: '', createdAt: new Date().toISOString().split('T')[0] },
  { id: '22', name: '바디워시', image: null, storage: 'bathroom', section: null, quantity: 0, expiryDate: null, memo: '', createdAt: new Date().toISOString().split('T')[0] },
  { id: '23', name: '면도기', image: null, storage: 'bathroom', section: null, quantity: 2, expiryDate: null, memo: '', createdAt: new Date().toISOString().split('T')[0] },
];
