const API_URL = "http://localhost:8000/api/v1/"
start()
async function start(){
    genres = await getGenres()
    genres = await selectGenre(genres)
    best_rated_movies = await getBestMovies()
    best_movies_cat_1 = await getBestMovies(genres[0])
    best_movies_cat_2 = await getBestMovies(genres[1])
    best_movies_cat_3 = await getBestMovies(genres[2])


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
function fillCategorie(movies_list, categorie="best rate", genre=""){


    if (categorie == "best rate"){
        document.getElementById("best_rate").innerHTML = "<header class='title'>" 
            + "<h1>Les mieux noté</h1>"
            + "</header>"

        movies_list.forEach(movie => {
            document.getElementById("best_rate").innerHTML += '<a class="movielink" href="'+'#' +'">'
                + '<article class="movie">'
                + '<!-- icon on the top left -->'
                + '<header class="subheader">'
                + '<svg viewbox="0 0 50 30" class="icon">'
                + '<use xlink:href="./src/icon/Top_7.svg#icon"/>'
                + '</svg>'
                + '</header>'
                + '<article>'                
                + '<!-- Main picture of the movie -->'
                + '<img src="'+ movie.image_url +'" alt="">'
                + '</article>'
                + '<!-- title of the movie -->'
                + '<footer class="subfooter">'
                + '<h1 class ="">'+movie.title+ '</h1>'
                + '</footer>'
                + '</article>'
                + '</a>'
        });
    }

    if (categorie == "cat1"){
        document.getElementById("categorie1").innerHTML = "<header class='title'>" 
            + "<h1> Meilleur film de la catégorie : " + genre + "</h1>"
            + "</header>"
            
        movies_list.forEach(movie => {
            document.getElementById("categorie1").innerHTML += '<a class="movielink" href="'+'#' +'">'
                + '<article class="movie">'
                + '<!-- icon on the top left -->'
                + '<header class="subheader">'
                + '<svg viewbox="0 0 50 30" class="icon">'
                + '<use xlink:href="./src/icon/Top_7.svg#icon"/>'
                + '</svg>'
                + '</header>'
                + '<article>'                
                + '<!-- Main picture of the movie -->'
                + '<img src="'+ movie.image_url +'" alt="">'
                + '</article>'
                + '<!-- title of the movie -->'
                + '<footer class="subfooter">'
                + '<h1 class ="">'+movie.title+ '</h1>'
                + '</footer>'
                + '</article>'
                + '</a>'
        });
    }

    if (categorie == "cat2"){
        document.getElementById("categorie2").innerHTML = "<header class='title'>" 
            + "<h1> Meilleur film de la catégorie : " + genre + "</h1>"
            + "</header>"
            
        movies_list.forEach(movie => {
            document.getElementById("categorie2").innerHTML += '<a class="movielink" href="'+'#' +'">'
                + '<article class="movie">'
                + '<!-- icon on the top left -->'
                + '<header class="subheader">'
                + '<svg viewbox="0 0 50 30" class="icon">'
                + '<use xlink:href="./src/icon/Top_7.svg#icon"/>'
                + '</svg>'
                + '</header>'
                + '<article>'                
                + '<!-- Main picture of the movie -->'
                + '<img src="'+ movie.image_url +'" alt="">'
                + '</article>'
                + '<!-- title of the movie -->'
                + '<footer class="subfooter">'
                + '<h1 class ="">'+movie.title+ '</h1>'
                + '</footer>'
                + '</article>'
                + '</a>'
        });
    }

    if (categorie == "cat3"){
        document.getElementById("categorie3").innerHTML = "<header class='title'>" 
            + "<h1> Meilleur film de la catégorie : " + genre + "</h1>"
            + "</header>"
            
        movies_list.forEach(movie => {
            document.getElementById("categorie3").innerHTML += '<a class="movielink" href="'+'#' +'">'
                + '<article class="movie">'
                + '<!-- icon on the top left -->'
                + '<header class="subheader">'
                + '<svg viewbox="0 0 50 30" class="icon">'
                + '<use xlink:href="./src/icon/Top_7.svg#icon"/>'
                + '</svg>'
                + '</header>'
                + '<article>'                
                + '<!-- Main picture of the movie -->'
                + '<img src="'+ movie.image_url +'" alt="">'
                + '</article>'
                + '<!-- title of the movie -->'
                + '<footer class="subfooter">'
                + '<h1 class ="">'+movie.title+ '</h1>'
                + '</footer>'
                + '</article>'
                + '</a>'
        });
    }
}
//   'http://localhost:8000/api/v1/titles/?genre=${genre}&sort_by=-imdb_score'