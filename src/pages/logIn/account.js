function initLogin() {
    const form = $('form');
    form.on('submit', function (event) {
        event.preventDefault();
        const data = $(this).serializeArray().reduce((o, { name, value }) => ({ ...o, [name]: value }), {});
        $.ajax({
            url: location.origin.concat('/connexion/login'),
            type: 'POST',
            headers: { Accept: "application/json" },
            data,
            success: function (session) {
                sessionStorage.setItem('user', JSON.stringify(session));
                location.href = location.origin;
            },
            error: (r, status, err) => console.error(r)
        });
    });
}

function initSignup() {

}

window.onload = function () {
    const page = location.pathname.split('/')[1];
    if (page === 'login') initLogin();
    else if (page === 'signup') initSignup();
}

function completeTable(){
    console.log("lala");

    let users = [
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