let apiKey = 'bfaef3fe6aa228ec1ff3d56dae5a9aa8';

let poster = document.querySelector('#poster');
let titulo = document.querySelector('#titulo');
let calificacion = document.querySelector('#calificacion');
let duracion = document.querySelector('#duracion');
let fecha = document.querySelector('#fecha');
let descripcion = document.querySelector('#descripcion');
let generos = document.querySelector('#generos');

let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
let movieId = queryStringObj.get('id');

if (movieId) {
  obtenerDetallePelicula(movieId, 'es-ES');
} else {
  document.body.innerHTML = '<h2 style="text-align:center;margin-top:50px;">No se encontró ninguna película seleccionada.</h2>';
}

function obtenerDetallePelicula(id, idioma) {
  let urlApi = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + apiKey + '&language=' + idioma;

  fetch(urlApi)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      if (data.poster_path) {
        poster.setAttribute('src', 'https://image.tmdb.org/t/p/w500' + data.poster_path);
      } else {
        poster.setAttribute('src', './img/placeholder.jpg');
      }
      poster.setAttribute('alt', data.title);

      if (data.title) {
        titulo.innerText = data.title;
      } else {
        titulo.innerText = 'Sin título';
      }

      if (data.vote_average) {
        calificacion.innerText = data.vote_average + ' / 10';
      } else {
        calificacion.innerText = 'Sin calificación';
      }

      if (data.runtime) {
        duracion.innerText = data.runtime + ' minutos';
      } else {
        duracion.innerText = 'Duración desconocida';
      }

      if (data.release_date) {
        fecha.innerText = data.release_date;
      } else {
        fecha.innerText = 'Fecha desconocida';
      }

      if (data.overview) {
        descripcion.innerText = data.overview;
      } else {
        if (idioma === 'es-ES') {
          obtenerDetallePelicula(id, 'en-US');
        } else {
          descripcion.innerText = 'Sin sinopsis disponible';
        }
      }

      if (data.genres) {
        if (data.genres.length > 0) {
          let generosHTML = '';
          for (let i = 0; i < data.genres.length; i++) {
            generosHTML += '<a href="detail-movie-genre.html?id=' + data.genres[i].id + '">' + data.genres[i].name + '</a>';
            if (i < data.genres.length - 1) {
              generosHTML += ', ';
            }
          }
          generos.innerHTML = generosHTML;
        } else {
          generos.innerText = 'Sin géneros disponibles';
        }
      } else {
        generos.innerText = 'Sin géneros disponibles';
      }
    })
    .catch(function(error) {
      console.log('Error: ' + error);
    });
}
