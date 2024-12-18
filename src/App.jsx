// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from './Dashboard';
import Login from './Login';
import Setting from './Setting';  
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
              <Dashboard />
          }
        />
        <Route path='/setting' element={<Setting/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;