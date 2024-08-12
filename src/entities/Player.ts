export default class Player extends Phaser.Physics.Arcade.Sprite {
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
    private wasd?: { [key: string]: Phaser.Input.Keyboard.Key }
    private speed: number
    private currentDirection: string

    constructor(scene: Phaser.Scene) {
        super(scene, scene.scale.width / 2, scene.scale.height / 2, 'player')

        this.setScale(4) // the player sprite is too small by default
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.body?.setSize(16, 16)

        // set up the input from the arrow keys and the WASD keys
        this.cursors = scene.input.keyboard?.createCursorKeys()
        this.wasd = scene.input.keyboard?.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        }) as { [key: string]: Phaser.Input.Keyboard.Key }

        this.speed = 250
        this.setCollideWorldBounds(true)
        this.currentDirection = 'down'

        this.createAnimations()
    }

    update() {
        let direction = new Phaser.Math.Vector2(0, 0)
        if (this.cursors?.left.isDown || this.wasd?.left.isDown) {
            direction.x -= 1
            this.currentDirection = 'left'
        }
        if (this.cursors?.right.isDown || this.wasd?.right.isDown) {
            direction.x += 1
            this.currentDirection = 'right'
        }
        if (this.cursors?.up.isDown || this.wasd?.up.isDown) {
            direction.y -= 1
            this.currentDirection = 'up'
        }
        if (this.cursors?.down.isDown || this.wasd?.down.isDown) {
            direction.y += 1
            this.currentDirection = 'down'
        }

        direction.normalize().scale(this.speed)
        this.setVelocity(direction.x, direction.y)

        if (direction.length() > 0) {
            this.play(`walk-${this.currentDirection}`, true)
        } else {
            this.play(`idle-${this.currentDirection}`, true)
        }
    }

    private createAnimations() {
        this.anims.create({
            key: 'walk-down',
            frames: this.anims.generateFrameNumbers('player', {
                start: 2,
                end: 3,
            }),
            frameRate: 6,
            repeat: -1,
        })

        this.anims.create({
            key: 'walk-up',
            frames: this.anims.generateFrameNumbers('player', {
                start: 6,
                end: 7,
            }),
            frameRate: 6,
            repeat: -1,
        })

        this.anims.create({
            key: 'walk-left',
            frames: this.anims.generateFrameNumbers('player', {
                start: 10,
                end: 11,
            }),
            frameRate: 6,
            repeat: -1,
        })

        this.anims.create({
            key: 'walk-right',
            frames: this.anims.generateFrameNumbers('player', {
                start: 14,
                end: 15,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.anims.create({
            key: 'idle-down',
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 1,
            }),
            frameRate: 2,
            repeat: -1,
        })
        this.anims.create({
            key: 'idle-up',
            frames: this.anims.generateFrameNumbers('player', {
                start: 4,
                end: 5,
            }),
            frameRate: 2,
            repeat: -1,
        })
        this.anims.create({
            key: 'idle-left',
            frames: this.anims.generateFrameNumbers('player', {
                start: 8,
                end: 9,
            }),
            frameRate: 2,
            repeat: -1,
        })
        this.anims.create({
            key: 'idle-right',
            frames: this.anims.generateFrameNumbers('player', {
                start: 12,
                end: 13,
            }),
            frameRate: 2,
            repeat: -1,
        })
    }
}
