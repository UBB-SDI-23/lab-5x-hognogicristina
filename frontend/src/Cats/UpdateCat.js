import React from "react"
import { useState } from "react"

function UpdateCat() {
    const [cat, setCat] = useState({
        id: "",
        name: "",
        age: "",
        color: "",
        breed: "",
        weight: "",
        ownerId: "",
    })

    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")

    const handleChange = (event) => {
        const value = event.target.value
        setCat({
            ...cat,
            [event.target.name]: value,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setIsLoading(true)
        setMessage("")
        fetch("/cats_update/" + cat.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cat),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setIsLoading(false)
                setMessage(data.message)
            })
    }

    return (
        <form className="crud-section" onSubmit={handleSubmit}>
            <h3>Update Cat Section</h3>
            <div className="form-group">
                <label htmlFor="name">ID</label>
                <input
                    type="text"
                    className="form-control"
                    id="id"
                    name="id"
                    value={cat.id}
                    onChange={handleChange}
                    placeholder="Example: 1"
                />
            </div>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={cat.name}
                    onChange={handleChange}
                    placeholder="Example: Garfield"
                />
            </div>
            <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                    type="text"
                    className="form-control"
                    id="age"
                    name="age"
                    value={cat.age}
                    onChange={handleChange}
                    placeholder="Example: 4"
                />
            </div>
            <div className="form-group">
                <label htmlFor="color">Color</label>
                <input
                    type="text"
                    className="form-control"
                    id="color"
                    name="color"
                    value={cat.color}
                    onChange={handleChange}
                    placeholder="Example: Orange"
                />
            </div>
            <div className="form-group">
                <label htmlFor="breed">Breed</label>
                <input
                    type="text"
                    className="form-control"
                    id="breed"
                    name="breed"
                    value={cat.breed}
                    onChange={handleChange}
                    placeholder="Example: Tabby"
                />
            </div>
            <div className="form-group">
                <label htmlFor="weight">Weight</label>
                <input
                    type="text"
                    className="form-control"
                    id="weight"
                    name="weight"
                    value={cat.weight}
                    onChange={handleChange}
                    placeholder="Example: 10"
                />
            </div>
            <div className="form-group">
                <label htmlFor="ownerId">Owner ID</label>
                <input
                    type="text"
                    className="form-control"
                    id="ownerId"
                    name="ownerId"
                    value={cat.ownerId}
                    onChange={handleChange}
                    placeholder="Example: 1"
                />
                {message && <p className="message">{message}</p>}
            </div>
            <button type="submit" className="btn btn-primary cat-button">
                <span className="button-text">Submit</span>
            </button>
            {isLoading && <p className="loading">Loading...</p>}
        </form>
    )
}

export default UpdateCat