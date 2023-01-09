import { useState } from "react"
import axios from "axios";
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router'
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { IconButton, Badge } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import * as React from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from "../components/navbar";
import LoadingScreen from "../components/loadingscreen";
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);
import { Bar } from 'react-chartjs-2';
const theme = createTheme();


export default function poll(props) {
    const { user, error, isLoading } = useUser();
    if (!isLoading) {
        const labels = props.data.options.map((e) => {
            return e.value
        })
        const count = props.data.options.map((e) => {
            return e.count
        })
        var sum = count.reduce(function (a, b) {
            return a + b;
        }, 0);
        const options = {
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false
                    }
                }]
            }
        }
        const data = {
            labels: labels,
            datasets: [{
                label: '# of Votes',
                data: count,
                borderWidth: 1
            },
            ]
            ,
        }
        console.log(user.sub)
        console.log(props)
        const handleToggle = async(e)=>{
            console.log("Clicked")
            await axios.patch("/api/togglereport",{code : props.data.code,sub: props.data.sub})
            window.location.reload();
        }
        return (<ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            {props.data.sub === user.sub?(<main>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <React.Fragment>
                        <Typography variant="h6" gutterBottom>
                            Question
                        </Typography>
                        <Typography gutterBottom>
                            {props.data.question}
                        </Typography>
                        <br />
                    </React.Fragment>
                    <Bar
                        data={data}
                        width={400}
                        height={200}
                        options={{
                            maintainAspectRatio: true,
                            scales: {
                                x: {
                                    grid: {
                                        display: false
                                    }
                                },
                                y: {
                                    grid: {
                                        display: false
                                    }
                                }
                            }
                        }}

                    />
                    <React.Fragment>
                        <Typography gutterBottom>
                            <b>{"Total Responses: " + sum}</b>
                        </Typography>
                        <br />
                        <Button onClick={handleToggle}>{props.data.report?"Disable Results":"Enable Results"}</Button>
                        <br/>
                    </React.Fragment>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>S.No.</TableCell>
                                <TableCell>User</TableCell>
                                <TableCell>Responses</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.data.response.map((data, index) => {
                                if (index != 0) {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell >{index}</TableCell>
                                            <TableCell>{data.user}</TableCell>
                                            <TableCell>{data.choice}</TableCell>
                                        </TableRow>
                                    )
                                }
                            })}
                        </TableBody>
                    </Table>
                </Container>
            </main>):(<ThemeProvider theme={theme}>
                <CssBaseline />
                <main>
                    <Container sx={{ py: 30, }} maxWidth="md" align="center">
                        <Card
                            sx={{ py: 2, width: '40%', display: 'flex', flexDirection: 'column' }} variant="outlined" align="center"
                        >
                            {/* backgroundColor: '#1976d2' */}
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Not Authenticated
                                </Typography>
                                <br />
                            </CardContent>
                        </Card>
                    </Container>
                </main>
            </ThemeProvider>)}
        </ThemeProvider>)
    } else {
        return (<LoadingScreen />)
    }

}

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(context) {
        console.log(context.query.id)
        const res = await fetch(`http://localhost:3000/api/polls?code=${context.query.id}`)
        var data = await res.json()
        data = data.data
        return { props: { data } }
    }
})