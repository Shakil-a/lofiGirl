document.getElementById('signup-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    // get the user input and trim the extra spaces after
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const messageDiv = document.getElementById('message');

    // clear the previous messages
    messageDiv.textContent = '';
    messageDiv.style.color = 'black';

    // this is to check it follows this email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // validate the user input for the name
    if (name === '') {
        messageDiv.textContent = "Name is required.";
        messageDiv.style.color = "red";
        return;
    }

    // validate the user input for the email
    if (!emailPattern.test(email)) {
        messageDiv.textContent = "Please enter a valid email address.";
        messageDiv.style.color = "red";
        return;
    }

    // try to send the data to the server
    try {
        const response = await fetch('https://mudfoot.doc.stu.mmu.ac.uk/ash/api/mailinglist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        });

        // If server response is ok then return success message from server
        if (response.ok) {
            const data = await response.json();
            messageDiv.textContent = data.message;
            messageDiv.style.color = "green";
            document.getElementById('signup-form').reset();
        } else {
            // If server returns an error status display it
            const errorResponse = await response.text();
            messageDiv.textContent = errorResponse;
            messageDiv.style.color = "red";
        }
    } catch (error) {
        // Catches any problems with the fetching to the server
        messageDiv.textContent = "There was an error connecting to the server.";
        messageDiv.style.color = "red";
    }
});
