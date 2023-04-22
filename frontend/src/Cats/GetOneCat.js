import React, { useState, useEffect } from 'react'
import { Typography, Paper } from '@mui/material'
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import axios from 'axios'

function GetOneCat(props) {
    const [catData, setCatData] = useState(null)

    useEffect(() => {
        axios.get("http://localhost:8000/cats/" + props.id)
            .then(response => {
                setCatData(response.data.data)
            })
    }, [props.id])

    const pStyle = {
        fontSize: '2rem',
        lineHeight: 1.5,
        color: '#777',
        marginBottom: '1.5rem',
        textShadow: '1px 1px #eee'
    }
    
    if (catData) {
        const { id, name, age, color, breed, weight, ownerData } = catData
        const { owner } = ownerData

        return (
            <>
                <TableContainer component={Paper} sx={{ p: 2 }}>
                    <Table aria-label="cat information table">
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">Name</TableCell>
                                <TableCell>{name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Cat Age</TableCell>
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
                                <TableCell component="th" scope="row">Owner</TableCell>
                                <TableCell>{owner[0].firstName} {owner[0].lastName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Address</TableCell>
                                <TableCell>{owner[0].address}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Phone</TableCell>
                                <TableCell>{owner[0].phone}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Email</TableCell>
                                <TableCell>{owner[0].email}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Owner Age</TableCell>
                                <TableCell>{owner[0].age}</TableCell>
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

export default GetOneCat
