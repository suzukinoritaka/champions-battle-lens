const ASSET = "assets/pokemon/";
const LOCAL_API_OVERRIDE = ["127.0.0.1", "localhost"].includes(location.hostname)
  ? new URLSearchParams(location.search).get("api")
  : "";
const ANALYSIS_API_URL = String(LOCAL_API_OVERRIDE || window.BATTLE_LENS_CONFIG?.analysisApiUrl || "").replace(/\/$/, "");

const species = {
  sylveon: { name: "ニンフィア", sprite: "sylveon.png", types: ["fairy"], hp: 202, def: 128, spd: 150, speed: 82 },
  gyarados: { name: "ギャラドス", sprite: "gyarados.png", types: ["water", "flying"], hp: 172, def: 99, spd: 120, speed: 133 },
  garchomp: { name: "ガブリアス", sprite: "garchomp.png", types: ["dragon", "ground"], hp: 185, def: 115, spd: 105, speed: 169 },
  gholdengo: { name: "サーフゴー", sprite: "gholdengo.png", types: ["steel", "ghost"], hp: 164, def: 115, spd: 111, speed: 136 },
  mimikyu: { name: "ミミッキュ", sprite: "mimikyu.png", types: ["ghost", "fairy"], hp: 159, def: 105, spd: 125, speed: 116 },
  delphox: { name: "マフォクシー", sprite: "delphox.png", types: ["fire", "psychic"], hp: 151, def: 100, spd: 120, speed: 168 },
  hippowdon: { name: "カバルドン", sprite: "hippowdon.png", types: ["ground"], hp: 215, def: 187, spd: 94, speed: 67 },
  kingambit: { name: "ドドゲザン", sprite: "kingambit.png", types: ["dark", "steel"], hp: 175, def: 140, spd: 105, speed: 70 },
  metagross: { name: "メタグロス", sprite: "metagross.png", types: ["steel", "psychic"], hp: 175, def: 150, spd: 110, speed: 90 },
  primarina: { name: "アシレーヌ", sprite: "primarina.png", types: ["water", "fairy"], hp: 187, def: 105, spd: 136, speed: 80 },
  dragapult: { name: "ドラパルト", sprite: "dragapult.png", types: ["dragon", "ghost"], hp: 163, def: 95, spd: 95, speed: 194 },
  greninja: { name: "ゲッコウガ", sprite: "greninja.png", types: ["water", "dark"], hp: 149, def: 87, spd: 91, speed: 174 },
  grimmsnarl: { name: "オーロンゲ", sprite: "grimmsnarl.png", types: ["dark", "fairy"], hp: 202, def: 95, spd: 95, speed: 80 },
  charizard: { name: "リザードン", sprite: "charizard.png", types: ["fire", "flying"], hp: 185, def: 98, spd: 105, speed: 152 },
  basculegion: { name: "イダイトウ", sprite: "basculegion.png", types: ["water", "ghost"], hp: 205, def: 95, spd: 95, speed: 98 },
  aerodactyl: { name: "プテラ", sprite: "aerodactyl.png", types: ["rock", "flying"], hp: 165, def: 95, spd: 95, speed: 200 },
  farigiraf: { name: "リキキリン", sprite: "farigiraf.png", types: ["normal", "psychic"], hp: 225, def: 110, spd: 110, speed: 80 },
  ninetalesAlola: { name: "キュウコン(アローラ)", sprite: "ninetales-alola.png", types: ["ice", "fairy"], hp: 179, def: 105, spd: 120, speed: 167 },
  ceruledge: { name: "ソウブレイズ", sprite: "ceruledge.png", types: ["fire", "ghost"], hp: 175, def: 100, spd: 120, speed: 137 },
  archaludon: { name: "ブリジュラス", sprite: "archaludon.png", types: ["steel", "dragon"], hp: 197, def: 150, spd: 90, speed: 105 },
  aegislash: { name: "ギルガルド", sprite: "aegislash.png", types: ["steel", "ghost"], hp: 167, def: 160, spd: 160, speed: 82 },
  meowscarada: { name: "マスカーニャ", sprite: "meowscarada.png", types: ["grass", "dark"], hp: 153, def: 90, spd: 90, speed: 192 },
  lopunny: { name: "ミミロップ", sprite: "lopunny.png", types: ["normal"], hp: 142, def: 104, spd: 116, speed: 172 },
  dragonite: { name: "カイリュー", sprite: "dragonite.png", types: ["dragon", "flying"], hp: 168, def: 115, spd: 120, speed: 132 },
  glimmora: { name: "キラフロル", sprite: "glimmora.png", types: ["rock", "poison"], hp: 160, def: 110, spd: 101, speed: 138 },
  bellibolt: { name: "ハラバリー", sprite: "bellibolt.png", types: ["electric"], hp: 215, def: 115, spd: 144, speed: 68 },
  staraptor: { name: "ムクホーク", sprite: "staraptor.png", types: ["normal", "flying"], hp: 192, def: 91, spd: 80, speed: 167 },
  starmie: { name: "スターミー", sprite: "starmie.png", types: ["water", "psychic"], hp: 167, def: 107, spd: 105, speed: 135 },
  samurott: { name: "ダイケンキ", sprite: "samurott.png", types: ["water"], hp: 167, def: 100, spd: 85, speed: 137 },
  corviknight: { name: "アーマーガア", sprite: "corviknight.png", types: ["flying", "steel"], hp: 205, def: 172, spd: 107, speed: 87 },
  espathra: { name: "クエスパトラ", sprite: "espathra.png", types: ["psychic"], hp: 171, def: 81, spd: 80, speed: 157 },
  skeledirge: { name: "ラウドボーン", sprite: "skeledirge.png", types: ["fire", "ghost"], hp: 211, def: 167, spd: 97, speed: 86 },
  scizor: { name: "ハッサム", sprite: "scizor.png", types: ["bug", "steel"], hp: 147, def: 120, spd: 100, speed: 117 }
};

const curatedSpeciesIds = new Set(Object.keys(species));
Object.entries(window.BATTLE_LENS_SPECIES || {}).forEach(([id, mon]) => {
  if (!species[id]) species[id] = mon;
});

