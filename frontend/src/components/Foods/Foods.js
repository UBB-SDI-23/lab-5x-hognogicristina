import ListFoods from "./CRUD/ListFoods"
import OneFood from "./SHOW/OneFood"
import AddFood from "./CRUD/AddFood"
import DeleteFood from "./CRUD/DeleteFood"
import UpdateFood from "./CRUD/UpdateFood"
import { useState } from "react"
import { Box, Button, Typography } from "@mui/material"

function Foods() {
    const [showList, setShowList] = useState(false)
    const [showFood, setShowFood] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
    const [showDeleteForm, setShowDeleteForm] = useState(false)
    const [showUpdateForm, setShowUpdateForm] = useState(false)

    const handleShowListClick = () => {
        setShowList(true)
        setShowFood(false)
        setShowAddForm(false)
        setShowDeleteForm(false)
        setShowUpdateForm(false)
    }

    const handleShowFoodClick = () => {
        setShowFood(true)
        setShowList(false)
        setShowAddForm(false)
        setShowDeleteForm(false)
        setShowUpdateForm(false)
    }

    const handleAddClick = () => {
        setShowAddForm(true)
        setShowList(false)
        setShowFood(false)
        setShowDeleteForm(false)
        setShowUpdateForm(false)
    }

    const handleDeleteClick = () => {
        setShowDeleteForm(true)
        setShowList(false)
        setShowFood(false)
        setShowAddForm(false)
        setShowUpdateForm(false)
    }

    const handleUpdateClick = () => {
        setShowUpdateForm(true)
        setShowList(false)
        setShowFood(false)
        setShowAddForm(false)
        setShowDeleteForm(false)
    }

    const buttonStyles = {
        backgroundColor: 'transparent',
        color: '#7c487c',
        border: '2px solid #7c487c',
        margin: 1,
        zIndex: 0,
        '&:hover': {
            backgroundColor: '#e2c7f7d8',
            color: '7c487c',
        }
    }

    return (
        <Box>
            <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 2, color: '#7c487c', border: '2px solid #7c487c', boxShadow: '4px 4px 0 #7c487c' }}>
                Foods Section
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2, color: '#7c487c' }}>
                Hi there! Welcome to the Foods Section. Here you can see all the foods in the database. If you want you can acces a specific food.
                And you can also add, update or delete a food.
            </Typography>
            {showList ? (
                <>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button onClick={handleAddClick} sx={buttonStyles}>Add a Food</Button>
                        <Button onClick={handleUpdateClick} sx={buttonStyles}>Update a Food</Button>
                        <Button onClick={handleDeleteClick} sx={buttonStyles}>Delete a Food</Button>
                        <Button onClick={() => setShowList(false)} sx={buttonStyles}>Go Back</Button>
                    </Box>
                    <ListFoods />
                </>
            ) : showAddForm ? (
                <>
                    <AddFood />
                    <Button onClick={handleShowListClick} sx={buttonStyles}>Go Back</Button>
                </>
            ) : showUpdateForm ? (
                <>
                    <UpdateFood />
                    <Button onClick={handleShowListClick} sx={buttonStyles}>Go Back</Button>
                </>
            ) : showDeleteForm ? (
                <>
                    <DeleteFood />
                    <Button onClick={handleShowListClick} sx={buttonStyles}>Go Back</Button>
                </>
            ) : (
                <>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button onClick={handleShowListClick} sx={buttonStyles}>List Foods</Button>
                        <Button onClick={handleShowFoodClick} sx={buttonStyles}>One Food</Button>
                    </Box>
                </>
            )}
        </Box>
    )
}

export default Foods
