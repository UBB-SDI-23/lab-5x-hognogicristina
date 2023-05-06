import React, { useState } from "react"
import axios from "axios"
import { Box, Typography, TextField, Button } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import ListChangedCats from "./ListChangedCats"

function CreateCat() {
    const [ownerId, setOwnerId] = useState("")
    const [catsList, setCatsList] = useState([])
    const [changedCats, setChangedCats] = useState([])

    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")

    const handleOwnerIdChange = (event) => {
        const { value } = event.target
        setOwnerId(value)
    }

    const handleAddCat = () => {
        const newCat = {
            name: "",
            age: "",
            color: "",
            breed: "",
            weight: "",
            description: "",
            ownerId: ownerId,
        }

        setCatsList([...catsList, newCat])
        setMessage("")
    }

    const handleCatChange = (event, index) => {
        const { name, value } = event.target
        const list = [...catsList]
        list[index][name] = value
        setCatsList(list)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setIsLoading(true)
        setMessage("")

        if (catsList.length === 0) {
            setMessage("Please add at least one cat")
            setIsLoading(false)
            return
        }

        axios.post(`/owners/${ownerId}/cats_create`, { cats_list: catsList },
        // axios.post('http://localhost:8000/owners/' + ownerId + '/cats_create', { cats_list: catsList },
            { headers: { "Content-Type": "application/json", }, }
        )
            .then((response) => {
                setChangedCats(response.data.data)
                setIsLoading(false)
                setMessage(response.data.message)
            })
    }

    const handleReset = () => {
        setOwnerId("")
        setCatsList([])
        setChangedCats([])
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: "#d04c7d7a",
            },
        },
    })

    const pStyle = {
        fontSize: '1.2rem',
        lineHeight: 1.5,
        color: '#777',
        marginBottom: '1.5rem',
        textShadow: '1px 1px #eee'
    }

    const h2Style = {
        fontSize: "1.6rem",
        color: "#333",
        textTransform: "uppercase",
        letterSpacing: "0.1rem",
        marginBottom: "1rem",
        borderBottom: "3px solid #f36",
        paddingBottom: "0.5rem",
        textShadow: "1px 1px #eee",
    }

    return (
        <ThemeProvider theme={theme}>
            <form onSubmit={handleSubmit}>
                <Box sx={{ textAlign: "center", p: 2, borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ ...h2Style }}>
                        Create Cat
                    </Typography>
                    <Typography variant="body1" sx={{ margin: "1rem 0", ...pStyle }}>
                        Enter a number and a list of cats to create cats for an owner given by id.
                        If you want to create more than one cat, click on the "Add Cat" button.
                    </Typography>
                    <TextField
                        required
                        fullWidth
                        name="ownerId"
                        label="Owner"
                        value={ownerId}
                        onChange={handleOwnerIdChange}
                        placeholder="Example: 1"
                        margin="normal"
                        variant="outlined"
                        sx={{ zIndex: 0 }}
                    />
                    {catsList.map((cat, index) => (
                        <Box key={cat.id} >
                            <Typography variant="h5" sx={{ ...pStyle, fontSize: "24px" }}>
                                Cat {index + 1}
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                name="name"
                                label="Name"
                                value={cat.name}
                                onChange={(event) => handleCatChange(event, index)}
                                placeholder="Example: Kitty"
                                variant="outlined"
                                margin="normal"
                                sx={{ zIndex: 0 }}
                            />
                            <TextField
                                required
                                fullWidth
                                name="age"
                                label="Age"
                                value={cat.age}
                                onChange={(event) => handleCatChange(event, index)}
                                placeholder="Example: 2"
                                variant="outlined"
                                margin="normal"
                                sx={{ zIndex: 0 }}
                            />
                            <TextField
                                required
                                fullWidth
                                name="color"
                                label="Color"
                                variant="outlined"
                                value={cat.color}
                                onChange={(event) => handleCatChange(event, index)}
                                placeholder="Example: white"
                                margin="normal"
                                sx={{ zIndex: 0 }}
                            />
                            <TextField
                                required
                                fullWidth
                                name="breed"
                                label="Breed"
                                value={cat.breed}
                                onChange={(event) => handleCatChange(event, index)}
                                placeholder="Example: Persian"
                                variant="outlined"
                                margin="normal"
                                sx={{ zIndex: 0 }}
                            />
                            <TextField
                                required
                                fullWidth
                                name="weight"
                                label="Weight"
                                value={cat.weight}
                                onChange={(event) => handleCatChange(event, index)}
                                placeholder="Example: 5"
                                variant="outlined"
                                margin="normal"
                                sx={{ zIndex: 0 }}
                            />
                            <TextField
                                required
                                fullWidth
                                name="description"
                                label="Description"
                                value={cat.description}
                                onChange={(event) => handleCatChange(event, index)}
                                placeholder="Example: Very cute cat"
                                variant="outlined"
                                margin="normal"
                                sx={{ zIndex: 0 }}
                            />
                        </Box>
                    ))}
                    {message && <Typography color="red">{message}</Typography>}
                    <Button variant="contained" sx={{ marginRight: "1rem" }} onClick={handleAddCat}>
                        Add Cat
                    </Button>
                    <Button type="submit" variant="contained" sx={{ marginRight: "1rem" }} disabled={isLoading}>
                        {isLoading ? "Loading..." : "Submit"}
                    </Button>
                    <Button variant="contained" sx={{ marginRight: "1rem" }} onClick={handleReset}>
                        Reset
                    </Button>
                    {changedCats.length > 0 && <ListChangedCats changedCats={changedCats} />}
                </Box>
            </form>
        </ThemeProvider>
    )
}

export default CreateCat