const MINX = 18;
const MAXX = 483;
const MINY = 19;
const MAXY = 466;
const GHOSTWIDTH = 20;
const GHOSTHEIGHT = 50;


function loc() {
    //console.log(event.offsetY);
}
//document.getElementByID("game").onclick = function(event);
document.addEventListener('click', function(event) {
    // Get the viewport coordinates of the click event
    var viewportX = event.clientX;
    var viewportY = event.clientY;
    
    // Get the element that was clicked
    var clickedElement = event.target;
    
    // Get the position of the element relative to the viewport
    var elementRect = clickedElement.getBoundingClientRect();
    var elementX = elementRect.left + window.scrollX;
    var elementY = elementRect.top + window.scrollY;
    
    // Calculate the relative position of the click event within the element
    var relativeX = viewportX - elementX;
    var relativeY = viewportY - elementY;
    
    /*console.log('Clicked element:', clickedElement);
    console.log('Viewport coordinates:', viewportX, viewportY);
    console.log('Element position:', elementX, elementY);
    console.log('Relative coordinates:', relativeX, relativeY);*/

    //teleport the ghost to the mouse
    if(clickedElement.id == "game" && relativeX < MAXX && relativeX > MINX && relativeY < MAXY && relativeY > MINY){
        let ghost = document.getElementById("ghost");
        let interval = setInterval(function() {
            ghost.style.top = relativeY - GHOSTHEIGHT + 'px';
            ghost.style.left = relativeX - GHOSTWIDTH + 'px';
            //console.log(relativeY - GHOSTHEIGHT);
            //console.log(ghost.style.left.slice(0,-2));
            //console.log(Math.abs(ghost.style.left.slice(0,-2) - (relativeX- GHOSTWIDTH)));
            //console.log(relativeX - GHOSTWIDTH);
        }, 10)
        if(closeEnough(ghost.style.left.slice(0,-2), relativeX - GHOSTWIDTH, ghost.style.top.slice(0,-2), relativeY - GHOSTHEIGHT)){
            console.log("here");
            clearInterval(interval);
        }
        
        
    }
    
  });

  function closeEnough(x1, x2, y1, y2) {
    console.log(Math.abs(x1 - x2));
    if(Math.abs(x1 - x2) < 10 && Math.abs(y1 - y2) < 10) {
        return true;
    }
    return false;
  }