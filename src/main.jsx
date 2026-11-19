import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage.jsx'
import SearchBar from './components/SearchBar/SearchBar.jsx'
import AboutPage from './pages/AboutPage/AboutPage.jsx'
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage.jsx'

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage f/>} />
          <Route path='movie/:id' element={<MovieDetailsPage />} />
          <Route path='about' element={<AboutPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode >,
)
