function gridCustom(grid_h, grid_w, columns_size, rows_size, gap, backColor) {

    var customGrid = document.createElement("div");
    customGrid.style.display = "grid";
    customGrid.style.gridTemplateColumns = columns_size;
    customGrid.style.gridTemplateRows = rows_size;

    customGrid.style.padding = "0px";
    customGrid.style.gap = gap;
    customGrid.style.height = grid_h;
    customGrid.style.width = grid_w;

    customGrid.style.justifyContent = "center";
    customGrid.style.alignItems = "center";
    customGrid.style.backgroundColor = backColor;

    // for (let k = 0; k < 100; k++) {
    //     var item = document.createElement("div");
    //     item.textContent = k;
    //     item.style.color = "white";
    //     item.style.backgroundColor = "lightblue"
    //     item.style.textAlign = "center";
    //     // item.style.padding = "20px";
    //     customGrid.appendChild(item);
    // }

    return customGrid
}

export { gridCustom }