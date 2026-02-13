import React from 'react';
import { 
  Activity, Hexagon, Zap, Box, Repeat, 
  Image, Move, Maximize, Code, Layers, 
  AlertTriangle, Lightbulb, Command, GitBranch
} from 'lucide-react';
import { Lesson } from './types';
import CodeBlock from './components/CodeBlock';

export const CATEGORY_LABELS: Record<string, string> = {
  intro: 'Chapter 1: Basics',
  logic: 'Chapter 2: Logic',
  math: 'Chapter 3: Mathematics',
  structure: 'Chapter 4: Structure',
  advanced: 'Chapter 5: Advanced',
};

// --- Styled Components for Content ---

const SectionTitle = ({ children, number }: { children?: React.ReactNode, number?: string }) => (
  <div className="mt-16 mb-8 border-t border-gray-100 pt-10">
    {number && <span className="block text-p5-blue font-mono text-sm font-bold mb-2">SECTION {number}</span>}
    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">{children}</h3>
  </div>
);

const SubTitle = ({ children }: { children?: React.ReactNode }) => (
  <h4 className="text-lg font-bold text-gray-800 mt-8 mb-4 flex items-center gap-2">
    <span className="w-1 h-4 bg-gray-900"></span>
    {children}
  </h4>
);

const TipBox = ({ children, title = "TIPS" }: { children?: React.ReactNode, title?: string }) => (
  <div className="bg-white border-l-2 border-p5-blue pl-6 py-2 my-8">
    <div className="text-p5-blue font-bold text-xs uppercase tracking-wider mb-2 font-mono flex items-center gap-2">
      {title}
    </div>
    <div className="text-sm text-gray-600 leading-relaxed">{children}</div>
  </div>
);

const NoteBox = ({ children, title = "IMPORTANT" }: { children?: React.ReactNode, title?: string }) => (
  <div className="bg-gray-50 p-6 rounded-sm border border-gray-200 my-8">
    <div className="text-gray-900 font-bold text-xs uppercase tracking-wider mb-3 font-mono flex items-center gap-2">
      <AlertTriangle size={14} /> {title}
    </div>
    <div className="text-sm text-gray-700 leading-loose">{children}</div>
  </div>
);

const Kbd = ({ children }: { children?: React.ReactNode }) => (
  <kbd className="px-1.5 py-0.5 rounded border border-gray-300 bg-gray-50 font-mono text-xs text-gray-600 mx-1">
    {children}
  </kbd>
);

// --- Content ---

