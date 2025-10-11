document.addEventListener('DOMContentLoaded', () => {
    const getWatchlist = () => {
        return JSON.parse(localStorage.getItem('watchlist')) || [];
    };

    const saveWatchlist = (watchlist) => {
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    };

    const renderMovies = (movieArray, containerElement, context) => {
        if (!containerElement) return;

        if (movieArray.length === 0) {
            // Message changes based on context
            const message = context === 'watchlist' ? 'Your watchlist is empty.' : 'No movies found.';
            containerElement.innerHTML = `<p>${message}</p>`;
            return;
        }

        const watchlist = getWatchlist();

        const movieCards = movieArray.map(movie => {
            let buttonHtml = '';
            if (context === 'explore') {
                const isInWatchlist = watchlist.some(item => item.id === movie.id);
                const buttonText = isInWatchlist ? 'On my list' : 'Add to my list';
                const buttonDisabled = isInWatchlist ? 'disabled' : '';
                buttonHtml = `<button class="btn-primary" data-movie-id="${movie.id}" ${buttonDisabled}>${buttonText}</button>`;
            } else if (context === 'watchlist') {
                // We show the remove button in the watchlist context
                buttonHtml = `<button class="btn-secondary" data-movie-id="${movie.id}">Remove</button>`;
            }

            return `
        <div class="movie-card">
            <img src="${movie.posterUrl}" alt="${movie.title}" loading="lazy">
            <div class="movie-card-content">
                <h2>${movie.title}</h2> <p>${movie.description}</p>
                ${buttonHtml}
            </div>
        </div>
    `;
        }).join('');

        containerElement.innerHTML = movieCards;
        addEventListenersToButtons(containerElement);
    };

    const addToWatchlist = (movieId) => {
        const movieToAdd = movies.find(movie => movie.id === movieId);
        if (movieToAdd) {
            let watchlist = getWatchlist();
            if (!watchlist.some(item => item.id === movieId)) {
                watchlist.push(movieToAdd);
                saveWatchlist(watchlist);
            }
        }
    };
    // Modifyed to accept containerElement for re-rendering
    const removeFromWatchlist = (movieId, containerElement) => {
        let watchlist = getWatchlist();
        watchlist = watchlist.filter(movie => movie.id !== movieId);
        saveWatchlist(watchlist);
        renderMovies(watchlist, containerElement, 'watchlist');
    };

    const handleButtonClick = (event, containerId) => {
        const button = event.target;
        const movieId = parseInt(button.dataset.movieId);

        // The logic changes based on which container the button is in
        if (containerId === 'movie-grid') {
            addToWatchlist(movieId);
            button.textContent = 'On my list';
            button.disabled = true;
        } else if (containerId === 'watchlist-grid') {
            const containerElement = document.getElementById('watchlist-grid');
            removeFromWatchlist(movieId, containerElement);
        }
    };

    const addEventListenersToButtons = (container) => {
        container.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                handleButtonClick(event, container.id);
            }
        });
    };

    // --- Logic for each page ---
    const movieGrid = document.getElementById('movie-grid');
    const watchlistGrid = document.getElementById('watchlist-grid');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    if (movieGrid) {
        renderMovies(movies, movieGrid, 'explore');
    }

    if (watchlistGrid) {
        const watchlist = getWatchlist();
        renderMovies(watchlist, watchlistGrid, 'watchlist');
    }

    if (searchForm) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const searchTerm = searchInput.value.toLowerCase().trim();
            const filteredMovies = movies.filter(movie =>
                movie.title.toLowerCase().includes(searchTerm)
            );
            renderMovies(filteredMovies, movieGrid, 'explore');
        });
    }

    const featuredGrid = document.getElementById('featured-grid');

    if (featuredGrid) {
        // Get the first 4 movies as featured
        const featuredMovies = movies.slice(0, 4);
        renderMovies(featuredMovies, featuredGrid, 'explore');
    }

});