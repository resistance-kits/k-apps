import { 
  AppBar,
  Toolbar,
  Typography,
  Button

} from "@mui/material"
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from "next/router";
export default function Navbar() {
  const router = useRouter()
  const {user, error, isLoading} = useUser()
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={()=>{router.push("/")}}>
          Karunya Poll
        </Typography>
        {(() =>{
          if(user){
            return (<Button color="inherit" href='/api/auth/logout'>Log out</Button>)
          }else{
            return (<Button color="inherit" href='/api/auth/login'>Login</Button>)
          }
        })()}
      </Toolbar>
    </AppBar>
  )
}
