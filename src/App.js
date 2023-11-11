import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Artworks from "./pages/Artworks";

function App() {
  return (
      <Router>
          <div className="App">
          <Navbar/>
          <Routes>
            <Route path="/artworks" Component={Artworks} />
          </Routes>
          </div>
        </Router>
  );
}

export default App;
