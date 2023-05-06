import { useState } from "react"
import { Box, Button, TextField, Typography } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { green, red } from '@mui/material/colors'
import axios from "axios"

function UpdateFood({ foodId }) {
    const [food, setFood] = useState({
        id: foodId,
        name: "",
        brand: "",
        price: "",
        quantity: "",
        type: ""
    })

    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [errors, setErrors] = useState({})

    const handleChange = (event) => {
        const value = event.target.value
        setFood({
            ...food,
            [event.target.name]: value,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setIsLoading(true)
        setMessage("")
        setErrors({})

        axios.put(`https://adopt-a-cat.onrender.com/foods_update/${food.id}`, food, {
        // axios.put(`/foods_update/${food.id}`, food, {
        // axios.put(`http://localhost:8000/foods_update/${food.id}`, food, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                setIsLoading(false)
                setMessage(response.data.message)
                setErrors({})
            })
            .catch((error) => {
                setIsLoading(false)
                if (error.response && error.response.status === 400) {
                    const errors = error.response.data.errors
                    setErrors(errors)
                }
            })
    }

    const handleReset = () => {
        setFood({
            id: foodId,
            name: "",
            brand: "",
            price: "",
            quantity: "",
            type: ""
        })

        setMessage("")
        setErrors({})
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

    const errorMessageStyle = {
        backgroundColor: red[700],
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        padding: '12px',
        borderRadius: '4px',
    }

    const ErrorIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="#fff" d="M13 2h-2v9h2V2zm0 11h-2v2h2v-2z" />
        </svg>
    )

    const ErrorMessage = ({ message }) => (
        <Box sx={errorMessageStyle}>
            <ErrorIcon sx={{ marginRight: '8px' }} />
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
                Update Food
            </Typography>
            <form onSubmit={handleSubmit}>
                <ThemeProvider theme={theme}>
                    <TextField
                        fullWidth
                        id="id"
                        name="id"
                        label="ID"
                        value={food.id}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        sx={{ zIndex: 0 }}
                        disabled
                    />
                    <TextField
                        error={Boolean(errors.name)}
                        fullWidth
                        id="name"
                        name="name"
                        label="Name"
                        value={food.name}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        placeholder="Example: Purina Cat Chow"
                        sx={{ zIndex: 0 }}
                    />
                    {errors && errors.name && <ErrorMessage message={errors.name} />}
                    <TextField
                        error={Boolean(errors.brand)}
                        fullWidth
                        id="brand"
                        name="brand"
                        label="Brand"
                        value={food.brand}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        placeholder="Example: Purina"
                        sx={{ zIndex: 0 }}
                    />
                    {errors && errors.brand && <ErrorMessage message={errors.brand} />}
                    <TextField
                        error={Boolean(errors.price)}
                        fullWidth
                        id="price"
                        name="price"
                        label="Price"
                        value={food.price}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        placeholder="Example: 10"
                        sx={{ zIndex: 0 }}
                    />
                    {errors && errors.price && <ErrorMessage message={errors.price} />}
                    <TextField
                        error={Boolean(errors.quantity)}
                        fullWidth
                        id="quantity"
                        name="quantity"
                        label="Quantity"
                        value={food.quantity}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        placeholder="Example: 10"
                        sx={{ zIndex: 0 }}
                    />
                    {errors && errors.quantity && <ErrorMessage message={errors.quantity} />}
                    <TextField
                        error={Boolean(errors.type)}
                        fullWidth
                        id="type"
                        name="type"
                        label="Type"
                        value={food.type}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        placeholder="Example: Dry/Wet"
                        sx={{ zIndex: 0 }}
                    />
                    {errors && errors.type && <ErrorMessage message={errors.type} />}
                    {message && <SuccessMessage message={message} />}
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                        <Button type="submit" variant="contained" sx={{ ...buttonStyles, mr: 2 }} disabled={isLoading}>
                            {isLoading ? "Loading..." : "Submit"}
                        </Button>
                        <Button variant="contained" sx={{ ...buttonStyles }} onClick={handleReset}>
                            Reset
                        </Button>
                    </Box>
                </ThemeProvider>
            </form>
        </Box>
    )
}

export default UpdateFood