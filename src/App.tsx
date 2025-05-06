import Search from './search/Search.tsx'

import Counter from './components/Counter.tsx'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AdvancedSearch from './search/AdvancedSearch.tsx'


const App: React.FC = () => {
  return (
    <>
        <h1><img src="../public/zi.ico" alt="My Image" style={{ width: '50px', marginRight: '10px' }} />汉字三维网络</h1>
        <Router>
            <Routes>
                <Route path="/" element={ <Search /> } />  
                <Route path="/advancedsearch" element={<AdvancedSearch />} />                
            </Routes>
        </Router>
    </>
  )
}

export default App