const typeNames = { normal:"ノーマル", fire:"ほのお", water:"みず", electric:"でんき", grass:"くさ", ice:"こおり", fighting:"かくとう", poison:"どく", ground:"じめん", flying:"ひこう", psychic:"エスパー", bug:"むし", rock:"いわ", ghost:"ゴースト", dragon:"ドラゴン", dark:"あく", steel:"はがね", fairy:"フェアリー" };
const chart = {
  normal:{rock:.5,ghost:0,steel:.5}, fire:{fire:.5,water:.5,grass:2,ice:2,bug:2,rock:.5,dragon:.5,steel:2},
  water:{fire:2,water:.5,grass:.5,ground:2,rock:2,dragon:.5}, electric:{water:2,electric:.5,grass:.5,ground:0,flying:2,dragon:.5},
  grass:{fire:.5,water:2,grass:.5,poison:.5,ground:2,flying:.5,bug:.5,rock:2,dragon:.5,steel:.5}, ice:{fire:.5,water:.5,grass:2,ice:.5,ground:2,flying:2,dragon:2,steel:.5},
  fighting:{normal:2,ice:2,poison:.5,flying:.5,psychic:.5,bug:.5,rock:2,ghost:0,dark:2,steel:2,fairy:.5}, poison:{grass:2,poison:.5,ground:.5,rock:.5,ghost:.5,steel:0,fairy:2},
  ground:{fire:2,electric:2,grass:.5,poison:2,flying:0,bug:.5,rock:2,steel:2}, flying:{electric:.5,grass:2,fighting:2,bug:2,rock:.5,steel:.5},
  psychic:{fighting:2,poison:2,psychic:.5,dark:0,steel:.5}, bug:{fire:.5,grass:2,fighting:.5,poison:.5,flying:.5,psychic:2,ghost:.5,dark:2,steel:.5,fairy:.5},
  rock:{fire:2,ice:2,fighting:.5,ground:.5,flying:2,bug:2,steel:.5}, ghost:{normal:0,psychic:2,ghost:2,dark:.5},
  dragon:{dragon:2,steel:.5,fairy:0}, dark:{fighting:.5,psychic:2,ghost:2,dark:.5,fairy:.5},
  steel:{fire:.5,water:.5,electric:.5,ice:2,rock:2,steel:.5,fairy:2}, fairy:{fire:.5,fighting:2,poison:.5,dragon:2,dark:2,steel:.5}
};

const move = (name, type, power, category = "physical", note = "") => ({ name, type, power, category, note });
const defaultParties = [
  { name:"パーティ1｜ニンフィア軸", members:[
    {id:"sylveon", attack:76, special:130, item:"たべのこし", moves:[move("ハイパーボイス","normal",90,"special"),move("マジカルシャイン","fairy",80,"special"),move("あくび","normal",0),move("まもる","normal",0)]},
    {id:"gyarados", attack:194, special:72, item:"ギャラドスナイト", moves:[move("かみくだく","dark",80),move("じしん","ground",100),move("パワーウィップ","grass",120),move("りゅうのまい","dragon",0)]},
    {id:"garchomp", attack:182, special:90, item:"きあいのタスキ", moves:[move("スケイルショット","dragon",100),move("じしん","ground",100),move("ステルスロック","rock",0),move("つるぎのまい","normal",0)]},
    {id:"gholdengo", attack:72, special:203, item:"こだわりスカーフ", speedMult:1.5, moves:[move("ゴールドラッシュ","steel",120,"special"),move("シャドーボール","ghost",80,"special"),move("10まんボルト","electric",90,"special"),move("トリック","psychic",0)]},
    {id:"mimikyu", attack:156, special:63, item:"いのちのたま", damageMult:1.3, moves:[move("じゃれつく","fairy",90),move("ドレインパンチ","fighting",75),move("かげうち","ghost",40),move("つるぎのまい","normal",0)]},
    {id:"delphox", attack:80, special:162, item:"マフォクシナイト", moves:[move("かえんほうしゃ","fire",90,"special"),move("サイコショック","psychic",80,"special","physicalDefense"),move("マジカルシャイン","fairy",80,"special"),move("みがわり","normal",0)]}
  ]},
  { name:"パーティ2｜ハラバリー軸", members:[
    {id:"bellibolt",attack:75,special:123,item:"オボンのみ",moves:[move("ボルトチェンジ","electric",70,"special"),move("みずびたし","water",0),move("どくどく","poison",0),move("なまける","normal",0)]},
    {id:"staraptor",attack:141,special:63,item:"こだわりスカーフ",speedMult:1.5,moves:[move("ブレイブバード","flying",120),move("インファイト","fighting",120),move("とんぼがえり","bug",70),move("いのちがけ","fighting",0)]},
    {id:"starmie",attack:139,special:108,item:"スターミナイト",moves:[move("アクアジェット","water",40),move("アクアブレイク","water",85),move("クイックターン","water",60),move("アイススピナー","ice",80)]},
    {id:"samurott",attack:176,special:108,item:"くろいメガネ",damageMult:1.2,moves:[move("ひけん・ちえなみ","dark",65),move("シェルブレード","water",75),move("せいなるつるぎ","fighting",90),move("ふいうち","dark",70)]},
    {id:"mimikyu",attack:156,special:63,item:"いのちのたま",damageMult:1.3,moves:[move("じゃれつく","fairy",90),move("ドレインパンチ","fighting",75),move("かげうち","ghost",40),move("つるぎのまい","normal",0)]},
    {id:"corviknight",attack:107,special:65,item:"たべのこし",moves:[move("アイアンヘッド","steel",80),move("ボディプレス","fighting",80),move("とんぼがえり","bug",70),move("はねやすめ","flying",0)]}
  ]},
  { name:"パーティ3｜高速展開", members:[
    {id:"lopunny",attack:128,special:66,item:"ミミロップナイト",moves:[move("インファイト","fighting",120),move("ねこだまし","normal",40),move("トリプルアクセル","ice",120),move("つるぎのまい","normal",0)]},
    {id:"dragonite",attack:138,special:167,item:"カイリューナイト",moves:[move("りゅうせいぐん","dragon",130,"special"),move("かえんほうしゃ","fire",90,"special"),move("エアスラッシュ","flying",75,"special"),move("はねやすめ","flying",0)]},
    {id:"aegislash",attack:112,special:63,item:"たべのこし",moves:[move("ポルターガイスト","ghost",110),move("かげうち","ghost",40),move("アイアンヘッド","steel",80),move("キングシールド","steel",0)]},
    {id:"glimmora",attack:67,special:200,item:"きあいのタスキ",moves:[move("ヘドロウェーブ","poison",95,"special"),move("エナジーボール","grass",90,"special"),move("だいちのちから","ground",90,"special"),move("マジカルシャイン","fairy",80,"special")]},
    {id:"hippowdon",attack:132,special:79,item:"オボンのみ",moves:[move("じしん","ground",100),move("ストーンエッジ","rock",100),move("あくび","normal",0),move("ふきとばし","normal",0)]},
    {id:"meowscarada",attack:162,special:90,item:"こだわりスカーフ",speedMult:1.5,moves:[move("トリックフラワー","grass",70),move("とんぼがえり","bug",70),move("はたきおとす","dark",65),move("トリプルアクセル","ice",120)]}
  ]},
  { name:"パーティ4｜ガブリアス軸", members:[
    {id:"garchomp",attack:182,special:90,item:"オボンのみ",moves:[move("ドラゴンテール","dragon",60),move("じしん","ground",100),move("まきびし","ground",0),move("ステルスロック","rock",0)]},
    {id:"espathra",attack:72,special:168,item:"きあいのタスキ",moves:[move("ルミナコリジョン","psychic",80,"special"),move("シャドーボール","ghost",80,"special"),move("マジカルシャイン","fairy",80,"special"),move("まもる","normal",0)]},
    {id:"skeledirge",attack:85,special:130,item:"たべのこし",moves:[move("フレアソング","fire",80,"special"),move("シャドーボール","ghost",80,"special"),move("おにび","fire",0),move("なまける","normal",0)]},
    {id:"mimikyu",attack:156,special:63,item:"いのちのたま",damageMult:1.3,moves:[move("じゃれつく","fairy",90),move("ドレインパンチ","fighting",75),move("かげうち","ghost",40),move("つるぎのまい","normal",0)]},
    {id:"greninja",attack:103,special:170,item:"ゲッコウガナイト",moves:[move("れいとうビーム","ice",90,"special"),move("みずしゅりけん","water",60,"special"),move("あくのはどう","dark",80,"special"),move("ヘドロウェーブ","poison",95,"special")]},
    {id:"scizor",attack:200,special:67,item:"ハッサムナイト",moves:[move("インファイト","fighting",120),move("バレットパンチ","steel",40),move("とんぼがえり","bug",70),move("つるぎのまい","normal",0)]}
  ]}
];

