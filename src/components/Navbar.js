import { Link } from "react-router-dom";
import { PopupMenu } from "react-simple-widgets/dist/popup-menu";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import defaultpfp from "../static/default-profile-picture.jpg";
import {useNavigate} from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
  return (
    <nav className="Navbar">
      <Link to="/" className="logo">
        Logo
      </Link>
      <section className="nav-links">
        <Link to="/artists">Artists</Link>
        <Link to="/artworks">Artworks</Link>
        <Link to="/exhibitions">Exhibitions</Link>

        <PopupMenu>
          <button className="btn">
          <img src={defaultpfp} alt="pfp" class="round-image" width="35px" />
            </button>

          <div className="card text-start">
            <div className="card-body px-4 py-4">
              <div id="circle-avatar" className="text-center mx-auto mb-4">
                <img src={defaultpfp} alt="pfp" class="round-image" width="100px" />
              </div>

              <h5 className="text-center mb-0">John Doe</h5>
              <p className="text-center mb-2">jd@gmail.com</p>

              <hr className="mb-0" style={{ margin: "0 -24px 0" }} />

              <div
                className="list-group list-group-flush"
                style={{ margin: "0 -24px 0" }}
              >
                
                <button className="list-group-item list-group-item-action px-4" onClick={() => {navigate("/myArts")}}>
                  <small>My Arts</small>
                </button>  
               
                <button className="list-group-item list-group-item-action px-4" onClick={() => {navigate("/addArt")}}>
                  <small>Add Art</small>
                </button>

              </div>

              <hr style={{ margin: "0 -24px 24px" }} />

              <div className="d-grid">
                <button className="btn btn-secondary">
                  <small>Logout</small>
                </button>
              </div>
            </div>
          </div>
        </PopupMenu>
      </section>
    </nav>
  );
}

export default Navbar;
