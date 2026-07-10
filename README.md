# Kniffel Scorecard
 
A browser-based scorecard for **Kniffel (Yahtzee)**. Players roll physical dice and enter results manually — this app tracks scores, turn order, and final rankings. It does not simulate dice rolls.
 
**Live demo:** https://philipstefanov.github.io/kniffel-scorecard/
 
> **Note:** the UI is currently in German (e.g. "Spieler Hinzufügen" = Add Player, "Starte Spiel" = Start Game). Translation to English is on the roadmap — see [Future Improvements](#future-improvements).
 
## Running it locally
 
No build step, no dependencies, no package manager. This is plain HTML/CSS/JS with regular `<script>` tags (no ES6 modules), so it can be opened directly in a browser:
 
```bash
git clone https://github.com/PhilipStefanov/kniffel-scorecard.git
cd kniffel-scorecard
open index.html   # or just double-click the file
```
 
Any modern browser works. No local server required.
 
## Features
 
**Player management** — add, remove, and rename players before the game starts.
 
**Score tracking** — enter results for all 13 Kniffel categories (Ones through Sixes, Three/Four of a Kind, Full House, Small/Large Straight, Yahtzee, Chance), with the upper-section bonus calculated automatically once the threshold is met.
 
**Turn handling** — one entry per turn, enforced in player order; you can't skip ahead or double-enter.
 
**Move history** — every completed move is recorded. The most recent move can still be edited; anything older locks once a new move is made.
 
**Automatic game completion** — the game ends itself once every category for every player is filled, and blocks further entries after that.
 
**Final ranking** — total scores calculated and sorted, shown in a full-screen Game Over overlay.
 
## Project structure
 
```
.
├── index.html
├── style.css
└── js/
    ├── state.js     # game state, players, turns, move history, end-of-game detection, ranking
    ├── scoring.js    # Kniffel scoring rules, category calculations, totals
    └── ui.js         # renders the table, handles input, popups, overlays
```
 
## Tech stack
 
HTML5, CSS3, vanilla JavaScript (ES6 syntax, no modules, no frameworks, no build tooling).
 
## Future improvements
 
- [ ] Translate UI to English (or add a language toggle)
- [ ] Persist game state with Local Storage
- [ ] Undo/redo support
- [ ] Mobile-responsive layout
- [ ] Animated winner screen
- [ ] Sound effects
- [ ] Score statistics / game history across sessions
## Why this project exists
 
Built to practice state management, DOM manipulation, event-driven programming, and keeping UI code separate from game logic in plain JavaScript — no framework as a crutch.