import { useNavigate } from 'react-router-dom';
function Header() {
    const navigate = useNavigate();
    function logout(){
        localStorage.clear();
        navigate('/login');
    }

    const NAVBAR_STYLE = {
        backgroundColor: 'rgba(34, 35, 68)',
    }

  return (
    <nav className="navbar navbar-dark navbar-expand-lg w-100 p-3" style={NAVBAR_STYLE}>
        <div className="container-fluid w-100 d-flex align-items-center justify-content-between">
            <div>
                <a className="navbar-brand" role='button' href="#">Teste Bevi</a>
            </div>
            <div className="" >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active" role='button' aria-current="page" href="#">Dashboard</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link " role='button' onClick={logout}>Logout</a>
                    </li>
                </ul>

            </div>
        </div>
    </nav>
  )
}

export default Header