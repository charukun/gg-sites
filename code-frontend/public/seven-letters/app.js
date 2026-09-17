const state = {
  profile: JSON.parse(localStorage.getItem('sevenLettersProfile') || 'null'),
  intent: '',
  vibes: [],
  missionIndex: Number(localStorage.getItem('sevenLettersMission') || 0),
  completed: localStorage.getItem('sevenLettersCompleted') === '1',
  liked: localStorage.getItem('sevenLettersLiked') === '1'
};

const missions = [
  {
    time: '18:40',
    sign: '青いもの',
    text: `今日、帰り道をひとつだけ変えた。\n18:40ごろ、小さな本屋に入った。\n\n青い表紙の本を一冊だけ手に取って、最初の1ページを読んだ。\n買わなくてもいい。\n\nそのとき、すぐ近くにいた誰かも、\nたぶん少しだけ勇気を出していた。`,
    summary: '帰り道をひとつ変えて、小さな本屋へ。青い表紙の本を1冊だけ手に取る。',
    snippet: '「今日は、普段なら入らない場所に入ってみた。知らない本の背表紙を眺める時間が、思ったより好きだった。」',
    tags: ['本屋', '静かな場所', '夜の寄り道']
  },
  {
    time: '16:20',
    sign: '白い飲み物',
    text: `午後、予定を15分だけ空けた。\n16:20。いつもは通り過ぎるカフェに入った。\n\n白い飲み物をひとつ頼んで、窓側ではなく店の奥に座った。\nスマホは5分だけ伏せておいた。\n\n誰かと話したわけじゃない。\nでも、未来の始まりは案外こういう日だった。`,
    summary: 'いつもは通り過ぎるカフェへ。白い飲み物を頼み、5分だけスマホを伏せて過ごす。',
    snippet: '「カフェで何もしない5分を作った。暇になると思ったのに、店の音が妙に心地よかった。」',
    tags: ['カフェ', '余白', 'ひとり時間']
  },
  {
    time: '19:10',
    sign: '丸いもの',
    text: `19:10。駅を出たあと、10分だけ遠回りした。\n公園か川沿いか、空が少し見える道を選んだ。\n\n途中で「丸いもの」を一つ見つけた。\n看板でも、月でも、誰かの傘でもいい。\n\nその景色を覚えておく。\nあとで誰かに話すことになるから。`,
    summary: '帰り道を10分だけ遠回り。空が見える道で「丸いもの」をひとつ覚えて帰る。',
    snippet: '「遠回りしたら、思っていたより月が大きかった。誰かに言いたくなる景色って久しぶりだった。」',
    tags: ['散歩', '夜景', '寄り道']
  }
];

const views = [...document.querySelectorAll('[data-view]')];
const bottomNav = document.getElementById('bottomNav');
const toast = document.getElementById('toast');

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1800);
}

function go(id) {
  views.forEach(v => v.classList.toggle('active', v.id === id));
  const showNav = ['diary', 'mission', 'reveal', 'mutual', 'inbox', 'account'].includes(id);
  bottomNav.classList.toggle('hidden', !showNav);
  bottomNav.querySelectorAll('button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.go === id || (id === 'mission' && btn.dataset.go === 'diary'));
  });
  window.scrollTo({ top: 0, behavior: 'instant' });
}

document.querySelectorAll('[data-go]').forEach(btn => btn.addEventListener('click', () => go(btn.dataset.go)));
document.querySelectorAll('[data-action="begin-profile"]').forEach(btn => btn.addEventListener('click', () => go('profile')));
document.getElementById('startBtn').addEventListener('click', () => state.profile ? (renderDiary(), go('diary')) : go('profile'));

const ageSelect = document.getElementById('age');
for (let age = 18; age <= 80; age++) {
  const opt = document.createElement('option');
  opt.value = age;
  opt.textContent = `${age}歳`;
  ageSelect.appendChild(opt);
}

if (state.profile) {
  document.getElementById('nickname').value = state.profile.nickname || '';
  document.getElementById('age').value = state.profile.age || '';
  document.getElementById('area').value = state.profile.area || '';
  document.getElementById('consent').checked = true;
  state.intent = state.profile.intent || '';
  state.vibes = state.profile.vibes || [];
  hydrateChoices();
}

function hydrateChoices() {
  document.querySelectorAll('.chips[data-group="intent"] button').forEach(b => b.classList.toggle('selected', b.dataset.value === state.intent));
  document.querySelectorAll('.chips[data-group="vibes"] button').forEach(b => b.classList.toggle('selected', state.vibes.includes(b.dataset.value)));
}

