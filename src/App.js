import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Artworks from "./pages/Artworks";
import Home from "./pages/Home";
import MyArts from './pages/MyArts';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';


function App() {
  return (
      <Router>
          <div className="App">
          <Navbar/>
          <Routes>
          <Route path="/" Component={Home} />
            <Route path="/artworks" Component={Artworks} />
            <Route path="/MyArts" Component={MyArts} />
            <Route path="/signin" Component={SignInPage} />
            <Route path="/signup" Component={SignUpPage} />
          </Routes>
          </div>
        </Router>
  );
}

export default App;
