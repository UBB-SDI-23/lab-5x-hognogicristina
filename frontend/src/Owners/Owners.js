import React from "react"
import { useState, useEffect } from "react"

function Owners() {
    const [owners, setOwners] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetch("/owners")
            .then((response) => response.json())
            .then((data) => {
                setOwners(data.data)
                setIsLoading(false)
            })
    }, [])

    return (
        <div>
            <h1>Owner Section</h1>
            <table className="cat-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {owners.map((owner) => {
                        return (
                            <tr key={owner.id}>
                                <td className="cat-name">{owner.firstName}</td>
                                <td>{owner.lastName}</td>
                                <td>{owner.address}</td>
                                <td>{owner.phone}</td>
                                <td className="cat-details">{owner.email}</td>
                                <td>{owner.age}</td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>
            {isLoading && <p>Loading...</p>}
        </div>
    )
}

export default Owners