let apiKey = 'bfaef3fe6aa228ec1ff3d56dae5a9aa8';

function crearItem(item, tipo) {
  let li = document.createElement('li');

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

  li.innerHTML = 
    '<a href="' + link + '">' +
      '<img src="' + imagen + '" alt="' + titulo + '">' +
      '<p>' + titulo + '<br>' + (fecha ? fecha : 'Fecha desconocida') + '</p>' +
    '</a>';

  return li;
}

function cargarDatos(url, idContenedor, tipo) {
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let contenedor = document.getElementById(idContenedor);
      contenedor.innerHTML = '';
      let resultados = [];
      for (let i = 0; i < 5; i++) {
        resultados.push(data.results[i]);
      }

      for (let j = 0; j < resultados.length; j++) {
        let li = crearItem(resultados[j], tipo);
        contenedor.appendChild(li);
      }
    });
}

let urlPeliculasPopulares = 'https://api.themoviedb.org/3/movie/popular?api_key=' + apiKey + '&language=es-ES';
let urlSeriesPopulares = 'https://api.themoviedb.org/3/tv/popular?api_key=' + apiKey + '&language=es-ES';
let urlPeliculasMejorValoradas = 'https://api.themoviedb.org/3/movie/top_rated?api_key=' + apiKey + '&language=es-ES';

cargarDatos(urlPeliculasPopulares, 'peliculas-populares', 'movie');
cargarDatos(urlSeriesPopulares, 'series-populares', 'tv');
cargarDatos(urlPeliculasMejorValoradas, 'peliculas-mejor-valoradas', 'movie');
