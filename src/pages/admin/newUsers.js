function completeTable(){
    console.log("lala");

    let users = [
        //recup vrais users 
        {name: "Banana", mac:"UI:76:KL:90:K0:7Y"},
        {name: "Orange", mac:"UI:76:KL:90:K0:7Y"}
    ]

    users.forEach(function({name, mac}){
        console.log(name)
        const row = document.createElement("tr");
        
        const nameUserRow = document.createElement("td");
        const macUserRow = document.createElement("td");
        const acceptUserRow = document.createElement("td");
        const declineUserRow = document.createElement("td");
        
        nameUserRow.appendChild(document.createTextNode(name));
        macUserRow.appendChild(document.createTextNode(mac));

        const btnAccept = document.createElement("input");
        btnAccept.type = "button"
        btnAccept.classList.add("accept");
        btnAccept.onclick = acceptUser;

        const btnDecline= document.createElement("input");
        btnDecline.type = "button"
        btnDecline.classList.add("decline");
        btnDecline.onclick = declineUser;

        acceptUserRow.appendChild(btnAccept);
        declineUserRow.appendChild(btnDecline);

        row.appendChild(nameUserRow);
        row.appendChild(macUserRow);
        row.appendChild(acceptUserRow);
        row.appendChild(declineUserRow);

        document.querySelector("#tableUsers tbody").appendChild(row);
    })
}

function acceptUser(){
    alert("accept");
}

function declineUser(){
    alert("decline");
}