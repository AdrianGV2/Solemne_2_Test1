// ============================================
// CLASE MAP - Mapa del Juego
// ============================================

class GameMap {
    constructor(scene) {
        this.scene = scene;
        this.obstacles = [];
        this.platforms = [];
        
        this.createMap();
    }
    
    createMap() {
        // ESTRUCTURA DEL MAPA para Duck Game Style (top-down)
        // El mapa tiene plataformas, obstáculos, y zonas de trampa
        
        // Plataforma base inferior - robusta para que las armas no caigan
        this.createPlatform(GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT - 40, GAME_CONFIG.WIDTH, 80);
        
        // Plataforma superior izquierda
        this.createPlatform(50, 150, 300, 30);
        
        // Plataforma superior derecha
        this.createPlatform(GAME_CONFIG.WIDTH - 350, 150, 300, 30);
        
        // Plataforma central superior
        this.createPlatform(400, 100, 400, 30);
        
        // Obstáculos/Estructuras - Centro-izquierda
        this.createObstacle(300, 350, 60, 150);
        
        // Obstáculos/Estructuras - Centro
        this.createObstacle(550, 300, 100, 100);
        
        // Obstáculos/Estructuras - Centro-derecha
        this.createObstacle(850, 350, 60, 150);
        
        // Plataforma intermedia izquierda
        this.createPlatform(100, 450, 150, 30);
        
        // Plataforma intermedia derecha
        this.createPlatform(GAME_CONFIG.WIDTH - 250, 450, 150, 30);
        
        // Pilar central
        this.createObstacle(590, 400, 20, 200);
        
        // Trampa - Espacio en el suelo que causa caída
        // Los jugadores caerán si saltan hacia acá
        
        console.log('Mapa creado con éxito');
    }
    
    createPlatform(x, y, width, height) {
        const platform = this.scene.add.rectangle(x, y, width, height, COLORS.OBSTACLE);
        this.scene.physics.add.existing(platform, true); // Static body
        
        this.platforms.push(platform);
    }
    
    createObstacle(x, y, width, height) {
        const obstacle = this.scene.add.rectangle(x, y, width, height, 0x444444);
        this.scene.physics.add.existing(obstacle, true); // Static body
        
        this.obstacles.push(obstacle);
    }
    
    getColliders() {
        // Retorna todos los elementos del mapa que colisionan
        return [...this.platforms, ...this.obstacles];
    }
    
    getPlatforms() {
        return this.platforms;
    }
    
    getObstacles() {
        return this.obstacles;
    }
}
