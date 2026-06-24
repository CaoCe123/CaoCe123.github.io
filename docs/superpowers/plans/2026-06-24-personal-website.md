# 个人网站实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 做出一个有趣、深色个性风格（方向C）的个人网站：单页滚动长首页（简介/作品/爱好/博客/关于）+ 每篇博客文章独立成页，可本地预览，最终免费部署上线。

**Architecture:** 纯静态站点。`index.html` 单页滚动承载所有板块；`style.css` 管样式与动效；`script.js` 管趣味交互（滚动浮现、平滑滚动、导航高亮、鼠标彩蛋、回到顶部）；`posts/` 放博客文章（模板复制填空）；`images/` 放图片素材。无框架、无构建工具、无后端。

**Tech Stack:** HTML5 + CSS3（CSS 变量 + Grid/Flex + @keyframes + IntersectionObserver 动效）+ 原生 JavaScript；Google Fonts（Archivo / Space Grotesk）；最终用 GitHub Pages 或 Netlify 部署。

**验收方式说明（重要）:** 本项目是可视网页，没有单元测试。每个任务的"验收"= 用本地服务器在浏览器打开并肉眼/手动确认指定行为。统一用以下命令启动本地预览（已在 8137 端口跑过预览页，正式开发换用 8080）：

```bash
cd /home/agiuser/data/vibecoding/text2
python3 -m http.server 8080
# 浏览器打开 http://localhost:8080
```

清理：开发期间不需要的 `_mockups/` 预览目录可在最后删除。

---

## Task 1: 项目骨架 + 深色主题基底

**Files:**
- Create: `index.html`
- Create: `style.css`
- Create: `script.js`
- Create: `images/.gitkeep`（占位，保证空文件夹存在）
- Create: `posts/.gitkeep`

- [ ] **Step 1: 创建 `index.html` 基础骨架**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>张三 · 个人网站</title>
  <meta name="description" content="张三的个人网站——作品、博客与爱好。">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- 导航（Task 2） -->
  <!-- Hero（Task 3） -->
  <!-- 作品（Task 4） -->
  <!-- 爱好（Task 5） -->
  <!-- 博客（Task 6） -->
  <!-- 关于&联系（Task 7） -->
  <!-- 页脚（Task 7） -->
  <script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 2: 创建 `style.css`，定义颜色变量与全局基底**

```css
:root{
  --bg:#0d0d0f; --surface:#16161a; --border:rgba(255,255,255,.10);
  --text:#ffffff; --text-dim:#c7c7d6; --muted:#9a9aa4;
  --grad-a:#7c3aed; --grad-b:#06b6d4;
  --radius:16px; --maxw:1080px;
}
*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{
  font-family:'Space Grotesk',system-ui,sans-serif;
  background:var(--bg); color:var(--text); line-height:1.65;
  -webkit-font-smoothing:antialiased; overflow-x:hidden;
}
h1,h2,h3{font-family:'Archivo',sans-serif; line-height:1.1; letter-spacing:-.5px;}
a{color:inherit; text-decoration:none;}
img{max-width:100%; display:block;}
.container{max-width:var(--maxw); margin:0 auto; padding:0 24px;}
.section{padding:96px 0;}
.gradient-text{
  background:linear-gradient(90deg,var(--grad-a),var(--grad-b));
  -webkit-background-clip:text; background-clip:text; color:transparent;
}
.btn{
  display:inline-block; background:linear-gradient(90deg,var(--grad-a),var(--grad-b));
  color:#fff; padding:14px 30px; border-radius:999px; font-weight:600;
  transition:transform .2s ease, box-shadow .2s ease; cursor:pointer; border:none;
}
.btn:hover{transform:translateY(-2px); box-shadow:0 12px 30px rgba(124,58,237,.4);}
```

- [ ] **Step 3: 创建空的 `script.js` 占位**

```js
// 趣味交互将在 Task 8 写入
document.addEventListener('DOMContentLoaded', () => {
  console.log('site loaded');
});
```

- [ ] **Step 4: 浏览器验收**

启动 `python3 -m http.server 8080`，打开 http://localhost:8080。
预期：页面为深色背景、无报错（F12 控制台显示 `site loaded`）。页面暂时空白属正常。

---

## Task 2: 顶部导航条（粘性 + 锚点）

**Files:**
- Modify: `index.html`（在 `<body>` 开头加入 `<header>`）
- Modify: `style.css`（追加导航样式）

