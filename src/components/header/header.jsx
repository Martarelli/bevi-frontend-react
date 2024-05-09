import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/header.css';
import user from "../../assets/user-solid.svg"

function Header() {
    const [name, setName] = useState('');

    const navigate = useNavigate();
    function logout(){
        localStorage.clear();
        navigate('/login');
    }

    async function getData() {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.create({
              baseURL: 'http://34.71.240.100/api',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            }).post('/auth/me');
            console.log(response);
            setName(response.data.name)
            } catch (error) {
                alert('Ocorreu um erro ao processar sua requisição...\n' + error.message);
                console.log('Error fetching data: ' + error.message);
                console.log(error);
            }
    }

    useEffect(()=>{
        getData();
      },[])

  return (
    <nav className="navbar navbar-dark navbar-expand-lg w-100 p-3" id='navbar'>
        <div className="container-fluid w-100 d-flex align-items-center justify-content-between">
            <div>
                <a className="navbar-brand d-flex align-items-center" role='button' href="#">
                    <img className="user__icon px-2 " src={user} alt="Login" />
                    {name}
                </a>
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

export default Header;