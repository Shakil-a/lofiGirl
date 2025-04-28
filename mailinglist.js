document.getElementById('signup-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const messageDiv = document.getElementById('message');

    messageDiv.textContent = '';
    
    if (name === '') {
        messageDiv.textContent = "Name is required.";
        messageDiv.style.color = "red";
        return;
    }

    if (email === '') {
        messageDiv.textContent = "Email is required.";
        messageDiv.style.color = "red";
        return;
    } else if (!email.includes('@')) {
        messageDiv.textContent = "Please enter a valid email address.";
        messageDiv.style.color = "red";
        return;
    }

    try {
        const response = await fetch('https://mudfoot.doc.stu.mmu.ac.uk/ash/api/mailinglist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        });

        if (response.ok) {
            const data = await response.json();
            messageDiv.textContent = data.message
            messageDiv.style.color = "green"
        } else {
            const errorResponse = await response.text();
            messageDiv.textContent = errorResponse
            messageDiv.style.color = "red";
        }
    } catch (error) {
        messageDiv.textContent = "There was an error connecting to the server.";
        messageDiv.style.color = "red";
    }
});