- [ ] **Step 1: 在 `index.html` 加入导航**

```html
<header class="nav" id="nav">
  <div class="container nav-inner">
    <a href="#hero" class="brand">张三</a>
    <nav class="nav-links">
      <a href="#hero" class="active">首页</a>
      <a href="#work">作品</a>
      <a href="#hobby">爱好</a>
      <a href="#blog">博客</a>
      <a href="#about">关于</a>
    </nav>
  </div>
</header>
```

- [ ] **Step 2: 追加导航样式到 `style.css`**

```css
.nav{position:sticky; top:0; z-index:100; backdrop-filter:blur(12px);
  background:rgba(13,13,15,.6); border-bottom:1px solid var(--border);}
.nav-inner{display:flex; align-items:center; justify-content:space-between; height:64px;}
.brand{font-family:'Archivo',sans-serif; font-weight:700; font-size:20px;}
.nav-links{display:flex; gap:28px;}
.nav-links a{color:var(--text-dim); font-size:15px; transition:color .2s;}
.nav-links a:hover, .nav-links a.active{color:#fff;}
.nav-links a.active{position:relative;}
.nav-links a.active::after{content:""; position:absolute; left:0; right:0; bottom:-6px;
  height:2px; background:linear-gradient(90deg,var(--grad-a),var(--grad-b)); border-radius:2px;}
@media (max-width:640px){ .nav-links{gap:16px; font-size:14px;} .nav-links a:nth-child(n+4){display:none;} }
```

- [ ] **Step 3: 浏览器验收**

刷新页面。预期：顶部出现半透明粘性导航；点击导航项页面会尝试跳转（锚点目标还没建好，跳转无效属正常，下个任务起逐步建好）。

---

## Task 3: Hero 开场（流动光斑 + 渐变大字 + 鼠标彩蛋占位结构）

**Files:**
- Modify: `index.html`（加入 `<section id="hero">`）
- Modify: `style.css`（Hero 样式 + 光斑动画）

- [ ] **Step 1: 在导航后加入 Hero**

```html
<section id="hero" class="hero">
  <div class="blob blob1"></div>
  <div class="blob blob2"></div>
  <div class="container hero-inner">
    <span class="eyebrow">✦ 创意 · 代码 · 想法</span>
    <h1 class="hero-title">嗨，我是张三<br><span class="gradient-text">创造点不一样的东西</span></h1>
    <p class="hero-sub">这里写一句有个性的自我介绍，让人一眼记住你、想往下看。</p>
    <div class="hero-btns">
      <a href="#work" class="btn">看我的作品</a>
      <a href="#about" class="btn-ghost">认识我 →</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: 追加 Hero 样式与光斑动画到 `style.css`**

```css
.hero{position:relative; min-height:88vh; display:flex; align-items:center; overflow:hidden;}
.hero-inner{position:relative; z-index:1;}
.eyebrow{display:inline-block; background:rgba(255,255,255,.08);
  border:1px solid var(--border); padding:6px 16px; border-radius:999px;
  font-size:14px; color:var(--text-dim);}
