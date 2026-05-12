// ============================================
// MENUSCENE.JS - Escena del Menú Principal
// ============================================

class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        // Fondo con efecto degradado
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0x0a0e27, 1);
        graphics.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
        graphics.generateTexture('menu-bg', this.cameras.main.width, this.cameras.main.height);
        graphics.destroy();

        this.add.image(0, 0, 'menu-bg').setOrigin(0, 0);

        // Agregar partículas de fondo (efecto militar)
        this.createBackgroundParticles();

        // Título del juego
        this.add.text(
            this.cameras.main.centerX,
            80,
            'SHOTTER 1v1',
            {
                fontSize: '64px',
                fontFamily: 'Arial Black',
                fill: '#00ff00',
                stroke: '#ffffff',
                strokeThickness: 3,
                shadow: {
                    offsetX: 0,
                    offsetY: 0,
                    color: '#00ff00',
                    blur: 15,
                    fill: true
                }
            }
        ).setOrigin(0.5, 0.5);

        // Subtítulo
        this.add.text(
            this.cameras.main.centerX,
            140,
            'MILITARY EDITION',
            {
                fontSize: '18px',
                fontFamily: 'Arial',
                fill: '#cccccc',
                stroke: '#00ff00',
                strokeThickness: 1
            }
        ).setOrigin(0.5, 0.5);

        // Botón JUGAR (GRANDE)
        this.createPlayButton();

        // Botón MENÚ (pequeño)
        this.createMenuButton();

        // Botón CONFIGURACIÓN (pequeño)
        this.createSettingsButton();

        // Créditos o versión
        this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.height - 20,
            'v1.0 | Military Combat System',
            {
                fontSize: '12px',
                fontFamily: 'Arial',
                fill: '#888888'
            }
        ).setOrigin(0.5, 0.5);
    }

    createPlayButton() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
        
        // Contenedor del botón
        const buttonContainer = this.add.container(centerX, centerY);

        // Fondo del botón (rectángulo con borde)
        const bgGraphics = this.make.graphics({ add: false });
        bgGraphics.fillStyle(0x00ff00, 0.1);
        bgGraphics.lineStyle(3, 0x00ff00, 1);
        bgGraphics.strokeRect(-150, -60, 300, 120);
        bgGraphics.fillRect(-150, -60, 300, 120);
        bgGraphics.generateTexture('play-btn-bg', 300, 120);
        bgGraphics.destroy();

        const background = this.add.image(0, 0, 'play-btn-bg');
        buttonContainer.add(background);

        // Texto del botón
        const buttonText = this.add.text(0, 0, 'JUGAR', {
            fontSize: '48px',
            fontFamily: 'Arial Black',
            fill: '#000000',
            stroke: '#00ff00',
            strokeThickness: 2
        }).setOrigin(0.5, 0.5);
        buttonContainer.add(buttonText);

        // Interactividad
        background.setInteractive();
        background.on('pointerover', () => {
            this.tweens.add({
                targets: buttonContainer,
                scaleX: 1.1,
                scaleY: 1.1,
                duration: 200
            });
            background.setAlpha(0.3);
            buttonText.setFill('#00ff00');
        });

        background.on('pointerout', () => {
            this.tweens.add({
                targets: buttonContainer,
                scaleX: 1,
                scaleY: 1,
                duration: 200
            });
            background.setAlpha(1);
            buttonText.setFill('#000000');
        });

        background.on('pointerdown', () => {
            this.scene.start('GameScene');
        });

        this.buttonPlay = buttonContainer;
    }

    createMenuButton() {
        const centerX = this.cameras.main.centerX;
        const bottomY = this.cameras.main.centerY + 150;
        
        // Botón izquierdo
        const buttonContainer = this.add.container(centerX - 200, bottomY);

        const bgGraphics = this.make.graphics({ add: false });
        bgGraphics.fillStyle(0x444466, 0.3);
        bgGraphics.lineStyle(2, 0x6688ff, 1);
        bgGraphics.strokeRect(-60, -30, 120, 60);
        bgGraphics.fillRect(-60, -30, 120, 60);
        bgGraphics.generateTexture('menu-btn-bg', 120, 60);
        bgGraphics.destroy();

        const background = this.add.image(0, 0, 'menu-btn-bg');
        buttonContainer.add(background);

        const buttonText = this.add.text(0, 0, 'MENÚ', {
            fontSize: '20px',
            fontFamily: 'Arial',
            fill: '#6688ff'
        }).setOrigin(0.5, 0.5);
        buttonContainer.add(buttonText);

        background.setInteractive();
        background.on('pointerover', () => {
            this.tweens.add({
                targets: buttonContainer,
                scaleX: 1.05,
                scaleY: 1.05,
                duration: 150
            });
            background.setAlpha(0.5);
        });

        background.on('pointerout', () => {
            this.tweens.add({
                targets: buttonContainer,
                scaleX: 1,
                scaleY: 1,
                duration: 150
            });
            background.setAlpha(1);
        });
    }

    createSettingsButton() {
        const centerX = this.cameras.main.centerX;
        const bottomY = this.cameras.main.centerY + 150;
        
        // Botón derecho
        const buttonContainer = this.add.container(centerX + 200, bottomY);

        const bgGraphics = this.make.graphics({ add: false });
        bgGraphics.fillStyle(0x664444, 0.3);
        bgGraphics.lineStyle(2, 0xff8866, 1);
        bgGraphics.strokeRect(-60, -30, 120, 60);
        bgGraphics.fillRect(-60, -30, 120, 60);
        bgGraphics.generateTexture('settings-btn-bg', 120, 60);
        bgGraphics.destroy();

        const background = this.add.image(0, 0, 'settings-btn-bg');
        buttonContainer.add(background);

        const buttonText = this.add.text(0, 0, 'CONFIG', {
            fontSize: '18px',
            fontFamily: 'Arial',
            fill: '#ff8866'
        }).setOrigin(0.5, 0.5);
        buttonContainer.add(buttonText);

        background.setInteractive();
        background.on('pointerover', () => {
            this.tweens.add({
                targets: buttonContainer,
                scaleX: 1.05,
                scaleY: 1.05,
                duration: 150
            });
            background.setAlpha(0.5);
        });

        background.on('pointerout', () => {
            this.tweens.add({
                targets: buttonContainer,
                scaleX: 1,
                scaleY: 1,
                duration: 150
            });
            background.setAlpha(1);
        });
    }

    createBackgroundParticles() {
        // Crear líneas animadas como efecto militar
        for (let i = 0; i < 5; i++) {
            const lineGraphics = this.make.graphics({ add: false });
            lineGraphics.lineStyle(1, 0x00ff00, 0.1);
            lineGraphics.lineBetween(0, 0, this.cameras.main.width, 0);
            lineGraphics.generateTexture(`line-${i}`, this.cameras.main.width, 2);
            lineGraphics.destroy();

            const line = this.add.image(0, i * 80 + 50, `line-${i}`).setOrigin(0, 0);
            
            this.tweens.add({
                targets: line,
                alpha: { from: 0.3, to: 0.05 },
                duration: 2000 + i * 200,
                repeat: -1,
                yoyo: true
            });
        }
    }

    update() {
        // Animación de pulsación del botón JUGAR
        if (this.buttonPlay) {
            this.buttonPlay.setScale(1 + Math.sin(this.time.now / 500) * 0.02);
        }
    }
}
