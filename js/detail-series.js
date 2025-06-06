let apiKey = 'bfaef3fe6aa228ec1ff3d56dae5a9aa8';

let poster = document.getElementById('poster');
let titulo = document.getElementById('titulo');
let calificacion = document.getElementById('calificacion');
let fecha = document.getElementById('fecha');
let descripcion = document.getElementById('descripcion');
let generos = document.getElementById('generos');

let url = window.location.search;
let partes = url.split('=');
let serieId = partes.length > 1 ? partes[1] : null;

if (serieId) {
  obtenerDetalleSerie(serieId, 'es-ES');
} else {
  document.body.innerHTML = "<h2 style='text-align:center;margin-top:50px;'>No se encontró ninguna serie seleccionada.</h2>";
}

function obtenerDetalleSerie(id, idioma) {
  let urlApi = 'https://api.themoviedb.org/3/tv/' + id + '?api_key=' + apiKey + '&language=' + idioma;
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
      poster.alt = data.name;

      titulo.textContent = data.name ? data.name : 'Sin título';
      calificacion.textContent = data.vote_average ? data.vote_average + ' / 10' : 'Sin calificación';
      fecha.textContent = data.first_air_date ? data.first_air_date : 'Fecha desconocida';

      if (data.overview && data.overview.trim() !== '') {
        descripcion.textContent = data.overview;
      } else if (idioma === 'es-ES') {
        obtenerDetalleSerie(id, 'en-US');
      } else {
        descripcion.textContent = 'Sin sinopsis disponible';
      }

      if (data.genres && data.genres.length > 0) {
        let generosHTML = '';
        for (let i = 0; i < data.genres.length; i++) {
          generosHTML += '<a href="detail-serie-genre.html?id=' + data.genres[i].id + '">' + data.genres[i].name + '</a>';
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
