import ListCats from "./CRUD/ListCats"
import OneCat from "./SHOW/OneCat"
import FilterCats from "./SHOW/FilterCats"
import StatisticCat from "./STATISTICS/StatisticCat"
import AddCat from "./CRUD/AddCat"
import { useState } from "react"
import { Box, Button, Typography } from "@mui/material"

function Cats() {
    const [showList, setShowList] = useState(false)
    const [showCat, setShowCat] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [showStatistic, setShowStatistic] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)

    const handleShowListClick = () => {
        setShowList(true)
        setShowCat(false)
        setShowFilter(false)
        setShowStatistic(false)
        setShowAddForm(false)
    }

    const handleShowCatClick = () => {
        setShowCat(true)
        setShowList(false)
        setShowFilter(false)
        setShowStatistic(false)
        setShowAddForm(false)
    }

    const handleShowFilterClick = () => {
        setShowFilter(true)
        setShowList(false)
        setShowCat(false)
        setShowStatistic(false)
        setShowAddForm(false)
    }

    const handleShowRaportClick = () => {
        setShowStatistic(true)
        setShowList(false)
        setShowCat(false)
        setShowFilter(false)
        setShowAddForm(false)
    }

    const handleAddClick = () => {
        setShowAddForm(true)
        setShowList(false)
        setShowCat(false)
        setShowFilter(false)
        setShowStatistic(false)
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
                Cats Section
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2, color: '#7c487c' }}>
                Hi there! Welcome to the Cats Section. Here you can see all the cats in the database, you can filter them by weight or breed. 
                Also if you want you can acces a specific cat.
                And you can also add, update or delete a cat.
            </Typography>
            {showList ? (
                <>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button onClick={handleAddClick} sx={buttonStyles}>Add</Button>
                        <Button onClick={() => setShowList(false)} sx={buttonStyles}>Go Back</Button>
                    </Box>
                    <ListCats />
                </>
            ) : showAddForm ? (
                <>
                    <AddCat />
                    <Button onClick={handleShowListClick} sx={buttonStyles}>Go Back</Button>
                </>
            ) : (
                <>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button onClick={handleShowListClick} sx={buttonStyles}>List Cats</Button>
                        <Button onClick={handleShowCatClick} sx={buttonStyles}>One Cat</Button>
                        <Button onClick={handleShowFilterClick} sx={buttonStyles}>Filter Cats</Button>
                        <Button onClick={handleShowRaportClick} sx={buttonStyles}>Statistic Cats</Button>
                    </Box>
                </>
            )}
            {showCat ? (
                <>
                    <OneCat /> 
                </>
            ) : null}
            {showFilter ? (
                <>
                    <FilterCats />
                </>
            ) : null}
            {showStatistic ? (
                <>
                    <StatisticCat />
                </>
            ) : null}
        </Box>
    )
}

export default Cats
