
import { createTheme, ThemeProvider } from '@mui/material'
import './App.css'
import Format from './Components/Format/Format'
// import Banner from './Components/Banner/Banner'
// import Login from './Components/Login/Login'
import Navbar from './Components/Navbar/Navbar'
import Sample from './Components/Sample/Sample'
import Working from './Components/Working/Working'
import Guide from './Components/Guide/Guide'
import Footer from './Components/Footer/Footer'
import Home from './Components/Home/Home'
//import NavbarWithDrawer from './Components/AddTournament/NavbarWithDrawer'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'

function App() {
  
  const router = createBrowserRouter([
    {
      path:"/home",
      element:<Home/>
    }
  ])

 const theme = createTheme({
  typography: {
    fontFamily: '"Montserrat", "Arial", sans-serif',
  },
});
  return (
    <ThemeProvider theme={theme}>
    <div className="container">
       {/* <Banner/>
      <Login/>  */}
     
     <Navbar/> 
    <RouterProvider router={router}/>     
    </div>
    </ThemeProvider>
  )
}

export default App
