import { useState } from "react"
import { Box, Button, TextField, Typography } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles'

function AddOwner() {
    const [owner, setOwner] = useState({
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
        fetch("https://adopt-a-cat.onrender.com/owners_add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(owner),
        })
            .then((response) => response.json())
            .then((data) => {
                setIsLoading(false)
                setMessage(data.message)
            })
    }

    const handleReset = () => {
        setOwner({
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
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <Typography variant="h4" component="div" gutterBottom>
                Add Owner
            </Typography>
            <ThemeProvider theme={theme}>
                <TextField
                    required
                    fullWidth
                    id="outlined-required"
                    label="First Name"
                    name="firstName"
                    value={owner.firstName}
                    onChange={handleChange}
                />
                <TextField
                    required
                    fullWidth
                    id="outlined-required"
                    label="Last Name"
                    name="lastName"
                    value={owner.lastName}
                    onChange={handleChange}
                />
                <TextField
                    required
                    fullWidth
                    id="outlined-required"
                    label="Address"
                    name="address"
                    value={owner.address}
                    onChange={handleChange}
                />
                <TextField
                    required
                    fullWidth
                    id="outlined-required"
                    label="Phone"
                    name="phone"
                    value={owner.phone}
                    onChange={handleChange}
                />
                <TextField
                    required
                    fullWidth
                    id="outlined-required"
                    label="Email"
                    name="email"
                    value={owner.email}
                    onChange={handleChange}
                />
                <TextField
                    required
                    fullWidth
                    id="outlined-required"
                    label="Age"
                    name="age"
                    value={owner.age}
                    onChange={handleChange}
                />
                <Button
                    variant="contained"
                    sx={buttonStyles}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
                <Button
                    variant="contained"
                    sx={buttonStyles}
                    onClick={handleReset}
                >
                    Reset
                </Button>
                {isLoading && <p>Loading...</p>}
                {message && <p>{message}</p>}
            </ThemeProvider>
        </Box>
    )
}

export default AddOwner
