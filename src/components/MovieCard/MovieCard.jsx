import { Link } from 'react-router-dom';
import LikeButton from '../LikeButton/LikeButton';
import './MovieCard.css';

function MovieCard(promise) {
  return (
    <Link to={`/movie/${promise.films.imdbID}`}>
      <article className="movie-card">
        <button type="button" className="movie-card__poster-button" aria-label="Открыть страницу фильма «Joker»">
          <img
            className="movie-card__poster"
            src={promise.films.Poster}
            alt="Joker"
          />
          <span className="movie-card__type">{promise.films.Type}</span>
        </button>

        <div className="movie-card__like">
          <LikeButton />
        </div>

        <div className="movie-card__info">
          <h3 className="movie-card__title" title="Joker" style={{ textWrap: 'balance' }}>{promise.films.Title}</h3>
          <p className="movie-card__year">{promise.films.Year}</p>
        </div>
      </article>
    </Link>
  );
}

export default MovieCard;
