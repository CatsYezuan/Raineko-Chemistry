const symbols =
  `H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og`.split(
    " ",
  );
const names =
  `氢 氦 锂 铍 硼 碳 氮 氧 氟 氖 钠 镁 铝 硅 磷 硫 氯 氩 钾 钙 钪 钛 钒 铬 锰 铁 钴 镍 铜 锌 镓 锗 砷 硒 溴 氪 铷 锶 钇 锆 铌 钼 锝 钌 铑 钯 银 镉 铟 锡 锑 碲 碘 氙 铯 钡 镧 铈 镨 钕 钷 钐 铕 钆 铽 镝 钬 铒 铥 镱 镥 铪 钽 钨 铼 锇 铱 铂 金 汞 铊 铅 铋 钋 砹 氡 钫 镭 锕 钍 镤 铀 镎 钚 镅 锔 锫 锎 锿 镄 钔 锘 铹 Rutherfordium Dubnium Seaborgium Bohrium Hassium Meitnerium Darmstadtium Roentgenium Copernicium Nihonium Flerovium Moscovium Livermorium Tennessine Oganesson`.split(
    " ",
  );

const mainRows = {
  1: { H: 1, He: 18 },
  2: { Li: 1, Be: 2, B: 13, C: 14, N: 15, O: 16, F: 17, Ne: 18 },
  3: { Na: 1, Mg: 2, Al: 13, Si: 14, P: 15, S: 16, Cl: 17, Ar: 18 },
  4: Object.fromEntries(
    `K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr`
      .split(" ")
      .map((item, index) => [item, index + 1]),
  ),
  5: Object.fromEntries(
    `Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe`
      .split(" ")
      .map((item, index) => [item, index + 1]),
  ),
  6: {
    Cs: 1,
    Ba: 2,
    Hf: 4,
    Ta: 5,
    W: 6,
    Re: 7,
    Os: 8,
    Ir: 9,
    Pt: 10,
    Au: 11,
    Hg: 12,
    Tl: 13,
    Pb: 14,
    Bi: 15,
    Po: 16,
    At: 17,
    Rn: 18,
  },
  7: {
    Fr: 1,
    Ra: 2,
    Rf: 4,
    Db: 5,
    Sg: 6,
    Bh: 7,
    Hs: 8,
    Mt: 9,
    Ds: 10,
    Rg: 11,
    Cn: 12,
    Nh: 13,
    Fl: 14,
    Mc: 15,
    Lv: 16,
    Ts: 17,
    Og: 18,
  },
};

const lanthanides = `La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu`.split(" ");
const actinides = `Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr`.split(" ");
const categorySets = {
  alkali: `Li Na K Rb Cs Fr`.split(" "),
  alkaline: `Be Mg Ca Sr Ba Ra`.split(" "),
  metalloid: `B Si Ge As Sb Te Po`.split(" "),
  nonmetal: `H C N O P S Se`.split(" "),
  halogen: `F Cl Br I At Ts`.split(" "),
  noble: `He Ne Ar Kr Xe Rn Og`.split(" "),
};
const categoryNames = {
  alkali: "碱金属",
  alkaline: "碱土金属",
  transition: "过渡金属",
  post: "其他金属",
  metalloid: "类金属",
  nonmetal: "非金属",
  halogen: "卤素",
  noble: "稀有气体",
  lanthanide: "镧系元素",
  actinide: "锕系元素",
};

const getCategory = (symbol, group) => {
  if (lanthanides.includes(symbol)) return "lanthanide";
  if (actinides.includes(symbol)) return "actinide";
  const special = Object.entries(categorySets).find(([, values]) => values.includes(symbol));
  if (special) return special[0];
  return group >= 3 && group <= 12 ? "transition" : "post";
};

export const elements = symbols.map((symbol, index) => {
  const lanthanideIndex = lanthanides.indexOf(symbol);
  const actinideIndex = actinides.indexOf(symbol);
  let period = 0;
  let group = 0;
  let row = 0;
  let column = 0;
  if (lanthanideIndex >= 0) {
    period = 6;
    row = 8;
    column = lanthanideIndex + 3;
  } else if (actinideIndex >= 0) {
    period = 7;
    row = 9;
    column = actinideIndex + 3;
  } else {
    const rowEntry = Object.entries(mainRows).find(([, values]) => values[symbol]);
    period = Number(rowEntry?.[0] || 0);
    group = rowEntry?.[1]?.[symbol] || 0;
    row = period;
    column = group;
  }
  const category = getCategory(symbol, group);
  return {
    number: index + 1,
    symbol,
    name: names[index],
    period,
    group,
    row,
    column,
    category,
    categoryName: categoryNames[category],
  };
});

export const elementCategories = categoryNames;
