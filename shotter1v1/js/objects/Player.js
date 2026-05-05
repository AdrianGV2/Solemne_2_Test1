// ============================================
// CLASE PLAYER - Jugador
// ============================================

class Player {
    constructor(scene, x, y, playerId) {
        // playerId: 1 o 2
        this.scene = scene;
        this.playerId = playerId;
        this.color = playerId === 1 ? COLORS.PLAYER1 : COLORS.PLAYER2;
        
        // Propiedades del jugador
        this.x = x;
        this.y = y;
        this.lives = GAME_CONFIG.PLAYER.MAX_LIVES;
        this.isCrouching = false;
        this.equippedWeapon = null;
        this.active = true;
        this.visible = true;
        
        // Crear sprite físico usando un rectángulo
        this.sprite = scene.add.rectangle(x, y, GAME_CONFIG.PLAYER.WIDTH, GAME_CONFIG.PLAYER.HEIGHT, this.color);
        scene.physics.add.existing(this.sprite);
        
        // Configurar física
        this.body = this.sprite.body;
        this.body.setBounce(0.1);
        this.body.setCollideWorldBounds(true);
        this.body.setDrag(0, 0);
        this.body.setGravityY(0);
        
        // Controles
        this.controls = playerId === 1 ? CONTROLS.PLAYER1 : CONTROLS.PLAYER2;
        this.setupControls(scene);
        
        // Estado
        this.state = PLAYER_STATES.IDLE;
        this.facingRight = playerId === 2;  // Player 1 mira izquierda, Player 2 mira derecha
        
        // Debug
        console.log(`Player ${playerId} creado en (${x}, ${y})`);
    }
    
    setupControls(scene) {
        this.input = {
            left: scene.input.keyboard.addKey(this.controls.LEFT),
            right: scene.input.keyboard.addKey(this.controls.RIGHT),
            jump: scene.input.keyboard.addKey(this.controls.UP),
            crouch: scene.input.keyboard.addKey(this.controls.DOWN),
            shoot: scene.input.keyboard.addKey(this.controls.SHOOT),
            drop: scene.input.keyboard.addKey(this.controls.DROP_WEAPON),
            pickup: scene.input.keyboard.addKey(this.controls.PICKUP),
        };
    }
    
    update() {
        // Actualizar posición x, y desde el sprite
        this.x = this.sprite.x;
        this.y = this.sprite.y;
        
        // Movimiento horizontal
        let velocityX = 0;
        
        if (this.input.left.isDown) {
            velocityX = -GAME_CONFIG.PLAYER.SPEED;
            this.facingRight = false;
        } else if (this.input.right.isDown) {
            velocityX = GAME_CONFIG.PLAYER.SPEED;
            this.facingRight = true;
        }
        
        this.body.setVelocityX(velocityX);
        
        // Salto
        if (this.input.jump.isDown && this.body.touching.down) {
            this.body.setVelocityY(-GAME_CONFIG.PLAYER.JUMP_POWER);
            this.state = PLAYER_STATES.JUMPING;
        }
        
        // Agacharse
        if (this.input.crouch.isDown && this.body.touching.down) {
            this.isCrouching = true;
            this.sprite.setDisplaySize(GAME_CONFIG.PLAYER.WIDTH, GAME_CONFIG.PLAYER.CROUCH_HEIGHT);
            this.state = PLAYER_STATES.CROUCHING;
        } else {
            this.isCrouching = false;
            this.sprite.setDisplaySize(GAME_CONFIG.PLAYER.WIDTH, GAME_CONFIG.PLAYER.HEIGHT);
        }
        
        // Actualizar estado
        if (!this.body.touching.down) {
            this.state = PLAYER_STATES.FALLING;
        } else if (velocityX === 0 && !this.isCrouching) {
            this.state = PLAYER_STATES.IDLE;
        } else if (velocityX !== 0 && !this.isCrouching) {
            this.state = PLAYER_STATES.WALKING;
        }
        
        // Verificar si cae del mapa
        if (this.y > GAME_CONFIG.HEIGHT) {
            this.loseLive();
        }
    }
    
    equip(weapon) {
        if (this.equippedWeapon) {
            this.dropWeapon();
        }
        this.equippedWeapon = weapon;
        console.log(`Player ${this.playerId} equipó: ${weapon.name}`);
    }
    
    dropWeapon() {
        if (this.equippedWeapon) {
            this.equippedWeapon.drop(this.x, this.y);
            this.equippedWeapon = null;
            console.log(`Player ${this.playerId} soltó el arma`);
        }
    }
    
    shoot(targetX, targetY) {
        if (this.equippedWeapon) {
            this.equippedWeapon.fire(this.x, this.y, targetX, targetY);
        }
    }
    
    loseLive() {
        this.lives--;
        console.log(`Player ${this.playerId} perdió una vida. Vidas restantes: ${this.lives}`);
        
        // Respawnar
        const spawnPoint = this.playerId === 1 ? GAME_CONFIG.SPAWN_POINTS.PLAYER1 : GAME_CONFIG.SPAWN_POINTS.PLAYER2;
        this.sprite.setPosition(spawnPoint.x, spawnPoint.y);
        this.x = spawnPoint.x;
        this.y = spawnPoint.y;
        this.body.setVelocity(0, 0);
        this.dropWeapon();
        
        if (this.lives <= 0) {
            this.die();
        }
    }
    
    die() {
        console.log(`¡Player ${this.playerId} ha sido eliminado!`);
        this.active = false;
        this.visible = false;
        this.sprite.destroy();
    }
    
    getState() {
        return {
            playerId: this.playerId,
            lives: this.lives,
            x: this.x,
            y: this.y,
            state: this.state,
            weapon: this.equippedWeapon ? this.equippedWeapon.name : 'Unarmed',
            crouching: this.isCrouching,
        };
    }
}
