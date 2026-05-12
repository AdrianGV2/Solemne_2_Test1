// ============================================
// CLASE MAP - Mapa del Juego
// ============================================

class GameMap {
    constructor(scene) {
        this.scene = scene;
        this.obstacles = [];
        this.platforms = [];
        
        // Dimensiones de las plataformas (en píxeles)
        // Ajustadas según el tamaño de las imágenes
        this.platformSizes = {
            small: { width: 80, height: 40, image: 'platform1' },   // Plataforma pequeña
            medium: { width: 160, height: 40, image: 'platform2' }, // Plataforma mediana
            large: { width: 280, height: 40, image: 'platform3' }   // Plataforma grande
        };
        
        this.createMap();
    }
    
    /**
     * Seleccionar una plataforma aleatoria según el ancho requerido
     */
    selectPlatformSize(width) {
        if (width >= 240) return this.platformSizes.large;
        if (width >= 120) return this.platformSizes.medium;
        return this.platformSizes.small;
    }
    
    createMap() {
        // ESTRUCTURA DEL MAPA - GENERADO ALEATORIAMENTE pero EXPLORABLE
        
        // ===== PLATAFORMA BASE (fija) =====
        this.createPlatform(GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT - 40, GAME_CONFIG.WIDTH, 80);
        
        // ===== GENERAR ESCALERAS IZQUIERDA (aleatorias pero escalables) =====
        let currentYLeft = GAME_CONFIG.HEIGHT - 120;
        let currentXLeft = 150;
        const stepsLeft = Phaser.Math.Between(4, 6);
        
        for (let i = 0; i < stepsLeft; i++) {
            const stepHeight = Phaser.Math.Between(40, 70);
            const stepWidth = Phaser.Math.Between(100, 150);
            const stepOffsetX = Phaser.Math.Between(-20, 20);
            
            currentYLeft -= stepHeight;
            currentXLeft += stepOffsetX;
            
            // Asegurar que no salga del mapa
            currentXLeft = Phaser.Math.Clamp(currentXLeft, 100, 300);
            
            this.createPlatform(currentXLeft, currentYLeft, stepWidth, 25);
        }
        
        // ===== GENERAR ESCALERAS DERECHA (simétricas pero con variación) =====
        let currentYRight = GAME_CONFIG.HEIGHT - 120;
        let currentXRight = GAME_CONFIG.WIDTH - 150;
        const stepsRight = stepsLeft;
        
        for (let i = 0; i < stepsRight; i++) {
            const stepHeight = Phaser.Math.Between(40, 70);
            const stepWidth = Phaser.Math.Between(100, 150);
            const stepOffsetX = Phaser.Math.Between(-20, 20);
            
            currentYRight -= stepHeight;
            currentXRight -= stepOffsetX;
            
            // Asegurar que no salga del mapa
            currentXRight = Phaser.Math.Clamp(currentXRight, GAME_CONFIG.WIDTH - 300, GAME_CONFIG.WIDTH - 100);
            
            this.createPlatform(currentXRight, currentYRight, stepWidth, 25);
        }
        
        // ===== PLATAFORMAS CENTRALES ALEATORIAS =====
        const numCentralPlatforms = Phaser.Math.Between(3, 5);
        
        for (let i = 0; i < numCentralPlatforms; i++) {
            const platformX = Phaser.Math.Between(300, GAME_CONFIG.WIDTH - 300);
            const platformY = Phaser.Math.Between(250, 500);
            const platformWidth = Phaser.Math.Between(80, 150);
            
            this.createPlatform(platformX, platformY, platformWidth, 25);
        }
        
        // ===== PLATAFORMAS SUPERIORES (zonas altas accesibles) =====
        const numTopPlatforms = Phaser.Math.Between(2, 4);
        
        for (let i = 0; i < numTopPlatforms; i++) {
            const platformX = Phaser.Math.Between(150, GAME_CONFIG.WIDTH - 150);
            const platformY = Phaser.Math.Between(100, 250);
            const platformWidth = Phaser.Math.Between(100, 180);
            
            this.createPlatform(platformX, platformY, platformWidth, 25);
        }
        
        // ===== OBSTÁCULOS DECORATIVOS ALEATORIOS =====
        const numObstacles = Phaser.Math.Between(3, 6);
        
        for (let i = 0; i < numObstacles; i++) {
            const obstacleX = Phaser.Math.Between(200, GAME_CONFIG.WIDTH - 200);
            const obstacleY = Phaser.Math.Between(350, 550);
            const obstacleWidth = Phaser.Math.Between(30, 80);
            const obstacleHeight = Phaser.Math.Between(40, 100);
            
            this.createObstacle(obstacleX, obstacleY, obstacleWidth, obstacleHeight);
        }
        
        // ===== ESTRUCTURAS CENTRALES ALEATORIAS =====
        if (Phaser.Math.Between(0, 1) === 1) {
            const pillarX = Phaser.Math.Between(500, 700);
            const pillarY = Phaser.Math.Between(300, 450);
            
            this.createObstacle(pillarX, pillarY, 40, 80);
            this.createPlatform(pillarX, pillarY - 100, 100, 25);
        }
        
        console.log(`Mapa generado aleatoriamente - ${this.platforms.length} plataformas, ${this.obstacles.length} obstáculos`);
    }
    
    createPlatform(x, y, width, height) {
        // Seleccionar el tamaño de plataforma según el ancho requerido
        const platformSize = this.selectPlatformSize(width);
        
        // Crear imagen de plataforma
        const platform = this.scene.add.image(x, y, platformSize.image);
        platform.setOrigin(0.5, 0.5);
        platform.setDisplaySize(width, height);
        
        // Agregar física
        this.scene.physics.add.existing(platform, true); // Static body
        
        // Ajustar el tamaño del body físico al tamaño visible
        platform.body.setSize(width, height);
        
        this.platforms.push(platform);
        
        console.log(`✓ Plataforma creada: ${platformSize.image} (${width}x${height}) en (${x}, ${y})`);
    }
    
    createObstacle(x, y, width, height) {
        // Los obstáculos siguen siendo rectángulos (puedes agregar imágenes después)
        const obstacle = this.scene.add.rectangle(x, y, width, height, 0x444444);
        this.scene.physics.add.existing(obstacle, true); // Static body
        
        this.obstacles.push(obstacle);
        
        console.log(`✓ Obstáculo creado (${width}x${height}) en (${x}, ${y})`);
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
