import React from 'react'
import Search from './components/Search.jsx'
import { useState } from 'react';

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <main>
            <header>
                <img src="./hero-img.png" alt="Hero Banner" />
                <h2>Find Movies You'll Enjoy Without the Hassle </h2>
            </header>

            {/* State is passed as props. */}
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <h1>{searchTerm}</h1>




        </main>
    )
}



export default App