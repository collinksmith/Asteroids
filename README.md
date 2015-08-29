# Asteroids

[Live](http://www.collinsmith.me/asteroids)

## How to Play

Rotate with a/d or left/right arrows.
Thrust with w or up arrow.
Shoot with spacebar.

You have 3 lives. If you hit an asteroid, you will lose a life and be respawned randomly (except not on top of an asteroid). You get 10 points added to your score for every asteroid you shoot.

## Technologies

The game is written in JavaScript. It also makes use of HTML5 Canvas and jQuery.

## Implementation Details

### Movement

If you simply listen to keydown events and call functions in response, you will get an event immediately upon pressing the key, then a delay of about a second, then a stream of new events. The result is an unevent response that is unsuitable for controlling movement.

To solve this problem, this game uses intervals to control thrust and rotation. It sets an interval on the first keydown event, and clears the interval on a keyup event. This results in smooth and intuitive movement controls.

