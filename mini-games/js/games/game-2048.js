window.MiniGames = window.MiniGames || {};
window.MiniGames.games = window.MiniGames.games || [];

(function () {
  const L = () => window.MiniGames.logic2048;
  const storage = () => window.MiniGames.storage;
  const GAME_ID = "2048";
  const SIZE = 4;

  let board = [];
  let score = 0;
  let won = false; // 是否已合出 2048（用于胜利提示只弹一次）
  let keyHandler = null;
  let touchStart = null;
  let touchSurface = null; // 触摸滑动监听所在的元素（整个游戏视图）
  let mountEl = null;
  let onScoreChange = null; // 由 app 注入，用于更新顶栏分数

  function emptyBoard() {
    return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
  }

  function addRandomTile() {
    const empties = [];
    for (let r = 0; r < SIZE; r++)
      for (let c = 0; c < SIZE; c++)
        if (board[r][c] === 0) empties.push([r, c]);
    if (empties.length === 0) return null;
    const [r, c] = empties[Math.floor(Math.random() * empties.length)];
    board[r][c] = Math.random() < 0.9 ? 2 : 4;
    return [r, c];
  }

  function tileClass(v) {
    if (v > 2048) return "tile-super";
    return "tile-" + v;
  }

  // Emoji 进化链：数值 → 表情。超过 2048 统一显示为龙。
  const EMOJI = {
    2: "🥚", 4: "🐛", 8: "🐣", 16: "🐤", 32: "🐔", 64: "🐰",
    128: "🐱", 256: "🐶", 512: "🦊", 1024: "🐯", 2048: "🦁",
  };

  function tileFace(v) {
    return EMOJI[v] || "🐉";
  }

  function render(newCells, mergedCells) {
    const boardEl = mountEl.querySelector(".board-2048");
    boardEl.innerHTML = "";
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        const cell = document.createElement("div");
        cell.className = "cell-2048";
        const v = board[r][c];
        if (v !== 0) {
          const tile = document.createElement("div");
          tile.className = "tile " + tileClass(v);
          if (newCells && newCells.some(([nr, nc]) => nr === r && nc === c)) {
            tile.classList.add("tile-new");
          }
          const isMerged = mergedCells &&
            mergedCells.some(([nr, nc]) => nr === r && nc === c);
          if (isMerged) tile.classList.add("tile-merged");
          tile.textContent = tileFace(v);
          cell.appendChild(tile);
          // 飘分：在合并出的方块上飘出「+本格数值」
          if (isMerged) {
            const float = document.createElement("span");
            float.className = "score-float";
            float.textContent = "+" + v;
            cell.appendChild(float);
          }
        }
        boardEl.appendChild(cell);
      }
    }
    if (onScoreChange) onScoreChange(score);
  }

  function setMessage(text) {
    const el = mountEl.querySelector(".game-2048-message");
    if (el) el.textContent = text;
  }

  function doMove(dir) {
    const res = L().moveBoard(board, dir);
    if (!res.moved) return;
    board = res.board;
    score += res.gained;
    const coords = addRandomTile();
    render(coords ? [coords] : undefined, res.mergedCells);
    // 胜利提示只在首次合出 2048 时弹一次，不被后续移动或结束提示覆盖
    if (!won && board.some(row => row.includes(2048))) {
      won = true;
      setMessage("🎉 你赢了！可继续冲更高分");
    } else if (!L().hasMoves(board)) {
      setMessage("游戏结束！点「新游戏」再来一局");
    }
  }

  function newGame() {
    board = emptyBoard();
    score = 0;
    won = false;
    const c1 = addRandomTile();
    const c2 = addRandomTile();
    setMessage("");
    render([c1, c2].filter(Boolean));
  }

  // dir 映射
  const KEY_DIRS = {
    ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down",
  };

  function start(mount, opts) {
    mountEl = mount;
    onScoreChange = (opts && opts.onScoreChange) || null;
    mountEl.innerHTML = `
      <div class="board-2048"></div>
      <div class="game-2048-message"></div>
      <div class="game-2048-controls">
        <button class="btn-glass" id="new-game-2048">新游戏</button>
      </div>
    `;
    mountEl.querySelector("#new-game-2048").addEventListener("click", newGame);

    keyHandler = function (e) {
      const dir = KEY_DIRS[e.key];
      if (!dir) return;
      e.preventDefault();
      doMove(dir);
    };
    document.addEventListener("keydown", keyHandler);

    // 触摸滑动监听整个游戏视图，全屏任意位置都能操作（不限于棋盘内）
    touchSurface = mountEl.parentElement || mountEl;
    touchSurface.addEventListener("touchstart", onTouchStart, { passive: true });
    touchSurface.addEventListener("touchend", onTouchEnd, { passive: true });

    newGame();
  }

  function onTouchStart(e) {
    const t = e.changedTouches[0];
    touchStart = { x: t.clientX, y: t.clientY };
  }

  function onTouchEnd(e) {
    if (!touchStart) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.x;
    const dy = t.clientY - touchStart.y;
    const absX = Math.abs(dx), absY = Math.abs(dy);
    if (Math.max(absX, absY) < 24) { touchStart = null; return; } // 太短忽略
    const dir = absX > absY ? (dx > 0 ? "right" : "left") : (dy > 0 ? "down" : "up");
    touchStart = null;
    doMove(dir);
  }

  function stop() {
    if (keyHandler) document.removeEventListener("keydown", keyHandler);
    if (touchSurface) {
      touchSurface.removeEventListener("touchstart", onTouchStart);
      touchSurface.removeEventListener("touchend", onTouchEnd);
    }
    keyHandler = null;
    touchSurface = null;
    touchStart = null;
    if (mountEl) mountEl.innerHTML = "";
    mountEl = null;
  }

  function getScore() { return score; }

  // 向注册表登记。getScore 供未来「离开时持久化分数」等场景使用。
  window.MiniGames.games.push({
    id: GAME_ID,
    name: "2048",
    emoji: "🔢",
    desc: "滑动合并方块，挑战 2048",
    available: true,
    start: start,
    stop: stop,
    getScore: getScore,
  });
})();
