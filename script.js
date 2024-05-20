const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async function () {
  try {
    const inputKeyword = document.querySelector(".input-keyword");
    const movies = await getMovies(inputKeyword.value);
    updateUI(movies);
  } catch (err) {
    // console.log(err);
    alert(err);
  }
});

function getMovies(keyword) {
  return fetch("http://www.omdbapi.com/?apikey=dca61bcc&s=" + keyword)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then((res) => {
      if (res.Response === "false") {
        throw new Error(res.Error);
      }
      return res.Search;
    });
}

function updateUI(movies) {
  let cards = "";
  movies.forEach((m) => (cards += showCards(m)));
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
}

// Event binding
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modal-detail-button")) {
    console.log("ok");
    const imdbid = e.target.dataset.imdbid;
    const movieDetail = await getMovieDetail(imdbid);
    updateUIDetail(movieDetail);
  }
});

function getMovieDetail(imdbid) {
  return fetch("https://www.omdbapi.com/?apikey=dca61bcc&i=" + imdbid)
    .then((res) => res.json())
    .then((m) => m);
}

function updateUIDetail(m) {
  const movieDetail = showMovieDetail(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movieDetail;
}

<<<<<<< HEAD
function getMovies(keyword) {
  return fetch("https://www.omdbapi.com/?apikey=dca61bcc&s=" + keyword)
    .then((res) => res.json())
    .then((res) => res.Search);
}

function updateUI(movies) {
  let cards = "";
  movies.forEach((m) => (cards += showCards(m)));
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
}

=======
>>>>>>> 5641c87581a56e82b8310e52173a59895f4c8fd3
function showCards(m) {
  return `<div class="col-md-3 my-3">
    <div class="card">
      <img src="${m.Poster}" class="card-img-top" alt="" />
      <div class="card-body">
        <h5 class="card-title">${m.Title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
      </div>
    </div>
  </div>`;
}

function showMovieDetail(m) {
  return `
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <img src="${m.Poster}" class="img-fluid" />
      </div>
      <div class="col-md">
      <ul class="list-group">
      <i class="list-group-item">
        <h4>${m.Title} (${m.Year})</h4>
        </i>
          <li class="list-group-item"><strong>Dirictor : </strong>${m.Director}</li>
          <li class="list-group-item"><strong>Actros : </strong>${m.Actors}</li>
          <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
          <li class="list-group-item"><strong>Plot : </strong><br />${m.Plot}</li>
        </ul>
      </div>
    </div>
  </div>`;
}
