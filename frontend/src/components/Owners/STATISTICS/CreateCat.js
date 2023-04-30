import React, { useState } from "react"
import { Box, Typography, TextField, Button } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import axios from "axios"
import ListChangedCats from "./ListChangedCats"

function CreateCat() {
    const [owner, setOwner] = useState("")
    const [cats, setCats] = useState([{ id: "", name: "", age: "", color: "", breed: "", weight: "" }])
    const [changedCats, setChangedCats] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        setIsLoading(true)
        setMessage("")

        axios.post(`https://adopt-a-cat.onrender.com/owners/${owner}/cats_create`, { cats_list: cats },
            { headers: { "Content-Type": "application/json", }, })
            .then((response) => {
                setChangedCats(response.data.data)
                setIsLoading(false)
                setMessage(response.data.message)
            })
    }

    const handleReset = () => {
        setOwner("")
        setCats([{ id: "", name: "", age: "", color: "", breed: "", weight: "" }])
        setChangedCats([])
    }

    const handleChange = (event, index) => {
        const { name, value } = event.target
        if (name === "owner") {
            setOwner(value)
        } else if (name === "cats") {
            setCats((prevCats) => {
                const newCats = [...prevCats]
                newCats[index][name] = value
                return newCats
            })
        }
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: "#d04c7d7a",
            },
        },
    })

    const pStyle = {
        fontSize: "1.2rem",
        lineHeight: 1.5,
        color: "#777",
        marginBottom: "1.5rem",
        textShadow: "1px 1px #eee",
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

    const buttonStyles = {
        backgroundColor: "transparent",
        color: "#7c487c",
        border: "2px solid #7c487c",
        margin: 1,
        "&:hover": {
            backgroundColor: "#e2c7f7d8",
            color: "7c487c",
        },
    }

    return (
        <Box sx={{ textAlign: "center", p: 2, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ ...h2Style }}>
                Create Cats for Owner or Change Owner of Cats
            </Typography>
            <form onSubmit={handleSubmit}>
                <Typography variant="body1" sx={{ margin: "1rem 0", ...pStyle }}>
                    Enter a owner id and then fill in the details of the cats you want to add.
                    If you want to create more than one cat, click on the "Add Cat" button.
                </Typography>
                <ThemeProvider theme={theme}>
                    <TextField
                        required
                        fullWidth
                        id="owner"
                        name="owner"
                        label="Owner Id"
                        value={owner}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                    />
                    {cats.map((cat, index) => {
                        return (
                            <div key={index}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    name="cats"
                                    label="Name"
                                    value={cat.name}
                                    onChange={(event) => handleChange(event, index)}
                                    variant="outlined"
                                    margin="normal"
                                />
                                <TextField
                                    required
                                    fullWidth
                                    id="age"
                                    name="cats"
                                    label="Age"
                                    value={cat.age}
                                    onChange={(event) => handleChange(event, index)}
                                    variant="outlined"
                                    margin="normal"
                                />
                                <TextField
                                    required
                                    fullWidth
                                    id="color"
                                    name="cats"
                                    label="Color"
                                    value={cat.color}
                                    onChange={(event) => handleChange(event, index)}
                                    variant="outlined"
                                    margin="normal"
                                />
                                <TextField
                                    required
                                    fullWidth
                                    id="breed"
                                    name="cats"
                                    label="Breed"
                                    value={cat.breed}
                                    onChange={(event) => handleChange(event, index)}
                                    variant="outlined"
                                    margin="normal"
                                />
                                <TextField
                                    required
                                    fullWidth
                                    id="weight"
                                    name="cats"
                                    label="Weight"
                                    value={cat.weight}
                                    onChange={(event) => handleChange(event, index)}
                                    variant="outlined"
                                    margin="normal"
                                />
                            </div>
                        )
                    })}
                    <Button
                        variant="contained"
                        sx={{ ...buttonStyles }}
                        onClick={() => setCats((prevCats) => [...prevCats, { id: "", name: "", age: "", color: "", breed: "", weight: "" }])}
                    >
                        Add Cat
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ ...buttonStyles }}
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Submit"}
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ ...buttonStyles }}
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                </ThemeProvider>
            </form>
            <Typography variant="body1" sx={{ margin: "1rem 0", ...pStyle }}>
                {message}
            </Typography>
            <ListChangedCats changedCats={changedCats} />
        </Box>
    )

}

export default CreateCat