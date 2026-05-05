// ============================================
// GAMESCENE - Escena Principal del Juego
// ============================================

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }
    
    create() {
        console.log('=== GameScene Iniciada ===');
        console.log('Config:', GAME_CONFIG);
        console.log('Colors:', COLORS);
        
        // Configurar física
        this.physics.world.setFPS(60);
        this.physics.world.gravity.y = GAME_CONFIG.GRAVITY;
        
        // Crear mapa
        this.gameMap = new GameMap(this);
        console.log('Mapa creado');
        
        // Crear jugadores
        console.log('Creando Player 1 en', GAME_CONFIG.SPAWN_POINTS.PLAYER1);
        this.player1 = new Player(
            this,
            GAME_CONFIG.SPAWN_POINTS.PLAYER1.x,
            GAME_CONFIG.SPAWN_POINTS.PLAYER1.y,
            1
        );
        console.log('Player 1 sprite:', this.player1.sprite);
        
        console.log('Creando Player 2 en', GAME_CONFIG.SPAWN_POINTS.PLAYER2);
        this.player2 = new Player(
            this,
            GAME_CONFIG.SPAWN_POINTS.PLAYER2.x,
            GAME_CONFIG.SPAWN_POINTS.PLAYER2.y,
            2
        );
        console.log('Player 2 sprite:', this.player2.sprite);
        
        // Colisiones: Jugadores con plataformas
        for (let platform of this.gameMap.getPlatforms()) {
            this.physics.add.collider(this.player1.sprite, platform);
            this.physics.add.collider(this.player2.sprite, platform);
        }
        
        for (let obstacle of this.gameMap.getObstacles()) {
            this.physics.add.collider(this.player1.sprite, obstacle);
            this.physics.add.collider(this.player2.sprite, obstacle);
        }
        
        // Crear armas en el mapa
        this.weaponsOnGround = [];
        this.spawnWeapons();
        
        // Grupo para proyectiles
        this.projectiles = this.add.group();
        
        // UI - Vidas
        this.createUI();
        
        // Entrada de teclado para disparar
        this.input.keyboard.on('keydown', this.handleKeyDown, this);
        this.input.keyboard.on('keyup', this.handleKeyUp, this);
        
        console.log('GameScene creada exitosamente');
    }
    
    spawnWeapons() {
        // Posiciones aleatorias para las 4 armas
        const weaponSpots = [
            { x: 300, y: 250 },
            { x: 900, y: 250 },
            { x: 600, y: 400 },
            { x: 600, y: 150 },
        ];
        
        for (let i = 0; i < GAME_CONFIG.WEAPONS.COUNT; i++) {
            const weaponType = GAME_CONFIG.WEAPONS.TYPES[i];
            const spot = weaponSpots[i];
            const weapon = new Weapon(this, spot.x, spot.y, weaponType);
            this.weaponsOnGround.push(weapon);
        }
    }
    
    createUI() {
        // Crear elementos de UI para mostrar vidas
        this.livesP1Text = this.add.text(10, 10, `P1: ${this.player1.lives}❤`, {
            fontSize: '20px',
            fill: '#ff4444',
            fontStyle: 'bold',
        });
        this.livesP1Text.setDepth(100);
        
        this.livesP2Text = this.add.text(
            GAME_CONFIG.WIDTH - 100,
            10,
            `P2: ${this.player2.lives}❤`,
            {
                fontSize: '20px',
                fill: '#4444ff',
                fontStyle: 'bold',
            }
        );
        this.livesP2Text.setDepth(100);
        
        // Mostrar armas equipadas
        this.weaponP1Text = this.add.text(10, 35, 'P1: Unarmed', {
            fontSize: '14px',
            fill: '#ffff00',
        });
        this.weaponP1Text.setDepth(100);
        
        this.weaponP2Text = this.add.text(
            GAME_CONFIG.WIDTH - 150,
            35,
            'P2: Unarmed',
            {
                fontSize: '14px',
                fill: '#ffff00',
            }
        );
        this.weaponP2Text.setDepth(100);
    }
    
    handleKeyDown(event) {
        // Player 1 - Soltar arma
        if (event.keyCode === CONTROLS.PLAYER1.DROP_WEAPON && this.player1.equippedWeapon) {
            this.player1.dropWeapon();
        }
        
        // Player 2 - Soltar arma
        if (event.keyCode === CONTROLS.PLAYER2.DROP_WEAPON && this.player2.equippedWeapon) {
            this.player2.dropWeapon();
        }
    }
    
    handleKeyUp(event) {
        // Aquí pueden ir otras acciones cuando se suelta una tecla
    }
    
    update() {
        try {
            if (!this.player1 || !this.player2 || !this.player1.active || !this.player2.active) {
                return;
            }
            
            // Actualizar jugadores
            this.player1.update();
            this.player2.update();
        } catch (e) {
            console.error('Error en update():', e);
            return;
        }
        
        // Colisiones: Jugadores con armas en el suelo
        for (let weapon of this.weaponsOnGround) {
            if (weapon.sprite.active) {
                // Distancia para recoger arma (30px)
                const distP1 = Phaser.Math.Distance.Between(
                    this.player1.x,
                    this.player1.y,
                    weapon.sprite.x,
                    weapon.sprite.y
                );
                
                if (distP1 < 30 && !weapon.isEquipped && this.player1.input.pickup.isDown) {
                    weapon.isEquipped = true;
                    weapon.owner = this.player1;
                    this.player1.equip(weapon);
                    weapon.sprite.setPosition(this.player1.x, this.player1.y - 20);
                }
                
                const distP2 = Phaser.Math.Distance.Between(
                    this.player2.x,
                    this.player2.y,
                    weapon.sprite.x,
                    weapon.sprite.y
                );
                
                if (distP2 < 30 && !weapon.isEquipped && this.player2.input.pickup.isDown) {
                    weapon.isEquipped = true;
                    weapon.owner = this.player2;
                    this.player2.equip(weapon);
                    weapon.sprite.setPosition(this.player2.x, this.player2.y - 20);
                }
            }
        }
        
        // Disparos
        if (this.player1.input.shoot.isDown && this.player1.equippedWeapon) {
            this.player1.shoot(this.player2.x, this.player2.y);
        }
        
        if (this.player2.input.shoot.isDown && this.player2.equippedWeapon) {
            this.player2.shoot(this.player1.x, this.player1.y);
        }
        
        // Actualizar proyectiles y detectar colisiones
        this.updateProjectiles();
        
        // Actualizar UI
        this.livesP1Text.setText(`P1: ${this.player1.lives}❤`);
        this.livesP2Text.setText(`P2: ${this.player2.lives}❤`);
        this.weaponP1Text.setText(`P1: ${this.player1.equippedWeapon ? this.player1.equippedWeapon.name : 'Unarmed'}`);
        this.weaponP2Text.setText(`P2: ${this.player2.equippedWeapon ? this.player2.equippedWeapon.name : 'Unarmed'}`);
        
        // Verificar fin del juego
        if (this.player1.lives <= 0) {
            this.endGame(2);
        } else if (this.player2.lives <= 0) {
            this.endGame(1);
        }
    }
    
    updateProjectiles() {
        const projectiles = this.projectiles.getChildren();
        
        projectiles.forEach((projectile) => {
            // Colisión con Player 1
            if (
                !projectile.owner?.isCrouching &&
                Phaser.Math.Distance.Between(
                    projectile.x,
                    projectile.y,
                    this.player1.x,
                    this.player1.y
                ) < 20 &&
                projectile.ownerId !== 1
            ) {
                this.player1.loseLive();
                projectile.destroy();
            }
            
            // Colisión con Player 2
            if (
                !projectile.owner?.isCrouching &&
                Phaser.Math.Distance.Between(
                    projectile.x,
                    projectile.y,
                    this.player2.x,
                    this.player2.y
                ) < 20 &&
                projectile.ownerId !== 2
            ) {
                this.player2.loseLive();
                projectile.destroy();
            }
            
            // Destruir si sale del mundo
            if (
                projectile.x < 0 ||
                projectile.x > GAME_CONFIG.WIDTH ||
                projectile.y < 0 ||
                projectile.y > GAME_CONFIG.HEIGHT
            ) {
                projectile.destroy();
            }
        });
    }
    
    endGame(winner) {
        console.log(`¡¡¡ PLAYER ${winner} GANA EL JUEGO !!!`);
        
        this.physics.pause();
        
        const text = this.add.text(
            GAME_CONFIG.WIDTH / 2,
            GAME_CONFIG.HEIGHT / 2,
            `¡PLAYER ${winner} WINS!`,
            {
                fontSize: '48px',
                fill: winner === 1 ? '#ff4444' : '#4444ff',
                fontStyle: 'bold',
            }
        );
        text.setOrigin(0.5);
        text.setDepth(200);
        
        // Reiniciar en 3 segundos
        this.time.delayedCall(3000, () => {
            this.scene.restart();
        });
    }
}
