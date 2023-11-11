import "./Navbar.css"
import { Link } from "react-router-dom";


function Navbar () {
    return (
        <nav className="Navbar">
            <Link to="/" className="logo">Logo</Link>
            <section className="nav-links">
                <Link to="/artists">Artists</Link>
                <Link to="/artworks">Artworks</Link>
                <Link to="/exhibitions">Exhibitions</Link>
            </section>
        </nav>
    );
}

export default Navbar;
