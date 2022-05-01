window.onload = function () {
    const page = location.pathname.split('/')[1];
    if (page === 'login') initLogin();
    else if (page === 'signup') initSignup();
}

function initLogin() {
    const form = $('form');
    form.on('submit', function (event) {
        event.preventDefault();
        send(
            '/connexion/login',
            $(this).serializeArray(),
            function (session) {
                sessionStorage.setItem('user', JSON.stringify(session));
                location.href = location.origin.concat('/graphs');
            },
            function () {
                printMessageError('Votre nom ou votre adresse mac ne sont pas enregistré.');
            }
        );
    });
}

function initSignup() {
    const form = $('form');
    form.on('submit', function (event) {
        event.preventDefault();
        send(
            '/connexion/signup',
            $(this).serializeArray(),
            function (res) {
                location.href = location.origin.concat('/login');
            },
            function () {
                printMessageError('L\'utilisateur est déjà exitant.');
            }
        );
    })
}

function send(path, data, succes, error = (r, status, err) => console.error(r)) {
    data = data.reduce((o, { name, value }) => ({ ...o, [name]: value }), {});
    $.ajax({
        url: location.origin.concat(path),
        type: 'POST',
        headers: { Accept: "application/json" },
        data,
        success: (res, status) => {if (succes) succes(res, status);},
        error,
    });
}

function printMessageError(msg) {
    const form = document.getElementById('contenu');
    if (form) {
        const msgErr = document.createElement('p');
        msgErr.style.color = '#D31805';
        msgErr.style.fontWeight = 'bold';
        msgErr.textContent = msg;

        form.appendChild(msgErr);
    }
}