document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('registrationForm');
    const tableBody = document.querySelector('#userTable tbody');

    // Load any saved data from localStorage when the page loads
    loadUserData();

    // Form submission event
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const terms = document.getElementById('terms').checked;

        if (validateDOB(dob)) {
            const user = { name, email, password, dob, terms };
            saveUserData(user);
            addUserToTable(user);
            form.reset(); // Reset the form after submission
        } else {
            alert("Date of birth must be for people between ages 18 and 55.");
        }
    });

    function validateDOB(dob) {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age >= 18 && age <= 55;
    }

    function saveUserData(user) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    function loadUserData() {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.forEach(user => addUserToTable(user));
    }

    function addUserToTable(user) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.dob}</td>
            <td>${user.terms ? 'Yes' : 'No'}</td>
        `;
        tableBody.appendChild(row);
    }
});
