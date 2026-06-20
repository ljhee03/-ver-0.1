export const LOCATIONS = {
  fridge: {
    name: '냉장고', emoji: '🧊',
    head: '#46967D', head2: '#3C8770', body: '#E2F3EB', accent: '#3C8770',
    cats: ['냉장', '냉동', '실온'], per: 2,
  },
  drawer: {
    name: '서랍장', emoji: '🧺',
    head: '#D49A6A', head2: '#C5895A', body: '#FBEEDD', accent: '#C5895A',
    cats: ['주방용품', '청소용품', '소모품'], per: 4,
  },
  bathroom: {
    name: '화장실', emoji: '🛁',
    head: '#9488C6', head2: '#867AB8', body: '#ECE8F6', accent: '#867AB8',
    cats: ['세면용품', '욕실용품', '위생용품'], per: 4,
  },
  settings: {
    name: '설정', emoji: '⚙️',
    head: '#BDBDC6', head2: '#A8A8B2', body: '#ECECF1', accent: '#9A9AA6',
    cats: [], per: 4,
  },
};

export const LOC_KEYS = ['fridge', 'drawer', 'bathroom'];

export const ICONS = [
  '🥛','🥚','🍎','🍞','🥦','🍗','🧀','🍚','🧻','🧴','🧼','🧽',
  '🧤','🔋','💡','🧹','😷','🪥','🥤','🛒','🍜','🥟',
];

export const RECENT_SUGGESTIONS = [
  { name: '우유', emoji: '🥛' },
  { name: '달걀', emoji: '🥚' },
  { name: '사과', emoji: '🍎' },
  { name: '휴지', emoji: '🧻' },
];

function fmt(d) {
  const p = n => String(n).padStart(2, '0');
  return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
}

function addDays(d, n) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

export function buildSampleData() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const raw = [
    ['fridge','냉장','우유','🥛',2,2,false],
    ['fridge','냉장','달걀','🥚',6,11,false],
    ['fridge','냉장','요거트','🍨',1,5,true],
    ['fridge','냉장','사과','🍎',4,9,false],
    ['fridge','냉장','김치','🥬',8,40,false],
    ['fridge','냉장','두부','🧈',2,4,false],
    ['fridge','냉동','냉동만두','🥟',2,120,false],
    ['fridge','냉동','아이스크림','🍦',0,null,false],
    ['fridge','냉동','냉동피자','🍕',1,200,false],
    ['fridge','실온','쌀','🍚',1,200,false],
    ['fridge','실온','라면','🍜',5,null,false],
    ['drawer','주방용품','키친타올','🧻',1,null,true],
    ['drawer','주방용품','지퍼백','🛍️',12,null,false],
    ['drawer','주방용품','위생장갑','🧤',5,null,false],
    ['drawer','주방용품','호일','📜',3,null,false],
    ['drawer','주방용품','종이컵','🥤',30,null,false],
    ['drawer','주방용품','빨대','🧃',0,null,false],
    ['drawer','청소용품','주방세제','🧴',2,null,false],
    ['drawer','청소용품','고무장갑','🧤',0,null,false],
    ['drawer','청소용품','수세미','🧽',4,null,false],
    ['drawer','청소용품','락스','🪣',1,null,true],
    ['drawer','소모품','건전지 AA','🔋',8,null,false],
    ['drawer','소모품','전구','💡',1,null,true],
    ['drawer','소모품','테이프','🎞️',2,null,false],
    ['bathroom','세면용품','치약','🪥',3,null,false],
    ['bathroom','세면용품','샴푸','🧴',1,null,true],
    ['bathroom','세면용품','비누','🧼',0,null,false],
    ['bathroom','세면용품','클렌징폼','🫧',1,null,true],
    ['bathroom','세면용품','면도기','🪒',2,null,false],
    ['bathroom','욕실용품','휴지','🧻',6,null,false],
    ['bathroom','욕실용품','세탁세제','🧴',2,null,false],
    ['bathroom','욕실용품','섬유유연제','🌸',1,null,true],
    ['bathroom','욕실용품','청소솔','🧹',1,null,true],
    ['bathroom','위생용품','면봉','🩹',1,3,false],
    ['bathroom','위생용품','마스크','😷',10,null,false],
    ['bathroom','위생용품','밴드','⛑️',5,null,false],
  ];

  let id = 1;
  return raw.map((r, i) => {
    const days = r[5];
    return {
      id: id++,
      loc: r[0],
      cat: r[1],
      name: r[2],
      emoji: r[3],
      qty: r[4],
      low: r[6],
      reg: fmt(addDays(today, -(15 + (i * 9) % 150))),
      exp: days != null ? fmt(addDays(today, days)) : '',
    };
  });
}
