import React, { useState } from "react"
import { Box, Typography, TextField, Button } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import axios from "axios"
import ListChangedCats from "./ListChangedCats"

function ChangeCat() {
    const [owner, setOwner] = useState("")
    const [cats, setCats] = useState([])
    const [changedCats, setChangedCats] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        setIsLoading(true)
        setMessage("")

        axios.post(`https://adopt-a-cat.onrender.com/owners/${owner}/cats_list`, { id: cats },
                { headers: { "Content-Type": "application/json", }, }
            )
            .then((response) => {
                setChangedCats(response.data.data)
                setIsLoading(false)
                setMessage(response.data.message)
            })
    }

    const handleReset = () => {
        setOwner("")
        setCats([])
        setChangedCats([])
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        if (name === "owner") {
            setOwner(value)
        } else if (name === "cats") {
            setCats(value.split(",").map((catId) => catId))
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
        <Box sx={{ textAlign: "center", p: 2, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ ...h2Style }}>
                Change Cat
            </Typography>
            <form onSubmit={handleSubmit}>
                <Typography variant="body1" sx={{ margin: "1rem 0", ...pStyle }}>
                    Enter a number and a list of ids' cats to change the owner of them.
                </Typography>
                <ThemeProvider theme={theme}>
                    <TextField
                        required
                        fullWidth
                        id="owner"
                        name="owner"
                        label="Owner ID"
                        value={owner}
                        onChange={handleChange}
                        placeholder="Example: 1"
                        margin="normal"
                        variant="outlined"
                        sx={{ zIndex: 0 }}
                    />
                    <TextField
                        required
                        fullWidth
                        id="cats"
                        name="cats"
                        label="Cats' IDs"
                        onChange={handleChange}
                        placeholder="Example: 1,2,3"
                        margin="normal"
                        variant="outlined"
                        sx={{ zIndex: 0 }}
                    />
                    {message && <Typography color="red">{message}</Typography>}
                    <Button type="submit" variant="contained" sx={{ marginRight: "1rem" }} disabled={isLoading}>
                        {isLoading ? "Loading..." : "Submit"}
                    </Button>
                    <Button variant="contained" sx={{ marginRight: "1rem" }} onClick={handleReset}>
                        Reset
                    </Button>
                </ThemeProvider>
            </form>
            {changedCats.length > 0 && <ListChangedCats changedCats={changedCats} />}
        </Box>
    )
}

export default ChangeCat