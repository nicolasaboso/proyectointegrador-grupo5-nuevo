let apiKey = 'bfaef3fe6aa228ec1ff3d56dae5a9aa8';

let pathname = window.location.pathname;
let url = '';
let contenedor;

if (pathname.indexOf('moviesgenres.html') !== -1) {
  url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + apiKey + '&language=es-ES';
  contenedor = document.getElementById('lista-generos-peliculas');
} else if (pathname.indexOf('seriesgenres.html') !== -1) {
  url = 'https://api.themoviedb.org/3/genre/tv/list?api_key=' + apiKey + '&language=es-ES';
  contenedor = document.getElementById('lista-generos-series');
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

        let li = document.createElement('li');
        let a = document.createElement('a');
        let h3 = document.createElement('h3');

        if (pathname.indexOf('moviesgenres.html') !== -1) {
          a.href = 'detail-movie-genre.html?id=' + genero.id;
        } else if (pathname.indexOf('seriesgenres.html') !== -1) {
          a.href = 'detail-serie-genre.html?id=' + genero.id;
        }

        h3.innerText = genero.name;

        a.appendChild(h3);
        li.appendChild(a);
        contenedor.appendChild(li);
      }
    });
}

if (url !== '') {
  cargarGeneros();
}
