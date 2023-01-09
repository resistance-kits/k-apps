import { IconButton, Badge } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import axios from 'axios';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useUser } from '@auth0/nextjs-auth0/client';
import Navbar from './components/navbar';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useState } from 'react';
import Table from '@mui/material/Table';
import {TextField, FormControlLabel, Checkbox} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useRouter } from 'next/router';
import LoadingScreen from './components/loadingscreen';
import Invalid from './components/invalid';
const cards = [1];

const theme = createTheme();

export default function Home() {
  const router = useRouter()
  const [data, setData] = useState();
  console.log("$$$$")
  const { user, error, isLoading } = useUser();
  const getData = async () => {
    console.log(user.email)
    const res = await axios.get(`http://localhost:3000/api/polls?sub=${user.sub}`);
    setData(res.data.data)
  }
  if (user && !data) {
    getData();
  }
  function preventDefault(event) {
    event.preventDefault();
  }
  if (data) {
    console.log(data)
    const handleStatusToggle = async(pollcode) =>{
      const data = {
        code: pollcode,
        sub: user.sub,
        cmd: 'toggle-status'
      }
      const res = await axios.patch(`http://localhost:3000/api/polls`,data);
      window.location.reload();
    }
  var mail = user.email
  if(mail.endsWith("ronaldc@karunya.edu")){
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Navbar/>
        <main>
          {/* Hero unit */}
          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <React.Fragment>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Recent Polls
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>S.No.</TableCell>
                    <TableCell>Question</TableCell>
                    <TableCell align="right">Poll Code</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data && data.map((data, index) => (
                    <TableRow key={index}>
                    <TableCell >{index+1}</TableCell>
                      <TableCell>{data.question}</TableCell>
                      <TableCell align="right">{data.code}</TableCell>
                      <TableCell align="right">{data.status}</TableCell>
                      <TableCell align="right"><Button size="small" onClick={()=>{router.push(`/report/${data.code}`)}}>Result</Button></TableCell>
                      <TableCell align="right"><Button size="small" onClick={()=>{router.push(`/poll/${data.code}`)}}>{"</>"}</Button></TableCell>
                      <TableCell align="right"><Button size="small" onClick={()=>{handleStatusToggle(data.code)}}>{data.status == 'active' ? "stop":"start"}</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </React.Fragment>
            <Box
              sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
              }}
            >
              <Container maxWidth="md">
                <Stack
                  sx={{ pt: 4 }}
                  direction="row"
                  spacing={2}
                  justifyContent="flex-end"
                >
                  <Button variant="outlined" onClick={()=>{router.push('http://localhost:3000/createpoll')}}>Add Poll</Button>
                </Stack>
              </Container>
            </Box>
          </Container>
        </main>
      </ThemeProvider>
    )
  }
  if(mail.endsWith("karunya.edu.in")){
    return (    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Karunya Poll
          </Typography>
          <Button color="inherit" onClick={()=>{router.push('/api/auth/logout')}}>Log out</Button>
        </Toolbar>
      </AppBar>
      <main>
      <Container sx={{ py: 30, }} maxWidth="md" align="center">
      <Card
                  sx={{ py: 2, width: '60%', display: 'flex', flexDirection: 'column'}} variant="outlined" align="center"
                >
                    {/* backgroundColor: '#1976d2' */}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Enter Code Here
                    </Typography>
                    <TextField fullWidth label="Poll Code" id="fullWidth" onChange={(e)=>setInputList(e.target.value)}/>
                    <Typography gutterBottom variant="h5" component="h2">
                    </Typography>
                    <Button size="small" variant='text' onClick={()=>{window.location.replace(`http://localhost:3000/poll/${inputList}`)}}>Submit</Button>
                  </CardContent>
                </Card>
      </Container>
      </main>
    </ThemeProvider>)
  }else{
    return (<Invalid/>)
  }
  }else{
    return (<LoadingScreen/>)
  }
}

export const getServerSideProps = withPageAuthRequired({})