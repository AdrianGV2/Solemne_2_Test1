# 🎮 SHOTTER 1v1 - Military Edition

## 📋 Descripción
Juego de acción estilo **Duck Game** en 2D (top-down) para dos jugadores. Tema militar, pixelart, con mechánicas de salto, agacharse, armas aleatorias y sistema de vidas.

---

## 📁 Estructura del Proyecto

```
shotter1v1/
├── index.html                    # Archivo principal - abrir en navegador
├── css/
│   └── style.css                 # Estilos del juego
├── js/
│   ├── main.js                   # Configuración de Phaser
│   ├── constants.js              # Constantes y configuraciones globales
│   ├── scenes/
│   │   └── GameScene.js          # Escena principal del juego
│   └── objects/
│       ├── Player.js             # Clase del jugador
│       ├── Weapon.js             # Clase de armas
│       └── Map.js                # Clase del mapa
└── assets/
    ├── images/
    │   ├── sprites/              # Sprites de personajes (futuro)
    │   └── maps/                 # Texturas del mapa (futuro)
    └── audio/                    # Efectos de sonido (futuro)
```

---

## 🚀 Cómo Ejecutar el Juego

### Opción 1: Servidor Local (Recomendado)
```bash
# Con Python 3
python -m http.server 8000

# Con Python 2
python -m SimpleHTTPServer 8000

# Con Node.js (instalar primero: npm install -g http-server)
http-server
```
Luego abre `http://localhost:8000` en tu navegador.

### Opción 2: Abrir directamente (NO recomendado, puede tener problemas)
Doble-click en `index.html`

---

## 🎮 Controles

### Player 1 (Rojo - Izquierda)
| Acción | Tecla |
|--------|-------|
| Mover Izquierda | `A` |
| Mover Derecha | `D` |
| Saltar | `W` |
| Agacharse | `S` |
| Recoger Arma | `E` |
| Disparar | `ESPACIO` |
| Soltar Arma | `Q` |

### Player 2 (Azul - Derecha)
| Acción | Tecla |
|--------|-------|
| Mover Izquierda | `FLECHA ←` |
| Mover Derecha | `FLECHA →` |
| Saltar | `FLECHA ↑` |
| Agacharse | `FLECHA ↓` |
| Recoger Arma | `I` |
| Disparar | `ENTER` |
| Soltar Arma | `BACKSPACE` |

---

## 🎯 Mecánicas del Juego

### 🏃 Movimiento
- Movimiento horizontal fluido con aceleración
- Sistema de salto realista con gravedad
- Posibilidad de agacharse para esquivar proyectiles

### ⚔️ Armas
- **4 Armas diferentes** distribuidas en el mapa:
  - 🔫 **Pistol**: Daño bajo, fuego rápido
  - 🎯 **Rifle**: Daño medio, fuego moderado
  - 💣 **Shotgun**: Daño alto, fuego lento
  - 🔌 **SMG**: Daño bajo, fuego muy rápido
- Recoger con `W` o `↑` cerca del arma
- Solo se puede llevar 1 arma a la vez
- Soltar con `Q` o `BACKSPACE`

### ❤️ Sistema de Vidas
- Cada jugador comienza con **3 vidas**
- Pierden una vida al ser golpeados por un proyectil
- Pierden una vida al caerse del mapa
- Al perder todas las vidas: **GAME OVER**
- El primer jugador en eliminar al contrincante **GANA**

### 🗺️ Mapa
- Tamaño: **1200x700 píxeles**
- Plataformas para saltar y ocultarse
- Obstáculos que bloquean línea directa de fuego
- Zonas de respawn para cada jugador
- Trampas (vacíos) que causan caída

---

## 🔧 Configuración Ajustable

Todos los valores del juego están en `js/constants.js`:

```javascript
GAME_CONFIG = {
    WIDTH: 1200,              // Ancho del mapa
    HEIGHT: 700,              // Alto del mapa
    PIXEL_SIZE: 16,           // Tamaño de píxeles
    GRAVITY: 700,             // Gravedad
    PLAYER: {
        SPEED: 150,           // Velocidad horizontal
        JUMP_POWER: 350,      // Potencia del salto
        MAX_LIVES: 3,         // Vidas iniciales
    },
    WEAPONS: {
        COUNT: 4,             // Cantidad de armas
        // ... tipos de armas
    },
    // ... más configuración
}
```

---

## 📝 Notas de Desarrollo

### ✅ Implementado
- Sistema de dos jugadores
- Movimiento y salto con física realista
- Mecánica de agacharse
- 4 tipos de armas
- Sistema de vidas y respawn
- Mapa con obstáculos y plataformas
- UI mostrando vidas y armas equipadas
- Detección de colisiones
- Sistema de fin de juego

### 🔄 Próximas Mejoras (Opcional)
- [ ] Sprites animados en lugar de rectángulos
- [ ] Más mapas (selector de mapas)
- [ ] Efectos de sonido
- [ ] Animaciones de muerte/respawn
- [ ] Partículas en disparos
- [ ] Sistema de puntuación
- [ ] Modo multironda
- [ ] Diferentes skins de personajes

### 📦 Dependencias
- **Phaser 3.55.2** (CDN incluído en index.html)
- Navegador web moderno (Chrome, Firefox, Edge, Safari)

---

## 🐛 Troubleshooting

### El juego no carga
- Verifica que estés usando un servidor local (no `file://`)
- Revisa la consola del navegador (F12) para errores

### Los controles no funcionan
- Asegúrate de clickear en el canvas del juego primero
- Revisa que las teclas no estén mapeadas en otra aplicación

### El juego va lento
- Cambiar `debug: true` a `debug: false` en `js/main.js`
- Cierra otras pestañas/aplicaciones

---

## 📞 Soporte
Para reportar bugs o sugerencias, revisa el código en `js/` y comenta tus cambios.

---

**¡A jugar! 🎮**
