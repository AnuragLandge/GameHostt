import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

const Performance = () => {
    return (
        <>
            <TableContainer component={Paper} sx={{ maxWidth: 600, margin: "auto", mt: 4, boxShadow: 3, borderRadius: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "grey" }}>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Sr. No</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Team Name</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Captain Name</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Points</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>Mumbai Indians</TableCell>
                            <TableCell>Hardik Pandya</TableCell>
                            <TableCell>2</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Performance
