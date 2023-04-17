import './App.css'

import { faCat } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Home } from './Home'

import Cats from './Cats/Cats'
import Owners from './Owners/Owners'
import Foods from './Foods/Foods'

import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'

const Navigation = () => {
  const navigate = useNavigate()

  return (
    <div className="sidebar">
      <div className="logo">
        <FontAwesomeIcon icon={faCat} className="mr-2" /> Meow
      </div>
      <button className="menu-item" onClick={() => navigate('/')}>Home</button>
      <button className="menu-item" onClick={() => navigate('/cats')}>Cats</button>
      <button className="menu-item" onClick={() => navigate('/owners')}>Owners</button>
      <button className="menu-item" onClick={() => navigate('/foods')}>Food</button>
    </div>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Navigation />

        <div className="main-content">
          <Routes>
            <Route path="/" Component={Home} exact />
            <Route path="/cats" Component={Cats} />
            <Route path="/owners" Component={Owners} />
            <Route path="/foods" Component={Foods} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App