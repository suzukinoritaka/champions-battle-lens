const ASSET = "";

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
const parties = [
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

const profiles = {
  koko: { label:"koko戦", confidence:97, foes:["garchomp","grimmsnarl","charizard","primarina","hippowdon","basculegion"] },
  gs: { label:"GS_CES戦", confidence:96, foes:["kingambit","charizard","aerodactyl","garchomp","farigiraf","sylveon"] },
  yusk: { label:"yusk戦", confidence:98, foes:["ninetalesAlola","ceruledge","delphox","archaludon","aegislash","meowscarada"] }
};

const state = { screen:"capture", party:0, profile:"koko", foes:[...profiles.koko.foes], own:0, foe:0, mode:"damage", scanToken:0 };
const $ = (id) => document.getElementById(id);
const sprite = (id) => ASSET + species[id].sprite;

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
  return Math.floor(species[member.id].speed * (member.speedMult || 1));
}

function showScreen(name) {
  state.screen = name;
  document.querySelectorAll("[data-screen]").forEach((el) => { el.hidden = el.dataset.screen !== name; el.classList.toggle("active", el.dataset.screen === name); });
  document.querySelectorAll("[data-step]").forEach((el) => el.classList.toggle("active", el.dataset.step === name));
}

function fillPartySelects() {
  const options = parties.map((p, i) => `<option value="${i}">${p.name}</option>`).join("");
  [$("captureParty"), $("resultParty")].forEach((select) => { select.innerHTML = options; select.value = String(state.party); });
}

function teamCard(id, side, index) {
  const mon = species[id];
  const selected = side === "own" ? index === state.own : index === state.foe;
  const speed = side === "own" ? effectiveSpeed(parties[state.party].members[index]) : `${speedRange(mon).min}–${speedRange(mon).max}`;
  return `<button class="pokemon-card${selected ? " selected" : ""}" type="button" data-side="${side}" data-index="${index}">
    <img src="${sprite(id)}" alt=""><span><b>${mon.name}</b><small>${mon.types.map(t => typeNames[t]).join(" / ")}</small></span><span class="speed-mini">S ${speed}</span>
  </button>`;
}

function hero(id, sub) {
  const mon = species[id];
  return `<img src="${sprite(id)}" alt=""><span><b>${mon.name}</b><small>${sub}</small></span>`;
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
  $("confidenceText").textContent = `認識 ${profiles[state.profile]?.confidence || 82}%`;
  $("profileText").textContent = `${profiles[state.profile]?.label || "選択画像"}・相手6体を検出`;
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

function loadImageSource(src, forcedProfile) {
  state.profile = forcedProfile || detectProfile(src);
  state.foes = [...profiles[state.profile].foes];
  $("scanImage").src = src;
  showScreen("scan");
  runScan();
}

function detectProfile(src) {
  const text = String(src).toLowerCase();
  if (text.includes("1999") || text.includes("gs-ces")) return "gs";
  if (text.includes("2001") || text.includes("yusk")) return "yusk";
  return "koko";
}

async function runScan() {
  const token = ++state.scanToken;
  const progress = $("scanProgress");
  const steps = [[$("scanOpponent"),36],[$("scanTypes"),68],[$("scanMatch"),100]];
  steps.forEach(([el])=>{ el.classList.remove("done"); el.innerHTML='<i class="ph ph-circle-dashed"></i> '+el.textContent.trim(); });
  progress.style.width = "10%";
  for (const [el,amount] of steps) {
    await new Promise(resolve=>setTimeout(resolve,360));
    if (token !== state.scanToken) return;
    progress.style.width = amount+"%";
    el.classList.add("done");
    el.querySelector("i").className = "ph ph-check-circle";
  }
  await new Promise(resolve=>setTimeout(resolve,180));
  if (token !== state.scanToken) return;
  renderResult();
  showScreen("result");
}

function cancelScan() { state.scanToken++; showScreen("capture"); }
function toast(message) { const el=$("toast"); el.textContent=message; el.hidden=false; clearTimeout(toast.timer); toast.timer=setTimeout(()=>el.hidden=true,1800); }

document.addEventListener("click", (event) => {
  const sample = event.target.closest("[data-sample]");
  if (sample) { const key=sample.dataset.sample; loadImageSource(sample.querySelector("img").src,key); return; }
  const go = event.target.closest("[data-go]");
  if (go) { cancelScan(); return; }
  const card = event.target.closest("[data-side]");
  if (card) { state[card.dataset.side === "own" ? "own" : "foe"] = Number(card.dataset.index); renderResult(); return; }
  const mode = event.target.closest("[data-mode]");
  if (mode) { setMode(mode.dataset.mode); return; }
});

$("screenshotInput").addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => loadImageSource(reader.result, detectProfile(file.name));
  reader.readAsDataURL(file);
});

$("captureParty").addEventListener("change", (e)=>{ state.party=Number(e.target.value); $("resultParty").value=e.target.value; });
$("resultParty").addEventListener("change", (e)=>{ state.party=Number(e.target.value); $("captureParty").value=e.target.value; state.own=0; renderResult(); toast("使用パーティを切り替えました"); });
$("cancelScan").addEventListener("click", cancelScan);
$("retakeButton").addEventListener("click", ()=>showScreen("capture"));
$("toggleCorrection").addEventListener("click", ()=>{ const panel=$("correctionPanel"); panel.hidden=!panel.hidden; $("toggleCorrection").classList.toggle("active",!panel.hidden); });
$("correctionFields").addEventListener("change", (e)=>{ if (!e.target.matches("[data-correction]")) return; state.foes[Number(e.target.dataset.correction)]=e.target.value; renderResult(); $("correctionPanel").hidden=false; toast("認識結果を修正しました"); });

fillPartySelects();
showScreen("capture");
setMode("damage");
const isLocalPreview = ["127.0.0.1", "localhost"].includes(location.hostname);
if ("serviceWorker" in navigator && location.protocol.startsWith("http") && !isLocalPreview) navigator.serviceWorker.register("sw.js").catch(()=>{});

window.BattleLens = { species, parties, profiles, typeMultiplier, calculateDamage };
