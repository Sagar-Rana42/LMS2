import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import Login from './pages/login'


function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
        <Login/>
        {/* <Button variant="outline">hiii</Button> */}
    </main>
  )
}

export default App
