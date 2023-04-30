import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { styled } from '@mui/material/styles'

const StyledTable = styled(Table)({
    borderCollapse: 'collapse',
    width: '100%',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
})

const StyledTableCell = styled(TableCell)({
    padding: 8,
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
})

const StyledTableHeadCell = styled(StyledTableCell)({
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
})

const StyledTableRow = styled(TableRow)({
    '&:hover': {
        backgroundColor: '#f5f5f5',
    },
})

function ListOwners() {
    const [owners, setOwners] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        setIsLoading(true)
        fetch("https://adopt-a-cat.onrender.com/owners")
            .then((response) => response.json())
            .then((data) => {
                setOwners(data.data)
                setIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return <Typography sx={{ color: "#777" }}>Loading...</Typography>
    }

    return (
        <TableContainer>
            <StyledTable>
                <TableHead>
                    <StyledTableRow>
                        <StyledTableHeadCell>ID</StyledTableHeadCell>
                        <StyledTableHeadCell>First Name</StyledTableHeadCell>
                        <StyledTableHeadCell>Last Name</StyledTableHeadCell>
                        <StyledTableHeadCell>Address</StyledTableHeadCell>
                        <StyledTableHeadCell>Phone</StyledTableHeadCell>
                        <StyledTableHeadCell>Email</StyledTableHeadCell>
                        <StyledTableHeadCell>Age</StyledTableHeadCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {owners.map((owner) => (
                        <StyledTableRow key={owner.id}>
                            <StyledTableCell>{owner.id}</StyledTableCell>
                            <StyledTableCell>{owner.firstName}</StyledTableCell>
                            <StyledTableCell>{owner.lastName}</StyledTableCell>
                            <StyledTableCell>{owner.address}</StyledTableCell>
                            <StyledTableCell>{owner.phone}</StyledTableCell>
                            <StyledTableCell>{owner.email}</StyledTableCell>
                            <StyledTableCell>{owner.age}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </StyledTable>
        </TableContainer>
    )
}

export default ListOwners