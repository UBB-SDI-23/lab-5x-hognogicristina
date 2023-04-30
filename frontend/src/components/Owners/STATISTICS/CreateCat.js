import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import ListChangedCats from "./ListChangedCats";

const theme = createTheme();

function CreateCat() {
    const [owner, setOwner] = useState(""); // this is the owner ID
    const [cats, setCats] = useState([]); // this is the list of cats introduced with all their attributes
    const [changedCats, setChangedCats] = useState([]); // this is the changed list of cats
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleOwnerChange = (event) => {
        const { value } = event.target
        setOwner(value)
    }

    const handleAddCat = () => {
        const newCat = {
            id: "",
            name: "",
            age: "",
            color: "",
            breed: "",
            weight: "",
            description: "",
            ownerId: owner,
        };
        setCats([...cats, newCat]);
    };

    const handleCatChange = (event, index) => {
        const { name, value } = event.target;
        const updatedCats = [...cats];
        updatedCats[index] = { ...updatedCats[index], [name]: value };
        setCats(updatedCats);
    };

    const handleSave = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(`https://adopt-a-cat.onrender.com/owners/${owner}/cats_list`, { cats }, { headers: { "Content-Type": "application/json", }, });
            setIsLoading(false);
            setMessage("Cats saved successfully!");
            setChangedCats(response.data);
        } catch (error) {
            setIsLoading(false);
            setMessage("Failed to save cats. Please try again.");
        }
    };

    const handleReset = () => {
        setOwner("");
        setCats([]);
        setChangedCats([]);
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: "#d04c7d7a",
            },
        },
    })

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" sx={{ mb: 3 }}>
                    Create Cat
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Typography sx={{ mr: 2 }}>Owner ID:</Typography>
                    <TextField
                        variant="outlined"
                        size="small"
                        value={owner}
                        onChange={handleOwnerChange}
                    />
                </Box>
                {cats.map((cat, index) => (
                    <Box key={cat.id} sx={{ mb: 2 }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                            Cat
                        </Typography>
                        <TextField
                            name="id"
                            label="ID"
                            variant="outlined"
                            size="small"
                            value={cat.id}
                            onChange={(event) => handleCatChange(event, index)}
                            sx={{ mr: 2 }}
                        />
                        <TextField
                            name="name"
                            label="Name"
                            variant="outlined"
                            size="small"
                            value={cat.name}
                            onChange={(event) => handleCatChange(event, index)}
                            sx={{ mr: 2 }}
                        />
                        <TextField
                            name="age"
                            label="Age"
                            variant="outlined"
                            size="small"
                            value={cat.age}
                            onChange={(event) => handleCatChange(event, index)}
                            sx={{ mr: 2 }}
                        />
                        <TextField
                            name="color"
                            label="Color"
                            variant="outlined"
                            size="small"
                            value={cat.color}
                            onChange={(event) => handleCatChange(event, index)}
                            sx={{ mr: 2 }}
                        />
                        <TextField
                            name="breed"
                            label="Breed"
                            variant="outlined"
                            size="small"
                            value={cat.breed}
                            onChange={(event) => handleCatChange(event, index)}
                            sx={{ mr: 2 }}
                        />
                        <TextField
                            name="weight"
                            label="Weight"
                            variant="outlined"
                            size="small"
                            value={cat.weight}
                            onChange={(event) => handleCatChange(event, index)}
                            sx={{ mr: 2 }}
                        />
                        <TextField
                            name="description"
                            label="Description"
                            variant="outlined"
                            size="small"
                            value={cat.description}
                            onChange={(event) => handleCatChange(event, index)}
                            sx={{ mr: 2 }}
                        />
                        <TextField
                            name="ownerId"
                            label="Owner ID"
                            variant="outlined"
                            size="small"
                            value={cat.ownerId}
                            disabled
                        />
                    </Box>
                ))}
                <Button variant="contained" sx={{ marginRight: "1rem" }} onClick={handleAddCat}>
                    Add Cat
                </Button>
                <Button type="submit" variant="contained" sx={{ marginRight: "1rem" }} disabled={isLoading} onClick={handleSave}>
                    {isLoading ? "Loading..." : "Submit"}
                </Button>
                {message && (<Typography variant="body2" sx={{ mt: 2 }}>{message}</Typography>
                )}
                {changedCats.length > 0 && <ListChangedCats changedCats={changedCats} />}
            </Box>
        </ThemeProvider>
    );
}

export default CreateCat;      