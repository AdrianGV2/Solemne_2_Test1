// ============================================
// CONSTANTES DEL JUEGO - SHOOTER 1V1
// ============================================

const GAME_CONFIG = {
    // Resolución del juego
    WIDTH: 1200,
    HEIGHT: 700,
    
    // Tamaño de píxeles
    PIXEL_SIZE: 16,
    
    // Física
    GRAVITY: 700,
    
    // Jugador - Propiedades
    PLAYER: {
        WIDTH: 48,
        HEIGHT: 48,
        SPEED: 150,           // píxeles por segundo
        JUMP_POWER: 350,      // Velocidad de salto
        CROUCH_HEIGHT: 24,    // Alto cuando se agacha
        CROUCH_SCALE: 0.5,    // Escala visual al agacharse
        MAX_LIVES: 3,
    },
    
    // Armas
    WEAPONS: {
        COUNT: 4,             // Cantidad de armas en el mapa
        TYPES: [
            { name: 'Pistol', damage: 10, fireRate: 500 },
            { name: 'Rifle', damage: 20, fireRate: 800 },
            { name: 'Shotgun', damage: 30, fireRate: 1200 },
            { name: 'SMG', damage: 8, fireRate: 200 },
        ],
        PROJECTILE: {
            SPEED: 400,
            SIZE: 4,
        },
    },
    
    // Obstáculos y estructuras del mapa
    MAP: {
        TILE_SIZE: 32,
    },
    
    // Posiciones de respawn
    SPAWN_POINTS: {
        PLAYER1: { x: 150, y: 300 },    // Izquierda (ROJO)
        PLAYER2: { x: 1050, y: 300 },   // Derecha (AZUL)
    },
};

// Colores del juego
const COLORS = {
    PLAYER1: 0xff4444,      // Rojo
    PLAYER2: 0x4444ff,      // Azul
    OBSTACLE: 0x808080,     // Gris
    WEAPON: 0xffff00,       // Amarillo
    PROJECTILE: 0xff9900,   // Naranja
};

// Estados del jugador
const PLAYER_STATES = {
    IDLE: 'idle',
    WALKING: 'walking',
    JUMPING: 'jumping',
    CROUCHING: 'crouching',
    FALLING: 'falling',
};

// Teclas de control
const CONTROLS = {
    PLAYER1: {
        LEFT: Phaser.Input.Keyboard.KeyCodes.A,
        RIGHT: Phaser.Input.Keyboard.KeyCodes.D,
        UP: Phaser.Input.Keyboard.KeyCodes.W,
        DOWN: Phaser.Input.Keyboard.KeyCodes.S,
        SHOOT: Phaser.Input.Keyboard.KeyCodes.SPACE,
        DROP_WEAPON: Phaser.Input.Keyboard.KeyCodes.Q,
        PICKUP: Phaser.Input.Keyboard.KeyCodes.E,
    },
    PLAYER2: {
        LEFT: Phaser.Input.Keyboard.KeyCodes.LEFT,
        RIGHT: Phaser.Input.Keyboard.KeyCodes.RIGHT,
        UP: Phaser.Input.Keyboard.KeyCodes.UP,
        DOWN: Phaser.Input.Keyboard.KeyCodes.DOWN,
        SHOOT: Phaser.Input.Keyboard.KeyCodes.ENTER,
        DROP_WEAPON: Phaser.Input.Keyboard.KeyCodes.BACKSPACE,
        PICKUP: Phaser.Input.Keyboard.KeyCodes.I,
    },
};
