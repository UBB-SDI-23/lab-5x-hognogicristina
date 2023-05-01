import { useState } from "react"
import { Box, Button, TextField, Typography } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from "axios"

function AddFood() {
    const [food, setFood] = useState({
        name: "",
        brand: "",
        price: "",
        quantity: "",
        type: ""
    })

    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")

    const handleChange = (event) => {
        setFood({
            ...food,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setIsLoading(true)
        setMessage("")

        axios.post(`https://adopt-a-cat.onrender.com/foods_add`, food, {
        // axios.post(`http://localhost:8000/foods_add`, food, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                setIsLoading(false)
                setMessage(response.data.message)
            })
    }

    const handleReset = () => {
        setFood({
            name: "",
            brand: "",
            price: "",
            quantity: "",
            type: ""
        })
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
                Add Food
            </Typography>
            <form onSubmit={handleSubmit}>
                <ThemeProvider theme={theme}>
                    <TextField
                        required
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
                    <TextField
                        required
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
                    <TextField
                        required
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
                    <TextField
                        required
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
                    <TextField
                        required
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
                    {message && <Typography color="red">{message}</Typography>}
                    <Button type="submit" variant="contained" sx={{ ...buttonStyles }} disabled={isLoading}>
                        {isLoading ? "Loading..." : "Submit"}
                    </Button>
                    <Button variant="contained" sx={{ ...buttonStyles }} onClick={handleReset}>
                        Reset
                    </Button>
                </ThemeProvider>
            </form>
        </Box>
    )
}

export default AddFood