.hero-title{font-size:clamp(40px,7vw,72px); margin:22px 0; font-weight:700;}
.hero-sub{color:var(--text-dim); font-size:clamp(16px,2.2vw,19px); max-width:540px;}
.hero-btns{margin-top:32px; display:flex; gap:16px; flex-wrap:wrap;}
.btn-ghost{display:inline-block; padding:14px 28px; border-radius:999px;
  border:1px solid var(--border); color:#fff; font-weight:600; transition:background .2s;}
.btn-ghost:hover{background:rgba(255,255,255,.06);}
.blob{position:absolute; width:42vw; max-width:480px; aspect-ratio:1; border-radius:50%;
  filter:blur(70px); opacity:.5; will-change:transform;}
.blob1{background:var(--grad-a); top:-10%; right:-5%; animation:float1 14s ease-in-out infinite;}
.blob2{background:var(--grad-b); bottom:-20%; left:-10%; animation:float2 18s ease-in-out infinite;}
@keyframes float1{0%,100%{transform:translate(0,0);}50%{transform:translate(-40px,40px);}}
@keyframes float2{0%,100%{transform:translate(0,0);}50%{transform:translate(50px,-30px);}}
@media (prefers-reduced-motion: reduce){ .blob{animation:none;} }
```

- [ ] **Step 3: 浏览器验收**

刷新。预期：满屏 Hero，两团紫/青光斑缓缓飘动；标题第二行是紫青渐变；按钮悬停上浮发光；点「首页」导航能正常停在 Hero。

---

## Task 4: 作品集板块（卡片网格 + 悬停微交互）

**Files:**
- Modify: `index.html`（加入 `<section id="work">`）
- Modify: `style.css`（作品样式）

- [ ] **Step 1: 加入作品板块（3 张占位卡片）**

```html
<section id="work" class="section">
  <div class="container">
    <h2 class="section-title">我的<span class="gradient-text">作品</span></h2>
    <p class="section-lead">这里放我做过的项目、设计或任何拿得出手的东西。</p>
    <div class="card-grid">
      <a class="card" href="#">
        <div class="card-thumb"></div>
        <div class="card-body"><h3>项目一</h3><p>一句话描述这个项目。</p><span class="card-tag">网页设计</span></div>
      </a>
      <a class="card" href="#">
        <div class="card-thumb"></div>
        <div class="card-body"><h3>项目二</h3><p>一句话描述这个项目。</p><span class="card-tag">App 开发</span></div>
      </a>
      <a class="card" href="#">
        <div class="card-thumb"></div>
        <div class="card-body"><h3>项目三</h3><p>一句话描述这个项目。</p><span class="card-tag">插画</span></div>
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: 追加样式（含 section 通用标题样式，仅定义一次）**

```css
.section-title{font-size:clamp(30px,5vw,44px); font-weight:700;}
.section-lead{color:var(--muted); margin-top:12px; max-width:560px;}
.card-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-top:40px;}
.card{background:var(--surface); border:1px solid var(--border); border-radius:var(--radius);
  overflow:hidden; transition:transform .25s ease, box-shadow .25s ease;}
.card:hover{transform:translateY(-6px) scale(1.01); box-shadow:0 18px 40px rgba(124,58,237,.25);}
.card-thumb{aspect-ratio:16/10; background:linear-gradient(135deg,#2a2a33,#1a1a20);}
.card-body{padding:18px;}
.card-body h3{font-size:18px;}
.card-body p{color:var(--text-dim); font-size:14px; margin:8px 0 12px;}
.card-tag{display:inline-block; font-size:12px; color:var(--text-dim);
  border:1px solid var(--border); border-radius:999px; padding:4px 12px;}
@media (max-width:860px){ .card-grid{grid-template-columns:1fr 1fr;} }
@media (max-width:560px){ .card-grid{grid-template-columns:1fr;} }
```

- [ ] **Step 3: 浏览器验收**

刷新并点「作品」导航。预期：平滑滚到作品区；3 张卡片网格；鼠标悬停卡片上浮、放大、发紫光；窄屏自动变 2 列/1 列。

---

## Task 5: 爱好板块（图文混排）

**Files:**
- Modify: `index.html`（加入 `<section id="hobby">`）
- Modify: `style.css`（爱好样式）

- [ ] **Step 1: 加入爱好板块**

```html
<section id="hobby" class="section hobby">
  <div class="container">
    <h2 class="section-title">我的<span class="gradient-text">爱好</span></h2>
    <p class="section-lead">工作之外，我喜欢这些。</p>
    <div class="hobby-grid">
      <div class="hobby-item"><div class="hobby-icon">📷</div><h3>摄影</h3><p>记录光影与瞬间。</p></div>
      <div class="hobby-item"><div class="hobby-icon">🎮</div><h3>游戏</h3><p>偶尔在虚拟世界冒险。</p></div>
      <div class="hobby-item"><div class="hobby-icon">📚</div><h3>阅读</h3><p>书里装着别人的人生。</p></div>
      <div class="hobby-item"><div class="hobby-icon">🎵</div><h3>音乐</h3><p>耳机一戴谁也不爱。</p></div>
    </div>
  </div>
</section>
```

> 注：emoji 此处作为"装饰性大图标"用于轻松氛围；若后续要严格图标规范，可替换为 SVG。导航/功能性图标仍坚持用 SVG。

- [ ] **Step 2: 追加样式**

```css
.hobby-grid{display:grid; grid-template-columns:repeat(4,1fr); gap:20px; margin-top:40px;}
.hobby-item{background:var(--surface); border:1px solid var(--border); border-radius:var(--radius);
  padding:28px 22px; transition:transform .25s ease;}
.hobby-item:hover{transform:translateY(-6px) rotate(-1deg);}
.hobby-icon{font-size:40px; margin-bottom:12px;}
.hobby-item h3{font-size:18px;}
.hobby-item p{color:var(--text-dim); font-size:14px; margin-top:6px;}
@media (max-width:860px){ .hobby-grid{grid-template-columns:1fr 1fr;} }
```

- [ ] **Step 3: 浏览器验收**

点「爱好」。预期：4 个爱好卡片；悬停轻微上浮+俏皮倾斜；窄屏变 2 列。

---

## Task 6: 博客板块（首页文章列表）

**Files:**
- Modify: `index.html`（加入 `<section id="blog">`）
- Modify: `style.css`（博客列表样式）

- [ ] **Step 1: 加入博客板块（链接指向 Task 9 将建的文章页）**

```html
<section id="blog" class="section">
  <div class="container">
    <h2 class="section-title">我的<span class="gradient-text">博客</span></h2>
    <p class="section-lead">我在这里写一些想法和记录。</p>
    <div class="post-list">
      <a class="post-row" href="posts/first-post.html">
        <div><h3 class="post-title">我的第一篇文章</h3><p class="post-excerpt">网站搭好了，写点开篇感想。</p></div>
        <span class="post-date">2026·06</span>
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: 追加样式**

```css
.post-list{margin-top:36px; border-top:1px solid var(--border);}
.post-row{display:flex; align-items:center; justify-content:space-between; gap:20px;
  padding:22px 4px; border-bottom:1px solid var(--border); transition:padding-left .2s, background .2s;}
.post-row:hover{padding-left:16px; background:rgba(255,255,255,.03);}
.post-title{font-size:20px;}
.post-excerpt{color:var(--text-dim); font-size:14px; margin-top:6px;}
.post-date{color:var(--muted); font-size:14px; white-space:nowrap; font-variant-numeric:tabular-nums;}
```

- [ ] **Step 3: 浏览器验收**

点「博客」。预期：出现一行文章条目；悬停向右缩进并高亮。点击会 404（文章页在 Task 9 创建），属正常。

---

## Task 7: 关于&联系 + 页脚 + 回到顶部

**Files:**
- Modify: `index.html`（加入 `<section id="about">`、`<footer>`、回到顶部按钮）
- Modify: `style.css`（样式）

- [ ] **Step 1: 加入关于、页脚、回到顶部按钮**

```html
<section id="about" class="section about">
  <div class="container about-inner">
    <div class="avatar"></div>
    <div>
      <h2 class="section-title">关于<span class="gradient-text">我</span></h2>
      <p class="about-text">这里写一段更完整的自我介绍：你的经历、在做什么、想认识什么样的人。</p>
      <div class="socials">
        <a class="social" href="mailto:you@example.com">✉ 邮箱</a>
        <a class="social" href="#">GitHub</a>
        <a class="social" href="#">微博</a>
      </div>
    </div>
  </div>
</section>

<footer class="footer">
  <div class="container">© 2026 张三 · 用心做的小站</div>
</footer>

<button id="toTop" class="to-top" aria-label="回到顶部">↑</button>
```

- [ ] **Step 2: 追加样式**

```css
.about-inner{display:grid; grid-template-columns:200px 1fr; gap:40px; align-items:center;}
.avatar{aspect-ratio:1; border-radius:50%; background:linear-gradient(160deg,var(--grad-a),var(--grad-b)); opacity:.85;}
.about-text{color:var(--text-dim); margin:16px 0 24px; max-width:560px;}
.socials{display:flex; gap:14px; flex-wrap:wrap;}
.social{border:1px solid var(--border); border-radius:999px; padding:10px 20px; font-size:14px; transition:background .2s;}
.social:hover{background:rgba(255,255,255,.06);}
.footer{border-top:1px solid var(--border); padding:32px 0; color:var(--muted); text-align:center; font-size:14px;}
.to-top{position:fixed; right:22px; bottom:22px; width:48px; height:48px; border-radius:50%;
  border:1px solid var(--border); background:var(--surface); color:#fff; font-size:20px; cursor:pointer;
  opacity:0; pointer-events:none; transition:opacity .3s, transform .2s; z-index:90;}
.to-top.show{opacity:1; pointer-events:auto;}
.to-top:hover{transform:translateY(-3px);}
@media (max-width:640px){ .about-inner{grid-template-columns:1fr; text-align:center;} .avatar{width:140px; margin:0 auto;} .socials{justify-content:center;} }
```

- [ ] **Step 3: 浏览器验收**

点「关于」。预期：头像占位 + 介绍 + 社交按钮；底部页脚；右下角"回到顶部"按钮此刻还不显示/不工作（逻辑在 Task 8）。

---

## Task 8: 趣味交互脚本（script.js）

**Files:**
- Modify: `script.js`（全部替换为以下内容）
- Modify: `style.css`（追加滚动浮现初始态）

- [ ] **Step 1: 追加滚动浮现的初始/激活样式到 `style.css`**

```css
.reveal{opacity:0; transform:translateY(28px); transition:opacity .6s ease, transform .6s cubic-bezier(.22,1,.36,1);}
.reveal.in{opacity:1; transform:none;}
@media (prefers-reduced-motion: reduce){ .reveal{opacity:1; transform:none; transition:none;} }
```

- [ ] **Step 2: 写入完整 `script.js`**

```js
document.addEventListener('DOMContentLoaded', () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1) 滚动浮现：给主要块加 .reveal 并观察
  const blocks = document.querySelectorAll('.section .container > *, .hero-inner > *');
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    blocks.forEach((b, i) => { b.classList.add('reveal'); b.style.transitionDelay = (i % 4 * 40) + 'ms'; io.observe(b); });
  }

  // 2) 导航高亮：根据滚动位置点亮当前板块
  const sections = ['hero','work','hobby','blog','about'].map(id => document.getElementById(id)).filter(Boolean);
  const links = document.querySelectorAll('.nav-links a');
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));

  // 3) 回到顶部按钮显隐
  const toTop = document.getElementById('toTop');
  if (toTop) {
    window.addEventListener('scroll', () => {
      toTop.classList.toggle('show', window.scrollY > 500);
    }, { passive: true });
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // 4) Hero 鼠标彩蛋：标题随鼠标轻微视差
  const title = document.querySelector('.hero-title');
  const hero = document.getElementById('hero');
  if (title && hero && !reduce) {
    hero.addEventListener('mousemove', (ev) => {
      const r = hero.getBoundingClientRect();
      const x = (ev.clientX - r.left) / r.width - 0.5;
      const y = (ev.clientY - r.top) / r.height - 0.5;
      title.style.transform = `translate(${x * 14}px, ${y * 10}px)`;
    });
    hero.addEventListener('mouseleave', () => { title.style.transform = 'translate(0,0)'; });
  }
});
```

- [ ] **Step 3: 浏览器验收**

刷新整页并从上往下滚。预期：① 各板块内容滚到时一块块上浮出现；② 导航项随滚动位置自动高亮；③ 滚过一屏后右下角"回到顶部"出现、点击平滑回顶；④ 在 Hero 区移动鼠标，大标题轻微跟随移动（彩蛋）。打开系统"减少动效"后这些动画应停用。

---

## Task 9: 博客文章模板 + 第一篇示例文章

**Files:**
- Create: `posts/_template.html`
- Create: `posts/first-post.html`

- [ ] **Step 1: 创建文章模板 `posts/_template.html`（含填空注释）**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- ↓↓↓ 在这里改成你的文章标题 ↓↓↓ -->
  <title>文章标题 · 张三</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&family=Space+Grotesk:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../style.css">
</head>
<body>
  <header class="nav"><div class="container nav-inner">
    <a href="../index.html" class="brand">张三</a>
    <nav class="nav-links"><a href="../index.html#blog">← 返回博客</a></nav>
  </div></header>

  <article class="container post-article">
    <!-- ↓↓↓ 改成你的标题 ↓↓↓ -->
    <h1 class="post-h1">文章标题写在这里</h1>
    <!-- ↓↓↓ 改成日期 ↓↓↓ -->
    <p class="post-meta">2026·06·24</p>

    <!-- ↓↓↓ 正文：每段用一对 <p>...</p> 包起来 ↓↓↓ -->
    <p>这是第一段。把你想说的话写在 p 标签中间。</p>
    <p>这是第二段。想加新段落就再复制一行 &lt;p&gt;&lt;/p&gt;。</p>
    <!-- 想插图片：<img src="../images/你的图.jpg" alt="图片说明"> -->
  </article>

  <footer class="footer"><div class="container">© 2026 张三</div></footer>
</body>
</html>
```

