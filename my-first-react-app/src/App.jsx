import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDebounce } from 'react-use'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx'
import MovieCard from './components/MovieCard.jsx'
import { getTrendingMovies, updateSearchCount } from './appwrite.js'
import './App.css'



const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    const [movieList, setMovieList] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    
    

    // Debounce the search term to prevent making too many API requests
    // by waiting for the user to stop typing for 500ms
    useDebounce(() => setDebouncedSearchTerm(searchTerm), 800, [searchTerm] );

    const fetchMovies = async (query = '') => {
        setIsLoading(true);
        setErrorMessage('');

        try{
            const endpoint = query
                ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
                : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

            const response = await fetch(endpoint, API_OPTIONS);

            // Simulate Error
            // throw new Error('Failed to fetch movies');

            if(!response.ok) {
                throw new Error('Failed to fetch movies');
            }

            const data = await response.json();

            //console.log(data);

            if(data.Respons === 'False') {
                setErrorMessage(data.Error || 'Failed to fetch movies');
                setMovieList([]);

                // Exit out of function
                return;
            }

            setMovieList(data.results || []);

            // If a movie exists for this query (searchTerm)
            if(query && data.results.length > 0) {
                await updateSearchCount(query, data.results[0]);
            }
            

        } catch (error) {
            console.error(`Error fetching movies: ${error}`);
            setErrorMessage('Error fetching movies. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }

    const loadTrendingMovies = async () => {
        try {
            const movies = await getTrendingMovies();

            setTrendingMovies(movies);
        } catch (error) {
            console.error(`Error fetching trending movies: ${error}`);
        }
    }

    useEffect(() => {
        fetchMovies(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    useEffect(() => {
        loadTrendingMovies();
    }, []);

    return (
        <main>
            <div className="pattern"/>

            <div className="wrapper">
                <header>
                    <img src="./hero-img.png" alt="Hero Banner" />
                    <h2>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle </h2>

                    {/* State is passed as props. */}
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

                </header>

                {/* // if trending movies exist, render another section */}
                {trendingMovies.length > 0 && (
                    <section className="trending">
                        <h2>Trending Movies</h2>

                        <ul>
                            {trendingMovies.map((movie, index) =>(
                                <li key={movie.$id}>
                                    <p>{index + 1}</p>
                                    <img src={movie.poster_url} alt={movie.title} />
                                </li>
                            ))}
                        </ul>
                       
                    </section>
                )}

                <section className="all-movies">
                    <h2>All Movies</h2>

                    {/* multiple conditions */}
                    {isLoading ? (
                        <Spinner />
                    ) : errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) : (
                        <ul>
                            {/* If you use () => () ,not {} , you dont need to write return; */}
                            {movieList.map((movie) => ( 
                            
                                <MovieCard key={movie.id} movie={movie}/>
                            ))}
                        </ul>
                    )}
            
                    {/* Inline If with Logical && Operator. If the condition is true , the element right after && will appear in the output. If it is false , React will ignore and skip it. */}
                    {/* {errorMessage && <p>{errorMessage}</p>} */}
                </section>
            </div>
        </main>
    )
}



export default App