const PARTY_STORE_KEY = "battle-lens-parties-v1";
const AI_FALLBACK_STORE_KEY = "battle-lens-ai-fallback-v1";
const deepClone = (value) => typeof structuredClone === "function" ? structuredClone(value) : JSON.parse(JSON.stringify(value));
const statKeys = [
  ["hp","H"], ["attack","A"], ["def","B"], ["special","C"], ["spd","D"], ["speed","S"]
];

function normalizeMember(member) {
  const base = species[member.id] || species.garchomp;
  const item = member.item || "なし";
  return {
    id: member.id in species ? member.id : "garchomp",
    ability: member.ability || "",
    item,
    hp: Number(member.hp ?? base.hp),
    attack: Number(member.attack ?? 100),
    def: Number(member.def ?? base.def),
    special: Number(member.special ?? 100),
    spd: Number(member.spd ?? base.spd),
    speed: Number(member.speed ?? base.speed),
    speedMult: Number(member.speedMult || (item === "こだわりスカーフ" ? 1.5 : 1)),
    damageMult: Number(member.damageMult || (item === "いのちのたま" ? 1.3 : 1)),
    moves: [...(member.moves || [])].slice(0,4).map(m => ({...m}))
  };
}

function normalizeParty(party, index = 0) {
  const fallback = defaultParties[index % defaultParties.length];
  const members = (party.members?.length ? party.members : fallback.members).slice(0,6).map(normalizeMember);
  while (members.length < 6) members.push(normalizeMember(fallback.members[members.length] || fallback.members[0]));
  return {
    id: party.id || `party-${Date.now()}-${index}-${Math.random().toString(36).slice(2,7)}`,
    name: party.name || `パーティ${index + 1}`,
    source: party.source || "プリセット",
    updatedAt: party.updatedAt || Date.now(),
    members
  };
}

function loadParties() {
  try {
    const saved = JSON.parse(localStorage.getItem(PARTY_STORE_KEY));
    if (Array.isArray(saved) && saved.length) return saved.map(normalizeParty);
  } catch (_) {}
  return defaultParties.map((party, index) => normalizeParty({...deepClone(party), id:`preset-${index + 1}`}, index));
}

let parties = loadParties();

function saveParties() {
  localStorage.setItem(PARTY_STORE_KEY, JSON.stringify(parties));
}

const sampleLabels = { koko:"koko戦", gs:"GS_CES戦", yusk:"yusk戦" };
const state = {
  screen:"capture", party:0,
  foes:["garchomp","grimmsnarl","charizard","primarina","hippowdon","basculegion"],
  own:0, foe:0, mode:"damage", scanToken:0, scanController:null,
  analysisConfidence:null, analysisLabel:"AI解析", analysisWarnings:[],
  analysisMethod:"local",
  editParty:0, partyReturn:"capture"
};
const $ = (id) => document.getElementById(id);
const sprite = (id) => {
  const source = species[id]?.sprite || species.garchomp.sprite;
  return /^(?:https?:|data:|assets\/)/.test(source) ? source : ASSET + source;
};

function spriteElement(id, alt = "") {
  const mon = species[id] || species.garchomp;
  const icon = mon.icon;
  if (icon?.atlas) {
    const label = escapeHtml(alt || mon.name);
    return `<svg class="pokemon-sprite" viewBox="0 0 ${icon.size} ${icon.size}" role="img" aria-label="${label}">
      <image href="${escapeHtml(icon.atlas)}" x="-${icon.x}" y="-${icon.y}" width="${icon.atlasWidth}" height="${icon.atlasHeight}"></image>
    </svg>`;
  }
  return `<img class="pokemon-sprite" src="${sprite(id)}" alt="${escapeHtml(alt)}">`;
}

function typeMultiplier(attackType, defendTypes) {
  return defendTypes.reduce((total, type) => total * (chart[attackType]?.[type] ?? 1), 1);
}

function calculateDamage(attacker, defender, attackMove) {
  if (!attackMove.power) return { min:0, max:0, mult:1 };
  const a = attackMove.category === "special" ? attacker.special : attacker.attack;
  const d = attackMove.note === "physicalDefense" || attackMove.category === "physical" ? defender.def : defender.spd;
  const base = (((2 * 50 / 5 + 2) * attackMove.power * a / Math.max(1, d)) / 50) + 2;
  const stab = species[attacker.id].types.includes(attackMove.type) ? 1.5 : 1;
  const mult = typeMultiplier(attackMove.type, defender.types);
  const item = attacker.damageMult || 1;
  return { min: Math.floor(base * .85 * stab * mult * item / defender.hp * 100), max: Math.floor(base * stab * mult * item / defender.hp * 100), mult };
}

function speedRange(mon) {
  const base = mon.speed;
  return { min: Math.max(1, Math.floor(base * .9)), max: Math.floor(base * 1.1) };
}

function effectiveSpeed(member) {
  return Math.floor((member.speed ?? species[member.id].speed) * (member.speedMult || 1));
}

function showScreen(name) {
  state.screen = name;
  document.querySelectorAll("[data-screen]").forEach((el) => { el.hidden = el.dataset.screen !== name; el.classList.toggle("active", el.dataset.screen === name); });
  document.querySelectorAll("[data-nav]").forEach((el) => el.classList.toggle("active", el.dataset.nav === (name === "party" ? "box" : "battle")));
}

function fillPartySelects() {
  const options = parties.map((p, i) => `<option value="${i}">${escapeHtml(p.name)}</option>`).join("");
  state.party = Math.min(state.party, parties.length - 1);
  [$("captureParty"), $("resultParty")].forEach((select) => { select.innerHTML = options; select.value = String(state.party); });
  renderCaptureParty();
}

function renderCaptureParty() {
  const dock = $("capturePartySprites");
  if (!dock || !parties[state.party]) return;
  dock.innerHTML = parties[state.party].members.slice(0, 6).map((member) => `<span>${spriteElement(member.id)}<small>${escapeHtml(species[member.id].name)}</small></span>`).join("");
}

const speciesChoices = () => Object.entries(species).sort((a,b)=>a[1].name.localeCompare(b[1].name,"ja"));
const normalizeSpeciesLabel = (value) => String(value || "").normalize("NFKC").toLowerCase()
  .replace(/ポケモン/g, "")
  .replace(/[\s・･\-ー_()（）]/g, "");
