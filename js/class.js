document.getElementById("mainTitle").innerText = "ghost game";

const offsetCharacterX = 10;
const offsetCharacterY = 16;

const mainCharacter = document.getElementById("mainCharacter");
const gameWindow = document.getElementById("gameWindow");
const heroSounds = document.getElementById("heroSounds");
const mainCharacterSpeech = document.getElementById("mainCharacterSpeech");
const otherSpeech = document.getElementById("otherSpeech");
const inventory = document.getElementById("inventory");
let spokenToBrainGuy = false;
let keyPickedUp = false;
let door = false;

gameWindow.onclick = function(event){
    
    var rect = gameWindow.getBoundingClientRect();
    var x = event.clientX - rect.left; // event's x position
    var y = event.clientY - rect.top; // event's y position
    mainCharacter.style.left = x - offsetCharacterX + 'px';
    mainCharacter.style.top = y - offsetCharacterY + 'px';
    //make platform opaque
    document.getElementById("platformPic").style.opacity = 1;
    switch(event.target.id) {
        case "door1":
            heroSounds.play();
            //do something
            if(!keyPickedUp){
                showSpeechBubble("Top 'o the mornin'!", mainCharacterSpeech);
                setTimeout(function(){showSpeechBubble("No reply.<br>I'll teach 'em to waste me time.", mainCharacterSpeech)}, 5000);
            }
            else if(!door) {
                showSpeechBubble("Key fits. Let's get to lootin'.", mainCharacterSpeech);
                document.getElementById("rustyKey").remove();
                setTimeout(function(){
                    let rustyKey = document.createElement("li");
                    rustyKey.id = "money";
                    rustyKey.innerText = "$500,-";
                    inventory.append(rustyKey);
                    showSpeechBubble("Score! This should buy me some Nando's an' then some.", mainCharacterSpeech)},5000);
            }
            
            break;
        case "platform":
            //make platform transparent
            document.getElementById("platformPic").style.opacity = 0.5;
            if(!spokenToBrainGuy) {
                showSpeechBubble("What's all this, then? <br> Some type o' platform?", mainCharacterSpeech);
                setTimeout(function(){showSpeechBubble("Useless to me, innit?", mainCharacterSpeech)}, 5000);

            }
            if(spokenToBrainGuy) {
                showSpeechBubble("'ccording to the gent there should be something hidden near 'ere", mainCharacterSpeech);
                setTimeout(function(){showSpeechBubble("Looks like 'e wasnae full o' it. There's a key!<br> Well 's mine now.", mainCharacterSpeech)}, 5000);
                keyPickedUp = true;
                setTimeout(function(){
                    let rustyKey = document.createElement("li");
                    rustyKey.id = "rustyKey";
                    rustyKey.innerText = "Rusty Key";
                    inventory.append(rustyKey);}, 5000);
            }
            
            break;
        case "ghostpic":
            showSpeechBubble("Lovely day for it!<br>What's the talk about town?", mainCharacterSpeech);
            setTimeout(function(){showSpeechBubble("Ya'll should totally check out that there wooden platform.<br>I'm, like, pretty sure it hides a secret.", otherSpeech)}, 5000);
            setTimeout(function(){showSpeechBubble("I'll go an' 'ave me a gander then.<br>Cheers!", mainCharacterSpeech)}, 10000);
            spokenToBrainGuy = true;
            break;
        default:
            hideSpeechBubble(mainCharacterSpeech);
            break;
    }
}

function showSpeechBubble(dialogue, bubble) {
    bubble.innerHTML = dialogue;
    bubble.style.opacity = 1;
    setTimeout(function(){hideSpeechBubble(bubble)}, 5000);
}
function hideSpeechBubble(bubble) {
    bubble.style.opacity = 0;
    bubble.innerHTML = " ... ";
}