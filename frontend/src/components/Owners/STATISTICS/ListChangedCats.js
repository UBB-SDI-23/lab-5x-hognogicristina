import React from 'react'
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material"

function ListChangedCats({ changedCats }) {
    return (
        <Box>
            <Typography variant="h6" sx={{ marginBottom: "1rem", color: "#777" }}>
                List of changed cats
            </Typography>
            <TableContainer component={Paper} sx={{ maxWidth: "90%", margin: "0 auto" }}>
                <Table aria-label="cat table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Age</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Color</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Breed</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Weight</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Description</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>New Owner ID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {changedCats.map((cat) => (
                            <TableRow key={cat.id}>
                                <TableCell align="center" component="th" scope="row">{cat.name}</TableCell>
                                <TableCell align="center" component="th" scope="row">{cat.age}</TableCell>
                                <TableCell align="center" component="th" scope="row">{cat.color}</TableCell>
                                <TableCell align="center" component="th" scope="row">{cat.breed}</TableCell>
                                <TableCell align="center" component="th" scope="row">{cat.weight}</TableCell>
                                <TableCell align="center" component="th" scope="row">{cat.description}</TableCell>
                                <TableCell align="center" component="th" scope="row">{cat.ownerId}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default ListChangedCats