const speciesNameLookup = new Map(speciesChoices().flatMap(([id, mon]) => [
  [normalizeSpeciesLabel(mon.name), id],
  [normalizeSpeciesLabel(mon.name.replace(/[（(].*?[）)]/g, "")), id],
]));
[
  ["アローラキュウコン", "ninetalesAlola"], ["アローラのキュウコン", "ninetalesAlola"],
  ["キュウコンアローラ", "ninetalesAlola"], ["キュウコンアローラのすがた", "ninetalesAlola"],
].forEach(([name, id]) => speciesNameLookup.set(normalizeSpeciesLabel(name), id));

function speciesIdFromName(name) {
  return speciesNameLookup.get(normalizeSpeciesLabel(name)) || null;
}
const moveCatalog = (() => {
  const catalog = new Map();
  defaultParties.flatMap(p=>p.members).flatMap(m=>m.moves).forEach(m=>catalog.set(m.name,{...m}));
  catalog.set("ねがいごと", move("ねがいごと","normal",0));
  return catalog;
})();

function inferMove(name) {
  const clean = String(name || "").trim();
  return {...(moveCatalog.get(clean) || move(clean || "未設定","normal",0))};
}

function templateParty(index, source) {
  const party = normalizeParty({...deepClone(defaultParties[index]), id:`import-${Date.now()}-${Math.random().toString(36).slice(2,6)}`, source, updatedAt:Date.now()}, index);
  const abilities = index === 0
    ? ["フェアリースキン","いかく","さめはだ","おうごんのからだ","ばけのかわ","もうか"]
    : ["さめはだ","かそく","てんねん","ばけのかわ","へんげんじざい","テクニシャン"];
  party.members.forEach((member,i)=>member.ability=abilities[i] || "");
  if (index === 0) party.members[0].moves = ["ハイパーボイス","あくび","ねがいごと","まもる"].map(inferMove);
  party.name = index === 0 ? "バトメモ取込｜ニンフィア軸" : "Champions取込｜ガブリアス軸";
  return party;
}

function blankParty() {
  const party = templateParty(0,"新規作成");
  party.name = `新しいパーティ ${parties.length + 1}`;
  party.id = `new-${Date.now()}`;
  return party;
}

function renderPartyLibrary() {
  $("partyCount").textContent = `${parties.length}件`;
  $("partyLibrary").innerHTML = parties.map((party,index)=>`<button class="party-library-item${index===state.editParty?" active":""}" type="button" data-party-index="${index}">
    <span class="party-sprites">${party.members.slice(0,6).map(m=>spriteElement(m.id)).join("")}</span>
    <span><b>${escapeHtml(party.name)}</b><small>${escapeHtml(party.source || "手動編集")}</small></span><i class="ph ph-caret-right"></i>
  </button>`).join("");
}

function memberEditorCard(member,index) {
  const options = speciesChoices().map(([key,mon])=>`<option value="${key}"${key===member.id?" selected":""}>${mon.name}</option>`).join("");
  return `<article class="member-editor-card" data-member="${index}">
    <div class="member-editor-title"><span><b>${index+1}</b><span class="sprite-slot">${spriteElement(member.id)}</span></span><select data-field="id" aria-label="${index+1}体目のポケモン">${options}</select></div>
    <div class="member-meta"><label>特性<input data-field="ability" value="${escapeHtml(member.ability)}"></label><label>持ち物<input data-field="item" value="${escapeHtml(member.item)}"></label></div>
    <div class="stat-inputs">${statKeys.map(([key,label])=>`<label><span>${label}</span><input data-field="${key}" type="number" min="1" max="999" value="${member[key]}"></label>`).join("")}</div>
    <div class="move-inputs">${[0,1,2,3].map(i=>`<input data-move="${i}" value="${escapeHtml(member.moves[i]?.name || "")}" placeholder="技${i+1}">`).join("")}</div>
  </article>`;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>\"']/g, char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}

function renderPartyEditor() {
  state.editParty = Math.min(Math.max(0,state.editParty),parties.length-1);
  const party = parties[state.editParty];
  $("partyNameInput").value = party.name;
  $("editorSourceBadge").textContent = party.source || "手動編集";
  $("partyMemberEditor").innerHTML = party.members.map(memberEditorCard).join("");
  renderPartyLibrary();
}

function readPartyEditor() {
  const original = parties[state.editParty];
  const members = [...document.querySelectorAll(".member-editor-card")].map((card,index)=>{
    const data = normalizeMember(original.members[index]);
    card.querySelectorAll("[data-field]").forEach(input=>{
      const key=input.dataset.field;
      data[key] = input.type === "number" ? Math.max(1,Number(input.value)||1) : input.value.trim();
    });
    data.moves = [...card.querySelectorAll("[data-move]")].map(input=>inferMove(input.value)).filter(m=>m.name && m.name!=="未設定");
    return normalizeMember(data);
  });
  return {...original, name:$("partyNameInput").value.trim() || "名称未設定", source:"手動編集", updatedAt:Date.now(), members};
}

function selectPartyForEdit(index) {
  state.editParty = Number(index);
  renderPartyEditor();
}

function openPartyManager() {
  state.partyReturn = state.screen === "result" ? "result" : "capture";
  state.editParty = state.party;
  renderPartyEditor();
  showScreen("party");
}

function saveEditorParty() {
  parties[state.editParty] = readPartyEditor();
  state.party = state.editParty;
  state.own = 0;
  saveParties();
  fillPartySelects();
  renderPartyEditor();
  toast("パーティを保存しました");
}

function duplicateParty() {
  const copy = normalizeParty({...deepClone(readPartyEditor()), id:`copy-${Date.now()}`, name:`${$("partyNameInput").value.trim() || "パーティ"}（コピー）`, source:"複製", updatedAt:Date.now()});
  parties.push(copy);
  state.editParty = parties.length - 1;
  saveParties(); fillPartySelects(); renderPartyEditor(); toast("パーティを複製しました");
}

function deleteParty() {
  if (parties.length === 1) { toast("パーティは1つ以上必要です"); return; }
  parties.splice(state.editParty,1);
  state.editParty = Math.min(state.editParty,parties.length-1);
  state.party = Math.min(state.party,parties.length-1);
  saveParties(); fillPartySelects(); renderPartyEditor(); toast("パーティを削除しました");
}

function addImportedParty(party,message) {
  parties.push(normalizeParty(party));
  state.editParty = parties.length - 1;
  saveParties(); fillPartySelects(); renderPartyEditor();
  $("partyImportStatus").textContent = message;
  $("partyImportStatus").classList.add("success");
  toast("6体を読み取りました。内容を確認してください");
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("画像を開けませんでした"));
    reader.readAsDataURL(file);
  });
}

const localIconCache = new Map();
let localIconManifestPromise;

function loadCanvasImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("画像データを読み込めませんでした"));
    image.src = src;
  });
}

async function localIconEntries() {
  if (!localIconManifestPromise) {
    const embeddedManifest = window.BATTLE_LENS_ICON_MANIFEST;
    localIconManifestPromise = (embeddedManifest
      ? Promise.resolve(embeddedManifest)
      : fetch("assets/recognition/manifest.json")
      .then((response) => {
        if (!response.ok) throw new Error("manifest");
        return response.json();
      }))
      .then((manifest) => manifest.templates.map((template) => ({
        id: template.id,
        src: template.atlas || template.file,
        crop: template.atlas ? {
          x: Number(template.x || 0),
          y: Number(template.y || 0),
          size: Number(template.size || 128),
        } : null,
        title: template.title || template.file,
      })))
      .catch(() => Object.keys(species).map((id) => ({ id, src: sprite(id), crop: null, title: id })));
  }
  const templates = await localIconManifestPromise;
  return Promise.all(templates.map(async (template) => {
    const { id, src } = template;
    if (!localIconCache.has(src)) localIconCache.set(src, loadCanvasImage(src));
    return { ...template, image: await localIconCache.get(src) };
  }));
}

