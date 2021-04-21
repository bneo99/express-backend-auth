
document.addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.matches('#login-btn')) {
        var emailInput = document.getElementById('email-input');
        var pwdInput = document.getElementById('pwd-input');
        var data = {
            email: emailInput.value,
            password: pwdInput.value
        };
        Http.Post('/api/auth/login', data)
            .then(res => res.json()
              .then(data => {
                sessionStorage.setItem('token', data.token);
                window.location.href = '/users?token=' + data.token;
              })
            );
    }
}, false)
