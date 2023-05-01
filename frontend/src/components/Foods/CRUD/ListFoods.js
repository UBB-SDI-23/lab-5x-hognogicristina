import { useState, useEffect } from "react"
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { styled } from '@mui/material/styles'
import axios from "axios"
import DeleteFood from "./DeleteFood"
import UpdateFood from "./UpdateFood"

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

function ListFoods() {
    const [foods, setFoods] = useState([])
    const [showListFoods, setShowListFoods] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedFood, setSelectedFood] = useState(null)
    const [showUpdateFood, setShowUpdateFood] = useState(false)
    const [showDeleteFood, setShowDeleteFood] = useState(false)
    const [foodId, setFoodId] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        axios.get("https://adopt-a-cat.onrender.com/foods")
            .then((response) => {
                setFoods(response.data.data)
                setIsLoading(false)
            })
    }, [showListFoods])

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
                                {foods.map((food) => (
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