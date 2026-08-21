// Function to add a new recommendation
function addRecommendation() {
    // Get the recommendation name and text
    var name = document.getElementById('recommendation-name').value.trim();
    var text = document.getElementById('recommendation-text').value.trim();

    // Check if recommendation text is empty
    if (text === '') {
        alert('Please enter a recommendation message.');
        return;
    }

    // Create a new recommendation card
    var recommendationsContainer = document.querySelector('.recommendations-container');
    var newCard = document.createElement('div');
    newCard.className = 'recommendation-card';
    
    // Use default name if none provided
    if (name === '') {
        name = 'Anonymous';
    }

    // Add content to the new recommendation card
    newCard.innerHTML = `
        <span class="quote">"</span>
        <p>${text}</p>
        <span class="quote">"</span>
        <h4>— ${name}</h4>
    `;

    // Append the new card to the recommendations container
    recommendationsContainer.appendChild(newCard);

    // Clear the form inputs
    document.getElementById('recommendation-name').value = '';
    document.getElementById('recommendation-text').value = '';

    // Show the popup notification (Task 3: showPopup triggered only on new recommendation)
    showPopup();
}

// Function to show the popup notification
function showPopup() {
    var popup = document.getElementById('popup');
    if (popup) {
        popup.classList.add('show');
        // Auto-hide the popup after 3 seconds
        setTimeout(function() {
            popup.classList.remove('show');
        }, 3000);
    } else {
        // Create popup if it doesn't exist
        createPopup();
    }
}

// Function to create popup if it doesn't exist
function createPopup() {
    var popup = document.createElement('div');
    popup.id = 'popup';
    popup.className = 'popup';
    popup.innerHTML = `
        <span class="close" onclick="document.getElementById('popup').classList.remove('show')">&times;</span>
        <p>✅ Thank you for your recommendation!</p>
    `;
    document.body.appendChild(popup);
    popup.classList.add('show');
    setTimeout(function() {
        popup.classList.remove('show');
    }, 3000);
}
