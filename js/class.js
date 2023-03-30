document.getElementById("mainTitle").innerText = "ghost game";
// Offset to center hero
const offsetCharacterX = 10;
const offsetCharacterY = 16;
// Global things
const gameWindow = document.getElementById("gameWindow");
const inventory = document.getElementById("inventory");
// Elements belonging to the hero
const message = document.getElementById("itemPickUp");
const mainCharacter = document.getElementById("mainCharacter");
const heroSounds = document.getElementById("heroSounds");
const heroPortrait = document.getElementById("mainCharacterPortrait");
const mainCharacterSpeech = document.getElementById("mainCharacterSpeech");
// NPCs
const otherSpeech = document.getElementById("otherSpeech");
const brainGuyPortrait = document.getElementById("brainGuyPortrait");
const brainGuySpeech = document.getElementById("brainGuySounds");
const cellarPortrait = document.getElementById("cellarPortrait");
const cellarSpeech = document.getElementById("cellarSounds");
// Event flags
let spokenToBrainGuy = false;
let keyPickedUp = false;
let door = false;
//Ricardo's array-based inventory
let inventoryR = [];
const inventoryList = document.getElementById("inventoryList");

gameWindow.onclick = function(event){
    if(document.getElementById("guy") != null) {
        document.getElementById("guy").remove();
    }
    if(mainCharacterSpeech.style.opacity == 0 && otherSpeech.style.opacity == 0){
        // Have the hero go where the mouse was clicked
        var rect = gameWindow.getBoundingClientRect();
        let currX = mainCharacter.getBoundingClientRect().left;
        let currY = mainCharacter.getBoundingClientRect().top;
        var x = event.clientX - rect.left; // event's x position
        var y = event.clientY - rect.top; // event's y position
        mainCharacter.style.left = x - offsetCharacterX + 'px';
        mainCharacter.style.top = y - offsetCharacterY - message.offsetHeight+ 'px';
        console.log(currY);
        //let endX = 
        checkDeath(currX, currY, x - offsetCharacterX, y - offsetCharacterY - message.offsetHeight); 
        //make platform opaque
        document.getElementById("platformPic").style.opacity = 1;
        switch(event.target.id) {
            case "door1":
                // Before the key is picked up
                if(!keyPickedUp){
                    showSpeechBubble("Top 'o the mornin'!", mainCharacterSpeech, heroPortrait, heroSounds);
                    setTimeout(function(){showSpeechBubble("No reply.<br>I'll teach 'em to waste me time.", mainCharacterSpeech, heroPortrait, heroSounds)}, 5000);
                }
                // The first time you get here with the key
                else if(!door) {
                    showSpeechBubble("Key fits. Let's get to lootin'.", mainCharacterSpeech, heroPortrait, heroSounds);
                    document.getElementById("rustyKey").remove();
                    setTimeout(function(){drop("Rusty Key");
                        document.getElementById("doorPic").style.opacity = 1;}, 500);
                    setTimeout(function(){
                        let rustyKey = document.createElement("li");
                        rustyKey.id = "money";
                        rustyKey.innerText = "$500,-";
                        inventory.append(rustyKey);
                        pickup("$500,-");
                        showSpeechBubble("Score! This should buy me some Nando's an' then some.", mainCharacterSpeech, heroPortrait, heroSounds)},5000);
                    door = true;
                }
                // Subsequent times after you get the key
                else{
                    showSpeechBubble("I should bolt 'fore the owner get's back.", mainCharacterSpeech, heroPortrait, heroSounds);
                }
                break;
            case "platform":
                // Make platform transparent
                document.getElementById("platformPic").style.opacity = 0.5;
                // Before you've spoken to brain guy
                if(!spokenToBrainGuy) {
                    showSpeechBubble("What's all this, then? <br> Some type o' platform?", mainCharacterSpeech, heroPortrait, heroSounds);
                    setTimeout(function(){showSpeechBubble("Useless to me, innit?", mainCharacterSpeech, heroPortrait, heroSounds)}, 5000);
                }
                // After you've spoken to brain guy but before you picked up the key
                else if(!keyPickedUp) {
                    showSpeechBubble("'ccording to the gent there should be something hidden near 'ere", mainCharacterSpeech, heroPortrait, heroSounds);
                    setTimeout(function(){showSpeechBubble("Looks like 'e wasnae full o' it. There's a key!<br> Well 's mine now.", mainCharacterSpeech, heroPortrait, heroSounds)}, 5000);
                    keyPickedUp = true;
                    setTimeout(function(){
                        let rustyKey = document.createElement("li");
                        rustyKey.id = "rustyKey";
                        rustyKey.innerText = "Rusty Key";
                        inventory.append(rustyKey);
                        pickup("Rusty Key");}, 5000);
                }
                // After you've picked up the key
                else{
                    showSpeechBubble("Picked right clean, innit?", mainCharacterSpeech, heroPortrait, heroSounds);
                }
                break;
            case "ghostpic":
                // If you haven't picked up the key yet
                if(!keyPickedUp) {
                    showSpeechBubble("Lovely day for it!<br>What's the talk about town?", mainCharacterSpeech, heroPortrait, heroSounds);
                    setTimeout(function(){showSpeechBubble("Ya should totes check out that wooden platform.<br>I'm, like, pretty sure I saw something shiny.", otherSpeech, brainGuyPortrait, brainGuySpeech)}, 5000);
                    setTimeout(function(){showSpeechBubble("I'll go an' 'ave me a gander then.<br>Cheers!", mainCharacterSpeech, heroPortrait, heroSounds)}, 10000);
                    spokenToBrainGuy = true;
                }
                // After you picked up the key
                else {
                    showSpeechBubble("Well? What's the scoop?<br>find anything good?", otherSpeech, brainGuyPortrait, brainGuySpeech);
                    setTimeout(function(){showSpeechBubble("Whot's it to ya? Ya yank!<br> I ain't tellin'ya nothin'", mainCharacterSpeech, heroPortrait, heroSounds)}, 5000);
                    setTimeout(function(){showSpeechBubble("Like, chill, nerd!<br>I was, like, just being polite, you freak.", otherSpeech, brainGuyPortrait, brainGuySpeech)}, 10000);
                }
                break;
            // Initiate the conversation tree
            case "cellar":
                showSpeechBubble("Knock, knock.", mainCharacterSpeech, heroPortrait, heroSounds);
                setTimeout(function(){showSpeechBubble("Who's there?", otherSpeech, cellarPortrait, cellarSpeech)}, 5000);
                setTimeout(cellarTree, 10000);
                break;
            case "inventorySquare":
                setTimeout(function(){
                    let guy = document.createElement("li");
                        guy.id = "guy";
                        guy.innerText = "Main Character";
                        inventory.append(guy);}, 500);
                break;
            }
            
        }
        // This is a separate switch because you need to be able to make a choice even if the conversation is happening
        switch(event.target.id) {
            // Conversation tree option 1
            case "option1":
                //mainCharacter.style.left = "289px";
                //mainCharacter.style.top = "465px";
                hideSpeechBubble(mainCharacterSpeech, heroPortrait);
                showSpeechBubble("I wasn't expecting you!", otherSpeech, cellarPortrait, cellarSpeech);
                setTimeout(function(){showSpeechBubble("No-one expects the Spanish Inquisition", mainCharacterSpeech, heroPortrait, heroSounds)}, 5000);
                break;
            // Conversation tree option 2
            case "option2":
                //mainCharacter.style.left = "289px";
                //mainCharacter.style.top = "465px";
                hideSpeechBubble(mainCharacterSpeech, heroPortrait);
                showSpeechBubble("Alex who?", otherSpeech, cellarPortrait, cellarSpeech);
                setTimeout(function(){showSpeechBubble("Alex plain after you open the door.", mainCharacterSpeech, heroPortrait, heroSounds)}, 5000);
                break;
            // Conversation tree option 3
            case "option3":
                //mainCharacter.style.left = "289px";
                //mainCharacter.style.top = "465px";
                hideSpeechBubble(mainCharacterSpeech, heroPortrait);
                showSpeechBubble("Maybe a tenner'll refresh your memory.", otherSpeech, cellarPortrait, cellarSpeech);
                let tenner = document.createElement("li");
                tenner.id = "tenner";
                tenner.innerText = "$10,-";
                inventory.append(tenner);
                pickup("$10,-");
                setTimeout(function(){showSpeechBubble("I'm the main character. Who want's to know?", mainCharacterSpeech, heroPortrait, heroSounds)}, 5000);
                setTimeout(function(){showSpeechBubble("My memory's a bit lacking as of late.", otherSpeech, cellarPortrait, cellarSpeech)}, 10000);
                setTimeout(function(){showSpeechBubble("How's this for a refresher?", mainCharacterSpeech, heroPortrait, heroSounds); document.getElementById("tenner").remove(); drop("$10,-");}, 15000);
                setTimeout(function(){showSpeechBubble("I'm the cellar used to test the conversation tree", otherSpeech, cellarPortrait, cellarSpeech)}, 20000);
            default:
                //hideSpeechBubble(mainCharacterSpeech, heroPortrait);
                break;
        }
}
//displays the matching speech bubble and calls the hide function after 5s
function showSpeechBubble(dialogue, bubble, portrait, sound) {
    bubble.innerHTML = dialogue;
    sound.play();
    bubble.style.opacity = 1;
    portrait.style.opacity = 1;
    setTimeout(function(){hideSpeechBubble(bubble, portrait)}, 5000);
}
//hides the matching speech bubble
function hideSpeechBubble(bubble, portrait) {
    portrait.style.opacity = 0;
    bubble.style.opacity = 0;
    bubble.innerHTML = " ... ";
    //sound.pause();
}
// Conversation tree when talking to the cellar
function cellarTree() {
    // Turn the speech balloon into a list
    mainCharacterSpeech.innerHTML = "<ul></ul>";
    // Create the options as list items
    let option1 = document.createElement("li");
    let option2 = document.createElement("li");
    let option3 = document.createElement("li");
    // Give them ids
    option1.id = "option1";
    option2.id = "option2";
    option3.id = "option3";
    // Fill the options with text
    option1.innerText = "The Spanish inquisition";
    option2.innerText = "Alex";
    option3.innerText = "I don't know. Maybe you could refresh my memory.";
    // Append them to the speech bubble
    mainCharacterSpeech.append(option1);
    mainCharacterSpeech.append(option2);
    mainCharacterSpeech.append(option3);
    mainCharacterSpeech.style.opacity = 1;
    heroPortrait.style.opacity = 1;
}

