let apiKey = 'bfaef3fe6aa228ec1ff3d56dae5a9aa8';

let queryString = window.location.search;
let queryStringObj = new URLSearchParams(queryString);
let generoId = queryStringObj.get('id');

let tituloGenero = document.getElementById('titulo-genero');
let lista = document.getElementById('lista-peliculas');

function cargarPeliculasPorGenero(idGenero) {
  let url = 'https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&with_genres=' + idGenero + '&language=es-ES';

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      lista.innerHTML = '';

      for (let i = 0; i < data.results.length; i++) {
        let pelicula = data.results[i];

        let poster = pelicula.poster_path
          ? 'https://image.tmdb.org/t/p/w200' + pelicula.poster_path
          : './img/placeholder.jpg';

        lista.innerHTML += `
          <li>
            <a href="detail-movie.html?id=${pelicula.id}">
              <img src="${poster}" alt="${pelicula.title}">
              <p>${pelicula.title}</p>
            </a>
          </li>
        `;
      }
    });
}

function cargarNombreGenero(idGenero) {
  let urlGeneros = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + apiKey + '&language=es-ES';

  fetch(urlGeneros)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      for (let i = 0; i < data.genres.length; i++) {
        if (data.genres[i].id == idGenero) {
          tituloGenero.innerText = data.genres[i].name;
        }
      }
    });
}

if (generoId) {
  cargarNombreGenero(generoId);
  cargarPeliculasPorGenero(generoId);
}