const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const signinBtn = document.getElementById('signin-btn');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const signupLink = document.getElementById('signup-link-text');

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

signinBtn.addEventListener('click', (e) => {
    e.preventDefault();

    emailError.textContent = '';
    passwordError.textContent = '';
    emailError.style.display = 'none';
    passwordError.style.display = 'none';

    let isValid = true;

    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value;

    if (emailValue === '') {
        emailError.innerHTML = 'Email cannot be empty.';
        emailError.style.display = 'block';
        isValid = false;
    } else if (!validateEmail(emailValue)) {
        emailError.textContent = 'Please enter a valid email address.';
        emailError.style.display = 'block';
        isValid = false;
    }

    if (passwordValue === '') {
        passwordError.textContent = 'Password cannot be empty.';
        passwordError.style.display = 'block';
        isValid = false;
    } else if (passwordValue.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters long.';
        passwordError.style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (
            storedUser &&
            storedUser.email === emailValue &&
            storedUser.password === passwordValue
        ) {
            
            const messageBox = document.createElement('div');
            messageBox.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                z-index: 1000;
                text-align: center;
                color: black;
                font-family: 'Arial', sans-serif;
            `;
            messageBox.textContent = 'Sign in successful!';
            document.body.appendChild(messageBox);

            setTimeout(() => {
                document.body.removeChild(messageBox);
                window.location.href = 'home.html';
            }, 2000);
        } else {
            passwordError.textContent = 'Incorrect email or password.';
            passwordError.style.display = 'block';
        }
    }
});

signupLink.addEventListener('click', () => {
    window.location.href = 'signUp.html';
});
