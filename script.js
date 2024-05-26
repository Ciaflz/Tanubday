window.onload = function() {
    const password = "ilikeyou";

    const passwordInput = prompt("Please enter the password:");

    if (passwordInput === password) {
        const photos = [
            'photo1.jpg',
            'photo2.jpg',
            'photo3.jpg',
            'photo4.jpg',
            'photo5.jpg',
            'photo6.jpg'
        ];

        const cardsContainer = document.getElementById('cards-container');
        const message = document.getElementById('message');
        const hiddenMessage = document.getElementById('hidden-message');
        const revealButton = document.getElementById('reveal-button');
        const audio = document.getElementById('birthday-audio');
        const video = document.getElementById('birthday-video');

        let currentPhotoIndex = 0;

        // Create cards
        photos.forEach((photo, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            const img = document.createElement('img');
            img.src = photo;
            card.appendChild(img);
            cardsContainer.appendChild(card);
        });

        const cards = document.querySelectorAll('.card');

        // Show initial message
        setTimeout(() => {
            message.style.opacity = '1';
        }, 500);

        // Add event listener to the button
        revealButton.addEventListener('click', () => {
            if (currentPhotoIndex === cards.length) {
                hiddenMessage.style.opacity = '1';
                audio.play();
                video.play();
            }
        });

        // Add event listener to show cards one by one
        message.addEventListener('click', () => {
            if (currentPhotoIndex < cards.length) {
                const card = cards[currentPhotoIndex];
                card.style.transform = `scale(1) rotate(${getRandomAngle()}deg)`; // Set random angle
                card.style.opacity = '1';
                card.style.zIndex = currentPhotoIndex + 1;
                currentPhotoIndex++;

                // If all cards have been displayed, reveal the hidden message and start video
                if (currentPhotoIndex === cards.length) {
                    setTimeout(() => {
                        hiddenMessage.style.opacity = '1';
                        message.style.opacity = '0'; // Hide the message
                        startScrollingCredits();
                    }, 500); // Delay to allow the last card to be fully displayed
                }
            }
        });

        // Function to start scrolling end credits
        function startScrollingCredits() {
            hiddenMessage.style.overflow = 'hidden'; // Hide overflow to enable scrolling
            hiddenMessage.style.position = 'absolute';
            hiddenMessage.style.top = '100%'; // Start from bottom
            hiddenMessage.style.opacity = '1';
            hiddenMessage.style.transition = 'top 60s linear'; // Adjust duration as needed
            setTimeout(() => {
                hiddenMessage.style.top = '-100%'; // Scroll to the top
            }, 1000); // Delay to ensure proper transition
        }

        // Function to get random angle between 0 and 15 degrees
        function getRandomAngle() {
            return Math.floor(Math.random() * 16); // Generates random number between 0 and 15
        }
    } else {
        alert("Incorrect password. Access denied.");
        window.location.href = "about:blank"; // Redirect to a blank page
    }
}
