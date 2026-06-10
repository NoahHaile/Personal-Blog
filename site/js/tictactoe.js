// Tic-tac-toe with a rule-based AI (Newell & Simon strategy).
// Human is X and moves first; AI is O. Effectively unbeatable; best play draws.
(function () {
  var boardEl = document.getElementById("ttt-board");
  if (!boardEl) return;

  var statusEl = document.getElementById("ttt-status");
  var resetEl = document.getElementById("ttt-reset");
  var cells = Array.prototype.slice.call(boardEl.querySelectorAll(".ttt-cell"));
  var HUMAN = "X", AI = "O";
  var board, over;
  var humanFirst = false; // first game the AI starts; alternates each new game

  var LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  function setStatus(t) { statusEl.textContent = t; }

  function winningLine(b) {
    for (var i = 0; i < LINES.length; i++) {
      var L = LINES[i];
      if (b[L[0]] && b[L[0]] === b[L[1]] && b[L[1]] === b[L[2]]) return L;
    }
    return null;
  }
  function winner(b) { var L = winningLine(b); return L ? b[L[0]] : null; }
  function empties(b) { var r = []; for (var i = 0; i < 9; i++) if (!b[i]) r.push(i); return r; }

  // Square where placing p wins immediately, else -1.
  function findWin(b, p) {
    for (var i = 0; i < 9; i++) {
      if (!b[i]) { b[i] = p; var w = winner(b) === p; b[i] = ""; if (w) return i; }
    }
    return -1;
  }
  // How many immediate wins p has on board b.
  function winCount(b, p) {
    var c = 0;
    for (var i = 0; i < 9; i++) { if (!b[i]) { b[i] = p; if (winner(b) === p) c++; b[i] = ""; } }
    return c;
  }
  // Square that creates a fork (two simultaneous winning threats) for p, else -1.
  function findFork(b, p) {
    for (var i = 0; i < 9; i++) {
      if (!b[i]) { b[i] = p; var f = winCount(b, p) >= 2; b[i] = ""; if (f) return i; }
    }
    return -1;
  }

  function aiMove(b) {
    var m;
    // 1. Win now.
    if ((m = findWin(b, AI)) > -1) return m;
    // 2. Block an opponent win.
    if ((m = findWin(b, HUMAN)) > -1) return m;
    // 3. Make a fork.
    if ((m = findFork(b, AI)) > -1) return m;
    // 4. Defend against a fork. Prefer forcing the human with a threat whose
    //    forced block leaves them no double threat; else block a fork square.
    if (findFork(b, HUMAN) > -1) {
      for (var i = 0; i < 9; i++) {
        if (b[i]) continue;
        b[i] = AI;
        var forced = findWin(b, AI); // the square the human must block
        if (forced > -1) {
          b[forced] = HUMAN;
          var safe = winner(b) !== HUMAN && winCount(b, HUMAN) <= 1;
          b[forced] = "";
          b[i] = "";
          if (safe) return i;
        } else {
          b[i] = "";
        }
      }
      return findFork(b, HUMAN); // block the fork directly
    }
    // 5. Center.
    if (!b[4]) return 4;
    // 6. Opposite corner from the human.
    var opp = [[0, 8], [8, 0], [2, 6], [6, 2]];
    for (var k = 0; k < opp.length; k++) {
      if (b[opp[k][0]] === HUMAN && !b[opp[k][1]]) return opp[k][1];
    }
    // 7. Any empty corner.
    var corners = [0, 2, 6, 8];
    for (var c = 0; c < corners.length; c++) if (!b[corners[c]]) return corners[c];
    // 8. Any empty side.
    var sides = [1, 3, 5, 7];
    for (var s = 0; s < sides.length; s++) if (!b[sides[s]]) return sides[s];
    return empties(b)[0];
  }

  function place(i, p) {
    board[i] = p;
    var cell = cells[i];
    cell.textContent = p;
    cell.classList.add(p === HUMAN ? "is-x" : "is-o");
    cell.disabled = true;
  }

  function finish() {
    var L = winningLine(board);
    if (L) {
      over = true;
      L.forEach(function (i) { cells[i].classList.add("is-win"); });
      cells.forEach(function (c) { c.disabled = true; });
      setStatus(board[L[0]] === HUMAN ? "You win. Well played." : "I win. Rematch?");
      return true;
    }
    if (empties(board).length === 0) {
      over = true;
      setStatus("A draw. Run it back?");
      return true;
    }
    return false;
  }

  function onCell(e) {
    var i = +e.currentTarget.getAttribute("data-i");
    if (over || board[i]) return;
    place(i, HUMAN);
    if (finish()) return;
    setStatus("Thinking…");
    window.setTimeout(function () {
      var m = aiMove(board);
      if (m > -1) place(m, AI);
      if (!finish()) setStatus("Your move.");
    }, 240);
  }

  function reset() {
    board = ["", "", "", "", "", "", "", "", ""];
    over = false;
    cells.forEach(function (c) {
      c.textContent = "";
      c.className = "ttt-cell";
      c.disabled = false;
    });
    if (humanFirst) {
      setStatus("You're X. Your move.");
    } else {
      place(aiMove(board), AI); // AI opens
      setStatus("I started. You're X, your move.");
    }
    humanFirst = !humanFirst; // alternate who starts next game
  }

  cells.forEach(function (c) { c.addEventListener("click", onCell); });
  resetEl.addEventListener("click", reset);
  reset();
})();
