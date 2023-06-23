import React, { useState } from "react";



export default function Search(props) {
    const [City, setCity] = useState("");

    function searchFieldHandler(evt) {
        setCity(evt.target.value)
    }

    function SearchSubmitHandler(evt) {
        evt.preventDefault();
        props.Add(City);
        setCity("");
    }

    return (
        <div>
            <form onSubmit={SearchSubmitHandler}>
                <input type="text" name="city" id="city" value={City} onChange={searchFieldHandler}></input>
                <button>Find</button>
            </form>
        </div>
    )
}