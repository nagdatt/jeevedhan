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

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];

    const [data, setData] = React.useState([])
    useEffect(() => {
        axios.get("http://localhost:2000/users/getpost").then((res) => {
            setData(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        <div className="container" style={{margin:"20px"}}>
            <table>
                <th>Id</th>
                <th>User Name</th>
                <th>Location</th>
                <th>Phone No.</th>

                <th>Book Now</th>
                <th>Collect</th>


                {data.map((row) => {
                    return (
                        <tr>
                            <td>{row._id}</td>
                            <td>{row.farmerId.name}</td>
                            <td>{row.location}</td>
                            <td>{row.phoneNo}</td>

                            <td>
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Book Now
                                </Button>
                            </td>
                            <td>
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    color={"secondary"}
                                >
                                   Collect
                                </Button>
                            </td>
                        </tr>
                    )
                })
                }
            </table>
        </div>

    )
}