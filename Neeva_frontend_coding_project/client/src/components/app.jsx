import * as React from 'react';
import Player from "./Player.jsx";
import "./app.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"

// This is a placeholder. Feel free to edit or remove this code :)
export function App() {
  return (
    <div className="app">
      <header className="appHeader">
        <h1>Digital flipbook player</h1>
      </header>
      <main>
        <Player />
      </main>
    </div>
  );
}
