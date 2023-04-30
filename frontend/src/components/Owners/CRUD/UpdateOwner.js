import { useState } from "react"
import { Box, Button, TextField, Typography } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from "axios"

function UpdateOwner() {
    const [owner, setOwner] = useState({
        id: "",
        firstName: "",
        lastName: "",
        address: "",
        phone: "",
        email: "",
        age: "",
    })

    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")

    const handleChange = (event) => {
        const value = event.target.value
        setOwner({
            ...owner,
            [event.target.name]: value,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setIsLoading(true)
        setMessage("")
        
        axios.put("https://adopt-a-cat.onrender.com/owners_update/" + owner.id, owner, {
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
        setOwner({
            id: "",
            firstName: "",
            lastName: "",
            address: "",
            phone: "",
            email: "",
            age: "",
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
                Update Owner
            </Typography>
            <form onSubmit={handleSubmit}>
                <ThemeProvider theme={theme}>
                    <TextField
                        required
                        fullWidth
                        id="id"
                        name="id"
                        label="ID"
                        value={owner.id}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        placeholder="Example: 1"
                        sx={{ zIndex: 0 }}
                    />
                    <TextField
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        value={owner.firstName}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        placeholder="Example: Edward"
                        sx={{ zIndex: 0 }}
                    />
                    <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        value={owner.lastName}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        placeholder="Example: Iakab"
                        sx={{ zIndex: 0 }}
                    />
                    <TextField
                        required
                        fullWidth
                        id="address"
                        label="Address"
                        name="address"
                        value={owner.address}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        placeholder="Example: 1234 Main St, City, State, Zip"
                        sx={{ zIndex: 0 }}
                    />
                    <TextField
                        required
                        fullWidth
                        id="phone"
                        label="Phone"
                        name="phone"
                        value={owner.phone}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        placeholder="Example: 12345678"
                        sx={{ zIndex: 0 }}
                    />
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        value={owner.email}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        placeholder="Example: edward@gmail.com"
                        sx={{ zIndex: 0 }}
                    />
                    <TextField
                        required
                        fullWidth
                        id="age"
                        label="Age"
                        name="age"
                        value={owner.age}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        placeholder="Example: 25"
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

export default UpdateOwner