function localMatchScore(actual, rendered) {
  const width = actual.width;
  const data = actual.data;
  const ref = rendered.data;
  const mid = Math.floor(width / 2);
  const bgIndex = (mid * width + 2) * 4;
  const bg = [data[bgIndex], data[bgIndex + 1], data[bgIndex + 2]];
  let colorDifference = 0;
  let colorWeight = 0;
  let intersection = 0;
  let union = 0;
  let foregroundCoverage = 0;
  let foregroundWeight = 0;

  for (let pixel = 0; pixel < width * width; pixel += 2) {
    const index = pixel * 4;
    const alpha = ref[index + 3] / 255;
    const observedDistance = Math.abs(data[index] - bg[0]) + Math.abs(data[index + 1] - bg[1]) + Math.abs(data[index + 2] - bg[2]);
    const observedMask = observedDistance > 68;
    const templateMask = alpha > .18;
    if (observedMask || templateMask) union += 1;
    if (observedMask && templateMask) intersection += 1;
    if (alpha > .42) {
      const expectedR = ref[index] * alpha + bg[0] * (1 - alpha);
      const expectedG = ref[index + 1] * alpha + bg[1] * (1 - alpha);
      const expectedB = ref[index + 2] * alpha + bg[2] * (1 - alpha);
      colorDifference += (Math.abs(data[index] - expectedR) + Math.abs(data[index + 1] - expectedG) + Math.abs(data[index + 2] - expectedB)) * alpha;
      colorWeight += 3 * 255 * alpha;
      foregroundCoverage += Math.min(1, observedDistance / 180) * alpha;
      foregroundWeight += alpha;
    }
  }

  const colorSimilarity = colorWeight ? 1 - colorDifference / colorWeight : 0;
  const silhouetteSimilarity = union ? intersection / union : 0;
  const coverageSimilarity = foregroundWeight ? foregroundCoverage / foregroundWeight : 0;
  return colorSimilarity * .55 + silhouetteSimilarity * .15 + coverageSimilarity * .30;
}

function createLocalIconScorer(regionSize) {
  const canvas = document.createElement("canvas");
  canvas.width = regionSize;
  canvas.height = regionSize;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  return (actual, template, iconSize, dx = 0, dy = 0) => {
  context.clearRect(0, 0, regionSize, regionSize);
    const destinationX = (regionSize - iconSize) / 2 + dx;
    const destinationY = (regionSize - iconSize) / 2 + dy;
    if (template.crop) {
      context.drawImage(
        template.image,
        template.crop.x,
        template.crop.y,
        template.crop.size,
        template.crop.size,
        destinationX,
        destinationY,
        iconSize,
        iconSize,
      );
    } else {
      context.drawImage(template.image, destinationX, destinationY, iconSize, iconSize);
    }
    return localMatchScore(actual, context.getImageData(0, 0, regionSize, regionSize));
  };
}

function bestUniqueLocalAssignment(slotCandidates) {
  let best = null;
  function visit(slot, used, selected, total) {
    if (slot === slotCandidates.length) {
      if (!best || total > best.total) best = { total, selected: [...selected] };
      return;
    }
    slotCandidates[slot].slice(0, 5).forEach((candidate) => {
      if (used.has(candidate.id)) return;
      used.add(candidate.id);
      selected.push(candidate);
      visit(slot + 1, used, selected, total + candidate.score);
      selected.pop();
      used.delete(candidate.id);
    });
  }
  visit(0, new Set(), [], 0);
  return best?.selected || slotCandidates.map((candidates) => candidates[0]);
}

async function recognizeTeamPreviewLocally(file) {
  const [src, icons] = await Promise.all([readFileAsDataUrl(file), localIconEntries()]);
  const screen = await loadCanvasImage(src);
  const canvas = document.createElement("canvas");
  canvas.width = screen.naturalWidth;
  canvas.height = screen.naturalHeight;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  context.drawImage(screen, 0, 0);

  const regionSize = Math.max(104, Math.round(canvas.width * .055));
  const baseIconSize = Math.round(canvas.width * .0488);
  const centerX = canvas.width * .801;
  const firstCenterY = canvas.height * .1705;
  const rowStep = canvas.height * .1173;
  const move = canvas.width / 437;
  const slotCandidates = [];
  const scoreIcon = createLocalIconScorer(regionSize);

  for (let slot = 0; slot < 6; slot += 1) {
    const centerY = firstCenterY + rowStep * slot;
    const actual = context.getImageData(
      Math.round(centerX - regionSize / 2),
      Math.round(centerY - regionSize / 2),
      regionSize,
      regionSize,
    );
    const bestVariantBySpecies = new Map();
    icons.forEach((template) => {
      const candidate = {
        id: template.id,
        template,
        score: scoreIcon(actual, template, baseIconSize),
      };
      const { id } = candidate;
      if (!bestVariantBySpecies.has(id) || candidate.score > bestVariantBySpecies.get(id).score) bestVariantBySpecies.set(id, candidate);
    });
    const firstPass = [...bestVariantBySpecies.values()].sort((a, b) => b.score - a.score);
    const refineCandidates = [...new Map([
      ...firstPass.slice(0, 28),
      ...firstPass.filter((candidate) => curatedSpeciesIds.has(candidate.id)),
    ].map((candidate) => [candidate.id, candidate])).values()];
    const refined = refineCandidates.map((candidate) => {
      let score = candidate.score;
      for (const scale of [.88, .94, 1, 1.06, 1.12]) {
        for (const dx of [-move, 0, move]) {
          for (const dy of [-move, 0, move]) {
            score = Math.max(score, scoreIcon(actual, candidate.template, Math.round(baseIconSize * scale), dx, dy));
          }
        }
      }
      return { id: candidate.id, score };
    }).sort((a, b) => b.score - a.score);
    slotCandidates.push(refined);
  }

  const assigned = bestUniqueLocalAssignment(slotCandidates);
  const evaluations = assigned.map((candidate, index) => {
    const nextBest = slotCandidates[index].find((entry) => entry.id !== candidate.id)?.score || 0;
    const margin = Math.max(0, candidate.score - nextBest);
    const confidence = Math.max(30, Math.min(99, Math.round((candidate.score - .45) * 120 + margin * 260)));
    const reliable = candidate.score >= .74 || (candidate.score >= .68 && margin >= .035);
    return { candidate, index, margin, confidence, reliable };
  });
  const members = evaluations.map(({ candidate, index, margin, confidence }) => {
    return {
      slot: index + 1,
      species_id: candidate.id,
      species_name: species[candidate.id].name,
      ability: null,
      item: null,
      moves: [null, null, null, null],
      stats: { hp: null, attack: null, defense: null, sp_attack: null, sp_defense: null, speed: null },
      confidence,
      notes: [`local_score:${candidate.score.toFixed(3)}`, `margin:${margin.toFixed(3)}`],
    };
  });
  const weak = evaluations.filter(({ reliable }) => !reliable);
  const overall = Math.round(members.reduce((sum, member) => sum + member.confidence, 0) / members.length);
  return {
    result: {
      task: "team_preview",
      members,
      overall_confidence: overall,
      warnings: weak.map(({ index }) => `${index + 1}枠目は要確認です`),
    },
    reliable: weak.length === 0,
    scores: assigned.map((candidate) => candidate.score),
    candidates: slotCandidates.map((candidates) => candidates.slice(0, 12).map((candidate) => ({
      id: candidate.id,
      name: species[candidate.id].name,
      score: Number(candidate.score.toFixed(4)),
    }))),
  };
}

