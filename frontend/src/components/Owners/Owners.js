import ListOwners from './CRUD/ListOwners'
import OneOwner from './SHOW/OneOwner'
import StatisticOwner from './SHOW/StatisticOwner'
import AddOwner from './CRUD/AddOwner'
import ChangeCat from './STATISTICS/ChangeCat'
import CreateCat from './STATISTICS/CreateCat'
import { useState } from "react"
import { Box, Button, Typography } from "@mui/material"

function Owners() {
    const [showList, setShowList] = useState(false)
    const [showOwner, setShowOwner] = useState(false)
    const [showStatistic, setShowStatistic] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
    const [showChangeForm, setShowChangeForm] = useState(false)
    const [showCreateForm, setShowCreateForm] = useState(false)

    const handleShowListClick = () => {
        setShowList(true)
        setShowOwner(false)
        setShowStatistic(false)
        setShowAddForm(false)
        setShowChangeForm(false)
        setShowCreateForm(false)
    }

    const handleShowOwnerClick = () => {
        setShowOwner(true)
        setShowList(false)
        setShowStatistic(false)
        setShowAddForm(false)
        setShowChangeForm(false)
        setShowCreateForm(false)
    }

    const handleShowStatisticClick = () => {
        setShowStatistic(true)
        setShowList(false)
        setShowOwner(false)
        setShowAddForm(false)
        setShowChangeForm(false)
        setShowCreateForm(false)
    }

    const handleAddClick = () => {
        setShowAddForm(true)
        setShowList(false)
        setShowOwner(false)
        setShowStatistic(false)
        setShowChangeForm(false)
        setShowCreateForm(false)
    }

    const handleShowChangeClick = () => {
        setShowChangeForm(true)
        setShowList(false)
        setShowOwner(false)
        setShowStatistic(false)
        setShowAddForm(false)
        setShowCreateForm(false)
    }

    const handleShowCreateClick = () => {
        setShowCreateForm(true)
        setShowList(false)
        setShowOwner(false)
        setShowStatistic(false)
        setShowAddForm(false)
        setShowChangeForm(false)
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
                Owners Section
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2, color: '#7c487c' }}>
                Hi there! Welcome to the Owners Section. Here you can see all the owners in the database, you can filter them by age and manage cats lists.
                Also if you want you can acces a specific owner.
                And you can also add, update or delete a owner.
            </Typography>
            {showList ? (
                <>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button onClick={handleAddClick} sx={buttonStyles}>Add</Button>
                        <Button onClick={() => setShowList(false)} sx={buttonStyles}>Go Back</Button>
                    </Box>
                    <ListOwners />
                </>
            ) : showAddForm ? (
                <>
                    <AddOwner />
                    <Button onClick={handleShowListClick} sx={buttonStyles}>Go Back</Button>
                </>
            ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Button onClick={handleShowListClick} sx={buttonStyles}>List Owners</Button>
                    <Button onClick={handleShowOwnerClick} sx={buttonStyles}>One Owner</Button>
                    <Button onClick={handleShowStatisticClick} sx={buttonStyles}>Statistic Owners</Button>
                    <Button onClick={handleShowChangeClick} sx={buttonStyles}>Change Owner's Cat</Button>
                    <Button onClick={handleShowCreateClick} sx={buttonStyles}>Create Cats With Owner ID</Button>
                </Box>
            )}
            {showOwner ? (
                <>
                    <OneOwner />
                </>

            ) : null}
            {showStatistic ? (
                <>
                    <StatisticOwner />
                </>
            ) : null}
            {showChangeForm ? (
                <>
                    <ChangeCat />
                </>
            ) : null}
            {showCreateForm ? (
                <>
                    <CreateCat />
                </>
            ) : null}
        </Box>
    )
}

export default Owners