let apiKey = 'bfaef3fe6aa228ec1ff3d56dae5a9aa8';

let queryString = window.location.search;
let queryStringObj = new URLSearchParams(queryString);
let generoId = queryStringObj.get('id');

let tituloGenero = document.getElementById('titulo-genero');
let lista = document.getElementById('lista-series');

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

        let li = document.createElement('li');
        let a = document.createElement('a');
        let img = document.createElement('img');
        let p = document.createElement('p');

        if (serie.poster_path) {
          img.src = 'https://image.tmdb.org/t/p/w200' + serie.poster_path;
        } else {
          img.src = './img/placeholder.jpg';
        }

        a.href = 'detail-serie.html?id=' + serie.id;
        img.alt = serie.name;
        p.textContent = serie.name;

        a.appendChild(img);
        a.appendChild(p);
        li.appendChild(a);
        lista.appendChild(li);
      }
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
        if (data.genres[i].id == idGenero) {
          tituloGenero.innerText = data.genres[i].name;
        }
      }
    });
}

if (generoId) {
  cargarNombreGenero(generoId);
  cargarSeriesPorGenero(generoId);
}