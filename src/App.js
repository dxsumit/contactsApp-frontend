import './App.css';

import { BrowserRouter, Routes , Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import EditPage from './components/Edit';
import AddPage from './components/Add';
import { useState, useEffect } from "react";

function App() {

  const [authorized, setAuthorized] = useState(false);
  const [tableId, setTableId] = useState(null);


  useEffect( () => {


      const token = localStorage.getItem('token');
      if(token){

        setAuthorized(true);

        const tableURL = localStorage.getItem('tableID');
        setTableId(tableURL)
      }

  
  }, []);

  return (
    <div className="App">

      <BrowserRouter>
        
        {/* routes used in app..  */}
        <Routes>

            <Route path='/' element={ <Home isAuthorized={authorized} onAuthStateChange={setAuthorized} tableId={tableId} /> } />
            <Route path='/login' element={ <Login onAuthStateChange={setAuthorized} setTableId={setTableId}/> } />
            <Route path='/signup' element={ <Signup onAuthStateChange={setAuthorized} setTableId={setTableId}/> } />
            <Route path='/logout' element={ <Home /> } />
            <Route path='/edit' element={ <EditPage /> } />
            <Route path='/add' element={ <AddPage /> } />
          
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
