/* =====================================================
   CINEVERSE MOVIE DATA
===================================================== */

const movies = [

    {
        id: 1,
        title: "hoppers",
        year: 2026,
        genre: "animated science-fiction comedy-adventure",
        rating: 8.7,
        image: "./hoppers.jpg",
        trending: true
    },

    {
        id: 2,
        title: "Laapata Ladies",
        year: 2025,
        genre: "comedy-drama and social satire",
        rating: 8.8,
        image: "./laapataladies.jpg",
        trending: true
    },

    {
        id: 3,
        title: "Spide-man : No way home",
        year: 2022,
        genre: "Action",
        rating: 7.8,
        image: "./spiderman.jpg",
        trending: true
    },

    {
        id: 4,
        title: "Taare zameen par",
        year: 2001,
        genre: "family, and social-issue film",
        rating: 8.6,
        image: "./taarezameenpar.jpg",
        trending: false
    },

    {
        id: 5,
        title: "The good dinasaur",
        year: 2021,
        genre: "Kids family",
        rating: 8.0,
        image: "./thegooddinasouras.jpg",
        trending: true
    },

    {
        id: 6,
        title: "The Pursuit of Happiness",
        year: 2023,
        genre: "Drama",
        rating: 8.6,
        image: "./thepursuitofhappiness.jpg",
        trending: true
    },

    {
        id: 7,
        title: "Up",
        year: 2016,
        genre: "Family ",
        rating: 8.0,
        image: "./up.jpg",
        trending: false
    },

    {
        id: 8,
        title: "Avengers : Infinity war",
        year: 2019,
        genre: "Action",
        rating: 8.3,
        image: "./avengers infinity war.jpg",
        trending: true
    },

    {
        id: 9,
        title: "Bruce Almighty",
        year: 2019,
        genre: " comedy and fantasy",
        rating: 8.5,
        image: "./brucealmighty.jpg",
        trending: false
    },

    {
        id: 10,
        title: "Do Little",
        year: 2012,
        genre: "fantasy adventure and comedy",
        rating: 8.0,
        image: "./dolittle.jpg",
        trending: true
    },

    {
        id: 11,
        title: "Jojo Rabbit",
        year: 2014,
        genre: "satirical dark comedy-drama ",
        rating: 8.7,
        image: "./jojorabbit.jpg",
        trending: true
    },

    {
        id: 12,
        title: "Mimi",
        year: 2014,
        genre: "Comedy-Drama",
        rating: 8.7,
        image: "./mimi.jpg",
        trending: true
    }

];


/* =====================================================
   WATCHLIST
===================================================== */

function getWatchlist() {

    return JSON.parse(
        localStorage.getItem("cineverseWatchlist")
    ) || [];

}


function saveWatchlist(watchlist) {

    localStorage.setItem(
        "cineverseWatchlist",
        JSON.stringify(watchlist)
    );

}


/* =====================================================
   CHECK IF MOVIE IS IN WATCHLIST
===================================================== */

function isInWatchlist(movieId) {

    const watchlist = getWatchlist();

    return watchlist.includes(movieId);

}


/* =====================================================
   TOGGLE WATCHLIST
===================================================== */

function toggleWatchlist(movieId) {

    let watchlist = getWatchlist();


    if (watchlist.includes(movieId)) {

        watchlist = watchlist.filter(
            id => id !== movieId
        );

    } else {

        watchlist.push(movieId);

    }


    saveWatchlist(watchlist);


    /*
       Re-render the page so the heart
       immediately changes.
    */

    renderCurrentPage();

}


/* =====================================================
   MOVIE CARD
===================================================== */

function createMovieCard(movie) {

    const saved = isInWatchlist(movie.id);


    return `

        <article class="movie-card">

            <div class="movie-poster">

                <img
                    src="${movie.image}"
                    alt="${movie.title}"
                >


                <span class="movie-badge">

                    ${movie.trending ? "🔥 Trending" : movie.genre}

                </span>


                <button
                    class="watchlist-button ${saved ? "saved" : ""}"
                    onclick="toggleWatchlist(${movie.id})"
                    aria-label="Add ${movie.title} to watchlist"
                >

                    <i class="${saved
                        ? "fa-solid"
                        : "fa-regular"
                    } fa-heart"></i>

                </button>


                <div class="movie-overlay">

                    <button
                        class="overlay-watchlist"
                        onclick="toggleWatchlist(${movie.id})"
                    >

                        <i class="${saved
                            ? "fa-solid"
                            : "fa-regular"
                        } fa-heart"></i>

                        ${saved
                            ? "Remove from Watchlist"
                            : "Add to Watchlist"
                        }

                    </button>

                </div>

            </div>


            <div class="movie-info">

                <h3>
                    ${movie.title}
                </h3>


                <div class="movie-meta">

                    <span>
                        <i class="fa-solid fa-star"></i>
                        ${movie.rating}
                    </span>

                    <span>
                        ${movie.year}
                    </span>

                    <span>
                        ${movie.genre}
                    </span>

                </div>

            </div>

        </article>

    `;

}


