import React, { useState, useEffect } from 'react'
import { Typography, Paper } from '@mui/material'
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import axios from 'axios'

function GetOneCat(props) {
    const [catData, setCatData] = useState([])
    
    useEffect(() => {
        // axios.get("https://adopt-a-cat.onrender.com/cats/" + props.id)
        axios.get("http://localhost:8000/cats/" + props.id)
            .then(response => {
                setCatData(response.data.data)
            })
    }, [props.id])

    if (catData) {
        const { name, age, color, breed, weight, description, ownerData } = catData
        const owner = ownerData && ownerData.owner

        return (
            <>
                <TableContainer component={Paper} sx={{ p: 2 }}>
                    <Table aria-label="cat information table">
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', borderBottom: 'none' }}>Cat</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Name</TableCell>
                                <TableCell>{name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Age</TableCell>
                                <TableCell>{age}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Color</TableCell>
                                <TableCell>{color}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Breed</TableCell>
                                <TableCell>{breed}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Weight</TableCell>
                                <TableCell>{weight}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Description</TableCell>
                                <TableCell>{description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', borderBottom: 'none' }}>Owner</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Name</TableCell>
                                <TableCell>{owner && `${owner[0].firstName} ${owner[0].lastName}`}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Address</TableCell>
                                <TableCell>{owner && owner[0].address}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Phone</TableCell>
                                <TableCell>{owner && owner[0].phone}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Email</TableCell>
                                <TableCell>{owner && owner[0].email}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Age</TableCell>
                                <TableCell>{owner && owner[0].age}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
    }

    return (
        <>
            <Typography sx={{ color: "#777" }}>Loading...</Typography>
        </>
    )
}

export default GetOneCat