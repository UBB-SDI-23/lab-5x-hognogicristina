import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from "@mui/material"
import axios from "axios"
import Pagination from "@mui/material/Pagination"

function NewListCats(props) {
    const [cats, setCats] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        setIsLoading(true)
        axios.get(`https://adopt-a-cat.onrender.com/cats_filter/${props.weight}?page=${page}&pageSize=${pageSize}`)
        // axios.get(`/cats_filter/${props.weight}?page=${page}&pageSize=${pageSize}`)
        // axios.get(`http://localhost:8000/cats_filter/${props.weight}?page=${page}&pageSize=${pageSize}`)
            .then(response => {
                setCats(response.data.data.cats)
                setTotalPages(response.data.data.pageInfo.totalPages)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [props.weight, page, pageSize])

    const pStyle = {
        fontSize: '1.2rem',
        lineHeight: 1.5,
        color: '#777',
        marginBottom: '1.5rem',
        textShadow: '1px 1px #eee'
    }

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

    return (
        <>
            {cats && cats.length === 0 ? (
                <Typography variant="body1" align="center" sx={{ ...pStyle }}>
                    No cats found.
                </Typography>
            ) : (
                <>
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
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cats && cats.map(cat => (
                                    <TableRow key={cat.id}>
                                        <TableCell align="center">{cat.name}</TableCell>
                                        <TableCell align="center">{cat.age}</TableCell>
                                        <TableCell align="center">{cat.color}</TableCell>
                                        <TableCell align="center">{cat.breed}</TableCell>
                                        <TableCell align="center">{cat.weight}</TableCell>
                                        <TableCell align="center">{cat.description}</TableCell>
                                        <TableCell align="center">{cat.ownerId}</TableCell>
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
    )
}

export default NewListCats