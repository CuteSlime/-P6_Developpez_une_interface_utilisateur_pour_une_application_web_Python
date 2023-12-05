const API_URL = "http://localhost:8000/api/v1/"
start()
async function start(){
    genres = await getGenres()
    genres = await selectGenre(genres)
    best_rated_movies = await getBestMovies()
    best_movies_cat_1 = await getBestMovies(genres[0])
    best_movies_cat_2 = await getBestMovies(genres[1])
    best_movies_cat_3 = await getBestMovies(genres[2])
    await fillCategorie(best_rated_movies)
    await fillCategorie(best_movies_cat_1, categorie="categorie1", genre=genres[0])
    await fillCategorie(best_movies_cat_2, categorie="categorie2", genre=genres[1])
    await fillCategorie(best_movies_cat_3, categorie="categorie3", genre=genres[2])
    makeCarousel()
    makeCarousel("categorie1")
    makeCarousel("categorie2")
    await makeCarousel("categorie3")
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
async function fillCategorie(movies_list, categorie="best_rate", genre=""){

        if (categorie == "best_rate"){
            let response = await fetch(movies_list[0].url);
            let bestMovie = await response.json();
            document.getElementById("best_rate").innerHTML = "<header class='title'>" 
            + "<h1>Les mieux noté</h1>"
            + "</header>"
            + '<div class="content" id="content_'+categorie+'">'
            +'</div>'

            document.getElementById("main_movie").innerHTML =  '<div><h1 class ="title">'+bestMovie.title+ '</h1>'
            + '<button class="play" id="playButton"><p>Lire</p></button>'
            + '<article>'+'<p>' + bestMovie.description + '</p>'+ '</article></div>' 
            document.getElementById("main_movie").style.backgroundImage = 'url(' + movies_list[0].image_url + ')'
        
            document.getElementById("playButton").addEventListener("click", (event) => {
              event.preventDefault(); // Prevent the default button behavior
              let modal = document.getElementById('myModal');
              modal.style.display = "block";
              modal.innerHTML =
                  '<div class="modal-content" style="background-image: url(' + bestMovie.image_url + ');">' +
                  '<div class="movie_detail">' +
                  '<span class="close">&times;</span>' +
                  '<p class="title_modal">' + bestMovie.title + '</p>' +
                  '<div class="duration"><h1> Durée :</h1>' +
                  '<p>' + bestMovie.duration + '</p></div>' +
                  '<div class="genre"><h1> Genre :</h1>' +
                  '<p>' + bestMovie.genres + '</p></div>' +
                  '<div class="imdb_score"><h1> Score IMDB :</h1>' +
                  '<p>' + bestMovie.imdb_score + '</p></div>' +
                  '<div class="date_published"><h1> Date de sortie :</h1>' +
                  '<p>' + bestMovie.date_published + '</p></div>' +
                  '<div class="rated"><h1> Classé :</h1>' +
                  '<p>' + bestMovie.rated + '</p></div>' +
                  '<div class="countries"><h1> Pays d\'origine :</h1>' +
                  '<p>' + bestMovie.countries + '</p></div>' +
                  '<div class="directors"><h1> Réalisateur :</h1>' +
                  '<p>' + bestMovie.directors + '</p></div>' +
                  '<div class="actors"><h1> Acteurs :</h1>' +
                  '<p>' + bestMovie.actors + '</p></div>' +
                  '<div class="worldwide_gross_income"><h1> Revenu au box office :</h1>' +
                  '<p>' + bestMovie.worldwide_gross_income + '</p></div>' +
                  '<div class="description"><h1> Résumé :</h1>' +
                  '<p>' + bestMovie.description + '</p></div>' +
                  '</div>' +
                  '</div>';
          
              span = document.getElementsByClassName("close")[0];
              span.addEventListener("click", (event) => {
                  modal.style.display = "none";
                  modal.innerHTML = "";
              });
              window.addEventListener("click", (event) => {
                  if (event.target == modal) {
                      modal.style.display = "none";
                  }
              });
          });


          }



        else{
            document.getElementById(categorie).innerHTML = "<header class='title'>"
                + "<h1> Meilleur film de la catégorie : " + genre + "</h1>"
                + "</header>"
                + '<div class="content" id="content_'+categorie+'">'
                +'</div>'
        }
            
        movies_list.forEach(movie => {
            const movielink = document.createElement("a");
            movielink.classList.add("movielink");
            movielink.href = "#";
            movielink.addEventListener("click", async (event) => {
                event.preventDefault(); // Prevent the default link behavior
                let modal = document.getElementById('myModal');
                let response = await fetch(movie.url);
                let moviedata = await response.json();
                modal.style.display = "block";
                modal.innerHTML = 
                '<div class="modal-content" style="background-image: url('+ moviedata.image_url+');">'
                +   '<div class="movie_detail">'
                +    '<span class="close">&times;</span>'
                +    '<p class="title_modal">'+moviedata.title +'</p>'
                +    '<div class="duration"><h1> Durée :</h1>'
                +    '<p>'+moviedata.duration +'</p></div>'
                +    '<div class="genre"><h1> Genre :</h1>'
                +    '<p>'+moviedata.genres +'</p></div>'
                +    '<div class="imdb_score"><h1> Score IMDB :</h1>'
                +    '<p>'+moviedata.imdb_score +'</p></div>'
                +    '<div class="date_published"><h1> Date de sortie :</h1>'
                +    '<p>'+moviedata.date_published +'</p></div>'
                +    '<div class="rated"><h1> Classé :</h1>'
                +    '<p>'+moviedata.rated +'</p></div>'
                +    '<div class="countries"><h1> Pays d\'origine :</h1>'
                +    '<p>'+moviedata.countries +'</p></div>'
                +    '<div class="directors"><h1> Réalisateur :</h1>'
                +    '<p>'+moviedata.directors +'</p></div>'
                +    '<div class="actors"><h1> Acteurs :</h1>'
                +    '<p>'+moviedata.actors +'</p></div>'
                +    '<div class="worldwide_gross_income"><h1> Revenu au box office :</h1>'
                +    '<p>'+moviedata.worldwide_gross_income +'</p></div>'
                +    '<div class="description"><h1> Résumé :</h1>'
                +    '<p>'+moviedata.description +'</p></div>'
                +   '</div>'
                +  '</div>';

                span = document.getElementsByClassName("close")[0];
                span.addEventListener("click", (event) => {
                    modal.style.display = "none";
                    modal.innerHTML = ""
                });
                window.addEventListener("click", (event) => {
                    if (event.target == modal) {
                        modal.style.display = "none";
                      }
                })
            });

            movielink.innerHTML =
            
            '<article class="movie">'
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
            
            document.getElementById('content_'+categorie).appendChild(movielink);
    });
}
function makeCarousel(categorie="best_rate"){
    let gap = 16;

let carousel = document.getElementById(categorie),
  content = document.getElementById("content_" + categorie),
  next = document.getElementById(categorie + "_next"),
  prev = document.getElementById(categorie + "_prev");

next.addEventListener("click", e => {
  carousel.scrollBy(width + gap, 0);
  if (carousel.scrollWidth !== 0) {
    prev.style.display = "flex";
  }
  if (content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
    next.style.display = "none";
  }
});
prev.addEventListener("click", e => {
  carousel.scrollBy(-(width + gap), 0);
  if (carousel.scrollLeft - width - gap <= 0) {
    prev.style.display = "none";
  }
  if (!content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
    next.style.display = "flex";
  }
});

let width = carousel.offsetWidth;
window.addEventListener("resize", e => (width = carousel.offsetWidth));

}