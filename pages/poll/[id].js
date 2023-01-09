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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from "../components/navbar";
import Invalid from "../components/invalid";
export default function poll(props) {
    const theme = createTheme();
    const router = useRouter()
    const data = props.data
    const response = props.data.response;
    const responders = response.map((e) => {
        return e.user
    })
    const { user, error, isLoading } = useUser();
    const [value, setValue] = useState('1')
    var voted
    if (user) {
        voted = responders.includes(user.email)
    }

    if (isLoading) {
        return (
            <h1>    <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Karunya Poll
                        </Typography>
                        <Button color="inherit">Log out</Button>
                    </Toolbar>
                </AppBar>
                <main>
                    {/* Hero unit */}
                    <Container sx={{ py: 35 }} maxWidth="md" align="center">
                        <CircularProgress />
                        <br />
                        <b>Loading ...</b>
                    </Container>
                </main>
            </ThemeProvider></h1>
        )
    }
    const email = user.email
    if(!email.endsWith("karunya.edu.in") && !email.endsWith("karunya.edu.in")){
        return (<Invalid/>)
    }
    if (data.status == 'active' && !voted) {
        // handle input change
        const handleInputChange = (e) => {
            setValue(e.target.value)

        };
        const handleClick = async (event) => {
            event.preventDefault()
            try {
                const res = await axios.patch('http://localhost:3000/api/votepoll', { code: data.code, value: value, user: user.email })
                console.log(res)
                if(res.status === 200){
                    alert("Successfully Voted")
                }else{
                    alert("An Error Occured")
                }
                router.push(`/result/${data.code}`)
            } catch (err) {
                alert("Error")
            }
    
        }

        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Karunya Poll
                        </Typography>
                        <Button color="inherit">Log out</Button>
                    </Toolbar>
                </AppBar>
                <main>
                    <Container sx={{ py: 5 }} maxWidth="md">
                        <React.Fragment>
                            <Typography variant="h6" gutterBottom>
                                Question
                            </Typography>
                            <Typography>
                                {data.question}
                            </Typography>
                        </React.Fragment>
                    </Container>
                    
                        <Container sx={{ py: 0 }} maxWidth="md">
                            <React.Fragment>
                                <Typography variant="h6" gutterBottom>
                                    Options
                                </Typography>
                                <FormControl>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value={data.options[0].value} control={<Radio />} label={data.options[0].value} onChange={handleInputChange} />
                                    <FormControlLabel value={data.options[1].value} control={<Radio />} label={data.options[1].value} onChange={handleInputChange} />
                                    <FormControlLabel value={data.options[2].value} control={<Radio />} label={data.options[2].value} onChange={handleInputChange} />
                                    <FormControlLabel value={data.options[3].value} control={<Radio />} label={data.options[3].value} onChange={handleInputChange} />
                                </RadioGroup>

                                </FormControl>
                            </React.Fragment>
                        </Container>
                    
                    <Container sx={{ py: 7 }} maxWidth="md">
                        <React.Fragment>
                            <Grid spacing={5}>
                                <Button variant="contained" onClick={handleClick}>Submit</Button>
                            </Grid>
                        </React.Fragment>
                    </Container>

                </main>
            </ThemeProvider>)
    } if (voted) {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Navbar />
                <main>
                    <Container sx={{ py: 30, }} maxWidth="md" align="center">
                        <Card
                            sx={{ py: 2, width: '40%', display: 'flex', flexDirection: 'column' }} variant="outlined" align="center"
                        >
                            {/* backgroundColor: '#1976d2' */}
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Already Voted!
                                </Typography>
                                <br />
                            </CardContent>
                        </Card>
                    </Container>
                </main>
            </ThemeProvider>
        )
    }
    if (data.status === 'inactive') {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Navbar />
                <main>
                    <Container sx={{ py: 30, }} maxWidth="md" align="center">
                        <Card
                            sx={{ py: 2, width: '40%', display: 'flex', flexDirection: 'column' }} variant="outlined" align="center"
                        >
                            {/* backgroundColor: '#1976d2' */}
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    The Poll Is Inactive
                                </Typography>
                                <Button size="small" variant='text'>OK</Button>
                            </CardContent>
                        </Card>
                    </Container>
                </main>
            </ThemeProvider>
        )
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