- [ ] **Step 2: 复制模板做出 `posts/first-post.html`，填入真实开篇内容**

（内容：标题"我的第一篇文章"、日期"2026·06·24"、两三段开篇感想。结构同模板，只替换标题/日期/正文文字。）

- [ ] **Step 3: 给文章页追加排版样式到 `style.css`**

```css
.post-article{max-width:720px; padding-top:64px; padding-bottom:64px;}
.post-h1{font-size:clamp(30px,5vw,44px);}
.post-meta{color:var(--muted); margin:12px 0 32px; font-variant-numeric:tabular-nums;}
.post-article p{color:var(--text-dim); font-size:17px; margin-bottom:20px;}
.post-article img{border-radius:12px; margin:24px 0;}
```

- [ ] **Step 4: 浏览器验收**

从主页博客板块点「我的第一篇文章」。预期：进入文章页，排版清爽、宽度适中、可读；点左上「← 返回博客」回到主页博客位置。

---

## Task 10: 「发文章三步走」中文小抄

**Files:**
- Create: `发文章小抄.md`

- [ ] **Step 1: 写入对零基础友好的发文指南**

```markdown
# 怎么发一篇新博客文章（三步）

## 第 1 步：复制模板
进入 `posts/` 文件夹，复制 `_template.html`，
改个英文文件名，比如 `my-trip.html`（不要有空格和中文）。

## 第 2 步：填内容
用文本编辑器打开你刚复制的文件，按里面 `↓↓↓` 注释提示：
- 改 `<title>` 里的标题
- 改 `<h1>` 里的标题
- 改 `<p class="post-meta">` 里的日期
- 在正文区，每段话放进一对 `<p>...</p>`

## 第 3 步：在主页加链接
打开 `index.html`，找到 `<div class="post-list">`，
复制里面已有的一段 `<a class="post-row">...</a>`，
把 `href` 改成你的新文件名、标题/摘要/日期改成新文章的。

保存后刷新网站就能看到新文章了！
```

