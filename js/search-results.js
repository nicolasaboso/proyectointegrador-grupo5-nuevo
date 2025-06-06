let apiKey = 'bfaef3fe6aa228ec1ff3d56dae5a9aa8';

let queryString = window.location.search;
let queryStringObj = new URLSearchParams(queryString);
let terminoBuscado = queryStringObj.get('user');

let tituloBusqueda = document.getElementById('titulo-busqueda');
let resultados = document.getElementById('resultados');
let spinner = document.getElementById('spinner');
let sinResultados = document.getElementById('sin-resultados');

tituloBusqueda.textContent = 'Resultados de búsqueda para: "' + terminoBuscado + '"';

function buscar(termino) {
  spinner.style.display = 'block';

  let urlPelicula = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&query=' + termino + '&language=es-ES';
  let urlSerie = 'https://api.themoviedb.org/3/search/tv?api_key=' + apiKey + '&query=' + termino + '&language=es-ES';

  fetch(urlPelicula)
    .then(function(response) {
      return response.json();
    })
    .then(function(peliculas) {
      fetch(urlSerie)
        .then(function(response) {
          return response.json();
        })
        .then(function(series) {
          spinner.style.display = 'none';

          resultados.innerHTML = '';

          let datos = peliculas.results.concat(series.results);

          if (datos.length === 0) {
            sinResultados.style.display = 'block';
          } else {
            sinResultados.style.display = 'none';

            for (let i = 0; i < datos.length; i++) {
              let item = datos[i];

              let li = document.createElement('li');
              let a = document.createElement('a');
              let img = document.createElement('img');
              let h3 = document.createElement('h3');

              if (item.title) {
                a.href = 'detail-movie.html?id=' + item.id;
                img.alt = item.title;
                h3.textContent = item.title + (item.release_date ? ' (' + item.release_date.slice(0, 4) + ')' : '');
              } else {
                a.href = 'detail-serie.html?id=' + item.id;
                img.alt = item.name;
                h3.textContent = item.name + (item.first_air_date ? ' (' + item.first_air_date.slice(0, 4) + ')' : '');
              }

              img.src = item.poster_path ? 'https://image.tmdb.org/t/p/w200' + item.poster_path : './img/placeholder.jpg';

              a.appendChild(img);
              a.appendChild(h3);
              li.appendChild(a);
              resultados.appendChild(li);
            }
          }
        });
    });
}

if (terminoBuscado) {
  buscar(terminoBuscado);
}
