window.MiniGames = window.MiniGames || {};
window.MiniGames.games = window.MiniGames.games || [];

(function () {
  const App = {};

  // 计划展示的全部游戏（顺序）。未注册为可玩的显示为「敬请期待」。
  const PLANNED = [
    { id: "2048",   name: "2048",       emoji: "🔢", desc: "滑动合并方块，挑战 2048" },
    { id: "snake",  name: "贪吃蛇",      emoji: "🐍", desc: "吃食物变长，别撞墙" },
    { id: "memory", name: "翻牌记忆",    emoji: "🃏", desc: "翻开卡片找相同的一对" },
    { id: "breakout", name: "打砖块",    emoji: "🧱", desc: "挡板反弹小球打砖块" },
    { id: "typing", name: "打字挑战",    emoji: "⌨️", desc: "限时打字拼速度" },
  ];

  let activeGame = null;

  function registeredGame(id) {
    return window.MiniGames.games.find(g => g.id === id && g.available);
  }

  function renderLobby() {
    const grid = document.getElementById("game-grid");
    grid.innerHTML = "";
    PLANNED.forEach(meta => {
      const reg = registeredGame(meta.id);
      const card = document.createElement("div");
      card.className = "game-card" + (reg ? "" : " coming-soon");
      card.innerHTML = `
        <span class="emoji">${meta.emoji}</span>
        <h3>${meta.name}</h3>
        <p>${meta.desc}</p>
        ${reg ? "" : '<span class="badge">敬请期待</span>'}
      `;
      if (reg) card.addEventListener("click", () => enterGame(reg));
      grid.appendChild(card);
    });
  }

  function enterGame(game) {
    activeGame = game;
    document.getElementById("lobby-view").classList.add("hidden");
    document.getElementById("game-view").classList.remove("hidden");

    const high = window.MiniGames.storage.getHighScore(game.id);
    document.getElementById("high-score").textContent = high;
    document.getElementById("current-score").textContent = 0;

    game.start(document.getElementById("game-mount"), {
      onScoreChange: function (score) {
        document.getElementById("current-score").textContent = score;
        const newHigh = window.MiniGames.storage.setHighScore(game.id, score);
        document.getElementById("high-score").textContent = newHigh;
      },
    });
  }

  function exitGame() {
    if (activeGame && activeGame.stop) activeGame.stop();
    activeGame = null;
    document.getElementById("game-view").classList.add("hidden");
    document.getElementById("lobby-view").classList.remove("hidden");
  }

  App.init = function () {
    document.getElementById("back-to-lobby").addEventListener("click", exitGame);
    renderLobby();
  };

  window.MiniGames.app = App;
  document.addEventListener("DOMContentLoaded", App.init);
})();
