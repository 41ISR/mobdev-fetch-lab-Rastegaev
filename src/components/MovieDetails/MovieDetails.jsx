import { Link, useParams } from 'react-router-dom';
import LikeButton from '../LikeButton/LikeButton';
import RatingBadge from '../RatingBadge/RatingBadge';
import './MovieDetails.css';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';


function MovieDetails() {
  const { id } = useParams()
  const [isLoadin, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [film, setFilm] = useState()

  
  useEffect(() => {
    const load = async () => {
      setError(null)
      setIsLoading(true)
      try {
        const res = await fetch(`http://www.omdbapi.com/?apikey=505480d7&i=${id}`)
        const data = await res.json()
        if (data.Response === "False") {
          // setError(data)
          throw new Error(data.Error)
        }
        console.log(data)
        setFilm(data)
      } catch (error) {
        console.error(error)
        setError(error.message ?? "Что-то пошло не так")
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [id])
  if(!film && !isLoadin && !error) return <p>Попробуйте найти фильм</p>
  if(isLoadin) return <Loader/>
  if(!isLoadin && error) return <p>{error}</p>
  if(film) return (
    <article className="movie-details">
      <Link to={-1} className="movie-details__back" >
        ← Ко всем фильмам
      </Link>

      <div className="movie-details__layout">
        <div className="movie-details__poster-col">
          <img
            className="movie-details__poster"
            src={film.Poster}
            alt={film.Title}
          />
        </div>

        <div className="movie-details__main">
          <div className="movie-details__heading">
            <div>
              <h1 className="movie-details__title">{film.Title}</h1>
              <p className="movie-details__meta">{film.Year} · {film.Rated} · {film.Runtime}</p>
            </div>
            <LikeButton />
          </div>

          <p className="movie-details__genre">{film.Genre}</p>

          <p className="movie-details__plot">
            {film.Plot}
          </p>

          <div className="movie-details__ratings">
            {film.Ratings.map((el,i) => (
            <RatingBadge rating={el} key={i}/>
            ))}
          </div>

          <dl className="movie-details__facts">
            <div className="movie-details__fact"><dt>Режиссёр</dt><dd>{film.Director}</dd></div>
            <div className="movie-details__fact"><dt>Сценарий</dt><dd>{film.Writer}</dd></div>
            <div className="movie-details__fact"><dt>В ролях</dt><dd>{film.Actors}</dd></div>
            <div className="movie-details__fact"><dt>Дата выхода</dt><dd>{film.Released}</dd></div>
            <div className="movie-details__fact"><dt>Язык</dt><dd>{film.Language}</dd></div>
            <div className="movie-details__fact"><dt>Страна</dt><dd>{film.Country}</dd></div>
            <div className="movie-details__fact"><dt>Награды</dt><dd>{film.Awards}</dd></div>
            <div className="movie-details__fact"><dt>Сборы</dt><dd>{film.BoxOffice}</dd></div>
          </dl>
        </div>
      </div>
    </article>
  );
}

export default MovieDetails;
