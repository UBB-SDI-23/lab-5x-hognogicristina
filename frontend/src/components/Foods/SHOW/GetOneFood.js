import React, { useState, useEffect } from 'react'
import { Typography, Paper } from '@mui/material'
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import axios from 'axios'

function GetOneFood(props) {
    const [foodData, setFoodData] = useState([])

    useEffect(() => {
        axios.get(`https://adopt-a-cat.onrender.com/foods/${props.id}`)
        // axios.get(`/foods/${props.id}`)
        // axios.get(`http://localhost:8000/foods/${props.id}`)
            .then(response => {
                setFoodData(response.data.data)
            })
    }, [foodData, props.id])

    if (foodData) {
        const { name, brand, price, quantity, type } = foodData

        return (
            <>
                <TableContainer component={Paper} sx={{ p: 2 }}>
                    <Table aria-label="food information table">
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', borderBottom: 'none' }}>Food</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Name</TableCell>
                                <TableCell>{name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Brand</TableCell>
                                <TableCell>{brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Price</TableCell>
                                <TableCell>{price}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Quantity</TableCell>
                                <TableCell>{quantity}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Type</TableCell>
                                <TableCell>{type}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
    } else if (!foodData) {
        return (
            <>
                <Typography variant="body1" align="center" sx={{ fontSize: '1.2rem', lineHeight: 1.5, color: '#777', marginBottom: '1.5rem', textShadow: '1px 1px #eee' }}>
                    No food found.
                </Typography>
            </>
        )
    }
}

export default GetOneFood
