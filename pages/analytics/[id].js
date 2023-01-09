import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Chart as ChartJS, registerables } from 'chart.js';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
ChartJS.register(...registerables);
import { Bar } from 'react-chartjs-2';
import Navbar from '../components/navbar';
const theme = createTheme();
import { useState,useEffect,useRef } from "react"
import axios from "axios";
export const getStaticPaths = async () => {
    const res = await fetch('http://localhost:3000/api/polls');
    const data = await res.json();
    const paths = data.data.map(e => {
        return {
            params: { id: e.code.toString() }
        }
    })
    return {
        paths,
        fallback: false
    }

}

export const getStaticProps = async (context) => {
    const id = context.params.id
    const res = await axios.get(`http://localhost:3000/api/polls?code=${id}`);
    const data = res.data.data
    return {
        props: { poll: data, code: context.params.id }
    }
}

export default function poll(poll) {
    const [analytic, setAnalytic] = useState();
    const getData = async() =>{
        const res = await axios.get(`http://localhost:3000/api/polls?code=${poll.code}`);
        setAnalytic(res.data.data)
    }
    const useInterval = (callback, delay) =>{
        const savedCallback = useRef();
      
        useEffect(() => {
          savedCallback.current = callback;
        });
      
        useEffect(() => {
          function tick() {
            savedCallback.current();
          }
      
          let id = setInterval(tick, delay);
          return () => clearInterval(id);
        }, [delay]);
      }
    useInterval(() => {
        getData()
    }, 2000);
    if(analytic){
        const labels = analytic.options.map((e) => {
            return e.value
        })
        const count = analytic.options.map((e) => {
            return e.count
        })
        var sum = count.reduce(function (a, b) {
            return a + b;
        }, 0);
        const options = {
            scales: {
                xAxes: [{
                    gridLines: {
                        display:false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display:false
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
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Navbar/>
                <main>
                    <Container sx={{ py: 8 }} maxWidth="md">
                        <React.Fragment>
                            <Typography variant="h6" gutterBottom>
                                Question
                            </Typography>
                            <Typography gutterBottom>
                                {analytic.question}
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
                {analytic.response.map((data, index) => {
                if(index!=0){
                    return (
                        <TableRow key={index}>
                        <TableCell >{index}</TableCell>
                          <TableCell>{data.user}</TableCell>
                          <TableCell>{data.choice}</TableCell>
                        </TableRow>
                      )
                }})}
              </TableBody>
            </Table>
                    </Container>
                </main>
            </ThemeProvider>
        )
    }else{
        return (
            <></>
        )
    }
}
