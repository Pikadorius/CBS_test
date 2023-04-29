const form = document.querySelector('#registerForm');
const name = form.querySelector('#name');
const surname = form.querySelector('#surname');
const birthday = form.querySelector('#birthday');
const email = form.querySelector('#email');
const password = form.querySelector('#password');
const confirmPassword = form.querySelector('#confirmPassword');

const showError = (input, message) => {
    const errorElement = input.parentElement.querySelector('.error');
    errorElement.innerText = message;
    return !message;
}

const validateData = (input) => {
    const value = input.value.trim();
    if (value.length < 2 || value.length > 25) {
        return showError(input, 'The field must contain from 2 to 25 characters.');
    } else {
        return showError(input, '');
    }
}

const validateBirthday = (input) => {
    const value = input.value;
    if (!value || new Date(value) > new Date()) {
        return showError(input, 'Incorrect date of birth.');
    } else {
        return showError(input, '');
    }
}

const validateEmail = (input) => {
    const value = input.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(value)) {
        return showError(input, 'Please enter a valid email.');
    } else {
        return showError(input, '');
    }
}

const validatePassword = (input) => {
    const value = input.value.trim();
    const regex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[@$!%*?&]).{8,}$/;

    if (!regex.test(value)) {
        return showError(input, 'Password must be at least 8 characters long, contain at least 1 number, 1 uppercase character and 1 special character !@#$%.');
    } else {
        return showError(input, '');
    }
}

const validateConfirmPassword = (input, passwordInput) => {
    const value = input.value.trim();

    if (!value || value !== passwordInput.value.trim()) {
        return showError(input, 'Password mismatch');
    } else {
        return showError(input, '');
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    validateData(name, 'Name')
    validateData(surname, 'Surname')
    validateBirthday(birthday)
    validateEmail(email)
    validatePassword(password)
    validateConfirmPassword(confirmPassword, password);

    const isValidForm =
        validateData(name, 'Name') &&
        validateData(surname, 'Surname') &&
        validateBirthday(birthday) &&
        validateEmail(email) &&
        validatePassword(password) &&
        validateConfirmPassword(confirmPassword, password);

    if (isValidForm) {
        const postData = {
            name: name.value.trim(),
            surname: surname.value.trim(),
            birthday: birthday.value,
            email: email.value.trim(),
            password: password.value.trim(),
        };

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify(postData),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const data = await (response.json())
                .then(form.reset())
                .then(alert('Data sent successfully!'));

            console.log(data);
        } catch (e) {
            console.log(e);
        }
    }
});