import React, { useState } from "react"
import NewListCats from "./NewListCats"

function FilterCats() {
    const [weight, setWeight] = useState("")

    const handleChange = (event) => {
        setWeight(event.target.value)
    }

    return (
        <div className="crud-section">
            <h2>Filter Cats</h2>
            <form onSubmit={(event) => event.preventDefault()}>
                <p>Enter a weight to filter the cats by weight.</p>
                <input
                    type="text"
                    placeholder="Enter a weight"
                    value={weight}
                    onChange={handleChange}
                />
            </form>
            {weight && <NewListCats weight={weight} />}
        </div>
    )
}

export default FilterCats
