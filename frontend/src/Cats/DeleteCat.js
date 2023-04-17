import React from "react"
import { useState } from "react"

function DeleteCat() {
    const [cat, setCat] = useState({
        id: ""
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
        fetch("/cats_delete/" + cat.id, {
            method: "DELETE",
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
            <h3>Delete Cat Section</h3>
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
                {message && <p className="message">{message}</p>}
            </div>
            <button type="submit" className="cat-button">
                <span className="button-text">Submit</span>
            </button>
            {isLoading && <p>Loading...</p>}
        </form>
    )
}

export default DeleteCat