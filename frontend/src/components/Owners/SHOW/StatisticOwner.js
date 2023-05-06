import { useState, useEffect } from "react"
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from "@mui/material"
import axios from 'axios'
import Pagination from '@mui/material/Pagination'

function StatisticOwner() {
    const [owners, setOwners] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        setIsLoading(true)
        axios.get(`/owners_statistic?page=${page}&page_size=${pageSize}`)
            .then(response => {
                setOwners(response.data.data.owners)
                setTotalPages(response.data.data.pageInfo.totalPages)
                setIsLoading(false)
            })
    }, [page, pageSize])

    // useEffect(() => {
    //     setIsLoading(true)
    //     axios.get(`http://localhost:8000/owners_statistic?page=${page}&page_size=${pageSize}`)
    //         .then(response => {
    //             setOwners(response.data.data.owners)
    //             setTotalPages(response.data.data.pageInfo.totalPages)
    //             setIsLoading(false)
    //         })
    // }, [page, pageSize])

    const handlePageChange = (event, value) => {
        setPage(value)
    }

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value)
        setPage(1)
    }

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
                    <>
                        <TableContainer component={Paper}>
                            <Table aria-label="owner table">
                                <TableHead>
                                    <TableRow >
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>First Name</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Last Name</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Address</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Phone</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Email</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Age</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Cats' Average Age</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {owners.map((owner) => (
                                        <TableRow key={owner.id}>
                                            <TableCell align="center">{owner.firstName}</TableCell>
                                            <TableCell align="center">{owner.lastName}</TableCell>
                                            <TableCell align="center">{owner.address}</TableCell>
                                            <TableCell align="center">{owner.phone}</TableCell>
                                            <TableCell align="center">{owner.email}</TableCell>
                                            <TableCell align="center">{owner.age}</TableCell>
                                            <TableCell align="center">{owner.averageAge ? owner.averageAge : 0}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "20px", alignItems: "center" }}>
                            <Pagination count={totalPages} page={page} onChange={handlePageChange} style={{ marginLeft: "20px" }} />
                            <div style={{ display: "flex", alignItems: "center", marginRight: "20px" }}>
                                <Typography variant="body1" style={{ fontWeight: "bold", fontSize: "14px", marginRight: "10px", fontFamily: "monospace" }}>
                                    Items per page:
                                </Typography>
                                <select value={pageSize} onChange={handlePageSizeChange}>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                    <option value="200">200</option>
                                    <option value="500">500</option>
                                    <option value="1000">1000</option>
                                </select>
                            </div>
                        </div>
                    </>
                )}
            </>
        </Box>
    )
}

export default StatisticOwner
