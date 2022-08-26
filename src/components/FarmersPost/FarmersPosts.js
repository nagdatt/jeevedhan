import axios from "axios"
import { useEffect } from "react"
import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";

export default function FarmersPosts() {
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }



    const [data, setData] = React.useState([])
    useEffect(() => {
        axios.get("http://localhost:2000/users/getpost").then((res) => {
            console.log(res.data, "uk")
            setData(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    const handleBookNow = (orderId) => {
        const id = sessionStorage.getItem("id")
        const obj = {
            id: orderId,
            userId: id
        }
        console.log(obj, "obj")
        axios.post("http://localhost:2000/users/book", obj).then((res) => {
            console.log(res)
            //  window.location.reload(false)
        }).catch((err) => {
            console.log(err)
        })

    }
    const handleCollectNow = (orderId) => {

        axios.get("http://localhost:2000/users/collect?id=" + orderId).then((res) => {
            console.log(res)
            window.location.reload(false)
        }).catch((err) => {
            console.log(err)
        })

    }
    return (
        <div className="container" style={{ margin: "20px" }}>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Raw material Id</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell align="left">User Name</TableCell>
                            <TableCell align="left">Location</TableCell>
                            <TableCell align="left">Phone No.</TableCell>
                            <TableCell align="left">Book Now</TableCell>
                            <TableCell align="v">Collect</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                                key={row.rawmaterial}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row._id}
                                </TableCell>
                                <TableCell align="left">{row.qty}</TableCell>

                                <TableCell align="left">{"My Name"}</TableCell>
                                <TableCell align="left">{row.location}</TableCell>
                                <TableCell align="left">{row.phoneNo}</TableCell>
                                <TableCell align="left">
                                    <Button
                                        type="button"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={() => handleBookNow(row._id)}
                                        disabled={row.status >= 1 ? true : false}
                                    >
                                        Book Now
                                    </Button>
                                </TableCell>
                                <TableCell align="left">
                                    <Button
                                        type="button"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={() => { handleCollectNow(row._id) }}
                                        color={"secondary"}
                                        disabled={row.status === 2 || row.status === 0 ? true : false}

                                    >
                                        Collect
                                    </Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    )
}