async function analyzeScreenshots(task, files, signal) {
  if (!ANALYSIS_API_URL) throw new Error("AI解析APIがまだ公開設定されていません");
  const images = await Promise.all(files.map(readFileAsDataUrl));
  const response = await fetch(`${ANALYSIS_API_URL}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task, images }),
    signal,
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || !body.ok) throw new Error(body.error || "AI解析に失敗しました");
  return body.result;
}

function orderedMembers(result) {
  return [...result.members].sort((a, b) => a.slot - b.slot);
}

function analysisToFoes(result) {
  const members = orderedMembers(result);
  const memberId = (member) => member.species_id in species ? member.species_id : speciesIdFromName(member.species_name);
  const unknown = members.filter((member) => !memberId(member)).map((member) => member.species_name);
  if (unknown.length) throw new Error(`未登録のポケモンを検出: ${unknown.join("、")}。認識修正候補へ追加が必要です`);
  return members.map(memberId);
}

function analysisToParty(result, kind) {
  const members = orderedMembers(result);
  const unknown = members.filter((member) => !speciesIdFromName(member.species_name)).map((member) => member.species_name);
  if (unknown.length) throw new Error(`未登録のポケモンを検出: ${unknown.join("、")}`);
  const missingStats = members.filter((member) => Object.values(member.stats || {}).some((value) => value == null)).map((member) => member.species_name);
  if (missingStats.length) throw new Error(`実数値を読み切れませんでした: ${missingStats.join("、")}`);

  const converted = members.map((member) => normalizeMember({
    id: speciesIdFromName(member.species_name),
    ability: member.ability || "",
    item: member.item || "なし",
    hp: member.stats.hp,
    attack: member.stats.attack,
    def: member.stats.defense,
    special: member.stats.sp_attack,
    spd: member.stats.sp_defense,
    speed: member.stats.speed,
    moves: (member.moves || []).filter(Boolean).map(inferMove),
  }));
  const firstName = species[converted[0].id].name;
  return normalizeParty({
    id:`ai-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,
    name:`AI取込｜${firstName}軸`,
    source:kind === "champions" ? "Champions画像2枚・AI解析" : "バトメモ画像・AI解析",
    updatedAt:Date.now(), members:converted,
  });
}

async function detectImportFiles(files, kind) {
  if (kind === "champions" && files.length !== 2) {
    toast("「能力」と「ステータス」の2枚を選んでください", 4200);
    return;
  }
  if (kind === "battleMemo" && files.length !== 1) return;
  const status = $("partyImportStatus");
  status.textContent = "AI解析中…";
  status.classList.remove("success", "error");
  try {
    const task = kind === "champions" ? "party_champions" : "party_batmemo";
    const result = await analyzeScreenshots(task, files);
    const party = analysisToParty(result, kind);
    const warning = result.warnings?.length ? "・要確認あり" : "";
    addImportedParty(party, `AI認識 ${result.overall_confidence}%・6体検出${warning}`);
  } catch (error) {
    status.textContent = error.name === "AbortError" ? "解析を中止" : error.message;
    status.classList.add("error");
    toast(status.textContent, 5200);
  }
}

function parsePartyText(text) {
  const normalized = text.normalize("NFKC").replace(/\r/g,"").trim();
  const blocks = normalized.split(/\n\s*\n/).filter(Boolean);
  const lookup = new Map(speciesChoices().flatMap(([id,mon])=>[[mon.name,id],[mon.name.replace(/[\(（].*?[\)）]/g,""),id]]));
  const parsed = blocks.map(block=>{
    const lines = block.split("\n").map(line=>line.trim()).filter(Boolean);
    const head = lines[0]?.replace(/^[-・]\s*/,"") || "";
    const [rawName,rawItem=""] = head.split(/\s*@\s*/);
    const id = [...lookup.entries()].find(([name])=>rawName.includes(name))?.[1];
    if (!id) return null;
    const base = normalizeMember({id,item:rawItem.trim() || "なし",moves:[]});
    const abilityLine = lines.find(line=>/^(特性|とくせい)\s*[:：]/.test(line));
    if (abilityLine) base.ability=abilityLine.replace(/^(特性|とくせい)\s*[:：]\s*/,"");
    const statsText = lines.find(line=>/H\s*\d+/i.test(line) && /S\s*\d+/i.test(line));
    if (statsText) {
      const map={H:"hp",A:"attack",B:"def",C:"special",D:"spd",S:"speed"};
      [...statsText.matchAll(/([HABCDS])\s*[:：]?\s*(\d+)/gi)].forEach(match=>base[map[match[1].toUpperCase()]]=Number(match[2]));
    }
    const moveLines = lines.filter(line=>!line.includes("@") && !/^(特性|とくせい)\s*[:：]/.test(line) && line!==statsText);
    const names = moveLines.flatMap(line=>line.replace(/^技\s*[:：]\s*/,"").split(/\s*[\/／,、]\s*|\s+-\s+|^[-・]\s*/)).map(v=>v.trim()).filter(Boolean).slice(0,4);
    base.moves=names.map(inferMove);
    return base;
  }).filter(Boolean);
  if (parsed.length !== 6) throw new Error(`6体必要です（${parsed.length}体を認識）`);
  return normalizeParty({id:`text-${Date.now()}`,name:`テキスト取込｜${species[parsed[0].id].name}軸`,source:"テキスト",updatedAt:Date.now(),members:parsed});
}

function teamCard(id, side, index) {
  const mon = species[id];
  const selected = side === "own" ? index === state.own : index === state.foe;
  const speed = side === "own" ? effectiveSpeed(parties[state.party].members[index]) : `${speedRange(mon).min}–${speedRange(mon).max}`;
  return `<button class="pokemon-card${selected ? " selected" : ""}" type="button" data-side="${side}" data-index="${index}">
    ${spriteElement(id)}<span><b>${mon.name}</b><small>${mon.types.map(t => typeNames[t]).join(" / ")}</small></span><span class="speed-mini">S ${speed}</span>
  </button>`;
}

function hero(id, sub) {
  const mon = species[id];
  return `${spriteElement(id)}<span><b>${mon.name}</b><small>${sub}</small></span>`;
}

function koText(max, min) {
  if (min >= 100) return "確1";
  if (max >= 100) return "乱1";
  if (min >= 50) return "確2";
  if (max >= 50) return "乱2";
  if (min >= 34) return "確3";
  return "耐久";
}