- [ ] **Step 2: 验收**

照着小抄复制模板新建一篇测试文章并在主页加链接，刷新后能正常打开 → 说明流程对新手可行。（验证完可删掉这篇测试文章。）

---

## Task 11: 响应式与无障碍收尾检查

**Files:**
- Modify: `style.css` / `index.html`（按发现的问题微调）

- [ ] **Step 1: 多尺寸检查**

浏览器开发者工具切换设备宽度，依次检查 375 / 768 / 1024 / 1440：
- 无横向滚动条
- 导航、卡片、爱好、关于在窄屏均正常堆叠
- 正文每行长度舒适、字号 ≥16px

- [ ] **Step 2: 无障碍检查**

- 所有 `<img>`（含未来真实图片）都有 `alt`
- 颜色对比：正文 `--text-dim` 在深底上 ≥4.5:1（如偏暗则调亮）
- 键盘 Tab 能依次聚焦导航与链接，焦点可见（必要时加 `:focus-visible` 样式）
- 系统开启"减少动效"后，光斑/浮现/视差均停止

- [ ] **Step 3: 追加焦点可见样式（如缺失）**

```css
a:focus-visible, .btn:focus-visible, .to-top:focus-visible, .btn-ghost:focus-visible{
  outline:2px solid var(--grad-b); outline-offset:3px; border-radius:6px;
}
```

