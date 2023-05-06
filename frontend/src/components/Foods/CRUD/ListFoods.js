import { useState, useEffect } from "react"
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { styled } from '@mui/material/styles'
import axios from "axios"
import DeleteFood from "./DeleteFood"
import UpdateFood from "./UpdateFood"
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

function ListFoods() {
    const [foods, setFoods] = useState([])
    const [showListFoods, setShowListFoods] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedFood, setSelectedFood] = useState(null)
    const [showUpdateFood, setShowUpdateFood] = useState(false)
    const [showDeleteFood, setShowDeleteFood] = useState(false)
    const [foodId, setFoodId] = useState(null)

    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        setIsLoading(true)
        axios.get(`/foods?page=${page}&pageSize=${pageSize}`)
            .then((response) => {
                setFoods(response.data.data.food)
                setTotalPages(response.data.data.pageInfo.totalPages)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [showListFoods, page, pageSize])

    // useEffect(() => {
    //     setIsLoading(true)
    //     axios.get(`http://localhost:8000/foods?page=${page}&pageSize=${pageSize}`)
    //         .then((response) => {
    //             setFoods(response.data.data.foods)
    //             setTotalPages(response.data.data.pageInfo.totalPages)
    //             setIsLoading(false)
    //         })
    //          .finally(() => {
    //                setIsLoading(false)
    //            })
    // }, [showListFoods, page, pageSize])

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
        setShowListFoods(true)
        setShowUpdateFood(false)
        setShowDeleteFood(false)
    }

    const handleEdit = (food) => {
        setSelectedFood(food)
        setFoodId(food.id)
        setShowListFoods(false)
        setShowUpdateFood(true)
        setShowDeleteFood(false)
    }

    const handleUpdateClose = () => {
        setSelectedFood(null)
        setShowListFoods(true)
        setShowUpdateFood(false)
        setShowDeleteFood(false)
    }

    const handleDelete = (food) => {
        setSelectedFood(food)
        setFoodId(food.id)
        setShowListFoods(false)
        setShowUpdateFood(false)
        setShowDeleteFood(true)
    }

    const handleDeleteClose = () => {
        setSelectedFood(null)
        setShowListFoods(true)
        setShowUpdateFood(false)
        setShowDeleteFood(false)
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
            {showListFoods && (
                <>
                    <TableContainer>
                        <StyledTable>
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableHeadCell>ID</StyledTableHeadCell>
                                    <StyledTableHeadCell>Name</StyledTableHeadCell>
                                    <StyledTableHeadCell>Brand</StyledTableHeadCell>
                                    <StyledTableHeadCell>Price</StyledTableHeadCell>
                                    <StyledTableHeadCell>Quantity</StyledTableHeadCell>
                                    <StyledTableHeadCell>Type</StyledTableHeadCell>
                                    <StyledTableHeadCell>Edit</StyledTableHeadCell>
                                    <StyledTableHeadCell>Delete</StyledTableHeadCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {foods && foods.map((food) => (
                                    <StyledTableRow key={food.id}>
                                        <StyledTableCell>{food.id}</StyledTableCell>
                                        <StyledTableCell>{food.name}</StyledTableCell>
                                        <StyledTableCell>{food.brand}</StyledTableCell>
                                        <StyledTableCell>{food.price}</StyledTableCell>
                                        <StyledTableCell>{food.quantity}</StyledTableCell>
                                        <StyledTableCell>{food.type}</StyledTableCell>
                                        <StyledTableCell>
                                            <Button variant="contained" sx={{ ...buttonStyles }} onClick={() => handleEdit(food)}>Edit</Button>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <Button variant="contained" sx={{ ...buttonStyles }} onClick={() => handleDelete(food)}>Delete</Button>
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
            {showUpdateFood && (
                <>
                    <UpdateFood food={selectedFood} foodId={foodId} handleUpdateClose={handleUpdateClose} />
                    <Button onClick={handleShowListClick} sx={{ ...buttonStyles }}>Go Back</Button>
                </>
            )}
            {showDeleteFood && (
                <>
                    <DeleteFood food={selectedFood} foodId={foodId} handleDeleteClose={handleDeleteClose} />
                    <Button onClick={handleShowListClick} sx={{ ...buttonStyles }}>Go Back</Button>
                </>
            )}
        </>
    )
}

export default ListFoods