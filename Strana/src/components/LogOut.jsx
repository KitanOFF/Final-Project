import { useNavigate } from 'react-router-dom';
import "./LogOut.css"
function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
  
    localStorage.removeItem('token');
    navigate('/LoginPage');
  };

  return (
    <div className="sidebar-footerR" onClick={handleLogout}>
      <img src="logout.png" className="menu-icon" alt="Logout" />
      <p>Logout</p>
    </div>
  );
}

export default Logout;