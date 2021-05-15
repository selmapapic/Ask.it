import React from 'react'
import './search.css'

const Search = ({ onChange, placeholder }) => {
    return (
        <div className="Search">
            <span className="SearchSpan">
                <i className="fa fa-search"></i>
            </span>
            <input
                className="SearchInput"
                type="text"
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    )
}

export default Search
