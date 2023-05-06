import { useState } from "react"
import { Box, Button, TextField, Typography } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { green, amber } from '@mui/material/colors'
import axios from "axios"

function DeleteCat({ catId }) {
    const [cat, setCat] = useState({
        id: catId,
    })

    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [warning, setWarning] = useState("")
    const [open, setOpen] = useState(false)

    const handleChange = (event) => {
        const value = event.target.value
        setCat({
            ...cat,
            [event.target.name]: value,
        })
    }

    const handleClose = () => {
        setOpen(false)
        setIsLoading(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setIsLoading(true)
        setMessage("")
        setWarning("")
        setOpen(true)
    }

    const handleConfirmDelete = () => {
        setIsLoading(true)

        axios.delete(`/cats_delete/${cat.id}`, {
            // axios.delete(`http://localhost:8000/cats_delete/${cat.id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            data: cat,
        })
            .then((response) => {
                setIsLoading(false)
                if (response.data.success) {
                    setMessage(response.data.message)
                    setOpen(false)
                } else {
                    setWarning("Cat already deleted, please go back and try to delete another cat.")
                    setOpen(false)
                }
            })
    }

    const handleCancelDelete = () => {
        setOpen(false)
        setIsLoading(false)
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

    const theme = createTheme({
        palette: {
            primary: {
                main: "#d04c7d7a",
            },
        },
    })

    const successMessageStyle = {
        backgroundColor: green[700],
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        padding: '12px',
        borderRadius: '4px',
    }

    const SuccessIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="#fff" d="M20.75 4.56a1.01 1.01 0 0 0-1.4-.14l-9.9 8.75-4.35-4.36a1 1 0 0 0-1.4 1.42l4.92 4.92a1 1 0 0 0 1.42 0l10.4-9.19c.38-.33.47-.88.14-1.27z" />
        </svg>
    )

    const SuccessMessage = ({ message }) => (
        <Box sx={successMessageStyle}>
            <SuccessIcon sx={{ marginRight: '8px' }} />
            <Typography>{message}</Typography>
        </Box>
    )

    const warningMessageStyle = {
        backgroundColor: amber[700],
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        padding: '12px',
        borderRadius: '4px',
    }

    const WarningIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="#fff" d="M12 2a9 9 0 1 0 9 9A9 9 0 0 0 12 2zm0 17a7 7 0 1 1 7-7 7 7 0 0 1-7 7zm0-11h-2v6h2V8z" />
        </svg>
    )

    const WarningMessage = ({ message }) => (
        <Box sx={warningMessageStyle}>
            <WarningIcon sx={{ marginRight: '8px' }} />
            <Typography>{message}</Typography>
        </Box>
    )

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

    return (
        <Box sx={{ textAlign: "center", p: 2, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ ...h2Style }}>
                Delete Cat
            </Typography>
            <form onSubmit={handleSubmit}>
                <ThemeProvider theme={theme}>
                    <TextField
                        required
                        fullWidth
                        id="id"
                        name="id"
                        label="ID"
                        value={cat.id}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        sx={{ zIndex: 0 }}
                        disabled
                    />
                    {message ? (
                        <SuccessMessage message={message} />
                    ) : warning ? (
                        <WarningMessage message={warning} />
                    ) : null}
                    <Button type="submit" variant="contained" sx={{ ...buttonStyles }} disabled={isLoading}>
                        {isLoading ? "Loading..." : "Submit"}
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Confirm Delete</DialogTitle>
                        <DialogContent>
                            <Typography>Are you sure you want to delete this cat?</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCancelDelete}>Cancel</Button>
                            <Button onClick={handleConfirmDelete} variant="contained">Delete</Button>
                        </DialogActions>
                    </Dialog>
                </ThemeProvider>
            </form>
        </Box>
    )
}

export default DeleteCat