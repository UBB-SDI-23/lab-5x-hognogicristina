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
    }, [props.id])

    if (ownerData) {
        const { firstName, lastName, address, phone, email, age, catData } = ownerData
        const { cat } = catData

        return (
            <>
                <TableContainer component={Paper} sx={{ p: 2 }}>
                    <Table aria-label="cat information table">
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', borderBottom: 'none' }}>Cat</TableCell>
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
                                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', borderBottom: 'none' }}>Cats</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Name</TableCell>
                                <TableCell>{cat[0].name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Age</TableCell>
                                <TableCell>{cat[0].age}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Color</TableCell>
                                <TableCell>{cat[0].color}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Breed</TableCell>
                                <TableCell>{cat[0].breed}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Weight</TableCell>
                                <TableCell>{cat[0].weight}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Description</TableCell>
                                <TableCell>{cat[0].description}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
    }

    return (
        <>
            <Typography variant="p" gutterBottom>Loading...</Typography>
        </>
    )
}

export default GetOneOwner
