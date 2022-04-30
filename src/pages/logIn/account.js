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
                location.href = location.origin.concat('/graphs');
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