export const LESSONS: Lesson[] = [
  // --- INTRO ---
  {
    id: 'setup-draw',
    title: '構造と実行フロー',
    description: 'Processingのライフサイクル、キャンバスの初期化、そしてフレームレートの概念について深く理解する。',
    category: 'intro',
    icon: <Activity />,
    content: (
      <div className="space-y-6 text-gray-600">
        <p>
          Processingは、Javaをベースにしたクリエイティブコーディング環境です。
          その最大の特徴は、<code>setup()</code> と <code>draw()</code> という2つの関数による明確なライフサイクル管理にあります。
          この2つがどのように連携し、アニメーションを生み出しているのか、エンジニアリングの視点で掘り下げます。
        </p>
        
        <SectionTitle number="01">ライフサイクル</SectionTitle>
        <p>
          プログラムが実行されると、Processingは以下の順序で処理を行います。
        </p>
        <ol className="list-decimal list-inside space-y-2 mb-6 ml-2 font-mono text-sm bg-gray-50 p-4 border border-gray-100">
            <li>グローバル変数の宣言</li>
            <li><span className="text-p5-blue font-bold">setup()</span> の実行（1回のみ）</li>
            <li><span className="text-p5-blue font-bold">draw()</span> の実行（繰り返し）</li>
        </ol>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
          <div>
            <h4 className="font-bold text-gray-900 mb-2 font-mono border-b border-gray-200 pb-2">void setup()</h4>
            <p className="text-sm text-gray-600 mb-4">
              アプリケーションの「初期化」を担当します。キャンバスのサイズ決定、メディアのロード、初期値の設定など、
              <strong>重い処理</strong>はここに記述します。
            </p>
            <CodeBlock code={`void setup() {
  size(800, 600);
  frameRate(60);
  smooth(); // アンチエイリアス有効化
}`} showLineNumbers={false} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2 font-mono border-b border-gray-200 pb-2">void draw()</h4>
            <p className="text-sm text-gray-600 mb-4">
              レンダリングループです。デフォルトでは1秒間に60回（60fps）呼び出されます。
              ここで描画命令を発行することで、画面が更新されます。
            </p>
            <CodeBlock code={`void draw() {
  background(255); // 画面クリア
  // ここに描画処理を書く
}`} showLineNumbers={false} />
          </div>
        </div>

        <SectionTitle number="02">フレームレートとスムーズさ</SectionTitle>
        <p>
          <code>draw()</code> が呼ばれる頻度は <code>frameRate(fps)</code> 関数で制御できます。
          デフォルトは60fpsですが、複雑な計算を行うジェネラティブアートでは、意図的に30fpsに落としたり、
          逆に<code>frameRate(120)</code>で滑らかさを追求することもあります。
        </p>
        
        <TipBox title="Performance Tip">
          <code>draw()</code> の中で重い計算（例：巨大な配列のソートや、数万回のループ）を行うと、
          フレームレートが低下し、アニメーションがカクつきます。
          計算結果が変わらないものは、<code>setup()</code> 内で事前に計算しておく（プリ・カルキュレーション）のが定石です。
        </TipBox>

        <SectionTitle number="03">静止画モード</SectionTitle>
        <p>
          ポスター制作など、アニメーションが不要な場合は <code>noLoop()</code> を使用します。
          これにより <code>draw()</code> は一度だけ実行され、停止します。CPUリソースを節約できます。
        </p>
        <CodeBlock code={`void setup() {
  size(1000, 1000);
  noLoop(); // ループを停止
}

void draw() {
  // 複雑な描画処理...
  save("output.png"); // 完了後に画像を保存
}`} />
      </div>
    )
  },
  {
    id: 'shapes',
    title: 'プリミティブと座標系',
    description: 'ピクセルを操るための座標システムと、基本的な図形描画のメカニズム。',
    category: 'intro',
    icon: <Hexagon />,
    content: (
      <div className="space-y-6 text-gray-600">
        <SectionTitle number="01">デカルト座標系</SectionTitle>
        <p>
          数学の授業で習うグラフとは異なり、コンピュータグラフィックスの座標系は
          <strong>左上が原点 (0, 0)</strong> です。
          X軸は右に行くほどプラス、Y軸は<strong>下に行くほどプラス</strong>になります。
        </p>
        
        <div className="border border-gray-200 p-8 flex justify-center bg-gray-50 my-6">
           {/* SVG Diagram illustrating coordinate system */}
           <svg width="300" height="200" viewBox="0 0 300 200" className="opacity-80">
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L9,3 z" fill="#111827" />
                </marker>
              </defs>
              <line x1="20" y1="20" x2="280" y2="20" stroke="#111827" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="20" y1="20" x2="20" y2="180" stroke="#111827" strokeWidth="2" markerEnd="url(#arrow)" />
              <text x="10" y="15" fontFamily="monospace" fontSize="12">(0,0)</text>
              <text x="280" y="35" fontFamily="monospace" fontSize="12">X (+)</text>
              <text x="30" y="180" fontFamily="monospace" fontSize="12">Y (+)</text>
              <rect x="100" y="60" width="80" height="50" fill="none" stroke="#006699" strokeWidth="2" />
              <circle cx="100" cy="60" r="4" fill="#E91E63" />
              <text x="105" y="55" fill="#E91E63" fontSize="10" fontFamily="monospace">rect(100, 60, ...)</text>
           </svg>
        </div>

        <NoteBox title="Shape Anchor">
           デフォルトでは、<code>rect()</code> は左上の角、<code>ellipse()</code> は中心が座標の基準点（アンカーポイント）になります。
           これを統一したい場合は <code>rectMode(CENTER)</code> や <code>ellipseMode(CORNER)</code> を使用します。
        </NoteBox>

        <SectionTitle number="02">基本図形とパラメータ</SectionTitle>
        <div className="overflow-hidden border border-gray-200 rounded-sm">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-900 font-bold border-b border-gray-200">
                    <tr><th className="px-6 py-4">関数</th><th className="px-6 py-4">引数構成</th><th className="px-6 py-4">解説</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                    <tr><td className="px-6 py-4 font-mono text-p5-blue">point()</td><td className="px-6 py-4 text-xs font-mono">x, y</td><td className="px-6 py-4">1ピクセルを描画。最も高速ですが、見えにくいことがあります。</td></tr>
                    <tr><td className="px-6 py-4 font-mono text-p5-blue">line()</td><td className="px-6 py-4 text-xs font-mono">x1, y1, x2, y2</td><td className="px-6 py-4">2点を結ぶ線分。太さは<code>strokeWeight()</code>で変更。</td></tr>
                    <tr><td className="px-6 py-4 font-mono text-p5-blue">rect()</td><td className="px-6 py-4 text-xs font-mono">x, y, w, h</td><td className="px-6 py-4">長方形。角を丸めるオプションもあります。</td></tr>
                    <tr><td className="px-6 py-4 font-mono text-p5-blue">ellipse()</td><td className="px-6 py-4 text-xs font-mono">x, y, w, h</td><td className="px-6 py-4">楕円。wとhを同じにすれば正円になります。</td></tr>
                    <tr><td className="px-6 py-4 font-mono text-p5-blue">triangle()</td><td className="px-6 py-4 text-xs font-mono">x1, y1, x2, y2, x3, y3</td><td className="px-6 py-4">3つの頂点を指定して三角形を描画。</td></tr>
                </tbody>
            </table>
        </div>

        <SectionTitle number="03">カスタムシェイプ (Vertex)</SectionTitle>
        <p>
          星型や複雑な多角形を描くには、<code>beginShape()</code> と <code>endShape()</code> を使って頂点を一つずつ指定します。
        </p>
        <CodeBlock code={`beginShape();
vertex(30, 20);
vertex(85, 20);
vertex(85, 75);
vertex(30, 75);
endShape(CLOSE); // CLOSEを指定すると始点と終点が自動で結ばれる`} />

        <TipBox title="Refinement">
            <code>endShape()</code> の引数に何も指定しないと線は閉じません。
            また、<code>beginShape(POINTS)</code> や <code>beginShape(LINES)</code> を指定することで、
            頂点の接続ルールを変更することも可能です。
        </TipBox>
      </div>
    )
  },
  {
    id: 'color',
    title: '色彩理論と実装',
    description: 'RGBからHSBへの移行、アルファチャンネルによる合成、色の補間について。',
    category: 'intro',
    icon: <Zap />,
    content: (
      <div className="space-y-6 text-gray-600">
        <SectionTitle number="01">Color Modes: RGB vs HSB</SectionTitle>
        <p>
          Processingはデフォルトで<strong>RGB</strong> (Red, Green, Blue) モードを使用します。
          これはコンピュータのディスプレイにとっては自然ですが、人間が「鮮やかな色」や「パステルカラー」を直感的に選ぶのには向きません。
        </p>
        <p>
          クリエイティブコーディングでは、<strong>HSB</strong> (Hue, Saturation, Brightness) モードへの切り替えを強く推奨します。
        </p>

        <div className="grid md:grid-cols-2 gap-8 my-6">
            <div className="border border-gray-200 p-6 rounded-sm">
                <h5 className="font-bold text-gray-900 mb-2">RGB Mode</h5>
                <p className="text-sm text-gray-500 mb-3">各色 0〜255 で指定。</p>
                <code className="block bg-gray-50 p-3 text-xs font-mono border border-gray-100">
                  // オレンジ色を作るのが難しい<br/>
                  fill(255, 165, 0); 
                </code>
            </div>
            <div className="border border-p5-blue p-6 rounded-sm bg-blue-50/30">
                <h5 className="font-bold text-p5-blue mb-2">HSB Mode</h5>
                <p className="text-sm text-gray-500 mb-3">色相(360)、彩度(100)、明度(100)で指定。</p>
                <code className="block bg-white p-3 text-xs font-mono border border-gray-100">
                    colorMode(HSB, 360, 100, 100);<br/>
                    // 色相30はオレンジ。直感的。<br/>
                    fill(30, 100, 100); 
                </code>
            </div>
        </div>

        <SectionTitle number="02">透明度と重ね合わせ</SectionTitle>
        <p>
          色の4番目の引数は<strong>Alpha（不透明度）</strong>です。
          これを活用することで、光の表現や残像効果を作り出すことができます。
        </p>
        <CodeBlock code={`// HSBモードで透明度を指定 (最大値も100になる)
colorMode(HSB, 360, 100, 100, 100);

void draw() {
  // 背景を完全に塗りつぶさず、半透明の白を重ねる
  // これにより、前のフレームの描画が徐々に薄くなり、軌跡として残る
  noStroke();
  fill(0, 0, 100, 10); // 白, 透明度10
  rect(0, 0, width, height);
  
  fill(200, 80, 100);
  ellipse(mouseX, mouseY, 50, 50);
}`} />

        <SectionTitle number="03">色の補間 (Lerp Color)</SectionTitle>
        <p>
          2つの色の間の中間色を取得するには <code>lerpColor()</code> を使用します。
          グラデーションの生成に不可欠な関数です。
        </p>
        <CodeBlock code={`color c1 = color(255, 0, 0); // 赤
color c2 = color(0, 0, 255); // 青

// 0.0(赤) 〜 0.5(紫) 〜 1.0(青)
color inter = lerpColor(c1, c2, 0.5); 
fill(inter);`} />
      </div>
    )
  },

  // --- LOGIC ---
  {
    id: 'variables',
    title: '変数とスコープ',
    description: 'メモリ管理の基礎。プリミティブ型とオブジェクト型、そして変数の有効範囲。',
    category: 'logic',
    icon: <Box />,
    content: (
      <div className="space-y-6 text-gray-600">
        <SectionTitle number="01">静的型付け言語としてのProcessing</SectionTitle>
        <p>
          JavaScriptやPythonとは異なり、Processing (Java) は<strong>静的型付け言語</strong>です。
          変数を宣言する際、その箱に「何が入るか」を厳密に定義する必要があります。
          これは面倒に感じるかもしれませんが、メモリ効率が良く、予期せぬエラーを防ぐ効果があります。
        </p>
        
        <div className="my-6 border border-gray-200">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 border-b border-gray-200 font-bold text-gray-900">
                    <tr><th className="px-6 py-3">型</th><th className="px-6 py-3">データサイズ</th><th className="px-6 py-3">用途</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    <tr><td className="px-6 py-3 font-mono text-p5-blue">int</td><td>32bit</td><td className="text-gray-500">整数。個数や回数のカウントに。</td></tr>
                    <tr><td className="px-6 py-3 font-mono text-p5-blue">float</td><td>32bit</td><td className="text-gray-500">浮動小数点数。座標や滑らかな計算に必須。</td></tr>
                    <tr><td className="px-6 py-3 font-mono text-p5-blue">boolean</td><td>1bit*</td><td className="text-gray-500">true / false。スイッチの状態管理に。</td></tr>
                    <tr><td className="px-6 py-3 font-mono text-p5-blue">char</td><td>16bit</td><td className="text-gray-500">1文字。キーボード入力の判定などに。</td></tr>
                </tbody>
            </table>
        </div>

        <NoteBox title="Integer Division Trap">
            初心者が陥りやすい罠として「整数の割り算」があります。
            <code>int a = 1; int b = 2;</code> のとき、<code>a / b</code> は 0.5 ではなく <strong>0</strong> になります。
            小数の結果が欲しい場合は、<code>(float)a / b</code> のようにキャストするか、変数をfloatで宣言する必要があります。
        </NoteBox>

        <SectionTitle number="02">変数のスコープ (有効範囲)</SectionTitle>
        <p>
          変数を「どこで宣言するか」によって、その変数が生きている期間とアクセスできる範囲が決まります。
        </p>
        <div className="pl-4 border-l-2 border-gray-200 space-y-4">
            <div>
                <strong className="text-gray-900">グローバル変数</strong>
                <p className="text-sm mt-1">関数の外側（一番上）で宣言。どこからでもアクセス可能。プログラム終了まで値が保持される。</p>
            </div>
            <div>
                <strong className="text-gray-900">ローカル変数</strong>
                <p className="text-sm mt-1">関数内（<code>draw</code>など）やブロック内（<code>for</code>など）で宣言。その中だけで有効。ブロックを抜けるとメモリから消える。</p>
            </div>
        </div>

        <CodeBlock code={`float globalX = 0; // ずっと値を保持する

void draw() {
  float localX = 0; // drawが呼ばれるたびに 0 にリセットされる
  
  globalX += 1;
  localX += 1;
  
  println(globalX); // 1, 2, 3... と増えていく
  println(localX);  // ずっと 1 のまま
}`} />
      </div>
    )
  },
  {
    id: 'conditionals',
    title: '論理演算と状態管理',
    description: 'ブール代数を用いた条件分岐。複雑な振る舞いを実装するためのロジック構築。',
    category: 'logic',
    icon: <GitBranch />,
    content: (
      <div className="space-y-6 text-gray-600">
        <SectionTitle number="01">ブール論理 (Boolean Logic)</SectionTitle>
        <p>
          複雑な条件分岐は、基本的な論理演算子の組み合わせで作られます。
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 text-sm">
            <li className="bg-white border border-gray-200 p-4 rounded-sm">
                <span className="font-mono text-p5-blue font-bold">&& (AND)</span>
                <p className="mt-2 text-gray-500">「A かつ B」。両方trueの時だけ実行。</p>
                <code className="block mt-2 bg-gray-50 p-1 text-xs">{`if (x > 0 && x < width)`}</code>
            </li>
            <li className="bg-white border border-gray-200 p-4 rounded-sm">
                <span className="font-mono text-p5-blue font-bold">|| (OR)</span>
                <p className="mt-2 text-gray-500">「A または B」。どちらか一方がtrueなら実行。</p>
                <code className="block mt-2 bg-gray-50 p-1 text-xs">if (key == 'a' || key == 'A')</code>
            </li>
            <li className="bg-white border border-gray-200 p-4 rounded-sm">
                <span className="font-mono text-p5-blue font-bold">! (NOT)</span>
                <p className="mt-2 text-gray-500">否定。trueならfalse、falseならtrue。</p>
                <code className="block mt-2 bg-gray-50 p-1 text-xs">if (!mousePressed)</code>
            </li>
        </ul>

        <SectionTitle number="02">ステートマシン (状態管理)</SectionTitle>
        <p>
          アプリケーションの「状態（State）」を整数や文字列で管理する手法は、ゲームやインタラクティブアートで頻出します。
        </p>
        <CodeBlock code={`int state = 0; // 0: タイトル, 1: ゲーム中, 2: ゲームオーバー

void draw() {
  if (state == 0) {
    drawTitle();
  } else if (state == 1) {
    playGame();
  } else {
    drawGameOver();
  }
}

void mousePressed() {
  if (state == 0) state = 1;
  // ...
}`} />
        <TipBox title="Switch Statement">
           条件が多い場合は <code>if-else</code> よりも <code>switch</code> 文を使うと可読性が向上し、
           処理速度もわずかに有利になる場合があります。
        </TipBox>
      </div>
    )
  },
  {
    id: 'loops',
    title: '反復処理とパターン',
    description: 'Forループ、Whileループ、そして二重ループによるグリッドシステムの構築。',
    category: 'logic',
    icon: <Repeat />,
    content: (
      <div className="space-y-6 text-gray-600">
        <SectionTitle number="01">For Loop Architecture</SectionTitle>
        <p>
          <code>for</code> ループは、配列の走査や大量のオブジェクト生成に不可欠です。
          構造を正しく理解しましょう。
        </p>
        <div className="font-mono text-sm bg-gray-50 p-6 border border-gray-200 my-4">
            for (<span className="text-blue-600">初期化</span>; <span className="text-green-600">条件式</span>; <span className="text-purple-600">更新式</span>) &#123;<br/>
            &nbsp;&nbsp;// 処理<br/>
            &#125;
        </div>
        
        <SectionTitle number="02">ネストされたループ (Grid System)</SectionTitle>
        <p>
          ジェネラティブアートの基本形である「グリッド」は、X軸方向のループの中にY軸方向のループを入れる（ネストする）ことで実現します。
        </p>
        <CodeBlock code={`void setup() {
  size(600, 600);
  noStroke();
  
  float step = 60; // グリッドの間隔
  
  for (float y = 0; y < height; y += step) {
    for (float x = 0; x < width; x += step) {
      
      // 座標(x, y)を使って何かを描く
      fill(random(255));
      rect(x, y, step - 5, step - 5);
      
    }
  }
}`} />

        <SectionTitle number="03">While Loop</SectionTitle>
        <p>
          回数が決まっていない繰り返し（例：特定の条件を満たすまで乱数を生成し続ける）には <code>while</code> を使います。
          ただし、無限ループに陥りやすいため注意が必要です。
        </p>
        <CodeBlock code={`float x = 0;
while (x < width) {
  point(x, height/2);
  x += random(5, 20); // ランダムな歩幅で進む
}`} />
      </div>
    )
  },

  // --- MATH ---
  {
    id: 'trigonometry',
    title: '三角関数と極座標',
    description: 'Sin/Cosが生み出す周期的な動きと、円形配置のアルゴリズム。',
    category: 'math',
    icon: <Activity />,
    content: (
      <div className="space-y-6 text-gray-600">
        <p>
          クリエイティブコーディングにおいて、三角関数は「三角形の辺の比」を計算する道具ではなく、
          <strong>「周期的な波」や「回転」を作るためのエンジン</strong>として扱われます。
        </p>

        <SectionTitle number="01">振動 (Oscillation)</SectionTitle>
        <p>
          <code>sin(theta)</code> は、入力が増え続けると <strong>-1.0 から 1.0</strong> の間を滑らかに往復します。
          この性質を利用して、明滅、伸縮、揺れなどを表現します。
        </p>
        <CodeBlock code={`float theta = 0;

void draw() {
  background(255);
  
  // -1 ~ 1 を 0 ~ 255 に変換して色に使う
  float val = map(sin(theta), -1, 1, 0, 255);
  fill(val);
  
  // サイズを伸縮
  float s = map(sin(theta * 2), -1, 1, 50, 150);
  ellipse(width/2, height/2, s, s);
  
  theta += 0.05;
}`} />

        <SectionTitle number="02">極座標系 (Polar Coordinates)</SectionTitle>
        <p>
          通常の (x, y) は直交座標系ですが、「原点からの距離(r)」と「角度(θ)」で位置を表す方法を極座標系と呼びます。
          円状に物を配置する場合、極座標で考えてから直交座標に変換する公式を使います。
        </p>
        <NoteBox title="Transformation Formula">
            <ul className="list-disc list-inside font-mono text-sm">
                <li>x = cx + cos(angle) * radius</li>
                <li>y = cy + sin(angle) * radius</li>
            </ul>
        </NoteBox>
        
        <CodeBlock code={`void setup() {
  size(500, 500);
  background(255);
  translate(width/2, height/2); // 原点を中心に
  
  int num = 12; // 配置する数
  float radius = 150; // 半径
  
  for (int i = 0; i < num; i++) {
    // 角度を計算 (一周TWO_PIを分割)
    float angle = map(i, 0, num, 0, TWO_PI);
    
    float x = cos(angle) * radius;
    float y = sin(angle) * radius;
    
    ellipse(x, y, 20, 20);
  }
}`} />
      </div>
    )
  },
  {
    id: 'noise',
    title: 'Perlin Noise (パーリンノイズ)',
    description: '自然界のテクスチャを再現する、連続性のある乱数生成アルゴリズム。',
    category: 'math',
    icon: <Activity />,
    content: (
      <div className="space-y-6 text-gray-600">
        <SectionTitle number="01">Random vs Noise</SectionTitle>
        <p>
          <code>random()</code> は「サイコロ」です。直前の結果とは無関係な値が出ます。
          対して <code>noise()</code> は「地形」です。隣り合う値は滑らかにつながっています。
          雲、水面、風、大理石の模様など、有機的な表現には不可欠です。
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 my-6">
            <div>
                <h5 className="font-bold text-gray-900 mb-2">Random</h5>
                <div className="bg-gray-50 h-24 w-full border border-gray-200 relative overflow-hidden">
                    {/* Abstract visualization */}
                    <svg width="100%" height="100%" preserveAspectRatio="none">
                        <polyline points="0,50 10,10 20,80 30,20 40,90 50,10 60,60 70,10 80,80 90,20 100,50" fill="none" stroke="#E91E63" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
                    </svg>
                </div>
            </div>
            <div>
                <h5 className="font-bold text-gray-900 mb-2">Perlin Noise</h5>
                <div className="bg-gray-50 h-24 w-full border border-gray-200 relative overflow-hidden">
                     <svg width="100%" height="100%" preserveAspectRatio="none">
                        <path d="M0,50 C20,40 40,60 60,50 S80,30 100,50" fill="none" stroke="#006699" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
                    </svg>
                </div>
            </div>
        </div>

        <SectionTitle number="02">次元と引数</SectionTitle>
        <p>
          <code>noise()</code> は、1〜3個の引数を取ることができます。
        </p>
        <ul className="space-y-4 text-sm bg-gray-50 p-6 border border-gray-200">
            <li>
                <strong className="text-p5-blue">1次元ノイズ: noise(time)</strong>
                <br/>時間の経過とともに滑らかに変化する値。アニメーションの座標やサイズに。
            </li>
            <li>
                <strong className="text-p5-blue">2次元ノイズ: noise(x, y)</strong>
                <br/>平面上の滑らかな値。地形生成や雲のテクスチャ画像生成に。
            </li>
            <li>
                <strong className="text-p5-blue">3次元ノイズ: noise(x, y, z)</strong>
                <br/>時間変化する2次元ノイズ（アニメーションする雲など）。
            </li>
        </ul>

        <CodeBlock code={`float t = 0;

void draw() {
  // noise()の結果は常に0.0〜1.0
  float n = noise(t);
  
  // mapで使いやすい範囲に変換
  float y = map(n, 0, 1, 0, height);
  
  rect(width/2, y, 50, 50);
  
  t += 0.01; // 時間を進める幅で「滑らかさ」が変わる
}`} />
      </div>
    )
  },
  {
    id: 'map-lerp',
    title: 'MapとLerp',
    description: '値のマッピングと線形補間。インタラクションデザインの核心。',
    category: 'math',
    icon: <Maximize />,
    content: (
      <div className="space-y-6 text-gray-600">
        <SectionTitle number="01">Normalization & Mapping</SectionTitle>
        <p>
          センサーの値（0〜1024）を色の値（0〜255）に変換するなど、
          異なるスケールの数値を対応させる作業はプログラミングの日常です。
          <code>map()</code> 関数は、この比例計算を一撃で解決します。
        </p>
        <CodeBlock code={`float val = map(value, inputMin, inputMax, outputMin, outputMax);

// 例: マウスのX座標(0〜width)に応じて、円のサイズを(10〜200)にする
float s = map(mouseX, 0, width, 10, 200);`} />

        <SectionTitle number="02">Linear Interpolation (線形補間)</SectionTitle>
        <p>
          <code>lerp(start, stop, amt)</code> は、2つの値の間を <code>amt</code> (0.0〜1.0) の割合で補間した値を返します。
          これをアニメーションループ内で使うと、<strong>「減速しながら目標に近づく」</strong>という非常に自然で美しい動き（イージング）を作れます。
        </p>
        
        <TipBox title="Easing Equation">
           現在の位置 = lerp(現在の位置, 目標の位置, 0.1);
           <br/>
           この一行だけで、UIアニメーションのような滑らかな追従が実現できます。
        </TipBox>

        <CodeBlock code={`float x = 0;
float y = 0;

void draw() {
  background(255);
  
  // マウスの位置に、毎回残りの距離の10%だけ近づく
  x = lerp(x, mouseX, 0.1);
  y = lerp(y, mouseY, 0.1);
  
  ellipse(x, y, 40, 40);
}`} />
      </div>
    )
  },
  {
    id: 'coordinate',
    title: '座標変換 (Transform)',
    description: 'マトリックススタックを用いた、空間そのものの操作。',
    category: 'math',
    icon: <Move />,
    content: (
      <div className="space-y-6 text-gray-600">
        <p>
          「図形を回転させる」のではなく、「キャンバス（座標空間）を回転させてから、図形を描く」というのがProcessingのアプローチです。
          これを理解すると、複雑なフラクタル図形なども描けるようになります。
        </p>
        
        <SectionTitle number="01">Matrix Functions</SectionTitle>
        <ul className="space-y-3 text-sm ml-4 border-l-2 border-gray-100 pl-4">
          <li><code className="text-p5-blue bg-blue-50 px-1 rounded">translate(x, y)</code> : 原点(0,0)を移動させる。</li>
          <li><code className="text-p5-blue bg-blue-50 px-1 rounded">rotate(angle)</code> : 現在の原点を中心に回転させる。単位はラジアン。</li>
          <li><code className="text-p5-blue bg-blue-50 px-1 rounded">scale(s)</code> : 座標の目盛りを拡大縮小する。</li>
        </ul>

        <SectionTitle number="02">Matrix Stack (push/pop)</SectionTitle>
        <p>
          座標変換は累積します。一度回転させると、その後のすべての描画が回転してしまいます。
          特定のオブジェクトだけに変換を適用したい場合、<code>pushMatrix()</code> で現在の座標状態を保存し、
          描画後に <code>popMatrix()</code> で元に戻します。
        </p>

        <CodeBlock code={`void draw() {
  // --- 1つ目の図形（回転する） ---
  pushMatrix(); // 状態保存
  translate(width/3, height/2);
  rotate(radians(frameCount));
  rect(0, 0, 50, 50);
  popMatrix(); // 状態復帰（回転などがリセットされる）
  
  // --- 2つ目の図形（回転しない） ---
  pushMatrix();
  translate(width*2/3, height/2);
  // ここはrotateしていないので回らない
  rect(0, 0, 50, 50);
  popMatrix();
}`} />
      </div>
    )
  },

  // --- STRUCTURE ---
  {
    id: 'functions',
    title: '関数とモジュール化',
    description: '処理をまとめ、再利用性を高めるための関数の定義と設計。',
    category: 'structure',
    icon: <Code />,
    content: (
      <div className="space-y-6 text-gray-600">
        <p>
          コードが長くなると、バグを見つけるのが困難になります。
          意味のある単位で処理を切り出し、名前をつけて管理する「関数化」は、中規模以上の開発において必須のスキルです。
        </p>

        <SectionTitle number="01">関数の構造</SectionTitle>
        <p>
          関数は「戻り値の型」「関数名」「引数」で定義されます。
        </p>
        <CodeBlock code={`// 戻り値の型  関数名 (引数...)
int sum(int a, int b) {
  int result = a + b;
  return result; // 戻り値
}`} />

        <SectionTitle number="02">void関数</SectionTitle>
        <p>
          値を返さず、描画などのアクションだけを行う関数は <code>void</code> 型で定義します。
          <code>draw()</code> の中をスッキリさせるために多用します。
        </p>
        <CodeBlock code={`void draw() {
  background(255);
  drawCharacter(100, 100);
  drawCharacter(200, 200);
}

// キャラクターを描画する専用の命令を作る
void drawCharacter(float x, float y) {
  pushMatrix();
  translate(x, y);
  ellipse(0, 0, 20, 20); // 頭
  line(0, 10, 0, 30);    // 体
  popMatrix();
}`} />
      </div>
    )
  },
  {
    id: 'classes',
    title: 'オブジェクト指向 (OOP)',
    description: 'データと振る舞いをカプセル化し、自律的なエージェントを作成する。',
    category: 'structure',
    icon: <Box />,
    content: (
      <div className="space-y-6 text-gray-600">
        <p>
          「たくさんのボールが飛び跳ねる」ようなプログラムを書く際、配列変数(x[], y[], speed[]...)を個別に管理するのは限界があります。
          「ボール」という概念（クラス）を定義し、それを量産（インスタンス化）するオブジェクト指向プログラミングの手法を学びます。
        </p>

        <SectionTitle number="01">Class Definition</SectionTitle>
        <p>クラスには主に3つの構成要素があります。</p>
        <ol className="list-decimal list-inside space-y-4 ml-2 bg-gray-50 p-6 border border-gray-200">
            <li>
                <strong className="text-gray-900">Field (属性)</strong>
                <p className="text-sm pl-6 mt-1 text-gray-500">そのオブジェクトが持つデータ。色、位置、サイズなど。</p>
            </li>
            <li>
                <strong className="text-gray-900">Constructor (初期化)</strong>
                <p className="text-sm pl-6 mt-1 text-gray-500"><code>new</code> された瞬間に一度だけ実行されるセットアップ。</p>
            </li>
            <li>
                <strong className="text-gray-900">Method (操作)</strong>
                <p className="text-sm pl-6 mt-1 text-gray-500">そのオブジェクトができること。<code>update()</code>や<code>display()</code>など。</p>
            </li>
        </ol>

        <SectionTitle number="02">Implementation</SectionTitle>
        <CodeBlock code={`// 1. クラスの設計図を書く
class Mover {
  PVector loc;
  PVector vel;
  
  Mover() {
    loc = new PVector(width/2, height/2);
    vel = new PVector(random(-2, 2), random(-2, 2));
  }
  
  void update() {
    loc.add(vel);
  }
  
  void display() {
    ellipse(loc.x, loc.y, 20, 20);
  }
}

// 2. 実体（インスタンス）を作る
Mover myMover;

void setup() {
  myMover = new Mover();
}

void draw() {
  myMover.update();
  myMover.display();
}`} />
      </div>
    )
  },
  {
    id: 'arrays',
    title: '配列とコレクション',
    description: '大量のデータを管理する静的配列と、動的なArrayListの使い分け。',
    category: 'structure',
    icon: <Layers />,
    content: (
      <div className="space-y-6 text-gray-600">
        <SectionTitle number="01">Array (静的配列)</SectionTitle>
        <p>
          最初から数が決まっている場合（例：100個のパーティクル）は、通常の配列を使用します。
          メモリ効率が良く高速です。
        </p>
        <CodeBlock code={`int num = 100;
Mover[] movers = new Mover[num]; // 箱を用意

void setup() {
  // 箱の中身を埋める
  for (int i = 0; i < movers.length; i++) {
    movers[i] = new Mover();
  }
}`} />

        <SectionTitle number="02">ArrayList (動的配列)</SectionTitle>
        <p>
          シューティングゲームの弾のように「増えたり減ったりする」ものを管理する場合は <code>ArrayList</code> を使用します。
          サイズの変更が柔軟です。
        </p>
        <CodeBlock code={`ArrayList<Particle> particles;

void setup() {
  particles = new ArrayList<Particle>();
}

void draw() {
  // 後ろからループするのが定石（削除時のエラー回避のため）
  for (int i = particles.size() - 1; i >= 0; i--) {
    Particle p = particles.get(i);
    p.update();
    p.display();
    
    if (p.isDead()) {
      particles.remove(i); // 削除
    }
  }
}`} />
      </div>
    )
  },

  // --- ADVANCED ---
  {
    id: 'images',
    title: '画像処理とピクセル操作',
    description: '画像のロード、表示、そしてピクセル単位での色操作。',
    category: 'advanced',
    icon: <Image />,
    content: (
      <div className="space-y-6 text-gray-600">
        <SectionTitle number="01">Loading Images</SectionTitle>
        <p>
          JPEGやPNG画像を読み込んで表示します。画像ファイルはスケッチフォルダ内の <code>data</code> フォルダに配置する必要があります。
        </p>
        <CodeBlock code={`PImage img;

void setup() {
  size(800, 600);
  // setupで読み込むこと（drawで読み込むとメモリが溢れてクラッシュする）
  img = loadImage("texture.jpg");
}

void draw() {
  image(img, 0, 0); 
  
  // 色合いを変えて描画
  tint(255, 128); // 半透明
  image(img, 100, 100, width/2, height/2);
}`} />

        <SectionTitle number="02">Pixel Array</SectionTitle>
        <p>
          Processingは画面上のすべてのピクセル情報を <code>pixels[]</code> という1次元配列で保持しています。
          これに直接アクセスすることで、高速な画像処理が可能になります。
        </p>
        <CodeBlock code={`loadPixels(); // ピクセル配列へのアクセスを開始

// 全ピクセルを走査
for (int i = 0; i < pixels.length; i++) {
  // ランダムなノイズで埋める例
  pixels[i] = color(random(255));
}

updatePixels(); // 変更を画面に反映`} />
      </div>
    )
  },
  {
    id: 'vectors',
    title: 'PVectorと物理演算',
    description: 'ベクトル演算による位置、速度、加速度のシミュレーション。',
    category: 'advanced',
    icon: <Activity />,
    content: (
      <div className="space-y-6 text-gray-600">
        <p>
          <code>x, y</code> を個別の変数で管理するのは卒業しましょう。
          <code>PVector</code> クラスを使うことで、物理学の公式をそのままコードに落とし込むことができます。
        </p>

        <SectionTitle number="01">Motion Algorithm 101</SectionTitle>
        <p>
          物理シミュレーションの基本アルゴリズムは以下の通りです。
        </p>
        <ol className="list-decimal list-inside bg-gray-50 p-6 border border-gray-200 space-y-2 font-mono text-sm">
            <li><strong>位置</strong> に <strong>速度</strong> を足す</li>
            <li><strong>速度</strong> に <strong>加速度</strong> を足す</li>
        </ol>

        <CodeBlock code={`PVector location;
PVector velocity;
PVector acceleration;

void setup() {
  location = new PVector(width/2, height/2);
  velocity = new PVector(0, 0);
  acceleration = new PVector(0.01, 0.01);
}

void draw() {
  velocity.add(acceleration); // 加速
  velocity.limit(10); // 最高速度制限
  location.add(velocity); // 移動
  
  ellipse(location.x, location.y, 20, 20);
}`} />
        
        <SectionTitle number="02">Vector Math</SectionTitle>
        <p>
          ベクトルの引き算を使うと、「マウスの方を向く」「敵を追尾する」といったベクトルを簡単に計算できます。
        </p>
        <CodeBlock code={`PVector mouse = new PVector(mouseX, mouseY);
PVector dir = PVector.sub(mouse, location); // マウスへのベクトル
dir.normalize(); // 長さを1にする（方向だけ取り出す）
dir.mult(0.5);   // 強さを調整

acceleration = dir; // それを加速度に適用`} />
      </div>
    )
  },
  {
    id: '3d-basics',
    title: '3D空間とカメラ',
    description: 'P3Dレンダラーへの切り替え、Z軸の操作、ライティングの基礎。',
    category: 'advanced',
    icon: <Box />,
    content: (
      <div className="space-y-6 text-gray-600">
        <SectionTitle number="01">P3D Renderer</SectionTitle>
        <p>
          <code>size()</code> 関数の第3引数に <code>P3D</code> を指定するだけで、OpenGLを利用した3D描画モードになります。
        </p>
        <CodeBlock code={`void setup() {
  size(800, 600, P3D);
}

void draw() {
  background(0);
  translate(width/2, height/2, 0); // 画面中央、Z=0へ移動
  
  rotateY(frameCount * 0.01); // Y軸回転
  
  noFill();
  stroke(255);
  box(200); // 立方体
}`} />

        <SectionTitle number="02">Camera & Lights</SectionTitle>
        <p>
          3D空間では「どこから見るか（カメラ）」と「どう照らすか（ライト）」が重要です。
          Processingはデフォルトで簡易的なカメラとライトを持っていますが、これらを制御することで表現力が上がります。
        </p>
        <ul className="space-y-2 text-sm ml-4">
            <li><code>lights()</code> : 標準的なライティングを有効化</li>
            <li><code>camera(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ)</code> : カメラ位置の詳細設定</li>
            <li><code>pointLight(...)</code> / <code>directionalLight(...)</code> : 個別の光源設定</li>
        </ul>
      </div>
    )
  }
];