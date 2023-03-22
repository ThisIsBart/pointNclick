// Used to centre the ghost
const GHOSTWIDTH = 20;
const GHOSTHEIGHT = 20;
 
// The goal of the ghost
let relativeX;
let relativeY;

// The ghost when the mouse was clicked
let ghostCurrentX;
let ghostCurrentY;

// The interval that moves the ghost, the walking speed and the number of frames passed since starting the walk
let ghostwalk;
let speed = 5;
let count = 0;

document.addEventListener('click', function(event) {
    // Get the viewport coordinates of the click event
    let viewportX = event.clientX;
    let viewportY = event.clientY;
    
    // Get the element that was clicked
    let clickedElement = event.target;
    
    // Get the position of the element relative to the viewport
    let elementRect = document.getElementById("game").getBoundingClientRect();
    let elementX = elementRect.left + window.scrollX;
    let elementY = elementRect.top + window.scrollY;
    
    // Calculate the relative position of the click event within the element
    relativeX = viewportX - elementX;
    relativeY = viewportY - elementY;

    //set the current position of the ghost
    ghostCurrentX = elementRect.left + window.scrollX;
    ghostCurrentY = elementRect.top + window.scrollY;

    // Teleport the ghost to the mouse
    if(document.getElementById("game").contains(clickedElement)){
        let ghost = document.getElementById("ghost");
        ghostWalk = setInterval(ghostMove(viewportX, viewportY), 10);
        //ghost.style.top = relativeY - GHOSTHEIGHT + 'px';
        //ghost.style.left = relativeX - GHOSTWIDTH + 'px';
    }
    
  });

  function ghostMove(viewportX, viewportY) {
    //calculate the difference between where the ghost is and where it should go
    let diffy = (parseInt(document.getElementById("ghost").style.top) - viewportY) - relativeY;
    let diffx = (parseInt(document.getElementById("ghost").style.left) - viewportX) -  relativeX;

    console.log(diffy + " + " + diffx)
    //If you're there, stop walking
    //console.log(Math.abs(parseInt(document.getElementById("ghost").offsetTop)-viewportY, relativeY) < 100 && Math.abs(parseInt(document.getElementById("ghost").offsetLeft) - viewportX, relativeX) < 100);
    if(diffy < 2 && diffx < 2) {
        console.log("here");
        clearInterval(ghostWalk);

        return;
    }

    
    if(parseInt(document.getElementById("ghost").offsetTop) < relativeY) {
        document.getElementById("ghost").style.top = parseInt(parseInt(document.getElementById("ghost").offsetTop)) + 1 + 'px';
    }
    else if(parseInt(document.getElementById("ghost").offsetTop) > relativeY) {
        document.getElementById("ghost").style.top = parseInt(parseInt(document.getElementById("ghost").offsetTop)) - 1 + 'px';
    }
    if(parseInt(document.getElementById("ghost").offsetLeft) < relativeX) {
        document.getElementById("ghost").style.left = parseInt(parseInt(document.getElementById("ghost").offsetLeft)) + 1 + 'px';
    }
    else if(parseInt(document.getElementById("ghost").offsetLeft) > relativeX) {
        document.getElementById("ghost").style.left = parseInt(parseInt(document.getElementById("ghost").offsetLeft)) - 1 + 'px';
    }
  }

  function closeEnough(x1, x2, y1, y2) {
    console.log(Math.abs(x1 - x2));
    if(Math.abs(x1 - x2) < 10 && Math.abs(y1 - y2) < 10) {
        return true;
    }
    return false;
  }