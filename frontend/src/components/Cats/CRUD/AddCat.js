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

        axios.post(`https://adopt-a-cat.onrender.com/cats_add`, cat, {
            // axios.post(`http://localhost:8000/cats_add`, cat, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                setIsLoading(false)
                if (response.data.errors) {

                    setMessage(response.data.message)
                    setErrors({})
                    setCat({
                        name: "",
                        age: "",
                        color: "",
                        breed: "",
                        weight: "",
                        description: "",
                        ownerId: "",
                    })
                } else {
                    setErrors({})
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
                    {errors.name && <Typography color="red">{errors.name}</Typography>}
                    <TextField
                        required
                        fullWidth
                        id="name"
                        name="name"
                        label="Name"
                        value={cat.name}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        placeholder="Example: Tom"
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                        sx={{ zIndex: 0 }}
                    />
                    {errors.age && <Typography color="red">{errors.age}</Typography>}
                    <TextField
                        required
                        fullWidth
                        id="age"
                        name="age"
                        label="Age"
                        value={cat.age}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        placeholder="Example: 2"
                        error={Boolean(errors.age)}
                        helperText={errors.age}
                        sx={{ zIndex: 0 }}
                    />
                    {errors.color && <Typography color="red">{errors.color}</Typography>}
                    <TextField
                        required
                        fullWidth
                        id="color"
                        name="color"
                        label="Color"
                        value={cat.color}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        placeholder="Example: black"
                        error={Boolean(errors.color)}
                        helperText={errors.color}
                        sx={{ zIndex: 0 }}
                    />
                    {errors.breed && <Typography color="red">{errors.breed}</Typography>}
                    <TextField
                        required
                        fullWidth
                        id="breed"
                        name="breed"
                        label="Breed"
                        value={cat.breed}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        placeholder="Example: Persian"
                        error={Boolean(errors.breed)}
                        helperText={errors.breed}
                        sx={{ zIndex: 0 }}
                    />
                    {errors.weight && <Typography color="red">{errors.weight}</Typography>}
                    <TextField
                        required
                        fullWidth
                        id="weight"
                        name="weight"
                        label="Weight"
                        value={cat.weight}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        placeholder="Example: 5"
                        error={Boolean(errors.weight)}
                        helperText={errors.weight}
                        sx={{ zIndex: 0 }}
                    />
                    {errors.description && <Typography color="red">{errors.description}</Typography>}
                    <TextField
                        required
                        fullWidth
                        id="description"
                        name="description"
                        label="Description"
                        value={cat.description}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        placeholder="Example: Very cute cat"
                        error={Boolean(errors.description)}
                        helperText={errors.description}
                        sx={{ zIndex: 0 }}
                    />
                    {errors.ownerId && <Typography color="red">{errors.ownerId}</Typography>}
                    <TextField
                        required
                        fullWidth
                        id="ownerId"
                        name="ownerId"
                        label="Owner"
                        value={cat.ownerId}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        placeholder="Example: 1"
                        error={Boolean(errors.ownerId)}
                        helperText={errors.ownerId}
                        sx={{ zIndex: 0 }}
                    />
                    {message && <Typography color={Object.keys(errors).length > 0 ? "red" : "green"}>{message}</Typography>}
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