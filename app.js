window.addEventListener("load", function() {
    console.log("Hello World!");

    //Create a stage by getting a reference to the canvas
    stage = new createjs.Stage("demoCanvas");
    //Create a Shape DisplayObject.
    circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(0, 0, 40);
    //Set position of Shape instance.
    circle.x = circle.y = 50;
    target = {
        x: 50, y: 50
    }
    //Add Shape instance to stage display list.
    stage.addChild(circle);
    //Update stage will render next frame
    stage.update();

    stage.canvas.addEventListener("click", handleClick);
    console.log(stage.canvas);
    //circle.addEventListener("mousedown", handlePress);

    //Update stage will render next frame
    createjs.Ticker.addEventListener("tick", handleTick);
});


function getClickPosition(e) {
	var parentPosition = getPosition(e.currentTarget);
	var xPosition = e.clientX - parentPosition.x - (theThing.clientWidth / 2);
	var yPosition = e.clientY - parentPosition.y - (theThing.clientHeight / 2);
	
	theThing.style.left = xPosition + "px";
	theThing.style.top = yPosition + "px";
}

function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
      
    while (element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}



function handleClick(event){
    var parPos = getPosition(event.currentTarget)
    console.log("parPos.x = " + parPos.x + ".y = " + parPos.y);
    target.x = event.clientX - parPos.x;
    target.y = event.clientY - parPos.y;
}

function handlePress(event) {
    console.log("Press");
    // A mouse press happened.
    // Listen for mouse move while the mouse is down:
    event.addEventListener("mousemove", handleMove);
}
function handleMove(event) {
    console.log("move");
}


function handleTick() {
    //Circle will move to target
    distance = {
        x: target.x-circle.x,
        y: target.y-circle.y
    }
    circle.x += distance.x/2;
    circle.y += distance.y/2;
    
    /*if(target.x>circle.x) {
        circle.x += 1;
    } else if (target.x<circle.x) {
        circle.x -= 1;
    }
    if(target.y>circle.y) {
        circle.y += 1;
    } else if (target.y<circle.y) {
        circle.y -= 1;
    }*/

    //Will cause the circle to wrap back
    if (circle.x > stage.canvas.width) { circle.x = 0; }
    stage.update();
}
