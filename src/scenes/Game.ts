import { Scene } from 'phaser'
import Player from '../entities/Player'

export class Game extends Scene {
    private player: Player

    constructor() {
        super('Game')
    }

    preload() {
        this.load.setPath('/assets')
        this.load.spritesheet('player', 'Basic Charakter Spritesheet.png', {
            frameWidth: 48,
            frameHeight: 48,
        })
    }

    create() {
        this.player = new Player(this)
    }

    update(_time: number, _delta: number): void {
        this.player.update()
    }
}
