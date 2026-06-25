window.MiniGames = window.MiniGames || {};

(function () {
  const SIZE = 4;

  // 把一行（长度任意）向左滑动并合并相同相邻块
  // 返回 { row: 新行（补齐到原长度的0）, gained: 本次合并获得的分数,
  //        mergedIndices: 新行中由合并产生的格子下标 }
  function slideRowLeft(row) {
    const nums = row.filter(v => v !== 0);
    const merged = [];
    const mergedIndices = [];
    let gained = 0;
    for (let i = 0; i < nums.length; i++) {
      if (i + 1 < nums.length && nums[i] === nums[i + 1]) {
        const sum = nums[i] * 2;
        mergedIndices.push(merged.length); // 合并结果落在的下标
        merged.push(sum);
        gained += sum;
        i++; // 跳过被合并的下一个
      } else {
        merged.push(nums[i]);
      }
    }
    while (merged.length < row.length) merged.push(0);
    return { row: merged, gained, mergedIndices };
  }

  function boardsEqual(a, b) {
    for (let r = 0; r < a.length; r++) {
      for (let c = 0; c < a[r].length; c++) {
        if (a[r][c] !== b[r][c]) return false;
      }
    }
    return true;
  }

  // 是否还能移动：有空格，或存在相邻相同块
  function hasMoves(board) {
    const n = board.length;
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < board[r].length; c++) {
        if (board[r][c] === 0) return true;
        if (c + 1 < board[r].length && board[r][c] === board[r][c + 1]) return true;
        if (r + 1 < n && board[r][c] === board[r + 1][c]) return true;
      }
    }
    return false;
  }

  // 工具：转置矩阵
  function transpose(board) {
    const n = board.length;
    const out = [];
    for (let c = 0; c < n; c++) {
      const row = [];
      for (let r = 0; r < n; r++) row.push(board[r][c]);
      out.push(row);
    }
    return out;
  }

  function reverseRows(board) {
    return board.map(row => row.slice().reverse());
  }

  // 整盘向某方向移动。统一转换为「向左」处理后再转换回去。
  // 返回 { board, gained, moved, mergedCells: 合并结果所在的 [r,c] 列表 }
  function moveBoard(board, dir) {
    let work = board.map(r => r.slice());
    if (dir === "right") work = reverseRows(work);
    else if (dir === "up") work = transpose(work);
    else if (dir === "down") work = reverseRows(transpose(work));

    let gained = 0;
    const maskWork = []; // 与 slid 同形状的布尔矩阵，标记合并产生的格子
    const slid = work.map(row => {
      const res = slideRowLeft(row);
      gained += res.gained;
      const mask = new Array(row.length).fill(false);
      res.mergedIndices.forEach(idx => { mask[idx] = true; });
      maskWork.push(mask);
      return res.row;
    });

    // 数值与掩码施加相同的逆变换，掩码即可映射回棋盘坐标
    let result = slid;
    let mask = maskWork;
    if (dir === "right") { result = reverseRows(slid); mask = reverseRows(maskWork); }
    else if (dir === "up") { result = transpose(slid); mask = transpose(maskWork); }
    else if (dir === "down") { result = transpose(reverseRows(slid)); mask = transpose(reverseRows(maskWork)); }

    const mergedCells = [];
    for (let r = 0; r < mask.length; r++)
      for (let c = 0; c < mask[r].length; c++)
        if (mask[r][c]) mergedCells.push([r, c]);

    const moved = !boardsEqual(board, result);
    return { board: result, gained, moved, mergedCells };
  }

  window.MiniGames.logic2048 = { slideRowLeft, moveBoard, boardsEqual, hasMoves, SIZE };
})();
