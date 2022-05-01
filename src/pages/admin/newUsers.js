

function async_ajax(params) {
    const { success } = params;
    const { error } = params;
    delete params.success;
    delete params.error;
    return new Promise((resolve, reject) => {
      $.ajax({
        ...params,
        success: (result, status) => {
          if (success) success(result, status);
          resolve(result, status);
        },
        error: (result, status, err) => {
          if (error) error(result, status, err);
          reject(result, status, err);
        }
      });
    });
}

  
async function completeTable(){
    console.log("lala");

    const json = sessionStorage.getItem("user");
    const {token} = json ? JSON.parse(json) : {};

    let users = [];

    try {
        await async_ajax({
            url: location.origin.concat('/admin/all_in_wainting'),
            type: 'GET',
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`
            },
            success: (res) => users = res
          });
    } catch (error) {
 
    }

    users.forEach(function({name, mac}){
        console.log(name)
        const row = document.createElement("tr");
        
        const nameUserRow = document.createElement("td");
        const macUserRow = document.createElement("td");
        const acceptUserRow = document.createElement("td");
        const declineUserRow = document.createElement("td");

        acceptUserRow.classList.add("btn-cell-admin");
        declineUserRow.classList.add("btn-cell-admin");
        
        nameUserRow.appendChild(document.createTextNode(name));
        macUserRow.appendChild(document.createTextNode(mac));

        const btnAccept = document.createElement("input");
        btnAccept.type = "button"
        btnAccept.classList.add("accept");
        btnAccept.classList.add("btn-table-admin");
        btnAccept.onclick = acceptUser;

        const btnDecline= document.createElement("input");
        btnDecline.type = "button"
        btnDecline.classList.add("decline");
        btnDecline.classList.add("btn-table-admin");
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