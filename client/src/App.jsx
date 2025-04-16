import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import Login from './pages/login'
import Navbar from './components/Navbar'
import HeroSection from './pages/ACCComponent/heroSection/HeroSection.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
        
        <Navbar/>
        <HeroSection/>
        <Login/>

        {/* <Button variant="outline">hiii</Button> */}
    </main>
  )
}

export default App
