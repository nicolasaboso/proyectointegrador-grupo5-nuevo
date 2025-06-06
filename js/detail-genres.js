let apiKey = 'bfaef3fe6aa228ec1ff3d56dae5a9aa8';

let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
let generoId = queryStringObj.get('id');

let moviesGenero = document.querySelector("#lista-generos-peliculas");
let seriesGenero = document.querySelector("#lista-generos-series");
let lista = document.querySelector("#lista-peliculas-series");
let tituloGenero = document.querySelector("#titulo-genero");

function cargarGeneros(url, contenedor, detalle) {
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        contenedor.innerHTML = "";
        for (let i = 0; i < data.genres.length; i++) {
            contenedor.innerHTML += `
                <li>
                    <a href="${detalle}?id=${data.genres[i].id}">
                        <h3>${data.genres[i].name}</h3>
                    </a>
                </li>`;
        }
    })
    .catch(function(error) {
        console.log("Error: " + error);
    });
}

function cargarContenidoPorGenero(url, tipo) {
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        lista.innerHTML = "";
        for (let i = 0; i < data.results.length; i++) {
            let nombre = tipo === "movie" ? data.results[i].title : data.results[i].name;
            let href = tipo === "movie"
                ? `detail-movie.html?id=${data.results[i].id}`
                : `detail-serie.html?id=${data.results[i].id}`;

            lista.innerHTML += `
                <li>
                    <a href="${href}">
                        <img src="https://image.tmdb.org/t/p/w200${data.results[i].poster_path}" alt="${nombre}">
                        <p>${nombre}</p>
                    </a>
                </li>`;
        }
    })
    .catch(function(error) {
        console.log("Error: " + error);
    });
}

function cargarNombreGenero(url) {
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        for (let i = 0; i < data.genres.length; i++) {
            if (`${data.genres[i].id}` === generoId) {
                tituloGenero.innerText = data.genres[i].name;
            }
        }
    })
    .catch(function(error) {
        console.log("Error: " + error);
    });
}

if (moviesGenero) {
    let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=es-ES`;
    cargarGeneros(url, moviesGenero, "detail-movie-genre.html");
} else if (seriesGenero) {
    let url = `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=es-ES`;
    cargarGeneros(url, seriesGenero, "detail-serie-genre.html");
} else if (lista && generoId) {
    let tipo;
    let urlContenido;
    let urlGenero;
    if (document.querySelector(".detalle-movie")) {
        tipo = "movie";
        urlContenido = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${generoId}&language=es-ES`;
        urlGenero = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=es-ES`;
    } else {
        tipo = "serie";
        urlContenido = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${generoId}&language=es-ES`;
        urlGenero = `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=es-ES`;
    }
    cargarNombreGenero(urlGenero);
    cargarContenidoPorGenero(urlContenido, tipo);
}
