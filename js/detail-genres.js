let apiKey = 'bfaef3fe6aa228ec1ff3d56dae5a9aa8';

let pathname = window.location.pathname;
let url = '';
let contenedor;
let esMoviesPage = false;
let esSeriesPage = false;
let esDetailMovieGenrePage = false;
let esDetailSerieGenrePage = false;

if (pathname.indexOf('moviesgenres.html') !== -1) {
  url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + apiKey + '&language=es-ES';
  contenedor = document.getElementById('lista-generos-peliculas');
  esMoviesPage = true;
} else if (pathname.indexOf('seriesgenres.html') !== -1) {
  url = 'https://api.themoviedb.org/3/genre/tv/list?api_key=' + apiKey + '&language=es-ES';
  contenedor = document.getElementById('lista-generos-series');
  esSeriesPage = true;
} else if (pathname.indexOf('detail-movie-genre.html') !== -1) {
  esDetailMovieGenrePage = true;
} else if (pathname.indexOf('detail-serie-genre.html') !== -1) {
  esDetailSerieGenrePage = true;
}

function cargarGeneros() {
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      contenedor.innerHTML = '';

      for (let i = 0; i < data.genres.length; i++) {
        let genero = data.genres[i];

       let href =esMoviesPage
        ? 'detail-movie-genre.html?id=' + genero.id
  : 'detail-serie-genre.html?id=' + genero.id;

contenedor.innerHTML += `
  <li>
    <a href="${href}">
      <h3>${genero.name}</h3>
    </a>
  </li>
`;
      }
    });
}

function cargarContenidoPorGenero(idGenero) {
  let url;
  if (esDetailMovieGenrePage) {
    url = 'https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&with_genres=' + idGenero + '&language=es-ES';
  } else if (esDetailSerieGenrePage) {
    url = 'https://api.themoviedb.org/3/discover/tv?api_key=' + apiKey + '&with_genres=' + idGenero + '&language=es-ES';
  }

  let lista = document.getElementById('lista-peliculas-series');

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      lista.innerHTML = '';

      for (let i = 0; i < data.results.length; i++) {
        let item = data.results[i];
        let nombre = esDetailMovieGenrePage ? item.title : item.name;

        let href = esDetailMovieGenrePage
  ? 'detail-movie.html?id=' + item.id
  : 'detail-serie.html?id=' + item.id;

let imagen = item.poster_path
  ? 'https://image.tmdb.org/t/p/w200' + item.poster_path
  : './img/placeholder.jpg';

lista.innerHTML += `
  <li>
    <a href="${href}">
      <img src="${imagen}" alt="${nombre}">
      <p>${nombre}</p>
    </a>
  </li>
`;

      }
    });
}

function cargarNombreGenero(idGenero) {
  let urlGeneros;
  if (esDetailMovieGenrePage) {
    urlGeneros = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + apiKey + '&language=es-ES';
  } else if (esDetailSerieGenrePage) {
    urlGeneros = 'https://api.themoviedb.org/3/genre/tv/list?api_key=' + apiKey + '&language=es-ES';
  }

  let tituloGenero = document.getElementById('titulo-genero');

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

if (esMoviesPage || esSeriesPage) {
  cargarGeneros();
} else if (esDetailMovieGenrePage || esDetailSerieGenrePage) {
  let queryString = window.location.search;
  let queryStringObj = new URLSearchParams(queryString);
  let generoId = queryStringObj.get('id');

  if (generoId) {
    cargarNombreGenero(generoId);
    cargarContenidoPorGenero(generoId);
  }
}