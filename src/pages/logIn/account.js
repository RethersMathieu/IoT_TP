const nameUser = "nameUser";
const macAdressUser = "macAdressUser";

function setAccount(){
    sessionStorage.setItem(nameUser, document.getElementById("login").value)
    sessionStorage.setItem(macAdressUser, document.getElementById("macAdressUser").value)
}
