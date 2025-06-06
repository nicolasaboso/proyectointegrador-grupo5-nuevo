let apiKey = 'bfaef3fe6aa228ec1ff3d56dae5a9aa8';

function crearItem(item, tipo) {
  let titulo;
  let fecha;

  if (tipo === 'movie') {
    titulo = item.title;
    fecha = item.release_date;
  } else {
    titulo = item.name;
    fecha = item.first_air_date;
  }

  let imagen;
  if (item.poster_path) {
    imagen = 'https://image.tmdb.org/t/p/w200' + item.poster_path;
  } else {
    imagen = './img/placeholder.jpg';
  }

  let link;
  if (tipo === 'movie') {
    link = 'detail-movie.html?id=' + item.id;
  } else {
    link = 'detail-serie.html?id=' + item.id;
  }

  let fechaTexto;
  if (fecha) {
    fechaTexto = fecha;
  } else {
    fechaTexto = 'Fecha desconocida';
  }

  let liHTML = 
    '<li>' +
      '<a href="' + link + '">' +
        '<img src="' + imagen + '" alt="' + titulo + '">' +
        '<p>' + titulo + '<br>' + fechaTexto + '</p>' +
      '</a>' +
    '</li>';

  return liHTML;
}

function cargarDatos(url, idContenedor, tipo) {
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let contenedor = document.querySelector('#' + idContenedor);
      contenedor.innerHTML = '';

      let resultados = [];
      for (let i = 0; i < 5; i++) {
        resultados.push(data.results[i]);
      }

      for (let j = 0; j < resultados.length; j++) {
        let liHTML = crearItem(resultados[j], tipo);
        contenedor.innerHTML += liHTML;
      }
    })
    .catch(function(error) {
      console.log('Error: ' + error);
    });
}

let urlPeliculasPopulares = 'https://api.themoviedb.org/3/movie/popular?api_key=' + apiKey + '&language=es-ES';
let urlSeriesPopulares = 'https://api.themoviedb.org/3/tv/popular?api_key=' + apiKey + '&language=es-ES';
let urlPeliculasMejorValoradas = 'https://api.themoviedb.org/3/movie/top_rated?api_key=' + apiKey + '&language=es-ES';

cargarDatos(urlPeliculasPopulares, 'peliculas-populares', 'movie');
cargarDatos(urlSeriesPopulares, 'series-populares', 'tv');
cargarDatos(urlPeliculasMejorValoradas, 'peliculas-mejor-valoradas', 'movie');
