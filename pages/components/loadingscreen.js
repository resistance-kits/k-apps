import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';
const theme = createTheme();

export default function LoadingScreen() {
  const router = useRouter()
  return (
    <ThemeProvider theme={theme}>
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
        {/* Hero unit */}
        <Container sx={{ py: 35 }} maxWidth="md" align="center">
        <CircularProgress />
        <br/>
        <b>Loading</b>
        </Container>
      </main>
    </ThemeProvider>
  );
}