import * as React from 'react';
import {useState} from 'react';
import {TextField,} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Create() {
  const [inputList, setInputList] = useState([{ Option: ""}]);
  // handle click event of the Add button

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
    </ThemeProvider>
  );
}