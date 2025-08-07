const signupForm = document.getElementById('signup-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const privacyPolicyCheckbox = document.getElementById('privacy-policy');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    emailError.textContent = '';
    passwordError.textContent = '';
    emailError.style.display = 'none';
    passwordError.style.display = 'none';

    let isValid = true;

    const emailValue = emailInput.value.trim();
    if (emailValue === '') {
        emailError.textContent = 'Email cannot be empty.';
        emailError.style.display = 'block';
        isValid = false;
    } else if (!validateEmail(emailValue)) {
        emailError.textContent = 'Please enter a valid email address.';
        emailError.style.display = 'block';
        isValid = false;
    }

    const passwordValue = passwordInput.value;
    const confirmPasswordValue = confirmPasswordInput.value;

    if (passwordValue === '') {
    passwordError.textContent = 'Password cannot be empty.';
    passwordError.style.display = 'block';
    isValid = false;
} else if (passwordValue.length < 8) {
    passwordError.textContent = 'Password must be at least 8 characters long.';
    passwordError.style.display = 'block';
    isValid = false;
} else if (passwordValue !== confirmPasswordValue) {
    passwordError.textContent = 'Passwords do not match.';
    passwordError.style.display = 'block';
    isValid = false;
}

    if (!privacyPolicyCheckbox.checked) {
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
            color: #e74c3c;
        `;
        messageBox.textContent = 'You must agree to the privacy policy.';
        document.body.appendChild(messageBox);

        setTimeout(() => {
            document.body.removeChild(messageBox);
        }, 3000);

        isValid = false;
    }

    if (isValid) {
        
        const userData = {
            email: emailValue,
            password: passwordValue  
        };

        localStorage.setItem('user', JSON.stringify(userData));

        alert('Sign up successful!');
        window.location.href = 'home.html';
    }
});
