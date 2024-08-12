import { Game as MainGame } from './scenes/Game'
import { AUTO, Game, Scale, Types } from 'phaser'

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#C0D470',
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: true, // shows the collision shape and velocity
        },
    },
    antialias: false, // make our pixel art less blurry
    scene: [MainGame],
}

export default new Game(config)
