import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import './HomePage.css';
import { useState } from 'react';
import Loader from '../../components/Loader/Loader';

function HomePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [films, setFilms] = useState(undefined)
  console.log(error)
  return (
    <main className="home-page">
      <div className="container home-page__inner">
        <SearchBar setFilms={setFilms} setError={setError} setIsLoading={setIsLoading}/>
        {!films && !isLoading ? (
          <p className="home-page__section-title">Попробуйте найти фильм</p>
        ) : isLoading ? (
          <Loader />
        ) : error ? (
          <p>{error}</p>
        ) : (
          <section className="home-page__section">
            <h2 className="home-page__section-title">Результат поиска</h2>
            <MovieList films={films} />
          </section>
        )}
      </div>
    </main>
  );
}

export default HomePage;
