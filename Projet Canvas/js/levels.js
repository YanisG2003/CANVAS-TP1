// levels.js

export const levels = [
  
    {
      level: 1,
      obstacles: [
        { x: 200, y: 0, width: 50, height:300 },
        { x: 600, y: 300, width: 50, height: 300 }
      ],
      message: "Utilisez les flèches pour vous déplacer !"
    },
    {
      level: 2,
      obstacles: [
        { x: 450, y: 0, width: 50, height: 300 },
        { x: 0, y: 450, width: 550, height: 50 },
        { x: 700, y: 300, width: 550, height: 50 },
      ],
      message: "Bravo ! Bienvenue au Niveau 2 !"
    },
    {
        level: 3,
        obstacles: [
          { x: 150, y: 0, width: 50, height:300 },
          { x: 350, y: 300, width: 50, height: 300 },
          { x: 550, y: 300, width: 200, height: 50 },
          { x: 700, y: 300, width: 50, height: 300 },
          { x: 600, y: 0, width: 50, height: 130 },
        ],
        message: "Bravo ! Bienvenue au Niveau 3 !"
    },
    {
        level: 4,
        obstacles: [
          { x: 0, y: 150, width: 300, height:50 },
          { x: 600, y: 0, width: 50, height: 200 },
          { x: 600, y: 450, width: 50, height: 200 },
          { x: 250, y: 300, width: 50, height: 300 },
        ],
        movingObstacles: [
            { startX: 300, startY: 150, endX: 550, endY: 0, width: 50, height: 50, speed: 0.05 },
            { startX: 600, startY: 200, endX: 200, endY: 400, width: 50, height: 50, speed: 0.05 }
        ],
        message: "Bravo ! Bienvenue au Niveau 4 !"
    },
    {
        level: 5,
        obstacles: [
          { x: 0, y: 450, width: 250, height:50 },
          { x: 200, y: 0, width: 50, height: 200 },
          { x: 500, y: 200, width: 50, height: 400 },
          { x: 500, y: 0, width: 50, height: 50 },
          { x: 850, y: 200, width: 200, height: 50 },
        ],
        movingObstacles: [
            { startX: 200, startY: 200, endX: 0, endY: 400, width: 50, height: 50, speed: 0.05 },
            { startX: 550, startY: 200, endX: 800, endY: 0, width: 50, height: 50, speed: 0.05 },
        ],
        message: "Bravo ! Bienvenue au Niveau 5 !"
    },
    {
        level: 6,
        obstacles: [
          { x: 150, y: 0, width: 50, height: 350 },
          { x: 0, y: 500, width: 500, height:50 },
          { x: 350, y: 0, width: 50, height: 100 },
          { x: 500, y: 300, width: 50, height: 400 },
          { x: 600, y: 0, width: 50, height: 50 },
          { x: 500, y: 300, width: 300, height: 50 },
        ],
        movingObstacles: [
            { startX: 200, startY: 300, endX: 500, endY: 0, width: 50, height: 50, speed: 0.08 },
            { startX: 600, startY: 50, endX: 0, endY: 250, width: 50, height: 50, speed: 0.08 },

        ],
        message: "Bravo ! Bienvenue au Niveau 6 !"
    },
    {
        level: 7,
        obstacles: [
          { x: 0, y: 150, width: 200, height:50 },
          { x: 350, y: 0, width: 50, height: 200 },
          { x: 150, y: 200, width: 50, height: 400 },
          { x: 350, y: 500, width: 50, height: 50 },
          { x: 600, y: 350, width: 50, height: 400 },
          { x: 600, y: 0, width: 50, height: 50 },
          { x: 850, y: 350, width: 200, height: 50 },
        ],
        movingObstacles: [
            { startX: 350, startY: 200, endX: 0, endY: 450, width: 50, height: 50, speed: 0.08 },
            { startX: 600, startY: 50, endX: 0, endY: 300, width: 50, height: 50, speed: 0.08 },
            { startX: 650, startY: 350, endX: 800, endY: 0, width: 50, height: 50, speed: 0.03 },
        ],
        message: "Bravo ! Bienvenue au Niveau 7 !"
    },
    {
      level: 8,
      obstacles: [
        { x: 0, y: 130, width: 50, height:50 },
        { x: 350, y: 0, width: 50, height: 400 },
        { x: 250, y: 350, width: 100, height:50 },
        { x: 700, y: 350, width: 50, height: 400 },
        { x: 700, y: 0, width: 50, height: 50 },
      ],
      movingObstacles: [
          { startX: 50, startY: 130, endX: 300, endY: 0, width: 50, height: 50, speed: 0.08 },
          { startX: 0, startY: 350, endX: 200, endY: 0, width: 50, height: 50, speed: 0.08 },
          { startX: 700, startY: 50, endX: 0, endY: 300, width: 50, height: 50, speed: 0.08 },
          { startX: 400, startY: 350, endX: 650, endY: 0, width: 50, height: 50, speed: 0.08 },
      ],
      message: "Bravo ! Bienvenue au Niveau 8 !"
  },
  ];
  