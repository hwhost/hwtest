async function loadIntoTable(url, table){
    const tablehead = table.querySelector("thead");
    const tablebody = table.querySelector("tbody");
    const response = await fetch(url);
    const json = await response.json();
    const { headers, rows } = json;

    //Clear the Table
    tablehead.innerHTML = "<tr></tr>";
    tablebody.innerHTML = "";

    //Populate Headers
    for(const headerText of headers){
        const headerElement = document.createElement("th");
        headerElement.textContent = headerText;
        tablehead.querySelector("tr").appendChild(headerElement);
    }

    //Populate Rows
    for(const row of rows){
        const rowElement = document.createElement("tr");
        
        for(const cellText of row){
            
            const cellElement = await setElement(cellText);
            
            rowElement.appendChild(cellElement);
        }
        tablebody.appendChild(rowElement);
    }
}

async function setElement(cellText){
    if(cellText.includes("./")){
        const cellElement = new Image(300,300);
        cellElement.src = cellText;
        return cellElement;
    } else if(cellText.includes("://")){
        const cellElement = document.createElement("td");
        const link = document.createElement("a");
        const linkElement = cellElement.appendChild(link);
        linkElement.setAttribute("href", cellText);
        linkElement.setAttribute("class", "button");
        linkElement.textContent = "Link";
        
        return cellElement;
    }
    else{
        const cellElement = document.createElement("td");
        cellElement.textContent = cellText;
        return cellElement;
    }
    
}

loadIntoTable("./data.json", document.querySelector("table"));