function renderDamage(attacker, defender) {
  const results = attacker.moves.filter(m => m.power).map(m => ({ move:m, ...calculateDamage(attacker, defender, m) })).sort((a,b) => b.max - a.max);
  const best = results[0] || { min:0, max:0, mult:1, move:{name:"攻撃技なし"} };
  const scenarios = [
    { label:"標準耐久", min:best.min, max:best.max, note:"無振り目安" },
    { label:"HP特化", min:Math.floor(best.min*.86), max:Math.floor(best.max*.86), note:"H252想定" },
    { label:"防御側特化", min:Math.floor(best.min*.72), max:Math.floor(best.max*.72), note:"B/D補正あり" }
  ];
  $("koBadge").textContent = koText(best.max, best.min);
  $("rangeHeadline").textContent = `${best.min}–${best.max}%`;
  $("damageView").innerHTML = `<div class="move-results">${results.map((r,i) => `<div class="move-result${i===0?" best":""}"><div class="move-result-top"><b>${r.move.name}</b><span>${r.mult === 0 ? "無効" : r.mult >= 2 ? "効果抜群" : r.mult < 1 ? "いまひとつ" : typeNames[r.move.type]}</span><em>${r.min}–${r.max}%</em></div><div class="damage-track"><span style="width:${Math.min(100,r.max)}%"></span></div></div>`).join("")}</div><div class="scenario-heading"><span>相手配分別</span><small>${best.move.name}</small></div><div class="scenario-results">${scenarios.map(s=>`<div class="scenario-row"><span><b>${s.label}</b><small>${s.note}</small></span><div class="scenario-bar"><i style="width:${Math.min(100,s.max)}%"></i></div><strong>${s.min}–${s.max}%</strong><em>${koText(s.max,s.min)}</em></div>`).join("")}</div>`;
}

function renderSpeed(attacker, defender) {
  const own = effectiveSpeed(attacker);
  const range = speedRange(defender);
  const verdict = own > range.max ? "最速想定まで上から動けます" : own > range.min ? "相手の配分次第で先手が入れ替わります" : "相手が無振りでも先手を取られる想定です";
  $("speedView").innerHTML = `<div class="speed-card"><div class="speed-numbers"><div><small>自分</small><strong>${own}</strong></div><span>VS</span><div><small>相手の想定範囲</small><strong>${range.min}–${range.max}</strong></div></div><div class="speed-verdict">${verdict}</div></div>`;
}

function renderType(attacker, defender) {
  const options = [...new Set(attacker.moves.filter(m=>m.power).map(m=>m.type))].map(type => ({type,mult:typeMultiplier(type,defender.types)})).sort((a,b)=>b.mult-a.mult);
  $("typeView").innerHTML = `<div class="type-card"><div class="type-grid">${options.map(o=>`<div class="type-chip">${typeNames[o.type]}<strong>×${o.mult}</strong></div>`).join("")}</div><div class="type-verdict">相手：${defender.types.map(t=>typeNames[t]).join(" / ")}</div></div>`;
}

function renderCorrection() {
  const choices = Object.entries(species).sort((a,b)=>a[1].name.localeCompare(b[1].name,"ja"));
  $("correctionFields").innerHTML = state.foes.map((id,index)=>`<select data-correction="${index}" aria-label="相手${index+1}体目">${choices.map(([key,mon])=>`<option value="${key}"${key===id?" selected":""}>${index+1}. ${mon.name}</option>`).join("")}</select>`).join("");
}

function renderResult() {
  const party = parties[state.party];
  state.own = Math.min(state.own, party.members.length - 1);
  state.foe = Math.min(state.foe, state.foes.length - 1);
  const attacker = party.members[state.own];
  const defender = species[state.foes[state.foe]];
  $("ownPartyName").textContent = party.name.split("｜")[0];
  $("ownTeam").innerHTML = party.members.map((m,i)=>teamCard(m.id,"own",i)).join("");
  $("foeTeam").innerHTML = state.foes.map((id,i)=>teamCard(id,"foe",i)).join("");
  $("attackerHero").innerHTML = hero(attacker.id, attacker.item);
  $("defenderHero").innerHTML = hero(state.foes[state.foe], "相手配分を幅で計算");
  const methodLabel = state.analysisMethod === "ai" ? "AI補助" : "端末内認識";
  $("confidenceText").textContent = state.analysisConfidence == null ? methodLabel : `${methodLabel} ${state.analysisConfidence}%`;
  $("profileText").textContent = `${state.analysisLabel || "選択画像"}・相手6体を検出`;
  renderDamage(attacker, defender);
  renderSpeed(attacker, defender);
  renderType(attacker, defender);
  renderCorrection();
}

function setMode(mode) {
  state.mode = mode;
  document.querySelectorAll("[data-mode]").forEach(b=>b.classList.toggle("active", b.dataset.mode===mode));
  ["damage","speed","type"].forEach(name=>{ const view=$(name+"View"); view.hidden=name!==mode; view.classList.toggle("active",name===mode); });
}

function startTeamPreview(file, src, label = "選択画像") {
  setCaptureStatus();
  $("scanImage").src = src;
  state.analysisLabel = label;
  showScreen("scan");
  runScan(file);
}

function setCaptureStatus(message = "", isError = false) {
  const status = $("captureStatus");
  if (!status) return;
  status.classList.toggle("error", isError);
  status.innerHTML = message
    ? `<i class="ph ph-warning-circle"></i> ${escapeHtml(message)}`
    : '<i class="ph ph-device-mobile"></i> 通常はiPhone内で無料判定・画像は保存しません';
}

function resetScanSteps() {
  const labels = [
    [$("scanOpponent"), "端末内でアイコン照合"],
    [$("scanTypes"), "タイプ・メガ候補"],
    [$("scanMatch"), "登録パーティと照合"],
  ];
  labels.forEach(([el, label]) => {
    el.classList.remove("done");
    el.innerHTML = `<i class="ph ph-circle-dashed"></i> ${label}`;
  });
}

function completeScanStep(id) {
  const el = $(id);
  el.classList.add("done");
  el.querySelector("i").className = "ph ph-check-circle";
}

