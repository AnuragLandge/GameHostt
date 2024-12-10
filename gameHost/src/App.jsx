
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

function App() {
 // const [count, setCount] = useState(0)
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
     <Sample />
     <Working/>
     <Format />
     <Guide />
     <Format className="sec-format"/>
     <Footer/>
    </div>
    </ThemeProvider>
  )
}

export default App