- [ ] **Step 4: 清理与最终通览**

- 删除开发期不再需要的 `_mockups/` 目录
- 从上到下完整浏览一遍，确认四大板块、博客、动效、彩蛋都正常

---

## Task 12: 部署上线（手把手，做完本体后进行）

> 此阶段会用真实账号操作、对外发布，**执行时需与用户确认每一步**。

- [ ] **Step 1: 选平台**

向用户解释并二选一：**GitHub Pages**（适合想顺便学 git）或 **Netlify 拖拽上传**（最快、最傻瓜）。

- [ ] **Step 2A: 若选 Netlify（最简单）**

引导用户：注册 Netlify → 新建站点 → 把整个网站文件夹拖进上传区 → 几十秒后得到一个公开网址。

- [ ] **Step 2B: 若选 GitHub Pages**

引导用户：注册 GitHub → 在本目录 `git init` 并提交（含本计划与设计文档）→ 新建仓库 `用户名.github.io` → 推送 → 开启 Pages → 访问 `https://用户名.github.io`。

- [ ] **Step 3: 验收**

用手机流量（非本机）打开公开网址，确认任何人都能访问、动效正常、博客文章可点开。

---

## 备注：内容替换

上线后（或上线前）把所有"张三 / 项目X / 占位介绍 / 示例社交链接 / 头像作品图"替换为用户真实信息与图片。图片放入 `images/`，在对应位置引用。此为持续性工作，不阻塞上线。
