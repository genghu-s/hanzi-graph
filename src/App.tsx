import Search from './search/Search.tsx'

import './App.css'
import { Route, BrowserRouter as Router, Routes, Link } from 'react-router-dom'
import AdvancedSearch from './search/AdvancedSearch.tsx'
import HanziWriter from './components/HanziWriter.tsx'


const App: React.FC = () => {
  return (
    <>
        <a href="/" rel="noopener noreferrer">
            <h1><img src="/zi.ico" alt="My Image" style={{ width: '50px', marginRight: '10px' }} />汉字三维网络</h1>
        </a>
        <Router>
            <Routes>
                <Route path="/" element={ <Search /> } />  
                <Route path="/advancedsearch" element={<AdvancedSearch />} />      
                <Route path="/write/:character" element={<HanziWriter />} />          
            </Routes>
        </Router>
    </>
  )
}

export default App
