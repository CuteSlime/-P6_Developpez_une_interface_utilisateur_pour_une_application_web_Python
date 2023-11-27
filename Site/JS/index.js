const API_URL = "http://localhost:8000/api/v1/"
start()
async function start(){
    genres = await getGenres()
    genres = await selectGenre(genres)
    console.log(genres)


}
async function getGenres() {
    let response = await fetch(API_URL + "genres");
    let genres = await response.json();
    genres = genres.results;
    nextPage = API_URL + "genres/?page=2"
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
async function getBestMovies(genre = "") {
    if (genre != ""){
        genre = "&genre=" + genre
    }
    let responseP1 = await fetch(API_URL + "titles/?sort_by=-imdb_score"+genre);
    let movies = await responseP1.json();
    let nextMovies
    if (movies.next){
        let responseP2 = await fetch(API_URL + "titles/?page=2&sort_by=-imdb_score"+genre);
        nextMovies = await responseP2.json();
        nextMovies = nextMovies.results;
    }
    movies = movies.results;
    if (nextMovies){
        movies = [...movies, ...nextMovies];
    }
    let bestMovies = movies.slice(0, 7);
    return bestMovies
  };

  function selectGenre(list){
    selectedGenre = []
    indexList = []
    while (selectedGenre.length < 3){
        index = Math.floor(Math.random() * list.length);
        if (indexList.includes(index) === false){
            selectedGenre.push(list[index])
        }
        indexList.push(index)
    }
    console.log("4",selectedGenre)
    return selectedGenre
}
  
//   'http://localhost:8000/api/v1/titles/?genre=${genre}&sort_by=-imdb_score'