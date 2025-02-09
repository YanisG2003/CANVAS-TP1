import { levels } from './levels.js';

export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.monstreX = 0.02 * this.canvas.width;
        this.monstreY = 0.02 * this.canvas.height;
        this.sizeFactor = 0.4;
        this.speedFactor = 30;
        this.level = 0;
        this.obstacles = [];
        this.movingObstacles = [];
        this.exit = { x: this.canvas.width - 50, y: this.canvas.height - 50, size: 30 };
        this.lives = 3;

        this.exitImage = new Image();
        this.exitImage.src = "image/miel.png";

        this.movingObstacleImage = new Image();
        this.movingObstacleImage.src = "image/abeille.png";    

        this.setupLevel();

        window.addEventListener("keydown", () => {
            if (this.levelMessage) {
                this.levelMessage = "";  // Effacer le message lorsqu'une touche est pressée
                this.redraw();  // Redessiner l'écran
            }
        });
    }

    async init() {
        console.log("Game initialisé");
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }

    start() {
        console.log("Game démarré");
        this.lastTime = 0;
        this.updateLevelDisplay();  
        this.updateMovement(0);
        this.redraw();
    }

    setupLevel() {
        const levelData = levels[this.level];
        this.obstacles = levelData.obstacles;
        this.levelMessage = levelData.message;

        if (levelData.movingObstacles) {
            this.addMovingObstacles();
        }
    }

    resetPosition() {
        this.monstreX = 0.02 * this.canvas.width;
        this.monstreY = 0.02 * this.canvas.height;
    }

    addMovingObstacles() {
        const levelData = levels[this.level];

        this.movingObstacles = levelData.movingObstacles.map(obstacle => ({
            x: obstacle.startX,
            y: obstacle.startY,
            width: obstacle.width,
            height: obstacle.height,
            startX: obstacle.startX,
            startY: obstacle.startY,
            endX: obstacle.endX,
            endY: obstacle.endY,
            speed: obstacle.speed || 2,
            directionX: obstacle.endX !== obstacle.startX ? 1 : 0, // 1 = droite, -1 = gauche
            directionY: obstacle.endY !== obstacle.startY ? 1 : 0, // 1 = bas, -1 = haut
        }));
    }

    updateMovement(timestamp) {
        if (!this.lastTime) this.lastTime = timestamp;
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
    
        const speedFactor = this.speedFactor * deltaTime / 16;
    
        this.movingObstacles.forEach(obstacle => {
            const moveSpeed = obstacle.speed * speedFactor;
    
            // Déplacement en X
            obstacle.x += obstacle.directionX * moveSpeed;
            if ((obstacle.directionX > 0 && obstacle.x >= obstacle.endX) || (obstacle.directionX < 0 && obstacle.x <= obstacle.startX)) {
                obstacle.directionX *= -1;
            }
    
            // Déplacement en Y
            obstacle.y += obstacle.directionY * moveSpeed;
            if ((obstacle.directionY > 0 && obstacle.y >= obstacle.endY) || (obstacle.directionY < 0 && obstacle.y <= obstacle.startY)) {
                obstacle.directionY *= -1;
            }
    
            // Vérifier la collision avec le joueur
            if (this.checkCollisionWithMovingObstacle(this.monstreX, this.monstreY)) {
                this.resetPosition();
            }            
        });
    
        this.redraw();
        requestAnimationFrame(this.updateMovement.bind(this));  // Problème possible ici: la fonction appelée récursivement peut faire bouger trop rapidement le jeu
    }
    
    checkCollisionWithMovingObstacle(x, y) {
        return this.movingObstacles.some(obstacle =>
            x < obstacle.x + obstacle.width &&
            x + (200 * this.sizeFactor) > obstacle.x &&
            y < obstacle.y + obstacle.height &&
            y + (200 * this.sizeFactor) > obstacle.y
        );
    }
    

    checkCollision(x, y) {
        return [...this.obstacles, ...this.movingObstacles].some(obstacle =>
            x < obstacle.x + obstacle.width &&
            x + (200 * this.sizeFactor) > obstacle.x &&
            y < obstacle.y + obstacle.height &&
            y + (200 * this.sizeFactor) > obstacle.y
        );
    }

    handleKeyDown(event) {
        const speed = this.speedFactor;
        let newX = this.monstreX;
        let newY = this.monstreY;

        switch(event.key) {
            case 'ArrowUp':
                newY = Math.max(0, this.monstreY - speed);
                break;
            case 'ArrowDown':
                newY = Math.min(this.canvas.height - (200 * this.sizeFactor), this.monstreY + speed);
                break;
            case 'ArrowLeft':
                newX = Math.max(0, this.monstreX - speed);
                break;
            case 'ArrowRight':
                newX = Math.min(this.canvas.width - (200 * this.sizeFactor), this.monstreX + speed);
                break;
        }

        // Si la nouvelle position entraîne une collision, réinitialise la position
        if (this.checkCollision(newX, newY)) {
            this.resetPosition();  // Appel à une fonction pour réinitialiser la position du monstre
        } else {
            this.monstreX = newX;
            this.monstreY = newY;
        }

        if (this.checkExit()) {
            this.level++;
            this.setupLevel();
            this.monstreX = 0.02 * this.canvas.width;
            this.monstreY = 0.02 * this.canvas.height;
            this.displayLevelChangeMessage();
        }

        this.redraw();
    }

    checkExit() {
        if (
            this.monstreX < this.exit.x + this.exit.size &&
            this.monstreX + (200 * this.sizeFactor) > this.exit.x &&
            this.monstreY < this.exit.y + this.exit.size &&
            this.monstreY + (200 * this.sizeFactor) > this.exit.y
        ) {
            this.level++;  // Incrémentation du niveau
            this.setupLevel();  // Réinitialiser la configuration du niveau
            this.monstreX = 0.1 * this.canvas.width;  // Réinitialiser la position du joueur
            this.monstreY = 0.1 * this.canvas.height;
            this.updateLevelDisplay();  // Mettre à jour l'affichage du niveau
            this.displayLevelChangeMessage();  // Afficher le message du niveau
        }
    }

    updateLevelDisplay() {
        const levelElement = document.getElementById('level');
        // Affichage du niveau actuel + 1, car les niveaux commencent à 0
        levelElement.textContent = `Niveau : ${this.level + 1}`;
    }

    displayLevelChangeMessage() {
        this.levelMessage = `Niveau ${this.level + 1}!`;
    
        clearTimeout(this.messageTimeout);
        this.messageTimeout = setTimeout(() => {
            this.levelMessage = "";
            this.redraw();
        }, 2000); // Afficher le message un peu plus longtemps
    
        this.fadeTransition();
    }
    
    fadeTransition() {
        this.ctx.globalAlpha = 0.7; // Réduire l'opacité pour une transition plus rapide
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
        // Transition plus rapide : 500ms pour disparaître
        setTimeout(() => {
            this.ctx.globalAlpha = 1; // Réinitialiser l'opacité
            this.redraw();
        }, 0); // Après 0.5 seconde, on rétablit l'opacité
    }
    

    drawMonstre(x, y, sizeFactor) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.fillStyle = "#442f20";

        // Tête
        this.ctx.beginPath();
        this.ctx.arc(75 * sizeFactor, 50 * sizeFactor, 70 * sizeFactor, 0, Math.PI * 2);
        this.ctx.fill();

        // Ventre
        this.ctx.beginPath();
        this.ctx.ellipse(75 * sizeFactor, 190 * sizeFactor, 80 * sizeFactor, 100 * sizeFactor, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Jambes
        this.ctx.beginPath();
        this.ctx.ellipse(40 * sizeFactor, 260 * sizeFactor, 25 * sizeFactor, 70 * sizeFactor, 0, 0, Math.PI * 2);
        this.ctx.ellipse(110 * sizeFactor, 260 * sizeFactor, 25 * sizeFactor, 70 * sizeFactor, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Bras
        this.ctx.beginPath();
        this.ctx.ellipse(-2 * sizeFactor, 160 * sizeFactor, 20 * sizeFactor, 70 * sizeFactor, 10, 0, Math.PI * 2);
        this.ctx.ellipse(148 * sizeFactor, 160 * sizeFactor, 20 * sizeFactor, 70 * sizeFactor, -10, 0, Math.PI * 2);
        this.ctx.fill();

        // Yeux
        this.drawCircle(55 * sizeFactor, 20 * sizeFactor, 12 * sizeFactor, "white");
        this.drawCircle(95 * sizeFactor, 20 * sizeFactor, 12 * sizeFactor, "white");
        this.drawCircle(55 * sizeFactor, 20 * sizeFactor, 7 * sizeFactor, "black");
        this.drawCircle(95 * sizeFactor, 20 * sizeFactor, 7 * sizeFactor, "black");

        // Tache Ventre
        this.ctx.fillStyle = "#5a3a22";
        this.ctx.beginPath();
        this.ctx.ellipse(75 * sizeFactor, 190 * sizeFactor, 65 * sizeFactor, 80 * sizeFactor, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Tache Bouche
        this.ctx.fillStyle = "#5a3a22";
        this.ctx.beginPath();   
        this.ctx.arc(75 * sizeFactor, 70 * sizeFactor, 30 * sizeFactor, 0, Math.PI * 2);
        this.ctx.fill();

        // Bouche
        this.ctx.beginPath();
        this.ctx.moveTo(50 * sizeFactor, 70 * sizeFactor); // Point de départ
        this.ctx.lineTo(100 * sizeFactor, 70 * sizeFactor); // Point de fin
        this.ctx.lineWidth = 5 * sizeFactor;
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();

        // Nez
        this.drawCircle(75 * sizeFactor, 51 * sizeFactor, 8 * sizeFactor, "black");

        // Oreilles
        this.ctx.fillStyle = "#442f20";
        this.ctx.beginPath();   
        this.ctx.arc(25 * sizeFactor, 0, 20 * sizeFactor, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(125 * sizeFactor, 0, 20 * sizeFactor, 0, Math.PI * 2);
        this.ctx.fill();

        // Taches
        this.ctx.fillStyle = "#5a3a22";
        this.ctx.beginPath();   
        this.ctx.arc(25 * sizeFactor, 0, 10 * sizeFactor, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(125 * sizeFactor, 0, 10 * sizeFactor, 0, Math.PI * 2);
        this.ctx.fill();


        this.ctx.restore();
    }

    drawCircle(x, y, radius, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawExit() {
        // Vérifie la taille de l'image et ajuste si nécessaire
        this.ctx.drawImage(
            this.exitImage,
            this.exit.x,
            this.exit.y,
            50,   // Ajuste cette valeur si nécessaire
            50    // Ajuste cette valeur si nécessaire
        );
    }

    drawObstacles() {
        this.ctx.fillStyle = "#175732";
        // Dessine les obstacles statiques
        this.obstacles.forEach(obstacle => {
            this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });
    }
    
    

    redraw() {
        // Effacer le canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        // Dessiner les éléments du jeu
        let newSizeFactor = 0.3;
        this.drawMonstre(this.monstreX, this.monstreY, newSizeFactor);
        this.drawExit();
        this.drawObstacles();

        this.movingObstacles.forEach(obstacle => {
            this.ctx.drawImage(this.movingObstacleImage, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });
    
        // Affichage du message temporaire de changement de niveau
        if (this.levelMessage) {
            this.ctx.fillStyle = "gold"; // Couleur du texte
            this.ctx.font = "50px Arial"; // Police et taille
    
            // Mesurer la largeur du texte
            const textWidth = this.ctx.measureText(this.levelMessage).width;
    
            // Calculer la position x pour centrer le texte
            const x = (this.canvas.width - textWidth) / 2;
    
            // Afficher le texte centré horizontalement et verticalement
            this.ctx.fillText(this.levelMessage, x, this.canvas.height / 2);
        }
    }

    
    
}
