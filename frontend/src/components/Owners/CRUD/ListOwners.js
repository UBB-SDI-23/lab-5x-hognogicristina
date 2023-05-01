import { useState, useEffect } from "react"
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { styled } from '@mui/material/styles'
import axios from "axios"
import UpdateOwner from './UpdateOwner'
import DeleteOwner from './DeleteOwner'
import Pagination from "@mui/material/Pagination"

const StyledTable = styled(Table)({
    borderCollapse: 'collapse',
    width: '100%',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
})

const StyledTableCell = styled(TableCell)({
    padding: 8,
    textAlign: 'left',
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

function ListOwners() {
    const [owners, setOwners] = useState([])
    const [showListOwners, setShowListOwners] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedOwner, setSelectedOwner] = useState(null)
    const [showUpdateOwner, setShowUpdateOwner] = useState(false)
    const [showDeleteOwner, setShowDeleteOwner] = useState(false)
    const [ownerId, setOwnerId] = useState(null)

    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [totalPages, setTotalPages] = useState(0)

    // useEffect(() => {
    //     setIsLoading(true)
    //     axios.get("https://adopt-a-cat.onrender.com/owners")
    //         .then((response) => {
    //             setOwners(response.data.data)
    //             setIsLoading(false)
    //         })
    // }, [showListOwners])

    useEffect(() => {
        setIsLoading(true)
        axios.get(`http://localhost:8000/owners?page=${page}&pageSize=${pageSize}`)
            .then((response) => {
                setOwners(response.data.data.owners)
                setTotalPages(response.data.data.pageInfo.totalPages)
                setIsLoading(false)
            })
    }, [showListOwners, page, pageSize])

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
        setShowListOwners(true)
        setShowUpdateOwner(false)
        setShowDeleteOwner(false)
    }

    const handleEdit = (owner) => {
        setSelectedOwner(owner)
        setOwnerId(owner.id)
        setShowListOwners(false)
        setShowUpdateOwner(true)
        setShowDeleteOwner(false)
    }

    const handleUpdateClose = () => {
        setSelectedOwner(null)
        setShowListOwners(true)
        setShowUpdateOwner(false)
        setShowDeleteOwner(false)
    }

    const handleDelete = (owner) => {
        setSelectedOwner(owner)
        setOwnerId(owner.id)
        setShowListOwners(false)
        setShowDeleteOwner(true)
        setShowUpdateOwner(false)
    }

    const handleDeleteClose = () => {
        setSelectedOwner(null)
        setShowListOwners(true)
        setShowDeleteOwner(false)
        setShowUpdateOwner(false)
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
            {showListOwners && (
                <>
                    <TableContainer>
                        <StyledTable>
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableHeadCell>ID</StyledTableHeadCell>
                                    <StyledTableHeadCell sx={{width: '9%'}}>First Name</StyledTableHeadCell>
                                    <StyledTableHeadCell sx={{width: '9%'}}>Last Name</StyledTableHeadCell>
                                    <StyledTableHeadCell>Address</StyledTableHeadCell>
                                    <StyledTableHeadCell>Phone</StyledTableHeadCell>
                                    <StyledTableHeadCell>Email</StyledTableHeadCell>
                                    <StyledTableHeadCell>Age</StyledTableHeadCell>
                                    <StyledTableHeadCell>Edit</StyledTableHeadCell>
                                    <StyledTableHeadCell>Delete</StyledTableHeadCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {owners && owners.map((owner) => (
                                    <StyledTableRow key={owner.id}>
                                        <StyledTableCell>{owner.id}</StyledTableCell>
                                        <StyledTableCell>{owner.firstName}</StyledTableCell>
                                        <StyledTableCell>{owner.lastName}</StyledTableCell>
                                        <StyledTableCell>{owner.address}</StyledTableCell>
                                        <StyledTableCell>{owner.phone}</StyledTableCell>
                                        <StyledTableCell>{owner.email}</StyledTableCell>
                                        <StyledTableCell>{owner.age}</StyledTableCell>
                                        <StyledTableCell>
                                            <Button variant="contained" sx={{ ...buttonStyles }} onClick={() => handleEdit(owner)}>Edit</Button>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <Button variant="contained" sx={{ ...buttonStyles }} onClick={() => handleDelete(owner)}>Delete</Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
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
            {showUpdateOwner && (
                <>
                    <UpdateOwner owner={selectedOwner} ownerId={ownerId} onClick={handleUpdateClose} />
                    <Button onClick={handleShowListClick} sx={{ ...buttonStyles }}>Go Back</Button>
                </>
            )}
            {showDeleteOwner && (
                <>
                    <DeleteOwner owner={selectedOwner} ownerId={ownerId} onClick={handleDeleteClose} />
                    <Button onClick={handleShowListClick} sx={{ ...buttonStyles }}>Go Back</Button>
                </>
            )}
        </>
    )
}

export default ListOwners