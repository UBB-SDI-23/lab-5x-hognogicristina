import { useState } from "react"
import { Box, Button, TextField, Typography } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { green, red } from '@mui/material/colors'
import axios from "axios"

function AddCat() {
    const [cat, setCat] = useState({
        name: "",
        age: "",
        color: "",
        breed: "",
        weight: "",
        description: "",
        ownerId: "",
    })

    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [errors, setErrors] = useState({})

    const handleChange = (event) => {
        const value = event.target.value
        setCat({
            ...cat,
            [event.target.name]: value,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setIsLoading(true)
        setMessage("")

        axios.post(`https://adopt-a-cat.onrender.com/cats_add`, cat, {
        // axios.post(`/cats_add`, cat, {
        // axios.post(`http://localhost:8000/cats_add`, cat, {
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
        setCat({
            name: "",
            age: "",
            color: "",
            breed: "",
            weight: "",
            description: "",
            ownerId: "",
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
            error: {
                main: "#ff3d3d",
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
                Add Cat
            </Typography>
            <form onSubmit={handleSubmit}>
                <ThemeProvider theme={theme}>
                    <TextField
                        error={Boolean(errors.name)}
                        fullWidth
                        id="name"
                        name="name"
                        label="Name"
                        value={cat.name}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        placeholder="Example: Tom"
                        sx={{ zIndex: 0 }}
                    />
                    {errors && errors.name && (<ErrorMessage message={errors.name} />)}
                    <TextField
                        error={Boolean(errors.age)}
                        fullWidth
                        id="age"
                        name="age"
                        label="Age"
                        value={cat.age}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        placeholder="Example: 2"
                        sx={{ zIndex: 0 }}
                    />
                    {errors && errors.age && (<ErrorMessage message={errors.age} />)}
                    <TextField
                        error={Boolean(errors.color)}
                        fullWidth
                        id="color"
                        name="color"
                        label="Color"
                        value={cat.color}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        placeholder="Example: black"
                        sx={{ zIndex: 0 }}
                    />
                    {errors && errors.color && (<ErrorMessage message={errors.color} />)}
                    <TextField
                        error={Boolean(errors.breed)}
                        fullWidth
                        id="breed"
                        name="breed"
                        label="Breed"
                        value={cat.breed}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        placeholder="Example: Persian"
                        sx={{ zIndex: 0 }}
                    />
                    {errors && errors.breed && (<ErrorMessage message={errors.breed} />)}
                    <TextField
                        error={Boolean(errors.weight)}
                        fullWidth
                        id="weight"
                        name="weight"
                        label="Weight"
                        value={cat.weight}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        placeholder="Example: 5"
                        sx={{ zIndex: 0 }}
                    />
                    {errors && errors.weight && (<ErrorMessage message={errors.weight} />)}
                    <TextField
                        error={Boolean(errors.description)}
                        fullWidth
                        id="description"
                        name="description"
                        label="Description"
                        value={cat.description}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        placeholder="Example: Very cute cat"
                        sx={{ zIndex: 0 }}
                    />
                    {errors && errors.description && (<ErrorMessage message={errors.description} />)}
                    <TextField
                        error={Boolean(errors.ownerId)}
                        fullWidth
                        id="ownerId"
                        name="ownerId"
                        label="Owner"
                        value={cat.ownerId}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        placeholder="Example: 1"
                        sx={{ zIndex: 0 }}
                    />
                    {errors && errors.ownerId && (<ErrorMessage message={errors.ownerId} />)}
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

export default AddCat