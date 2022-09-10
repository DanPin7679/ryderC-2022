function tableCustom(col_names, content, table_width) {
    
    console.log(content)
    var col = [];
    for (var i = 0; i < content.length; i++) {
        for (var key in content[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    var table = document.createElement("table");
    table.className="container";
    
    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col_names.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col_names[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < content.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = content[i][col[j]];
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    // var divContainer = document.getElementById("showData");
    // divContainer.innerHTML = "";
    // divContainer.appendChild(table);
    return table
}

export { tableCustom }