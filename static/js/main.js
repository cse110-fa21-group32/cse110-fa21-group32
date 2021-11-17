function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");
    
    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__messgae--error");
    messageElement.classList.add(`form_message--${type}`);

}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createForm = document.querySelector("#creation");
    const emailForm = document.querySelector("#emailPage");
    const confirmationForm = document.querySelector("#confirmationPage");
    const successRegForm = document.querySelector("#successReg");

    document.querySelector("#linkCreation").addEventListener("click", e => {
        e.preventDefault();
        emailForm.classList.add("form--hidden");
        loginForm.classList.add("form--hidden");
        confirmationForm.classList.add("form--hidden");
        successRegForm.classList.add("form--hidden");
        createForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        emailForm.classList.add("form--hidden");
        createForm.classList.add("form--hidden");
        confirmationForm.classList.add("form--hidden");
        successRegForm.classList.add("form--hidden");
        loginForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkEmailPage").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createForm.classList.add("form--hidden");
        confirmationForm.classList.add("form--hidden");
        successRegForm.classList.add("form--hidden");
        emailForm.classList.remove("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        // username, passwd, email, fname, lname

        // construct a FormData object, which fires the formdata event
        const formData = new FormData(loginForm);
        // formdata gets modified by the formdata event




        //do fetch and check data of users here and return
        setFormMessage(loginForm, "error", "Invalid username or password!");
    });


    document.getElementById('registration').addEventListener('click', e => {
        // on form submission, prevent default
        e.preventDefault();
        // construct a FormData object, which fires the formdata event
        const formData = new FormData(createForm);
        // formdata gets modified by the formdata event
        console.log(formData.get('username'));
        console.log(formData.get('email'));
        console.log(formData.get('password'));
        console.log(formData.get('confirm-pass'));
        
        let username = formData.get('username');
        let password = formData.get('password');
        let email = formData.get('email');

        let msg = {
            type: 'register',
            username: username,
            password:password,
            email: email
        }

        console.log(msg);

        fetch('http://127.0.0.1:5000', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(msg),
            })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        // Create WebSocket connection.
        /*
        const socket = new WebSocket('wss://localhost:5502');

        // Connection opened
        socket.addEventListener('open', function (event) {
            socket.send('Hello Server!');
        });

        // Listen for messages
        socket.addEventListener('message', function (event) {
            console.log('Message from server ', event.data);
        });
        */
        // let client = new WebSocket("wss://localhost:5502");
        // console.log(client);
        // client.send(username + ' ' + password + ' ' + email + ' abc abc');

        /*
        const client = new net.Socket();
        client.connect({ port: 65432 }, '127.0.0.1', () => {
            client.write(' '.join([username, password, email, 'test', 'test']));
        });
        client.on('data', (data) => {
            console.log(`Server says: ${data.toString('utf-8')}`);
            client.destroy();
        });
        */
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if(e.target.id === "signUpUsername" && e.target.value.length > 0 && e.target.value.length < 10){
                setInputError(inputElement, "Username must be at least 10 characters");
            }
            else if(e.target.id === "signUpUsername" && e.target.value.length > 16){
                setInputError(inputElement, "Username must be less than 16 characters");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
    
    const resetButton = document.querySelector("#reset")
    resetButton.addEventListener("click", e => {
        e.preventDefault();
        emailForm.classList.add("form--hidden");
        loginForm.classList.add("form--hidden");
        createForm.classList.add("form--hidden");
        successRegForm.classList.add("form--hidden");
        confirmationForm.classList.remove("form--hidden");
    });


    // should show up when users registrate successfully
    const registrationBtn = document.querySelector("#registration");
    registrationBtn.addEventListener("click", e => {
        e.preventDefault();
        emailForm.classList.add("form--hidden");
        loginForm.classList.add("form--hidden");
        createForm.classList.add("form--hidden");
        confirmationForm.classList.add("form--hidden");
        successRegForm.classList.remove("form--hidden");
    });

    /*createForm.addEventListener("submit", e => {
        e.preventDefault();
        setFormMessage(createForm, "error", "wrong information");
    });*/



});