window.MiniGames = window.MiniGames || {};

(function () {
  const PREFIX = "minigames.";

  function keyFor(gameId) {
    return PREFIX + gameId + ".highscore";
  }

  // 读取最高分；不可用或无记录时返回 0
  function getHighScore(gameId) {
    try {
      const raw = localStorage.getItem(keyFor(gameId));
      const n = parseInt(raw, 10);
      return Number.isFinite(n) && n > 0 ? n : 0;
    } catch (e) {
      return 0;
    }
  }

  // 仅当 score 高于已存最高分时写入；返回当前（可能更新后的）最高分
  function setHighScore(gameId, score) {
    const current = getHighScore(gameId);
    if (score <= current) return current;
    try {
      localStorage.setItem(keyFor(gameId), String(score));
    } catch (e) {
      // 存储不可用（隐私模式等）：静默失败，游戏照常运行
    }
    return score;
  }

  window.MiniGames.storage = { getHighScore, setHighScore };
})();
