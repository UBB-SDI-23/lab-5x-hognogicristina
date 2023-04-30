import React, { useState, useEffect } from 'react'
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import axios from 'axios'

function StatisticListCats(props) {
    const [catData, setCatData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        axios.get("https://adopt-a-cat.onrender.com/cats_statistic/" + props.breed)
            .then(response => {
                setCatData(response.data.data)
                setIsLoading(false)
            })
    }, [props.breed])

    const pStyle = {
        fontSize: '1.2rem',
        lineHeight: 1.5,
        color: '#777',
        marginBottom: '1.5rem',
        textShadow: '1px 1px #eee'
    }

    if (isLoading) {
        return <Typography sx={{ color: "#777" }}>Loading...</Typography>
    }

    return (
        <>
            {catData.length === 0 ? (
                <Typography variant="body1" align="center" sx={{ ...pStyle }}>
                    No cats found.
                </Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table aria-label="cat table">
                        <TableHead>
                            <TableRow >
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Age</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Color</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Breed</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Weight</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Description</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Owner</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Owners' Average Age</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {catData.map(cat => (
                                <TableRow key={cat.id}>
                                    <TableCell align="center">{cat.name}</TableCell>
                                    <TableCell align="center">{cat.age}</TableCell>
                                    <TableCell align="center">{cat.color}</TableCell>
                                    <TableCell align="center">{cat.breed}</TableCell>
                                    <TableCell align="center">{cat.weight}</TableCell>
                                    <TableCell align="center">{cat.description}</TableCell>
                                    <TableCell align="center">{cat.owner.firstName}</TableCell>
                                    <TableCell align="center">{cat.avgAge}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    )
}

export default StatisticListCats

