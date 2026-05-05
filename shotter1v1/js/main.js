// ============================================
// MAIN.JS - Configuración Principal de Phaser
// ============================================

const config = {
    type: Phaser.AUTO,
    width: GAME_CONFIG.WIDTH,
    height: GAME_CONFIG.HEIGHT,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: GAME_CONFIG.GRAVITY },
            debug: false,
            enableBody: true,
        },
    },
    scene: [GameScene],
    render: {
        pixelArt: true,
        antialias: false,
    },
};

// Crear instancia del juego
window.game = new Phaser.Game(config);

console.log('🎮 Shotter 1v1 - Military Edition');
console.log('Juego iniciado correctamente');
