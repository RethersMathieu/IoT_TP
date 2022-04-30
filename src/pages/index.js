window.addEventListener("load", updateMenu);
window.onstorage = updateMenu;

function updateMenu() {

    const userJSON = sessionStorage.getItem("user");
    if(userJSON){

        const userObject = JSON.parse(userJSON);
       if(userObject && userObject.isAdmin){
            console.log("admin");
            const {li, a} = createItemMenu("liAdmin", "Admin");
            li.classList.add("colonneSign");
            a.href = "../admin";
       }

        console.log("connected");
        const {li, a} = createItemMenu("liDisconnect", "Déconnexion");
        li.classList.add("colonneSign");
        a.onclick = disconnect;
    }
    else{
        removeItemMenu("liAdmin");
        removeItemMenu("liDisconnect");

        const itemLogIn = createItemMenu("liLogIn", "Se connecter");
        const liLogIn = itemLogIn.li
        liLogIn.classList.add("colonneSign");

        const aLogin = itemLogIn.a
        aLogin.href = "../login";

        const itemSignUp = createItemMenu("liSignUp", "S'inscrire");
        const liSignUp = itemSignUp.li
        liSignUp.classList.add("colonneSign");

        const aSignUp = itemSignUp.a
        aSignUp.href = "../signup";
    }
}


function createItemMenu(id, text){
    const li = document.createElement("li");

    li.classList.add("animationButtonMenu");
    li.classList.add("underLineHover");
    li.id = id

    const a = document.createElement("a");
    a.classList.add("aMenu");
    a.text = text;

    li.appendChild(a);

    document.querySelector("#lineMenu").appendChild(li);

    return {li, a};
}

function removeItemMenu(id){

    const liAdmin = document.getElementById(id);
    if(liAdmin){
        liAdmin.remove();
    }

}

function disconnect(){
    sessionStorage.removeItem("user");
    location.reload();
}