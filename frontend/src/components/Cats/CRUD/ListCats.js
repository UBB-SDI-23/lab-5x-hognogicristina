import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from "@mui/material"
import { styled } from '@mui/material/styles'
import axios from "axios"
import UpdateCat from "./UpdateCat"
import DeleteCat from "./DeleteCat"
import Pagination from "@mui/material/Pagination"

const StyledTable = styled(Table)({
    borderCollapse: 'collapse',
    width: '100%',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
})

const StyledTableCell = styled(TableCell)({
    padding: 8,
    textAlign: 'center',
    borderBottom: '1px solid #ddd',
})

const StyledTableHeadCell = styled(StyledTableCell)({
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
})

const StyledTableRow = styled(TableRow)({
    '&:hover': {
        backgroundColor: '#f5f5f5',
    },
})

function ListCats() {
    const [cats, setCats] = useState([])
    const [showListCats, setShowListCats] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedCat, setSelectedCat] = useState(null)
    const [showUpdateCat, setShowUpdateCat] = useState(false)
    const [showDeleteCat, setShowDeleteCat] = useState(false)
    const [catId, setCatId] = useState(null)

    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        setIsLoading(true)
        axios.get(`https://adopt-a-cat.onrender.com/cats?page=${page}&pageSize=${pageSize}`)
        // axios.get(`/cats?page=${page}&pageSize=${pageSize}`)
        // axios.get(`http://localhost:8000/cats?page=${page}&pageSize=${pageSize}`)
            .then((response) => {
                setCats(response.data.data.cats)
                setTotalPages(response.data.data.pageInfo.totalPages)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [showListCats, page, pageSize])

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

    const handleShowListClick = () => {
        setShowListCats(true)
        setShowUpdateCat(false)
        setShowDeleteCat(false)
    }

    const handleEdit = (cat) => {
        setSelectedCat(cat)
        setCatId(cat.id)
        setShowUpdateCat(true)
        setShowListCats(false)
        setShowDeleteCat(false)
    }

    const handleUpdateClose = () => {
        setSelectedCat(null)
        setShowUpdateCat(false)
        setShowListCats(true)
        setShowDeleteCat(false)
    }

    const handleDelete = (cat) => {
        setSelectedCat(cat)
        setCatId(cat.id)
        setShowUpdateCat(false)
        setShowListCats(false)
        setShowDeleteCat(true)
    }

    const handleDeleteClose = () => {
        setSelectedCat(null)
        setShowUpdateCat(false)
        setShowListCats(true)
        setShowDeleteCat(false)
    }

    const buttonStyles = {
        backgroundColor: 'transparent',
        color: '#7c487c',
        border: '2px solid #7c487c',
        margin: 1,
        '&:hover': {
            backgroundColor: '#e2c7f7d8',
            color: '7c487c',
        }
    }

    return (
        <>
            {showListCats && (
                <>
                    <TableContainer>
                        <StyledTable>
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableHeadCell>ID</StyledTableHeadCell>
                                    <StyledTableHeadCell>Name</StyledTableHeadCell>
                                    <StyledTableHeadCell>Age</StyledTableHeadCell>
                                    <StyledTableHeadCell>Color</StyledTableHeadCell>
                                    <StyledTableHeadCell>Breed</StyledTableHeadCell>
                                    <StyledTableHeadCell>Weight</StyledTableHeadCell>
                                    <StyledTableHeadCell>Description</StyledTableHeadCell>
                                    <StyledTableHeadCell>Owner</StyledTableHeadCell>
                                    <StyledTableHeadCell>Nr. Of Food Liked</StyledTableHeadCell>
                                    <StyledTableHeadCell>Edit</StyledTableHeadCell>
                                    <StyledTableHeadCell>Delete</StyledTableHeadCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {cats.map((cat) => {
                                    return (
                                        <StyledTableRow key={cat.id}>
                                            <StyledTableCell>{cat.id}</StyledTableCell>
                                            <StyledTableCell>{cat.name}</StyledTableCell>
                                            <StyledTableCell>{cat.age}</StyledTableCell>
                                            <StyledTableCell>{cat.color}</StyledTableCell>
                                            <StyledTableCell>{cat.breed}</StyledTableCell>
                                            <StyledTableCell>{cat.weight}</StyledTableCell>
                                            <StyledTableCell>{cat.description}</StyledTableCell>
                                            <StyledTableCell>{cat.ownerId}</StyledTableCell>
                                            <StyledTableCell>{cat.foodCount}</StyledTableCell>
                                            <StyledTableCell>
                                                <Button variant="contained" sx={{ ...buttonStyles }} onClick={() => handleEdit(cat)}>Edit</Button>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Button variant="contained" sx={{ ...buttonStyles }} onClick={() => handleDelete(cat)}>Delete</Button>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    )
                                })}
                            </TableBody>
                        </StyledTable>
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
            {showUpdateCat && (
                <>
                    <UpdateCat cat={selectedCat} catId={catId} onClose={handleUpdateClose} />
                    <Button onClick={handleShowListClick} sx={buttonStyles}>Go Back</Button>
                </>
            )}
            {showDeleteCat && (
                <>
                    <DeleteCat cat={selectedCat} catId={catId} onClose={handleDeleteClose} />
                    <Button onClick={handleShowListClick} sx={buttonStyles}>Go Back</Button>
                </>
            )}
        </>
    )
}

export default ListCats    