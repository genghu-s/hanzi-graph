import Search from './search/Search.tsx'
import { useState, useEffect } from 'react'

import './App.css'


function App() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
          setCount(prevCount => prevCount + 1);
        }, 1000);
    
        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);
    
  return (
    <>
        <div>
            <p>You have been here for {count} seconds.</p>
        </div>
        <Search />
    </>
  )
}

export default App
