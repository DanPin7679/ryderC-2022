function selectorCustom(firstLineText, players, value) {
    var selector = document.createElement("select");
    selector.className = "form-select form-select-lg mb-3";
    
    // var firstline = document.createElement("option");
    // firstline.textContent =  firstLineText;
    // firstline.selected = "true";    
    // selector.appendChild(firstline);
    
    for (var i = 0; i < players.length; i++) {
        var option = document.createElement("option");   
        option.value = value[i];
        option.textContent = players[i];
        selector.appendChild(option);
    }

    return selector
}

function selectorCustom2(firstLineText, players, value) {
    var selector = document.createElement("select");
    selector.className = "form-select form-select-lg mb-3";
    
    // var firstline = document.createElement("option");
    // firstline.textContent =  firstLineText;
    // firstline.selected = "true";    
    // selector.appendChild(firstline);
    
    for (var i = 0; i < players.length; i++) {
        var option = document.createElement("option");   
        option.value = players[i];
        option.textContent = players[i][0] + " " + players[i][1];
        selector.appendChild(option);
    }

    return selector
}

export { selectorCustom, selectorCustom2 }



