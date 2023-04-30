import React, { useState, useEffect } from 'react'
import { Typography, Paper } from '@mui/material'
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import axios from 'axios'

function GetOneOwner(props) {
    const [ownerData, setOwnerData] = useState(null)

    useEffect(() => {
        axios.get("https://adopt-a-cat.onrender.com/owners/" + props.id)
            .then(response => {
                setOwnerData(response.data.data)
            })
    }, [ownerData, props.id])

    if (ownerData) {
        const { firstName, lastName, address, phone, email, age, catsData } = ownerData
        let noCats = null

        if (catsData) {
            noCats = catsData.noCats
        } else {
            noCats = 0
        }

        return (
            <>
                <TableContainer component={Paper} sx={{ p: 2 }}>
                    <Table aria-label="cat information table">
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', borderBottom: 'none' }}>Owner</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">First Name</TableCell>
                                <TableCell>{firstName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Last Name</TableCell>
                                <TableCell>{lastName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Address</TableCell>
                                <TableCell>{address}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Phone</TableCell>
                                <TableCell>{phone}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Email</TableCell>
                                <TableCell>{email}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Age</TableCell>
                                <TableCell>{age}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Number of Cats</TableCell>
                                <TableCell>{noCats === 0 ? "No cats" : noCats}</TableCell>
                            </TableRow>
                            {catsData && catsData.cats.map((cat, index) => {
                                return (
                                    <>
                                        <TableRow key={cat.id}>
                                            <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', borderBottom: 'none' }}>Cat {index + 1}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Name</TableCell>
                                            <TableCell>{cat.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Age</TableCell>
                                            <TableCell>{cat.age}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Color</TableCell>
                                            <TableCell>{cat.color}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Breed</TableCell>
                                            <TableCell>{cat.breed}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Weight</TableCell>
                                            <TableCell>{cat.weight}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Description</TableCell>
                                            <TableCell>{cat.description}</TableCell>
                                        </TableRow>
                                    </>
                                )
                            })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
    } else {
        return (
            <>
                <Typography sx={{ color: "#777" }}>Loading...</Typography>
            </>
        )
    }
}

export default GetOneOwner
