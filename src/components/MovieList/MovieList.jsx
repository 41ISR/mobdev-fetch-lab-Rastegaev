import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';

function MovieList(promise) {
  console.log(promise.films);

  if (!promise.films?.Search?.length) return null;

  return (
    <ul className="movie-list">
      {promise.films.Search.map((el, i) => (
        <li key={i}>
          <MovieCard films={el} />
        </li>
      ))}
    </ul>
  );
}

export default MovieList;