function pickup(item) {
    message.style.opacity = 1;
    message.style.color = "#11cc11";
    message.innerText = "+" + item;
    setTimeout(function(){message.style.opacity = 0;}, 1000);
}

function drop(item) {
    message.style.opacity = 1;
    message.style.color = "#ff1111";
    message.innerText = "-" + item;
    setTimeout(function(){message.style.opacity = 0;}, 1000);
}

//Ricardo's array-based inventory
function getItem(itemName, itemID) {
    if(!checkItem(itemName)) {
        inventoryR.push(itemName);
        showItem(itemName, itemID);
    }
}

function checkItem(item) {
    return inventoryR.includes(item);
}

function showItem(itemName, itemID) {
    let listItem = document.createElement("li");
    listItem.id = itemID;
    listItem.appendChild(document.createTextNode(itemName));
    inventoryList.appendChild(listItem);
}

function removeItem(itemName, itemID) {
    inventoryR = inventoryR.filter(function (newInventory) {
        return newInventory !== itemName;
    })
    document.getElementById(itemID).remove();
}

//attempt at Floris' forbidden area
function checkDeath(startX, startY, endX, endY) {
    
    let forbidden = document.getElementById("platform");
    let xDiff = Math.abs(startX - endX);
    let yDiff = Math.abs(startY - endY);
    let checks = 11;
    console.log(document.getElementById("platform").getBoundingClientRect().left + " " + document.getElementById("platform").getBoundingClientRect().top)
    for(let i = 1; i < checks; i++) {
        let xCurrent = startX + (i * (xDiff / checks));
        let yCurrent = startY + (i * (yDiff / checks));
        
        console.log(startX + " -> " + xCurrent + " & " + startY + " -> " + yCurrent);
        if(forbidden.style.left < xCurrent && forbidden.style.left + forbidden.style.width > xCurrent && 
            forbidden.style.top < yCurrent && forbidden.style.top + forbidden.style.height > yCurrent) {
            console.log("death");
        }
    }
}
getItem("bread", "bread");
getItem("cold milk","milk");
getItem("bread", "bread");
removeItem("cold milk","milk");
console.log(inventoryR)