let authorize = {
    'fullname': 'admin',
    'email': 'admin@js-dom.com',
    'current-password': 'password',
};

function register() {
    const MAILFORMAT = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let email = document.getElementById("reg_email").value;
    let password = document.getElementById("reg_pass").value;

    let noti = {
        info: document.getElementById("info"),
        err: document.getElementById("reg_error"),
    };

    for(e in noti) {
        noti[e].innerHTML = "";
        noti[e].className.includes("danger") ? noti[e].className.replace("alert alert-danger", "") : noti[e].className.replace("alert alert-success", "");
    };

    if (email && email.match(MAILFORMAT) && password.length >= 6) {
        authorize['fullname'] = fname + " " + lname;
        authorize['email'] = email;
        authorize['current-password'] = password;

        noti.info.innerHTML = JSON.stringify(authorize, null, 4);
        noti.info.className = "alert alert-success";
        alert("You've created a new account successfully!");
    } else {
        noti.err.innerHTML = "Error registering. Please try again.";
        noti.err.className = "alert alert-danger";
    }
};

function login() {
    let form = {
        'errors' : {}
    };

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let success = document.getElementById("success");
    let errors = {
        err: document.getElementById("errors"),
        email_err: document.getElementById("email_err"),
        password_err: document.getElementById("password_err"),
    };

    for(e in errors) {
        errors[e].innerHTML = "";
        errors[e].className.replace("text-sm text-danger", "");
    };
    success.innerHTML = "";
    success.className.replace("alert alert-success", "");

    if (!email || !password) {
        form.errors = "Please fill all the fields.";
        errors.err.innerHTML = form.errors;
        errors.err.className = "text text-danger";
    } else {
        if (authorize['email'] !== email) {
            form.errors['email'] = "Your email seems to be incorrect."
            errors.email_err.innerHTML = form.errors.email;
            errors.email_err.className = "text-sm text-danger";
        } 
        if (authorize['current-password'] !== password) {
            form.errors['password'] = "Wrong password.";
            errors.password_err.innerHTML = form.errors.password;
            errors.password_err.className = "text-sm text-danger";
        }
    }

    if (email === authorize['email'] && password === authorize['current-password']) {
        success.innerHTML = "Welcome "+authorize['fullname']+"!";
        success.className = "alert alert-success";
    }
};
