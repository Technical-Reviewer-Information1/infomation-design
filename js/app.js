(function () {
  'use strict';
  const $ = id => document.getElementById(id);

  /* ===== STEP 1 ===== */
  function drawMethodTable() {
    $('methodTable').innerHTML = '<thead><tr><th>手法</th><th>説明</th><th>例</th></tr></thead><tbody>' +
      '<tr><td><strong>抽象化</strong></td><td>大量の情報から、伝えたい情報だけをシンプルに伝えること。</td><td>ピクトグラム・アイコン・図形</td></tr>' +
      '<tr><td><strong>可視化</strong></td><td>データを表やグラフなどで視覚的に表現し、分かりやすくすること。</td><td>表・グラフ・インフォグラフィックス</td></tr>' +
      '<tr><td><strong>構造化</strong></td><td>情報を、関係性やつながり・レベル・段階・順序によって整理して分かりやすく表現すること。</td><td>Webページの階層メニュー・文章の構造化</td></tr></tbody>';
  }
  const MET = [
    { k: 'a', t: '内容をカテゴリーごとに分け、階層的に整理する。', a: '構造化', why: '「分けて」「階層的に」＝関係や段階で整理しているので構造化です。' },
    { k: 'b', t: '図や表を用いて、直感的に情報を理解しやすくする。', a: '可視化', why: '図や表で見えるようにしているので可視化です。' },
    { k: 'c', t: '複雑な内容を、シンプルな図形やイラストに置き換えて表現する。', a: '抽象化', why: '要点だけを残してシンプルにしているので抽象化です。' }
  ];
  const MCH = ['抽象化', '可視化', '構造化'];
  let mAns = {};
  function drawMethods() {
    $('methodBox').innerHTML = MET.map((m, i) =>
      '<div class="mrow"><div class="q">' + m.k + '　' + m.t + '</div>' +
      '<div class="choice4" data-i="' + i + '">' + MCH.map(c =>
        '<button class="btn" data-i="' + i + '" data-c="' + c + '" style="text-align:center">' + c + '</button>').join('') + '</div>' +
      '<div class="note" id="mfb' + i + '" hidden style="margin-top:8px"></div></div>').join('');
    $('methodBox').querySelectorAll('button[data-c]').forEach(b => b.addEventListener('click', () => {
      const i = +b.dataset.i, m = MET[i], ok = b.dataset.c === m.a;
      const row = $('methodBox').querySelector('.choice4[data-i="' + i + '"]');
      row.classList.add('locked');
      [...row.children].forEach(x => { if (x.dataset.c === m.a) x.classList.add('correct'); else if (x === b) x.classList.add('wrong'); });
      const fb = $('mfb' + i); fb.hidden = false; fb.className = 'note ' + (ok ? 'ok' : 'ng');
      fb.innerHTML = (ok ? '正解。' : '正解は <strong>' + m.a + '</strong>。') + m.why;
      mAns[i] = ok;
      const done = Object.keys(mAns).length, right = Object.values(mAns).filter(Boolean).length;
      const n = $('methodNote');
      n.className = 'note ' + (done === 3 ? (right === 3 ? 'ok' : 'warn') : 'info');
      n.innerHTML = done + ' / 3 問（正解 ' + right + ' 問）' +
        (done === 3 ? '<br>a＝構造化、b＝可視化、c＝抽象化。この組合せは【ア】＝<strong>①</strong>です。' : '');
    }));
    $('methodNote').className = 'note info'; $('methodNote').textContent = '0 / 3 問';
  }

  /* ===== STEP 2 PREP ===== */
  const PREP = [
    { k: 'A', t: '理由は、夜型生活は体内時計を乱し、集中力も低下させてしまうからです。', role: 'R' },
    { k: 'B', t: '高校生には朝型生活をおすすめします。', role: 'P1' },
    { k: 'C', t: '朝に暗記系の勉強をすると、効率が良いという研究もあります。', role: 'E' },
    { k: 'D', t: 'ぜひ、毎朝決まった時間に起きてみてください。', role: 'P2' }
  ];
  const SLOTS = [
    { tag: 'P（Point・要点）', role: 'P1', hint: '結論・主張を先に言う' },
    { tag: 'R（Reason・理由）', role: 'R', hint: 'なぜそう言えるのか' },
    { tag: 'E（Example・具体例）', role: 'E', hint: '理由を支える例' },
    { tag: 'P（Point・まとめ）', role: 'P2', hint: 'もう一度主張してしめる' }
  ];
  let placed = [];
  function drawPrep() {
    $('prepSlots').innerHTML = SLOTS.map((s, i) => {
      const c = placed[i];
      return '<div class="slot' + (c ? ' filled' : '') + '"><span class="tag">' + s.tag + '</span>' +
        (c ? '<span class="txt"><strong>' + c.k + '</strong>　' + c.t + '</span>'
           : '<span class="txt" style="color:var(--ink-3)">' + s.hint + '</span>') + '</div>';
    }).join('');
    $('prepCards').innerHTML = PREP.map(c =>
      '<button class="c' + (placed.indexOf(c) >= 0 ? ' used' : '') + '" data-k="' + c.k + '"><strong>' + c.k + '</strong>　' + c.t + '</button>').join('');
    $('prepCards').querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
      if (placed.length >= 4) return;
      placed.push(PREP.find(c => c.k === b.dataset.k));
      drawPrep();
    }));
    const n = $('prepNote');
    if (placed.length < 4) {
      n.className = 'note info';
      n.innerHTML = placed.length + ' / 4 枚。' + (placed.length === 0 ? 'まず「要点」にあたる文はどれでしょう。' : '次は「' + SLOTS[placed.length].tag + '」です。');
      return;
    }
    const order = placed.map(c => c.k).join('→');
    const ok = order === 'B→A→C→D';
    n.className = 'note ' + (ok ? 'ok' : 'ng');
    n.innerHTML = 'あなたの並び：<strong>' + order + '</strong><br>' +
      (ok ? '正解です（【イ】＝<strong>③</strong>）。' : '正しい並びは <strong>B→A→C→D</strong>（【イ】＝③）です。') +
      '<br>Bが結論、Aがその理由、Cが具体例、Dで最後にもう一度よびかけています。' +
      '<br><span class="small">PREP法は、最初に結論を言うので聞き手が話の道すじをつかみやすくなります。スピーチだけでなく、レポートやメールにも使えます。</span>';
  }

  /* ===== STEP 3 図 ===== */
  const FIGS = [
    { no: '⓪', nm: 'ピラミッド図', svg: '<polygon points="60,8 96,66 24,66" fill="#123a6b" opacity=".85"/><line x1="34" y1="50" x2="86" y2="50" stroke="#fff" stroke-width="2"/><line x1="44" y1="34" x2="76" y2="34" stroke="#fff" stroke-width="2"/>', use: '段階・レベルの上下関係を表す' },
    { no: '①', nm: 'ベン図', svg: '<circle cx="46" cy="34" r="24" fill="#123a6b" opacity=".55"/><circle cx="74" cy="34" r="24" fill="#123a6b" opacity=".35"/><circle cx="60" cy="54" r="24" fill="#123a6b" opacity=".7"/>', use: '集合の分類・重なりを表す' },
    { no: '②', nm: 'マトリックス図', svg: '<line x1="60" y1="6" x2="60" y2="72" stroke="#15181c" stroke-width="1.5"/><line x1="16" y1="39" x2="104" y2="39" stroke="#15181c" stroke-width="1.5"/><rect x="26" y="12" width="26" height="20" fill="#123a6b" opacity=".8"/><rect x="68" y="12" width="26" height="20" fill="#123a6b" opacity=".5"/><rect x="26" y="46" width="26" height="20" fill="#123a6b" opacity=".3"/><rect x="68" y="46" width="26" height="20" fill="#123a6b" opacity=".15"/>', use: '2つの軸で4つに分類する' },
    { no: '③', nm: '関連図', svg: '<line x1="60" y1="20" x2="34" y2="58" stroke="#858a92" stroke-width="2"/><line x1="60" y1="20" x2="86" y2="58" stroke="#858a92" stroke-width="2"/><circle cx="60" cy="20" r="12" fill="#123a6b"/><circle cx="34" cy="58" r="12" fill="#123a6b" opacity=".45"/><circle cx="86" cy="58" r="12" fill="#123a6b" opacity=".45"/>', use: 'ものごとのつながりを表す' },
    { no: '④', nm: 'ツリー図（組織図）', svg: '<rect x="30" y="10" width="34" height="16" fill="#123a6b"/><rect x="70" y="34" width="30" height="14" fill="#123a6b" opacity=".5"/><rect x="70" y="56" width="30" height="14" fill="#123a6b" opacity=".5"/><path d="M47,26 L47,63 L70,63 M47,41 L70,41" fill="none" stroke="#858a92" stroke-width="1.6"/>', use: '階層・分岐を表す' },
    { no: '⑤', nm: '循環図', svg: '<circle cx="60" cy="16" r="10" fill="#123a6b"/><circle cx="92" cy="40" r="10" fill="#123a6b" opacity=".45"/><circle cx="80" cy="68" r="10" fill="#123a6b" opacity=".45"/><circle cx="40" cy="68" r="10" fill="#123a6b" opacity=".45"/><circle cx="28" cy="40" r="10" fill="#123a6b" opacity=".45"/><path d="M72,22 L82,32 M92,52 L86,58 M68,72 L52,72 M30,54 L36,60 M32,30 L48,20" stroke="#8a5a00" stroke-width="2" fill="none"/>', use: 'くり返す流れを表す' }
  ];
  const CASES = [
    { k: 'ウ', who: '生徒A', t: 'クラスの生徒全員の通学手段を「電車」「バス」「自転車」で分類し表現します。', a: '①', why: '全体を部分に分類しているので<strong>ベン図</strong>が適しています。重なり（両方使う人）も表せます。' },
    { k: 'エ', who: '生徒B', t: '制作の過程を「Plan」「Do」「Check」「Action」といった流れで表現します。', a: '⑤', why: 'くり返されるプロセスなので<strong>循環図</strong>が適しています。' },
    { k: 'オ', who: '生徒C', t: '価格と重量に着目して「5万円以上・未満」×「1kg以上・未満」の4区分に分類し表現します。', a: '②', why: '2つの軸で4つに分けるので<strong>マトリックス図</strong>が適しています。' }
  ];
  let curCase = 0, cAns = {};
  function drawCases() {
    $('caseBox').innerHTML = CASES.map((c, i) =>
      '<div class="mrow" data-i="' + i + '" style="' + (i === curCase ? 'border-color:var(--accent);border-width:2px;background:var(--warn-bg)' : 'cursor:pointer') + '">' +
      '<div class="q">【' + c.k + '】' + c.who + '</div><div style="font-size:.9rem">' + c.t + '</div>' +
      '<div class="note" id="cfb' + i + '" hidden style="margin-top:8px"></div></div>').join('');
    $('caseBox').querySelectorAll('.mrow').forEach(r => r.addEventListener('click', () => { curCase = +r.dataset.i; drawCases(); drawFigs(); }));
    // 既に出した結果を復元
    Object.keys(cAns).forEach(i => {
      const fb = $('cfb' + i); if (!fb) return;
      fb.hidden = false; fb.className = 'note ' + (cAns[i].ok ? 'ok' : 'ng');
      fb.innerHTML = (cAns[i].ok ? '正解。' : '正解は <strong>' + CASES[i].a + '</strong>。') + CASES[i].why;
    });
  }
  function drawFigs() {
    $('figBox').innerHTML = FIGS.map(f => {
      let cls = '';
      const picked = cAns[curCase];
      if (picked) {
        if (f.no === CASES[curCase].a) cls = ' correct';
        else if (f.no === picked.pick) cls = ' wrong';
      }
      return '<div class="f' + cls + '" data-no="' + f.no + '"><div class="no">' + f.no + '</div>' +
        '<svg viewBox="0 0 120 78" role="img" aria-label="' + f.nm + '">' + f.svg + '</svg>' +
        '<div class="nm">' + (picked ? f.nm : '') + '</div></div>';
    }).join('');
    $('figBox').querySelectorAll('.f').forEach(el => el.addEventListener('click', () => {
      if (cAns[curCase]) return;
      const no = el.dataset.no, c = CASES[curCase];
      cAns[curCase] = { pick: no, ok: no === c.a };
      drawCases(); drawFigs();
      const done = Object.keys(cAns).length, right = Object.values(cAns).filter(x => x.ok).length;
      const n = $('figNote');
      n.className = 'note ' + (done === 3 ? (right === 3 ? 'ok' : 'warn') : 'info');
      n.innerHTML = done + ' / 3 問（正解 ' + right + ' 問）' +
        (done === 3 ? '<br>本文の答えは【ウ】①（ベン図）　【エ】⑤（循環図）　【オ】②（マトリックス図）です。'
                    : '<br>上の説明をクリックすると、次の問題に切り替わります。');
      const next = [0, 1, 2].find(i => !cAns[i]);
      if (next !== undefined) { curCase = next; drawCases(); drawFigs(); }
    }));
  }
  function drawUseTable() {
    $('useTable').innerHTML = '<thead><tr><th>図の種類</th><th>表せる関係</th><th>使う場面の例</th></tr></thead><tbody>' +
      FIGS.map(f => '<tr><td>' + f.no + '　<strong>' + f.nm + '</strong></td><td>' + f.use + '</td><td>' +
        ({ 'ピラミッド図': '重要度の順位、階層構造', 'ベン図': 'アンケートの分類、集合の重なり', 'マトリックス図': '価格と性能、緊急度と重要度',
           '関連図': '原因と結果のつながり、人間関係', 'ツリー図': '組織図、フォルダ構成、分類の枝分かれ', '循環図': 'PDCAサイクル、季節のめぐり' }[f.nm]) +
        '</td></tr>').join('') + '</tbody>';
  }

  function init() {
    if (document.getElementById('chkBox')) {
      const FG = ['ピラミッド図', 'ベン図', 'マトリックス図', '関連図', 'ツリー図', '循環図'];
      window.Quiz.choice('chkBox', 'chkNote', [
        { k: '1', q: 'アンケートで「部活動もアルバイトもしている人」の重なりを示したい。', ch: FG, a: 1,
          why: '集合の<strong>重なり</strong>を表すのはベン図です。' },
        { k: '2', q: '「なぜ遅刻が増えたのか」原因と結果のつながりを示したい。', ch: FG, a: 3,
          why: '原因と結果の<strong>つながり</strong>を線で結ぶのが関連図です。' },
        { k: '3', q: '価格と性能の2つの軸で、商品の位置づけを示したい。', ch: FG, a: 2,
          why: '<strong>2つの軸</strong>で位置づけるのがマトリックス図です。' },
        { k: '4', q: 'PDCAのように、くり返し回る流れを示したい。', ch: FG, a: 5,
          why: '終わりが始まりに戻る流れは循環図です。順番だけならツリー図や矢印でも表せますが、<strong>くり返し</strong>を示すなら循環図です。' },
        { k: '5', q: '委員会の組織や、フォルダの入れ子を示したい。', ch: FG, a: 4,
          why: '<strong>枝分かれする階層</strong>はツリー図です。ピラミッド図は「上ほど重要・少数」という順位を表すときに使います。' }
      ], '図は見た目で選ぶのではなく、<strong>表したい関係（重なり・つながり・2つの軸・くり返し・階層）</strong>で選びます。');
    }

    $('prepUndo').addEventListener('click', () => { placed.pop(); drawPrep(); });
    $('prepReset').addEventListener('click', () => { placed = []; drawPrep(); });
    window.Terms.glossary($('glossBox'), ['情報デザイン', '抽象化', '可視化', '構造化', 'ピクトグラム', 'インフォグラフィックス']);
    drawMethodTable(); drawMethods(); drawPrep(); drawCases(); drawFigs(); drawUseTable();
    Worksheet.make('wsBox', {
      name: 'infomation-design',
      fields: [
        { id: 'd1', label: '① 取り上げる表示', hint: '案内図、時間割、注意書き、Webページなど。', rows: 2, ph: '例：保健室前の「けがをしたときの手順」の貼り紙' },
        { id: 'd2', label: '② 伝えたい相手と場面', hint: 'どんな状態の人が、どれくらいの時間で読むか。', rows: 2, ph: '例：けがをして動揺している生徒が、10秒で読む' },
        { id: 'd3', label: '③ 分かりにくい理由', hint: '情報が多い／順番が不明／文字だけ／色だけで区別、など。', rows: 3,
          ph: '例：文字が多く、何から読めばよいか分からない。手順の順番が書かれていない' },
        { id: 'd4', label: '④ どう直すか', hint: '構造化（グループ分け・順序）／可視化（図・矢印）／抽象化（ピクトグラム）。', rows: 3,
          ph: '例：手順を①②③の番号つきに分け、各手順にピクトグラムを添える' },
        { id: 'd5', label: '⑤ 直したあと、どう確かめるか', hint: '第三者に見せて測る。', rows: 2,
          ph: '例：5人に見せて「最初にすることは？」を答えてもらい、正答率と時間を比べる' }
      ],
      build: function (v, e) {
        return '<h4>情報デザイン改善シート</h4><dl>' +
          '<dt>① 取り上げる表示</dt><dd>' + e(v.d1) + '</dd>' +
          '<dt>② 相手と場面</dt><dd>' + e(v.d2) + '</dd>' +
          '<dt>③ 分かりにくい理由</dt><dd>' + e(v.d3) + '</dd>' +
          '<dt>④ 改善案</dt><dd>' + e(v.d4) + '</dd>' +
          '<dt>⑤ 確かめ方</dt><dd>' + e(v.d5) + '</dd></dl>';
      },
      note: '③で「なんとなく見にくい」ではなく、<strong>どの原則に反しているか</strong>を書けると説得力が出ます。'
    });

    window.Terms.attach();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
