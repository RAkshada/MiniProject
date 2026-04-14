const apiKey = "26a98dc6";

const searchInput = document.getElementById("search");
const moviesDiv = document.getElementById("movies");
let favorites = [];
//let favorites = JSON.parse(localStorage.getItem("favorites")) || [];-->for local browser saving
const favDiv = document.getElementById("favorites");
searchInput.addEventListener("keyup", function () {
    let query = searchInput.value.trim();

    if (query.length > 2) {
        fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`)
            .then(res => res.json())
            .then(data => {
                if (data.Response === "True") {
                    showMovies(data.Search);
                } else {
                    moviesDiv.innerHTML = `<p style="color:white;">No results found</p>`;
                }
            })
            .catch(err => {
                console.log(err);
                moviesDiv.innerHTML = `<p style="color:red;">Error fetching data</p>`;
            });
    } else {
        moviesDiv.innerHTML = "";
    }
});

function showMovies(movies) {
    moviesDiv.innerHTML = "";

    movies.forEach(movie => {
        let div = document.createElement("div");
        div.classList.add("movie");

        div.innerHTML = `
            <img src="${movie.Poster !== "N/A" ? movie.Poster : ''}">
            <div class="movie-info">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
                
                <button onclick='addToFavorites(${JSON.stringify(movie).replace(/'/g, "\\'")})'>
                    <span class="star-icon">&#9733;</span> Add to Favorites
                </button>
                
            </div>
        `;

        moviesDiv.appendChild(div);
    });
}

function addToFavorites(movie) {
    fetch("backend/add.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
            imdbID: movie.imdbID,
            rating: movie.rating || null,
            notes: movie.notes || ""
        })
    })
    .then(res => res.text())  
    .then(data => {
        alert(data);           
        loadFavorites();
       
});
}

function displayFavorites() {
    favDiv.innerHTML = "";

    if (favorites.length === 0) {
        favDiv.innerHTML = `<p style="text-align:center; color:#94a3b8;">
            No favorite movies added yet 🎬
        </p>`;
        return;
    }

    favorites.forEach(movie => {
        let div = document.createElement("div");
        div.classList.add("movie");

        div.innerHTML = `
    <img src="${movie.poster !== "N/A" ? movie.poster : ''}">
    <div class="movie-info">
        <h3>${movie.title}</h3>
        <p>${movie.year}</p>

        <div class="stars">${[1,2,3,4,5].map(star => `
        <span onclick="updateMovie('${movie.imdbID}', 'rating', ${star})">
            ${movie.rating >= star ? '&#9733;' : '&#9734;'}
        </span>`).join('')}
        </div>

        <textarea placeholder="Add notes..."
    onchange="updateMovie('${movie.imdbID}', 'notes', this.value)">${movie.notes || ''}</textarea>

        <button class="remove-btn" onclick="removeFavorite('${movie.imdbID}')">
            Remove
        </button>
    </div>
`;

        favDiv.appendChild(div);
    });
}
function updateMovie(id, field, value) {
    let movie = favorites.find(m => m.imdbID === id);

    if (field === "rating") {
        movie.rating = value;
    } else if (field === "notes") {
        movie.notes = value;
    }

    fetch("backend/update.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            imdbID: id,
            rating: movie.rating || null,
            notes: movie.notes || ""
        })
    })
    .then(res => res.text())
    .then(data => {
        console.log(data);
    });


    localStorage.setItem("favorites", JSON.stringify(favorites));
    displayFavorites();   
}
function removeFavorite(id) {
    const confirmDelete = confirm("Are you sure you want to remove this movie?");
    if (!confirmDelete) return;

    fetch("backend/delete.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ imdbID: id })
    })
    .then(res => res.text())
    .then(data => {
        alert(data);
        loadFavorites(); // refresh UI
    });
}

displayFavorites();
function loadFavorites() {
    fetch("backend/get.php")
        .then(res => res.json())
        .then(data => {
            favorites = data;
            displayFavorites();
        });
}
loadFavorites();
