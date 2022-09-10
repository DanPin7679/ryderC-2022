

function buttonCustom(id, text, color, backColor) {

    var addGameBtn = document.createElement("btn");
    addGameBtn.id = id;        
    addGameBtn.className = "btn btn-outline"
    addGameBtn.textContent = text;
    addGameBtn.style.color = color;
    addGameBtn.style.border = backColor;
    
}

function submitCancelCustom(id, text, color, backColor) {

    var addGameBtn = document.createElement("btn");
    addGameBtn.id = id;        
    addGameBtn.className = "btn btn-outline"
    addGameBtn.textContent = text;
    addGameBtn.style.color = color;
    addGameBtn.style.border = backColor;
    
    var cancelGameBtn = document.createElement("btn");
    addGameBtn.id = "cancel" + id;        
    addGameBtn.className = "btn btn-outline"
    addGameBtn.textContent = text;
    addGameBtn.style.color = color;
    addGameBtn.style.border = "solid" + backColor;
    
}

export { buttonCustom }