// Replace 'YOUR_RAPIDAPI_KEY' with your actual API key
const API_KEY = 'c2cc718406msh35856e817c14e27p174b0fjsnb3be5b99000e';
const API_URL = 'https://imdb188.p.rapidapi.com/api/v1/searchIMDB?query=%3CREQUIRED%3E';

document.getElementById('suggestButton').addEventListener('click', getSuggestedMovie);

async function getSuggestedMovie() {
    try {
        const response = await fetch(`${API_URL}?q=random`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'imdb188.p.rapidapi.com',
                'X-RapidAPI-Key': API_KEY
            }
        });

        if (response.ok) {
            const data = await response.json();
            if (data && data.d) {
                const randomMovie = data.d[Math.floor(Math.random() * data.d.length)];
                document.getElementById('movieTitle').textContent = randomMovie.l;
                document.getElementById('movieDescription').textContent = randomMovie.s;
            } else {
                displayErrorMessage();
            }
        } else {
            displayErrorMessage();
        }
    } catch (error) {
        displayErrorMessage();
    }
}

function displayErrorMessage() {
    document.getElementById('movieTitle').textContent = 'An error occurred.';
    document.getElementById('movieDescription').textContent = 'Please try again later.';
}
