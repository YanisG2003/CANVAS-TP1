export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.monstreX = 0.1 * this.canvas.width;
        this.monstreY = 0.1 * this.canvas.height;
        this.sizeFactor = 0.4;
        this.speedFactor = 25;
    }

    async init() {
        console.log("Game initialisé");
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }

    start() {
        console.log("Game démarré");
        this.redraw();
    }

    handleKeyDown(event) {
        const speed = this.speedFactor;

        switch(event.key) {
            case 'ArrowUp':
                this.monstreY = Math.max(0, this.monstreY - speed);
                break;
            case 'ArrowDown':
                this.monstreY = Math.min(this.canvas.height - (200 * this.sizeFactor), this.monstreY + speed);
                break;
            case 'ArrowLeft':
                this.monstreX = Math.max(0, this.monstreX - speed);
                break;
            case 'ArrowRight':
                this.monstreX = Math.min(this.canvas.width - (200 * this.sizeFactor), this.monstreX + speed);
                break;
            case '+':
                this.sizeFactor = Math.min(0.8, this.sizeFactor + 0.05);
                break;
            case '-':
                this.sizeFactor = Math.max(0.1, this.sizeFactor - 0.05);
                break;
        }
        this.redraw();
    }

    redraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawMonstre(this.monstreX, this.monstreY, this.sizeFactor);
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
}
