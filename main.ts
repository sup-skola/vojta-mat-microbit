let jablkoy = 0
let jablkox = 0
let hardcore = false
let jablko = game.createSprite(0, 0)
let hadica = game.createSprite(2, 2)
let orientace = 2
//  1 = up
//  2 = down
//  3 = left
//  4 = right
basic.forever(function on_forever() {
    let orientace2: number;
    //  movement
    if (pins.analogReadPin(AnalogPin.P0) < 10) {
        //  up
        basic.pause(pins.analogReadPin(AnalogPin.P2))
        hadica.change(LedSpriteProperty.Y, -1)
        orientace2 = 1
    } else if (pins.analogReadPin(AnalogPin.P0) < 80) {
        //  down
        basic.pause(pins.analogReadPin(AnalogPin.P2))
        hadica.change(LedSpriteProperty.Y, 1)
        orientace2 = 2
    } else if (pins.analogReadPin(AnalogPin.P0) < 130) {
        //  left
        basic.pause(pins.analogReadPin(AnalogPin.P2))
        hadica.change(LedSpriteProperty.X, -1)
        orientace2 = 3
    } else if (pins.analogReadPin(AnalogPin.P0) < 160) {
        jablko.setX(0)
        jablko.setY(0)
        hadica.setX(2)
        hadica.setY(2)
    } else if (pins.analogReadPin(AnalogPin.P0) < 600) {
        //  right
        basic.pause(pins.analogReadPin(AnalogPin.P2))
        hadica.change(LedSpriteProperty.X, 1)
        orientace2 = 4
    }
    
})
//  Wall collision detection
basic.forever(function on_forever2() {
    let hardcore2: boolean;
    if (input.buttonIsPressed(Button.AB) && !hardcore2) {
        hardcore2 = true
        basic.forever(function wall_collision() {
            //  i'm sure this doesn't work properly
            //  ULTRA HARD MODE
            if (hadica.y() == 4 || hadica.y() == 0) {
                hadica.setY(1)
            }
            
            if (hadica.x() == 4 || hadica.x() == 0) {
                hadica.setX(1)
            }
            
        })
    } else if (input.buttonIsPressed(Button.AB) && hardcore2) {
        hardcore2 = false
    }
    
})
basic.forever(function on_forever3() {
    
    if (hadica.isTouching(jablko)) {
        //  Set random posioin of the apple wen the snake is
        //  colliding with the apple
        jablkox = randint(0, 4)
        jablkoy = randint(0, 4)
        jablko.setY(jablkoy)
        jablko.setX(jablkox)
        //  Turn on led when snake is touching the apple
        pins.digitalWritePin(DigitalPin.P1, 1)
        basic.pause(200)
        pins.digitalWritePin(DigitalPin.P1, 0)
        game.addScore(1)
        if (game.score() == 10) {
            music.playMelody("C5 B A G F E D C ", 120)
            game.setScore(0)
        }
        
    }
    
})
