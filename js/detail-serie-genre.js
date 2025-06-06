let apiKey = 'bfaef3fe6aa228ec1ff3d56dae5a9aa8';

let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
let generoId = queryStringObj.get('id');

let tituloGenero = document.querySelector('#titulo-genero');
let lista = document.querySelector('#lista-series');

function cargarSeriesPorGenero(idGenero) {
  let url = 'https://api.themoviedb.org/3/discover/tv?api_key=' + apiKey + '&with_genres=' + idGenero + '&language=es-ES';

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      lista.innerHTML = '';

      for (let i = 0; i < data.results.length; i++) {
        let serie = data.results[i];
        let poster;

        if (serie.poster_path) {
          poster = 'https://image.tmdb.org/t/p/w200' + serie.poster_path;
        } else {
          poster = './img/placeholder.jpg';
        }

        lista.innerHTML += 
          '<li>' +
            '<a href="detail-serie.html?id=' + serie.id + '">' +
              '<img src="' + poster + '" alt="' + serie.name + '">' +
              '<p>' + serie.name + '</p>' +
            '</a>' +
          '</li>';
      }
    })
    .catch(function(error) {
      console.log('Error: ' + error);
    });
}

function cargarNombreGenero(idGenero) {
  let urlGeneros = 'https://api.themoviedb.org/3/genre/tv/list?api_key=' + apiKey + '&language=es-ES';

  fetch(urlGeneros)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      for (let i = 0; i < data.genres.length; i++) {
        if ('' + data.genres[i].id === generoId) {
          tituloGenero.innerText = data.genres[i].name;
        }
      }
    })
    .catch(function(error) {
      console.log('Error: ' + error);
    });
}

if (generoId) {
  cargarNombreGenero(generoId);
  cargarSeriesPorGenero(generoId);
}
