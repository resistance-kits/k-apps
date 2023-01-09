import * as React from 'react';
import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { InputAdornment } from '@mui/material';
import Navbar from './components/navbar';
import { useUser } from '@auth0/nextjs-auth0/client';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { CheckboxGroup } from '@chakra-ui/react';
const theme = createTheme();

export default function Create() {
  const {user, error, isLoading} = useUser();
//   const [inputList, setInputList] = useState([{ Option: ""}]);
 
//   // handle input change
//   const handleInputChange = (e, index) => {
//     const { name, value } = e.target;
//     const list = [...inputList];
//     list[index][name] = value;
//     setInputList(list);
//   };
 
//   // handle click event of the Add button
//   const handleAddClick = () => {
//     setInputList([...inputList, {  Option: ""}]);
//     console.log(inputList)
//   };
    const handleSubmit = async (event) => {
    try{
      alert("Submitting Poll")
      event.preventDefault();
      console.log(user.sub);
      const data = {
        question : event.target.elements.question.value,
        options : [
          event.target.elements.option[0].value,
          event.target.elements.option[1].value,
          event.target.elements.option[2].value,
          event.target.elements.option[3].value,
        ]
      }
      data['sub'] = user.sub;
      console.log(data);
      const res = await axios.post('/api/polls',data);
      alert("Poll Created")
      window.location.replace("http://localhost:3000/");
    }catch(err){
      console.log(err)
      alert("Faced an error!")
    }

  }
  
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar/>
      <main>
      <form onSubmit={handleSubmit}>
      <Container sx={{ py: 8 }} maxWidth="md">
   
      <React.Fragment>
    
      <Card sx={{ maxWidth: '100%' }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Question
        </Typography>
        <TextField fullWidth
          id="question"
          type="text"
          variant="filled"
          width = '80%'
        />
        <br/>
        <br/>
        <Typography gutterBottom variant="h6" component="div">
          Options
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', padding: '15px'}}>
        <CheckBoxOutlineBlankIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField fullWidth id="option" variant="standard" />
      </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' , padding: '15px'}}>
        <CheckBoxOutlineBlankIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField fullWidth id="option" variant="standard" />
      </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' , padding: '15px'}}>
        <CheckBoxOutlineBlankIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField fullWidth id="option" variant="standard" />
      </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' , padding: '15px'}}>
        <CheckBoxOutlineBlankIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField fullWidth id="option" variant="standard" />
      </Box>
      {/* <Button><AddBoxIcon/></Button> */}
      </CardContent>
    </Card>
    
    </React.Fragment>
    </Container>
    <Container sx={{ py: 7 }} maxWidth="md">
    <React.Fragment>
    <Grid spacing={5}>
    <Button variant="contained" type='submit' >Create Poll</Button>
    </Grid>
    </React.Fragment>
    </Container>
    </form>
    </main>
    </ThemeProvider>
  );
}

// import { 
//     Card, 
//     CardFooter, 
//     CardHeader, 
//     CardBody, 
//     Heading,
//     Text,
//     Button,
//     Flex, 
//     Radio, 
//     RadioGroup, 
//     Stack,
//     FormControl, 
//     FormLabel,
//     Input 
// } from "@chakra-ui/react"

// import { useState } from "react";
// import Navbar from "./components/navbar";
// import axios from 'axios';
// import { useToast } from '@chakra-ui/react'
// export default function createpoll() {
//     const [question, setQuestion] = useState();
//     const [option1, setOption1] = useState()
//     const [option2, setOption2] = useState()
//     const [option3, setOption3] = useState()
//     const [option4, setOption4] = useState()
//     const toast = useToast();
//     const handleSubmit = async () =>{
//         try{
//             const data = {"question":question,"options":[option1,option2,option3,option4]}
//             const res = await axios.post('/api/polls',data);
//             console.log(res);
//             toast({
//                 title:"Created Poll",
//                 description: `We've created a poll for you. ${res.data.data}`,
//                 status: 'success',
//                 duration: 5000,
//                 isClosable: true,
//             }
//             )
//         }catch(error){
//             toast({
//                 title:"Error",
//                 description: `Error Occured`,
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//             }
//             )
//         }
//         // setTimeout(function() { 
//         //     window.location.reload(false);
//         // }.bind(this), 3000)
//     }
//     return (
//         <>
        
//         <Flex alignItems="center" justifyContent="center" padding="30px">
//             <Card align='right' width="80%">
//                 <CardHeader>
//                     <FormControl isRequired>
//                         <FormLabel>Question</FormLabel>
//                         <Input  onChange={(e)=>{setQuestion(e.target.value)}} placeholder='Enter the Question' />
//                     </FormControl>
//                 </CardHeader>
//                 <CardBody>
//                     <Flex alignItems="left" direction="column">
//                     <FormControl isRequired>
//                         <FormLabel>Option 1</FormLabel>
//                         <Input onChange={(e)=>{setOption1(e.target.value)}} placeholder='Option 1' />
//                     </FormControl>
//                     <FormControl isRequired>
//                         <FormLabel>Option 2</FormLabel>
//                         <Input onChange={(e)=>{setOption2(e.target.value)}} placeholder='Option 2' />
//                     </FormControl>
//                     <FormControl isRequired>
//                         <FormLabel>Option 3</FormLabel>
//                         <Input onChange={(e)=>{setOption3(e.target.value)}} placeholder='Option 3' />
//                     </FormControl>
//                     <FormControl isRequired>
//                         <FormLabel>Option 4</FormLabel>
//                         <Input onChange={(e)=>{setOption4(e.target.value)}} placeholder='Option 4' />
//                     </FormControl>
//                     </Flex>
//                 </CardBody>
//                 <CardFooter>
//                     <Button colorScheme='blue' type="button" onClick={()=>{handleSubmit()}}>submit</Button>
//                 </CardFooter>
//             </Card>
//         </Flex>
//         </>
//     )
// }
