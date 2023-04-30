import { useState, useEffect } from "react"
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from "@mui/material"
import axios from 'axios'

function StatisticOwner() {
    const [owners, setOwners] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        setIsLoading(true)
        axios.get("https://adopt-a-cat.onrender.com/owners_statistic")
            .then(response => {
                setOwners(response.data.data)
                setIsLoading(false)
            })
        // fetch("https://adopt-a-cat.onrender.com/owners_statistic")
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setOwners(data.data)
        //         setIsLoading(false)
        //     })
    }, [])

    if (isLoading) {
        return <Typography sx={{ color: "#777" }}>Loading...</Typography>
    }

    const h2Style = {
        fontSize: '1.6rem',
        color: '#333',
        textTransform: 'uppercase',
        letterSpacing: '0.1rem',
        marginBottom: '1rem',
        borderBottom: '3px solid #f36',
        paddingBottom: '0.5rem',
        textShadow: '1px 1px #eee'
    }

    const pStyle = {
        fontSize: '1.2rem',
        lineHeight: 1.5,
        color: '#777',
        marginBottom: '1.5rem',
        textShadow: '1px 1px #eee'
    }

    console.log(owners)

    return (
        <Box sx={{ textAlign: "center", p: 2, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ ...h2Style }}>
                Statistic Owners
            </Typography>
            <form onSubmit={(event) => event.preventDefault()}>
                <Typography variant="body1" sx={{ margin: "1rem 0", ...pStyle }}>
                    This page shows a Statistic of Owners and their Cats by cats' average age.
                    The owners are sorted by the average age of their cats in ascending order.
                </Typography>
            </form>
            <>
                {owners.length === 0 ? (
                    <Typography variant="body1" align="center" sx={{ ...pStyle }}>
                        No owners found.
                    </Typography>
                ) : (
                    <TableContainer component={Paper}>
                        <Table aria-label="owner table">
                            <TableHead>
                                <TableRow >
                                    <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>First Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Last Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Age</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Cats' Averagex Age</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {owners.map((owner) => (
                                    <TableRow key={owner.id}>
                                        <TableCell>{owner.id}</TableCell>
                                        <TableCell>{owner.first_name}</TableCell>
                                        <TableCell>{owner.last_name}</TableCell>
                                        <TableCell>{owner.address}</TableCell>
                                        <TableCell>{owner.phone}</TableCell>
                                        <TableCell>{owner.email}</TableCell>
                                        <TableCell>{owner.age}</TableCell>
                                        <TableCell>{owner.avgAge}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </>
        </Box>
    )
}

export default StatisticOwner
