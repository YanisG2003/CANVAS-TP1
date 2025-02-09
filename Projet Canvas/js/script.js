import Game from "./Game.js";

// On lance le jeu après le chargement du DOM
window.onload = () => {
    let canvas = document.querySelector("#myCanvas");
    let game = new Game(canvas);
    game.init();  // Initialisation du jeu
    game.start(); // Lancement du jeu
};
