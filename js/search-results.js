let apiKey = 'bfaef3fe6aa228ec1ff3d56dae5a9aa8';

let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
let terminoBuscado = queryStringObj.get('user');

let tituloBusqueda = document.querySelector('#titulo-busqueda');
let resultados = document.querySelector('#resultados');
let spinner = document.querySelector('#spinner');
let sinResultados = document.querySelector('#sin-resultados');

tituloBusqueda.innerText = 'Resultados de búsqueda para: "' + terminoBuscado + '"';

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

          let datos = [];
          for (let i = 0; i < peliculas.results.length; i++) {
            datos.push(peliculas.results[i]);
          }
          for (let i = 0; i < series.results.length; i++) {
            datos.push(series.results[i]);
          }

          if (datos.length === 0) {
            sinResultados.style.display = 'block';
          } else {
            sinResultados.style.display = 'none';

            for (let i = 0; i < datos.length; i++) {
              let item = datos[i];

              let imagen;
              if (item.poster_path) {
                imagen = 'https://image.tmdb.org/t/p/w200' + item.poster_path;
              } else {
                imagen = './img/placeholder.jpg';
              }

              let nombre;
              let fecha = '';
              let link;

              if (item.title) {
                nombre = item.title;
                if (item.release_date) {
                  fecha = ' (' + item.release_date.substring(0, 4) + ')';
                }
                link = 'detail-movie.html?id=' + item.id;
              } else {
                nombre = item.name;
                if (item.first_air_date) {
                  fecha = ' (' + item.first_air_date.substring(0, 4) + ')';
                }
                link = 'detail-serie.html?id=' + item.id;
              }

              resultados.innerHTML += 
                '<li>' +
                  '<a href="' + link + '">' +
                    '<img src="' + imagen + '" alt="' + nombre + '">' +
                    '<h3>' + nombre + fecha + '</h3>' +
                  '</a>' +
                '</li>';
            }
          }
        })
        .catch(function(error) {
          console.log('Error al buscar series: ' + error);
          spinner.style.display = 'none';
        });
    })
    .catch(function(error) {
      console.log('Error al buscar películas: ' + error);
      spinner.style.display = 'none';
    });
}

if (terminoBuscado) {
  buscar(terminoBuscado);
}
