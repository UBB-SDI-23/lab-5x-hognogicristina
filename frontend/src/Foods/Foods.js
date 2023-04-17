import React from "react"
import { useState, useEffect } from "react"

function Foods() {
    const [foods, setFoods] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetch("/foods")
            .then((response) => response.json())
            .then((data) => {
                setFoods(data.data)
                setIsLoading(false)
            })
    }, [])

    return (
        <div>
            <h1>Food Section</h1>
            <table className="cat-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {foods.map((food) => {
                        return (
                            <tr key={food.id}>
                                <td className="cat-name">{food.name}</td>
                                <td>{food.brand}</td>
                                <td>{food.price}</td>
                                <td>{food.quantity}</td>
                                <td>{food.type}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {isLoading && <p>Loading...</p>}
        </div>
    )
}

export default Foods