document.querySelectorAll('.single-choice button').forEach(btn => {
  btn.addEventListener('click', () => {
    state.intent = btn.dataset.value;
    document.querySelectorAll('.single-choice button').forEach(b => b.classList.toggle('selected', b === btn));
  });
});

document.querySelectorAll('.multi-choice button').forEach(btn => {
  btn.addEventListener('click', () => {
    const value = btn.dataset.value;
    if (state.vibes.includes(value)) state.vibes = state.vibes.filter(v => v !== value);
    else if (state.vibes.length < 4) state.vibes.push(value);
    else return showToast('好きな寄り道は4つまで');
    btn.classList.toggle('selected', state.vibes.includes(value));
  });
});

document.getElementById('profileForm').addEventListener('submit', (e) => {
  e.preventDefault();
  if (!state.intent) return showToast('出会いたい関係を選んでください');
  if (!state.vibes.length) return showToast('好きな寄り道を1つ以上選んでください');

  state.profile = {
    nickname: document.getElementById('nickname').value.trim(),
    age: document.getElementById('age').value,
    area: document.getElementById('area').value,
    intent: state.intent,
    vibes: state.vibes
  };
  localStorage.setItem('sevenLettersProfile', JSON.stringify(state.profile));
  renderDiary();
  go('diary');
});

function futureDateInfo() {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  const label = `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
  const jp = `${d.getMonth()+1}月${d.getDate()}日`;
  return { label, jp };
}

function renderDiary() {
  const mission = missions[state.missionIndex % missions.length];
  const date = futureDateInfo();
  document.getElementById('diaryName').textContent = state.profile?.nickname || 'あなた';
  document.getElementById('letterDate').textContent = date.label;
  document.getElementById('futureDate').textContent = date.jp;
  document.getElementById('diaryText').textContent = mission.text;
  document.getElementById('missionTime').textContent = mission.time;
  document.getElementById('missionSign').textContent = mission.sign;
  document.getElementById('missionSummary').textContent = mission.summary;
  document.getElementById('matchSnippet').textContent = mission.snippet;
  const tags = document.getElementById('commonTags');
  tags.innerHTML = mission.tags.map(t => `<span>${t}</span>`).join('');
  document.getElementById('accountTitle').textContent = `${state.profile?.nickname || 'あなた'}の記録`;
}

renderDiary();

document.getElementById('rerollMission').addEventListener('click', () => {
  state.missionIndex = (state.missionIndex + 1) % missions.length;
  localStorage.setItem('sevenLettersMission', state.missionIndex);
  renderDiary();
  showToast('別の未来から日記が届きました');
});

document.getElementById('acceptMission').addEventListener('click', () => {
  go('mission');
});

document.getElementById('completeMission').addEventListener('click', () => {
  state.completed = true;
  localStorage.setItem('sevenLettersCompleted', '1');
  document.getElementById('matchName').textContent = 'まだ名前は秘密';
  go('reveal');
});

document.getElementById('skipMission').addEventListener('click', () => {
  showToast('大丈夫。未来は明日また届きます');
  setTimeout(() => go('diary'), 500);
});

document.getElementById('likeMatch').addEventListener('click', () => {
  state.liked = true;
  localStorage.setItem('sevenLettersLiked', '1');
  go('mutual');
});

document.getElementById('passMatch').addEventListener('click', () => {
  showToast('このページは静かに閉じました');
  setTimeout(() => go('inbox'), 500);
});

document.getElementById('openChat').addEventListener('click', () => go('chat'));

document.getElementById('chatForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('chatText');
  const text = input.value.trim();
  if (!text) return;
  const bubble = document.createElement('div');
  bubble.className = 'bubble mine';
  bubble.textContent = text;
  document.getElementById('chatMessages').appendChild(bubble);
  input.value = '';
  bubble.scrollIntoView({ behavior: 'smooth', block: 'end' });
  setTimeout(() => {
    const reply = document.createElement('div');
    reply.className = 'bubble theirs';
    reply.textContent = 'それ気になります。未来の日記、ちょっと当たってましたね。';
    document.getElementById('chatMessages').appendChild(reply);
    reply.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, 800);
});

document.getElementById('soundToggle').addEventListener('click', () => showToast('静かなモードで体験中'));

document.getElementById('resetDemo').addEventListener('click', () => {
  localStorage.removeItem('sevenLettersProfile');
  localStorage.removeItem('sevenLettersMission');
  localStorage.removeItem('sevenLettersCompleted');
  localStorage.removeItem('sevenLettersLiked');
  location.reload();
});

if (state.profile) document.getElementById('accountTitle').textContent = `${state.profile.nickname}の記録`;