/* =====================================================
   RENDER MOVIES
===================================================== */

function renderMovies(containerId, movieList) {

    const container =
        document.getElementById(containerId);


    if (!container) return;


    if (movieList.length === 0) {

        container.innerHTML = `

            <div class="no-results">

                <i class="fa-solid fa-film"></i>

                <h3>No movies found</h3>

                <p>
                    Try another search or genre.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        movieList.map(createMovieCard).join("");

}


/* =====================================================
   DISCOVER PAGE
===================================================== */

function setupDiscoverPage() {

    const container =
        document.getElementById("discoverMovies");


    if (!container) return;


    renderMovies(
        "discoverMovies",
        movies
    );


    const searchInput =
        document.getElementById("movieSearch");


    const movieCount =
        document.getElementById("movieCount");


    if (movieCount) {

        movieCount.textContent =
            `${movies.length} movies`;

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                const search =
                    this.value
                        .toLowerCase()
                        .trim();


                const filtered =
                    movies.filter(movie =>

                        movie.title
                            .toLowerCase()
                            .includes(search)

                        ||

                        movie.genre
                            .toLowerCase()
                            .includes(search)

                    );


                renderMovies(
                    "discoverMovies",
                    filtered
                );


                if (movieCount) {

                    movieCount.textContent =
                        `${filtered.length} movies`;

                }

            }
        );

    }

}


/* =====================================================
   GENRES PAGE
===================================================== */

function setupGenresPage() {

    const container =
        document.getElementById("genreMovies");


    if (!container) return;


    renderMovies(
        "genreMovies",
        movies
    );


    const buttons =
        document.querySelectorAll(
            ".genre-page-button"
        );


    const title =
        document.getElementById("genreTitle");


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                buttons.forEach(btn =>
                    btn.classList.remove("active")
                );


                this.classList.add("active");


                const selectedGenre =
                    this.dataset.genre;


                let filteredMovies;


                if (selectedGenre === "All") {

                    filteredMovies = movies;

                    title.textContent =
                        "All Movies";

                } else {

                    filteredMovies =
                        movies.filter(movie =>
                            movie.genre === selectedGenre
                        );

                    title.textContent =
                        `${selectedGenre} Movies`;

                }


                renderMovies(
                    "genreMovies",
                    filteredMovies
                );

            }
        );

    });

}


/* =====================================================
   TRENDING PAGE
===================================================== */

function setupTrendingPage() {

    const container =
        document.getElementById("trendingMovies");


    if (!container) return;


    const trendingMovies =
        movies.filter(movie =>
            movie.trending === true
        );


    renderMovies(
        "trendingMovies",
        trendingMovies
    );

}


/* =====================================================
   WATCHLIST PAGE
===================================================== */

function setupWatchlistPage() {

    const container =
        document.getElementById("watchlistMovies");


    if (!container) return;


    const watchlist =
        getWatchlist();


    const savedMovies =
        movies.filter(movie =>
            watchlist.includes(movie.id)
        );


    renderMovies(
        "watchlistMovies",
        savedMovies
    );


    const count =
        document.getElementById(
            "watchlistCount"
        );


    if (count) {

        count.textContent =
            `${savedMovies.length} movies`;

    }


    const empty =
        document.getElementById(
            "emptyWatchlist"
        );


    if (empty) {

        empty.style.display =
            savedMovies.length === 0
                ? "flex"
                : "none";

    }

}


/* =====================================================
   RE-RENDER CURRENT PAGE
===================================================== */

function renderCurrentPage() {

    setupDiscoverPage();

    setupGenresPage();

    setupTrendingPage();

    setupWatchlistPage();

}


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuButton =
    document.getElementById("menuButton");


const navLinks =
    document.querySelector(".nav-links");


if (menuButton) {

    menuButton.addEventListener(
        "click",
        function () {

            navLinks.classList.toggle("show");

        }
    );

}

/* =========================================================
   GENRE FILTER
========================================================= */

const genreButtons = document.querySelectorAll(".genre");
const movieCards = document.querySelectorAll(".movie-card");
const viewAllMovies = document.getElementById("viewAllMovies");


genreButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active class from every genre
        genreButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Make clicked genre active
        button.classList.add("active");

        const selectedGenre = button.dataset.genre;


        movieCards.forEach(card => {

            const movieGenre = card.dataset.genre;

            if (
                selectedGenre === "all" ||
                movieGenre === selectedGenre
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

});


/* =========================================================
   VIEW ALL MOVIES
========================================================= */

if (viewAllMovies) {

    viewAllMovies.addEventListener("click", () => {

        // Make Trending/All button active
        genreButtons.forEach(button => {
            button.classList.remove("active");
        });

        const allButton =
            document.querySelector('.genre[data-genre="all"]');

        if (allButton) {
            allButton.classList.add("active");
        }


        // Show every movie
        movieCards.forEach(card => {
            card.style.display = "";
        });

    });

}


/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderCurrentPage();

    }

    
);