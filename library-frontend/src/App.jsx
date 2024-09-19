import { Routes, Route } from 'react-router-dom';
import UserLogin from './components/userlogin';
import UserHome from './components/UserHome';

function App() {
 

  return (
    <>
    <Routes>
        <Route path="/" element={<UserLogin/>} />
        <Route path="/userhome" element={<UserHome/>} />
      </Routes>
    </>
  )
}

export default App