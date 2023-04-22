import React, { useState } from "react"
import NewListCats from "./NewListCats"

function FilterCats() {
    const [weight, setWeight] = useState(null)

    const handleChange = (event) => {
        var value = event.target.value
        setWeight(value)
    }

    return (
        <div className="crud-section">
            <h2>Filter Cats</h2>
            <form onSubmit={(event) => event.preventDefault()}>
                <p>Enter a number to filter the cats which has the weight greater than that number.</p>
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
