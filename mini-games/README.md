# 小游戏合集

玻璃拟态风格的网页小游戏合集，原生 HTML/CSS/JS，零依赖。

## 本地玩
双击 `index.html` 即可（部分浏览器对 localStorage/touch 在 file:// 下有限制，
推荐用本地服务器：`python3 -m http.server` 后访问 http://localhost:8000）。

## 部署到 GitHub Pages
将整个 `mini-games/` 文件夹拷入仓库（如 CaoCe123.github.io），
推送后通过 `https://<用户名>.github.io/mini-games/` 访问。
所有资源使用相对路径，可放于任意子目录。

## 目前包含
- ✅ 2048（键盘方向键 / 触摸滑动，自动记录最高分）
- 🔜 贪吃蛇、翻牌记忆、打砖块、打字挑战（敬请期待）

## 运行测试
浏览器打开 `test.html`，查看 2048 核心逻辑的单元测试结果。

## 新增一个游戏
1. 在 `js/games/` 下新建 `game-<id>.js`，实现 `start(mount, opts)` 和 `stop()`，
   并 `window.MiniGames.games.push({ id, name, emoji, desc, available:true, start, stop })`。
2. 在 `index.html` 按加载顺序加入该 `<script>`。
3. 在 `app.js` 的 `PLANNED` 中确认该游戏条目存在。
