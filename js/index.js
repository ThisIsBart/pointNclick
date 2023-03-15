function loc() {
    console.log(event.offsetX);
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
    
    console.log('Clicked element:', clickedElement);
    console.log('Viewport coordinates:', viewportX, viewportY);
    console.log('Element position:', elementX, elementY);
    console.log('Relative coordinates:', relativeX, relativeY);

    //teleport the ghost to the mouse
    //if(event.){
        document.getElementById("ghost").style.top = relativeY + 'px';
        document.getElementById("ghost").style.left = relativeX + 'px';
    //}
    
  });