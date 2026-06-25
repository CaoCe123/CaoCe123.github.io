const L = MiniGames.logic2048;

// slideRowLeft: 把一行向左滑动并合并，返回 { row, gained, mergedIndices }
test("空行不变", L.slideRowLeft([0,0,0,0]), { row:[0,0,0,0], gained:0, mergedIndices:[] });
test("单块靠左", L.slideRowLeft([0,0,2,0]), { row:[2,0,0,0], gained:0, mergedIndices:[] });
test("两块合并", L.slideRowLeft([2,2,0,0]), { row:[4,0,0,0], gained:4, mergedIndices:[0] });
test("隔空合并", L.slideRowLeft([2,0,2,0]), { row:[4,0,0,0], gained:4, mergedIndices:[0] });
test("四同只合并相邻一对", L.slideRowLeft([2,2,2,2]), { row:[4,4,0,0], gained:8, mergedIndices:[0,1] });
test("已合并不再二次合并", L.slideRowLeft([4,4,8,0]), { row:[8,8,0,0], gained:8, mergedIndices:[0] });
test("不同值靠拢不合并", L.slideRowLeft([2,4,0,0]), { row:[2,4,0,0], gained:0, mergedIndices:[] });
test("2-2-4 合并左对齐", L.slideRowLeft([2,2,4,0]), { row:[4,4,0,0], gained:4, mergedIndices:[0] });

// boardsEqual: 比较两个棋盘是否相同
test("相同棋盘", L.boardsEqual([[2,0],[0,2]], [[2,0],[0,2]]), true);
test("不同棋盘", L.boardsEqual([[2,0],[0,2]], [[2,0],[2,0]]), false);

// hasMoves: 是否还有可行的移动
test("有空格即可动", L.hasMoves([[2,0],[4,8]]), true);
test("满盘但可合并", L.hasMoves([[2,2],[4,8]]), true);
test("满盘且无法合并", L.hasMoves([[2,4],[4,2]]), false);

// moveBoard(board, dir): dir ∈ "left"|"right"|"up"|"down"
// 返回 { board: 新棋盘, gained: 分数, moved: 是否发生变化 }
test("左移整盘",
  L.moveBoard([[2,2,0,0],[0,0,0,0],[4,0,4,0],[0,0,0,0]], "left").board,
  [[4,0,0,0],[0,0,0,0],[8,0,0,0],[0,0,0,0]]);

test("右移整盘",
  L.moveBoard([[2,2,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], "right").board,
  [[0,0,0,4],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);

test("上移整盘",
  L.moveBoard([[2,0,0,0],[2,0,0,0],[0,0,0,0],[0,0,0,0]], "up").board,
  [[4,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);

test("下移整盘",
  L.moveBoard([[2,0,0,0],[2,0,0,0],[0,0,0,0],[0,0,0,0]], "down").board,
  [[0,0,0,0],[0,0,0,0],[0,0,0,0],[4,0,0,0]]);

test("左移计分",
  L.moveBoard([[2,2,4,4],[0,0,0,0],[0,0,0,0],[0,0,0,0]], "left").gained, 12);

test("无变化时 moved=false",
  L.moveBoard([[2,4,8,16],[0,0,0,0],[0,0,0,0],[0,0,0,0]], "left").moved, false);

test("有变化时 moved=true",
  L.moveBoard([[2,2,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], "left").moved, true);

// mergedCells: 合并结果所在棋盘坐标 [r,c]
test("左移合并坐标",
  L.moveBoard([[2,2,0,0],[0,0,0,0],[4,0,4,0],[0,0,0,0]], "left").mergedCells,
  [[0,0],[2,0]]);

test("右移合并坐标",
  L.moveBoard([[2,2,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], "right").mergedCells,
  [[0,3]]);

test("下移合并坐标",
  L.moveBoard([[2,0,0,0],[2,0,0,0],[0,0,0,0],[0,0,0,0]], "down").mergedCells,
  [[3,0]]);

test("无合并时为空",
  L.moveBoard([[2,4,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], "left").mergedCells,
  []);

runTests();
