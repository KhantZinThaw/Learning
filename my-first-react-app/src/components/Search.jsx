import React from 'react'

// const Search = (props), {props.searchTerm}, props here is object. Destructure props e.g {name, age} = props, and use name and age directly.
// props should never be changed by its child component. Read only! Never mutates props and States! (only with setStateName)
const Search = ({searchTerm, setSearchTerm}) => {
    return (
        <div className='search'>
            <div>
                <img src="Vector.svg" alt="search" />
                <input 
                    type = "text"
                    placeholder="Search for a movie..."
                    value={searchTerm}
                    onChange= {(e) => setSearchTerm(e.target.value)}
                />
            </div>
        
        {/* <div style={{ fontSize: '24px', color: 'white' }}>
            {searchTerm}
        </div> */}

        </div>


    )
}



export default Search