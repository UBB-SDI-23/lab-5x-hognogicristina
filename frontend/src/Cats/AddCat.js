import React from "react"
import { useState } from "react"

function AddCat() {
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
    const [error, setError] = useState("")

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
        setError("")
        if (!cat.id) {
            setError("ID is required")
            return
        }
        setMessage("")
        fetch("/cats_add", {
            method: "POST",
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
            <h3>Add Cat Section</h3>
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
                {error && <p className="error">{error}</p>}
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
                    placeholder="Example: Tom"
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
                    placeholder="Example: 2"
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
                    placeholder="Example: black"
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
                    placeholder="Example: Persian"
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
                    placeholder="Example: 5"
                />
            </div>
            <div className="form-group">
                <label htmlFor="ownerId">Owner</label>
                <input
                    type="text"
                    className="form-control"
                    id="ownerId"
                    name="ownerId"
                    value={cat.ownerId}
                    onChange={handleChange}
                    placeholder="Example: 1"
                />
            </div>
            {message && <p className="message">{message}</p>}
            <button type="submit" className="btn btn-primary cat-button">
                <span className="button-text">Submit</span>
            </button>
            {isLoading && <p>Loading...</p>}
        </form>
    )
}

export default AddCat
