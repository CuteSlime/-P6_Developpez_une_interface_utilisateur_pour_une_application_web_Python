async function getgenres() {
    let response = await fetch("http://localhost:8000/api/v1/genres");
    let genres = await response.json();
    genres = genres.results;
    nextPage = "http://localhost:8000/api/v1/genres/?page=2"
    while (nextPage){
        let response = await fetch(nextPage)
        let nextGenres = await response.json();
        nextPage = nextGenres.next
        nextGenres = nextGenres.results
        genres = [...genres, ...nextGenres];
    }
    genres = genres.map(genre => genre.name);
    return genres
    };
async function logMovies() {
    let responseP1 = await fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score");
    let responseP2 = await fetch("http://localhost:8000/api/v1/titles/?page=2&sort_by=-imdb_score");
    let movies = await responseP1.json();
    movies = movies.results;

    let nextMovies = await responseP2.json();
    nextMovies = nextMovies.results;

    movies = [...movies, ...nextMovies];

    let bestMovies = movies.slice(0, 7);

    document.getElementById('best_rate')
  };
