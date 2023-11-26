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
