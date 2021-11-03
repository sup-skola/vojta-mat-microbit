jablkoy = 0
jablkox = 0
hardcore = False
jablko = game.create_sprite(0, 0)
hadica = game.create_sprite(2, 2)
orientace = 2
# 1 = up
# 2 = down
# 3 = left
# 4 = right

def on_forever():
    # movement
    if pins.analog_read_pin(AnalogPin.P0) < 10:
        # up
        basic.pause(pins.analog_read_pin(AnalogPin.P2))
        hadica.change(LedSpriteProperty.Y, -1)
        orientace2 = 1
    elif pins.analog_read_pin(AnalogPin.P0) < 80:
        # down
        basic.pause(pins.analog_read_pin(AnalogPin.P2))
        hadica.change(LedSpriteProperty.Y, 1)
        orientace2 = 2
    elif pins.analog_read_pin(AnalogPin.P0) < 130:
        # left
        basic.pause(pins.analog_read_pin(AnalogPin.P2))
        hadica.change(LedSpriteProperty.X, -1)
        orientace2 = 3
    elif pins.analog_read_pin(AnalogPin.P0) < 160:
        jablko.set_x(0)
        jablko.set_y(0)
        hadica.set_x(2)
        hadica.set_y(2)
    elif pins.analog_read_pin(AnalogPin.P0) < 600:
        # right
        basic.pause(pins.analog_read_pin(AnalogPin.P2))
        hadica.change(LedSpriteProperty.X, 1)
        orientace2 = 4
basic.forever(on_forever)

# Wall collision detection

def on_forever2():
    if input.button_is_pressed(Button.AB) and not (hardcore2):
        hardcore2 = True
        
        def wall_collision():
            # i'm sure this doesn't work properly
            # ULTRA HARD MODE
            if hadica.y() == 4 or hadica.y() == 0:
                hadica.set_y(1)
            if hadica.x() == 4 or hadica.x() == 0:
                hadica.set_x(1)
        basic.forever(wall_collision)
        
    elif input.button_is_pressed(Button.AB) and hardcore2:
        hardcore2 = False
basic.forever(on_forever2)

def on_forever3():
    global jablkox, jablkoy
    if hadica.is_touching(jablko):
        # Set random posioin of the apple wen the snake is
        # colliding with the apple
        jablkox = randint(0, 4)
        jablkoy = randint(0, 4)
        jablko.set_y(jablkoy)
        jablko.set_x(jablkox)
        # Turn on led when snake is touching the apple
        pins.digital_write_pin(DigitalPin.P1, 1)
        basic.pause(200)
        pins.digital_write_pin(DigitalPin.P1, 0)
        game.add_score(1)
        if game.score() == 10:
            music.play_melody("C5 B A G F E D C ", 120)
            game.set_score(0)
basic.forever(on_forever3)
