import React, { useState, useEffect } from "react"

function NewListCats(props) {
    const [cats, setCats] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetch("http://localhost:8000/cats_filter/" + props.weight)
            .then((response) => response.json())
            .then((data) => {
                setCats(data.data)
                setIsLoading(false)
            })
    }, [props.weight])

    return (
        <div>
            {cats.length === 0 ? (
                <p>No cats found.</p>
            ) : (
                <table className="cat-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Color</th>
                            <th>Breed</th>
                            <th>Weight</th>
                            <th>Owner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cats.map((cat) => {
                            return (
                                <tr key={cat.id}>
                                    <td className="cat-name">{cat.name}</td>
                                    <td>{cat.age}</td>
                                    <td>{cat.color}</td>
                                    <td>{cat.breed}</td>
                                    <td>{cat.weight}</td>
                                    <td className="cat-details">{cat.ownerId}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
            {isLoading && <p>Loading...</p>}
        </div>
    )
}

export default NewListCats
