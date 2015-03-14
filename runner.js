//set main namespace
goog.provide('runner');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.Label');
goog.require('lime.audio.Audio'); 
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.MoveBy');


// entrypoint
runner.start = function(){

	var director = new lime.Director(document.body,800,600),
	    scene = new lime.Scene(),

	    target = new lime.Layer().setPosition(500,500),
        circle = new lime.Sprite().setSize(50,50).setFill(255,150,0),
        lbl = new lime.Label().setSize(160,50).setFontSize(30).setText(':)'),

        opp = new lime.Layer().setPosition(200,200),
        oppcircle = new lime.Sprite().setSize(50,50).setFill(150,255,0),
        opplbl = new lime.Label().setSize(160,50).setFontSize(30).setText('):'),

        sound = new lime.audio.Audio('media/song.mp3');
        if (sound.isLoaded() && !sound.isPlaying()) {
            sound.play();
            alert('Turn up your volume!');
            sound.stop();
        } else {
            alert('Audio failed to load! :(');
        }


    //add circle and label to target object
    target.appendChild(circle);
    target.appendChild(lbl);

    //add circle and label to target object
    opp.appendChild(oppcircle);
    opp.appendChild(opplbl);

    //add target and title to the scene
    scene.appendChild(target);
    scene.appendChild(opp);

	director.makeMobileWebAppCapable();

    //add some interaction
    while (1) {
        goog.events.listen(goog.global, ['keydown'] ,function(e){

            var moveLeft = new lime.animation.MoveBy(-50,0);
            var moveRight = new lime.animation.MoveBy(+50,0);
            var moveUp = new lime.animation.MoveBy(0,-50);
            var moveDown = new lime.animation.MoveBy(0,+50);

            switch (e.keyCode) {
                case 37: //LEFT
                    target.runAction(moveLeft);
                    break;
                case 38: //UP
                    target.runAction(moveUp);
                    break;       
                case 39: //Right
                    target.runAction(moveRight);
                    break;
                case 40: //Down
                    target.runAction(moveDown);
                    break;

                case 65: //LEFT
                    opp.runAction(moveLeft);
                    break;
                case 87: //UP
                    opp.runAction(moveUp);
                    break;       
                case 68: //Right
                    opp.runAction(moveRight);
                    break;
                case 83: //Down
                    opp.runAction(moveDown);
                    break;
            }
        });

        break;
    }

    // set current scene active
    director.replaceScene(scene);

}

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('runner.start', runner.start);
