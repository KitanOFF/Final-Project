import { Link } from "react-router-dom"
import './navbar.css'
import { useNavigate } from "react-router-dom";
// import logo from '../assets/Group 8626.png';
// import arrowlogo from '../assets/arrow-right.png';
function Navbar(){
    const navigate = useNavigate();
    return(
        <nav className="NavBar-main">
            <img src="./Group 8626.png" alt="" className="img"/>
            <ul className="ul-ro">
                <li>
                    <Link className="textDecoration" to="/">Home</Link>
                </li>
                <li>
                    <Link className="textDecoration" to="/MentorPage">About</Link>
                </li>
                <li>
                    <Link className="textDecoration" to="/Contacts">Contact</Link>
                </li>
            </ul>
                 <div className="buttonContainer">
                <Link className="login-btn" to="/LoginPage" >Login</Link>
                <button className="ButtonStart" onClick={() => navigate("/Signup")}>
                <img src="./arrow-right.png" alt="arrow" className="btn-icon" />
                         Get Started
                </button>
                </div>

        </nav>
    )
}
export default Navbar