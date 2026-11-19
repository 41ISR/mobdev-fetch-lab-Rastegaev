import { useNavigate, useSearchParams } from 'react-router-dom';
import './SearchBar.css';
import { useEffect, useState } from 'react';

function SearchBar(promise) {
  const [searchParams] = useSearchParams()

  const queryParams = searchParams.get('q') || ''
  const [query, setQuery] = useState(queryParams)
  const navigate = useNavigate()
  const HandelSubmit = (e) => {
    if (e.target.query.value.trim().length === 0) return
    e.preventDefault()
    navigate('/?q=' + encodeURIComponent(e.target.query.value))

  }
  useEffect(() => {
    const load = async () => {
      promise.setError(null)
      promise.setIsLoading(true)

      try {
        const res = await fetch('http://www.omdbapi.com/?apikey=505480d7&s=' + queryParams+'&limit=10')
        const data = await res.json()
        if (data.Response === "False") {
          throw new Error(data.Error)
        }
        promise.setFilms(data)
      } catch (error) {
        console.error(error)
        promise.setError(error.message ?? "Что-то пошло не так")
      } finally {
        promise.setIsLoading(false)
      }
    }
    load()
  }, [queryParams])
  return (
    <form className="search-bar" onSubmit={HandelSubmit}>
      <span className="search-bar__eyebrow">Найти фильм или сериал</span>
      <div className="search-bar__row">
        <input
          type="text"
          className="search-bar__input"
          placeholder="Например: Joker, Interstellar, Dune…"
          value={query}
          name="query"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-bar__button">Искать</button>
      </div>
    </form>
  );
}

export default SearchBar;
