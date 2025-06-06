let apiKey = 'bfaef3fe6aa228ec1ff3d56dae5a9aa8';

let poster = document.getElementById('poster');
let titulo = document.getElementById('titulo');
let calificacion = document.getElementById('calificacion');
let duracion = document.getElementById('duracion');
let fecha = document.getElementById('fecha');
let descripcion = document.getElementById('descripcion');
let generos = document.getElementById('generos');

let url = window.location.search;
let partes = url.split('=');
let movieId = partes.length > 1 ? partes[1] : null;

if (movieId) {
  obtenerDetallePelicula(movieId, 'es-ES');
} else {  
  document.body.innerHTML = "<h2 style='text-align:center;margin-top:50px;'>No se encontró ninguna película seleccionada.</h2>";
}

function obtenerDetallePelicula(id, idioma) {
  let urlApi = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + apiKey + '&language=' + idioma;
  fetch(urlApi)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      if (data.poster_path) {
        poster.src = 'https://image.tmdb.org/t/p/w500' + data.poster_path;
      } else {
        poster.src = './img/placeholder.jpg';
      }
      poster.alt = data.title;

      titulo.textContent = data.title ? data.title : 'Sin título';
      calificacion.textContent = data.vote_average ? data.vote_average + ' / 10' : 'Sin calificación';
      duracion.textContent = data.runtime ? data.runtime + ' minutos' : 'Duración desconocida';
      fecha.textContent = data.release_date ? data.release_date : 'Fecha desconocida';

      if (data.overview && data.overview.trim() !== '') {
        descripcion.textContent = data.overview;
      } else if (idioma === 'es-ES') {
        obtenerDetallePelicula(id, 'en-US');        
      } else {
        descripcion.textContent = 'Sin sinopsis disponible';
      }

      if (data.genres && data.genres.length > 0) {
        let generosHTML = '';
        for (let i = 0; i < data.genres.length; i++) {
          generosHTML += '<a href="detail-movie-genre.html?id=' + data.genres[i].id + '">' + data.genres[i].name + '</a>';
          if (i < data.genres.length - 1) {
            generosHTML += ', ';
          }
        }
        generos.innerHTML = generosHTML;
      } else {
        generos.textContent = 'Sin géneros disponibles';
      }
    });
}