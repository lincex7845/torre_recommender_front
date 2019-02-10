import React from "react";

const SearchBar = ({onSearch}) => {
    const handleChangeText = e => { onSearch(e.target.value);};
    return (
        <div className=" input-group-lg">
            <input type="search" className="form-control" onChange={handleChangeText} placeholder="Type your username from Torre Bio" id="username-search"></input>
        </div>
    );
};

export default SearchBar;