async function runScan(file) {
  const token = ++state.scanToken;
  state.scanController?.abort();
  state.scanController = new AbortController();
  const progress = $("scanProgress");
  resetScanSteps();
  let amount = 12;
  progress.style.width = `${amount}%`;
  const pulse = setInterval(() => {
    amount = Math.min(72, amount + (amount < 44 ? 5 : 2));
    progress.style.width = `${amount}%`;
  }, 420);
  try {
    const local = await recognizeTeamPreviewLocally(file);
    window.BattleLens.lastLocal = local;
    let result = local.result;
    state.analysisMethod = "local";
    progress.style.width = "58%";
    completeScanStep("scanOpponent");
    if (!local.reliable && $("aiFallbackEnabled").checked) {
      try {
        result = await analyzeScreenshots("team_preview", [file], state.scanController.signal);
        state.analysisMethod = "ai";
      } catch (aiError) {
        throw new Error("認識できませんでした。AI補助も利用できないため、結果は確定していません。別のスクショで再撮影してください。");
      }
    }
    if (!local.reliable && state.analysisMethod === "local") {
      throw new Error("認識できませんでした。未確定の候補は表示していません。別のスクショを選ぶか、AI補助を有効にしてください。");
    }
    if (
      state.analysisMethod === "ai"
      && (
        Number(result.overall_confidence || 0) < 60
        || orderedMembers(result).length !== 6
        || orderedMembers(result).some((member) => Number(member.confidence || 0) < 45)
      )
    ) {
      throw new Error("認識できませんでした。AIの信頼度が低いため、結果は確定していません。");
    }
    if (token !== state.scanToken) return;
    state.foes = analysisToFoes(result);
    state.analysisConfidence = result.overall_confidence;
    state.analysisWarnings = result.warnings || [];
    state.own = 0;
    state.foe = 0;
    progress.style.width = "78%";
    await new Promise((resolve) => setTimeout(resolve, 180));
    completeScanStep("scanTypes");
    progress.style.width = "90%";
    await new Promise((resolve) => setTimeout(resolve, 180));
    completeScanStep("scanMatch");
    progress.style.width = "100%";
    await new Promise((resolve) => setTimeout(resolve, 160));
    if (token !== state.scanToken) return;
    renderResult();
    showScreen("result");
    if (state.analysisWarnings.length) toast("一部に要確認があります。認識を修正してください", 4200);
    else if (state.analysisMethod === "local") toast("iPhone内で無料判定しました");
  } catch (error) {
    if (error.name === "AbortError" || token !== state.scanToken) return;
    showScreen("capture");
    const message = error.message || "認識できませんでした";
    setCaptureStatus(message, true);
    toast(message, 5200);
  } finally {
    clearInterval(pulse);
    if (token === state.scanToken) state.scanController = null;
  }
}

function cancelScan() { state.scanToken++; state.scanController?.abort(); state.scanController=null; showScreen("capture"); }
function toast(message, duration = 2400) { const el=$("toast"); el.textContent=message; el.hidden=false; clearTimeout(toast.timer); toast.timer=setTimeout(()=>el.hidden=true,duration); }

document.addEventListener("click", async (event) => {
  const partyItem = event.target.closest("[data-party-index]");
  if (partyItem) { selectPartyForEdit(partyItem.dataset.partyIndex); return; }
  const sample = event.target.closest("[data-sample]");
  if (sample) {
    const key = sample.dataset.sample;
    try {
      const image = sample.querySelector("img");
      const response = await fetch(image.src);
      const blob = await response.blob();
      const file = new File([blob], `sample-${key}.jpg`, { type: blob.type || "image/jpeg" });
      startTeamPreview(file, image.src, sampleLabels[key] || "サンプル画像");
    } catch (_) {
      toast("サンプル画像を開けませんでした", 4200);
    }
    return;
  }
  const go = event.target.closest("[data-go]");
  if (go) { cancelScan(); return; }
  const card = event.target.closest("[data-side]");
  if (card) { state[card.dataset.side === "own" ? "own" : "foe"] = Number(card.dataset.index); renderResult(); return; }
  const mode = event.target.closest("[data-mode]");
  if (mode) { setMode(mode.dataset.mode); return; }
});

$("screenshotInput").addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const src = await readFileAsDataUrl(file);
    startTeamPreview(file, src, file.name || "選択画像");
  } catch (error) {
    toast(error.message, 4200);
  } finally {
    event.target.value = "";
  }
});

$("captureParty").addEventListener("change", (e)=>{ state.party=Number(e.target.value); $("resultParty").value=e.target.value; renderCaptureParty(); });
$("resultParty").addEventListener("change", (e)=>{ state.party=Number(e.target.value); $("captureParty").value=e.target.value; state.own=0; renderResult(); toast("使用パーティを切り替えました"); });
$("openPartyManager").addEventListener("click", openPartyManager);
$("openBoxNav").addEventListener("click", openPartyManager);
$("aiFallbackEnabled").checked = localStorage.getItem(AI_FALLBACK_STORE_KEY) !== "false";
$("aiFallbackEnabled").addEventListener("change", (event) => {
  localStorage.setItem(AI_FALLBACK_STORE_KEY, String(event.target.checked));
  toast(event.target.checked ? "低信頼時だけAI補助します" : "端末内判定だけで使用します");
});
$("partyBackButton").addEventListener("click", ()=>{ fillPartySelects(); if (state.partyReturn === "result") renderResult(); showScreen(state.partyReturn); });
$("newPartyButton").addEventListener("click", ()=>{ parties.push(blankParty()); state.editParty=parties.length-1; saveParties(); fillPartySelects(); renderPartyEditor(); toast("新しいパーティを作成しました"); });
$("savePartyButton").addEventListener("click", saveEditorParty);
$("duplicatePartyButton").addEventListener("click", duplicateParty);
$("deletePartyButton").addEventListener("click", deleteParty);
$("toggleTextImport").addEventListener("click", ()=>{ const panel=$("textImportPanel"); panel.hidden=!panel.hidden; if (!panel.hidden) $("partyTextInput").focus(); });
$("importTextButton").addEventListener("click", ()=>{ try { addImportedParty(parsePartyText($("partyTextInput").value),"テキストから6体作成"); $("textImportPanel").hidden=true; } catch (error) { $("partyImportStatus").textContent=error.message; $("partyImportStatus").classList.remove("success"); toast(error.message); } });
$("championsPartyInput").addEventListener("change", async e=>{ const files=[...e.target.files]; e.target.value=""; await detectImportFiles(files,"champions"); });
$("battleMemoPartyInput").addEventListener("change", async e=>{ const files=[...e.target.files]; e.target.value=""; if (files[0]) await detectImportFiles(files,"battleMemo"); });
$("partyMemberEditor").addEventListener("change", event=>{
  if (!event.target.matches('[data-field="id"]')) return;
  const card=event.target.closest(".member-editor-card");
  const base=species[event.target.value];
  card.querySelector(".sprite-slot").innerHTML=spriteElement(event.target.value);
  [["hp",base.hp],["def",base.def],["spd",base.spd],["speed",base.speed]].forEach(([key,value])=>{ card.querySelector(`[data-field="${key}"]`).value=value; });
});
$("cancelScan").addEventListener("click", cancelScan);
$("retakeButton").addEventListener("click", ()=>showScreen("capture"));
$("toggleCorrection").addEventListener("click", ()=>{ const panel=$("correctionPanel"); panel.hidden=!panel.hidden; $("toggleCorrection").classList.toggle("active",!panel.hidden); });
$("correctionFields").addEventListener("change", (e)=>{ if (!e.target.matches("[data-correction]")) return; state.foes[Number(e.target.dataset.correction)]=e.target.value; renderResult(); $("correctionPanel").hidden=false; toast("認識結果を修正しました"); });

fillPartySelects();
showScreen("capture");
setMode("damage");
const isLocalPreview = ["127.0.0.1", "localhost"].includes(location.hostname);
if ("serviceWorker" in navigator && location.protocol.startsWith("http") && !isLocalPreview) navigator.serviceWorker.register("sw.js").catch(()=>{});

window.BattleLens = { species, parties, typeMultiplier, calculateDamage, speciesIdFromName, analysisToFoes, analysisToParty, recognizeTeamPreviewLocally };
