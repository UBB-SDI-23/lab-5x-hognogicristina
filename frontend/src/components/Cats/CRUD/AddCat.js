import { useState } from "react"
import { Box, Button, TextField, Typography } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles'
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

        axios.post(`/cats_add`, cat, {
            // axios.post(`http://localhost:8000/cats_add`, cat, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                setIsLoading(false)
                setMessage(response.data.message)
            })
            .catch((error) => {
                setIsLoading(false);
                if (error.response && error.response.status === 400) {
                    const errors = error.response.data.errors
                    setErrors(errors)
                } else {
                    setMessage("An error occurred while processing your request, please try again")
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
                        error={errors && errors.name ? true : false}
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
                    {errors && errors.name && (
                        <Typography color="error" variant="caption">
                            <span style={{ color: "red", marginRight: "5px" }}>!</span>{errors.name}
                        </Typography>)}
                    <TextField
                        error={errors && errors.age ? true : false}
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
                    {errors && errors.age && (
                        <Typography color="error" variant="caption">
                            <span style={{ color: "red", marginRight: "5px" }}>!</span>{errors.age}
                        </Typography>)}
                    <TextField
                        error={errors && errors.age ? true : false}
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
                    {errors && errors.color && (
                        <Typography color="error" variant="caption">
                            <span style={{ color: "red", marginRight: "5px" }}>!</span>{errors.color}
                        </Typography>)}
                    <TextField
                        error={errors && errors.age ? true : false}
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
                    {errors && errors.breed && (
                        <Typography color="error" variant="caption">
                            <span style={{ color: "red", marginRight: "5px" }}>!</span>{errors.breed}
                        </Typography>)}
                    <TextField
                        error={errors && errors.age ? true : false}
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
                    {errors && errors.weight && (
                        <Typography color="error" variant="caption">
                            <span style={{ color: "red", marginRight: "5px" }}>!</span>{errors.weight}
                        </Typography>)}
                    <TextField
                        error={errors && errors.age ? true : false}
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
                    {errors && errors.description && (
                        <Typography color="error" variant="caption">
                            <span style={{ color: "red", marginRight: "5px" }}>!</span>{errors.description}
                        </Typography>)}
                    <TextField
                        error={errors && errors.age ? true : false}
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
                    {errors && errors.ownerId && (
                        <Typography color="error" variant="caption">
                            <span style={{ color: "red", marginRight: "5px" }}>!</span>{errors.ownerId}
                        </Typography>)}
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

export default AddCat