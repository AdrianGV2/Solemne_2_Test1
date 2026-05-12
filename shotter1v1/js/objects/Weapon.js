// ============================================
// CLASE WEAPON - Armas
// ============================================

class Weapon {
    constructor(scene, x, y, weaponType) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.weaponType = weaponType;
        
        // Propiedades del tipo de arma
        this.name = weaponType.name;
        this.damage = weaponType.damage;
        this.fireRate = weaponType.fireRate;
        this.projectileSpeed = GAME_CONFIG.WEAPONS.PROJECTILE.SPEED;
        
        // Mapeo de nombres de armas a claves de imágenes
        const weaponImageMap = {
            'Pistol': 'weapon_pistola',
            'Rifle': 'weapon_rifle',
            'Shotgun': 'weapon_escopeta',
            'SMG': 'weapon_smg'
        };
        
        // Sprite físico del arma (imagen en lugar de rectángulo)
        const imageKey = weaponImageMap[weaponType.name] || 'weapon_pistola';
        this.sprite = scene.add.image(x, y, imageKey);
        this.sprite.setDisplaySize(32, 24);  // Tamaño visual de las armas
        scene.physics.add.existing(this.sprite);
        this.sprite.body.setCollideWorldBounds(true);
        this.sprite.body.setBounce(0.3);
        this.sprite.body.setAllowGravity(false);  // Sin gravedad - ubicación fija en el aire
        this.sprite.body.setVelocity(0, 0); // Asegurar que no tenga velocidad inicial
        
        // Última vez que se disparó (para controlar fireRate)
        this.lastFireTime = 0;
        
        // Control de si el arma está en el suelo o equipada
        this.isEquipped = false;
        this.owner = null;
        
        console.log(`Arma creada: ${this.name} en (${x}, ${y})`);
    }
    
    drop(x, y) {
        this.sprite.setPosition(x, y);
        this.sprite.body.setVelocity(0, 0);
        this.sprite.body.setAllowGravity(false);  // Mantener sin gravedad
        this.isEquipped = false;
        this.owner = null;
        
        // Flag temporal para evitar que se recoja inmediatamente después de soltar
        this.justDropped = true;
        this.scene.time.delayedCall(100, () => {
            this.justDropped = false;
        });
        
        console.log(`Arma ${this.name} soltada en (${x}, ${y})`);
    }
    
    fire(fromX, fromY, targetX, targetY) {
        const now = this.scene.time.now;
        
        // Verificar fireRate
        if (now - this.lastFireTime < this.fireRate) {
            return;
        }
        
        this.lastFireTime = now;
        
        // Calcular dirección hacia el objetivo
        const dx = targetX - fromX;
        const dy = targetY - fromY;
        const distance = Phaser.Math.Distance.Between(fromX, fromY, targetX, targetY);
        
        if (distance === 0) return;
        
        const normalizedDx = dx / distance;
        const normalizedDy = dy / distance;
        
        // Crear proyectil
        const projectile = this.scene.add.circle(
            fromX,
            fromY,
            GAME_CONFIG.WEAPONS.PROJECTILE.SIZE,
            COLORS.PROJECTILE
        );
        
        this.scene.physics.add.existing(projectile);
        projectile.body.setAllowGravity(false);  // Sin gravedad - viaja recto
        projectile.body.setVelocity(
            normalizedDx * this.projectileSpeed,
            normalizedDy * this.projectileSpeed
        );
        projectile.body.setCollideWorldBounds(true);
        projectile.body.onWorldBounds = true;
        
        // Guardar datos del proyectil
        projectile.damage = this.damage;
        projectile.ownerId = this.owner ? this.owner.playerId : null;
        
        // ✓ AGREGAR PROYECTIL AL GRUPO PARA QUE PUEDA SER ACTUALIZADO
        if (this.scene.projectiles) {
            this.scene.projectiles.add(projectile);
        }
        
        // Destruir proyectil cuando sale del mundo
        this.scene.physics.world.on('worldbounds', (body) => {
            if (body.gameObject === projectile) {
                projectile.destroy();
            }
        });
        
        console.log(`${this.name} disparado por Player ${this.owner?.playerId || 'unknown'}`);
    }
    
    getInfo() {
        return {
            name: this.name,
            damage: this.damage,
            fireRate: this.fireRate,
            isEquipped: this.isEquipped,
        };
    }
}
