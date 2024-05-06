import { useState } from "react";
import axios from "axios";
import user from "../../assets/user-icon.svg"
import { useNavigate } from 'react-router-dom';

 function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
  
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await axios.post('http://34.71.240.100/api/auth/login', {
                email: email,
                password: password
            })
            .then((response) => {
                localStorage.setItem('access_token', response.data.access_token)
                navigate('/dashboard');
            });
            } catch (error) {
                alert('Ocorreu um erro com sua solicitação...')
                console.log(error);
            }
    }

  return (
    <div className="container p-5">
        <h1 className="fw-bold">Login</h1>
        <form>
            <div className="input-group input-group-lg py-3 w-100 ">
                <span className="input-group-text w-25" id="inputGroup-sizing-lg">E-Mail</span>
                <input 
                    type="text"               
                    name="email" 
                    id="email" 
                    value={email}
                    onChange={(event)=> setEmail(event.target.value)}
                    className="form-control" 
                    placeholder="Email" 
                    aria-label="Email"/>
            </div>

            <div className="input-group input-group-lg py-3 w-100">
                <span className="input-group-text w-25" id="inputGroup-sizing-lg">Senha</span>
                <input 
                    type="password"               
                    name="password" 
                    id="password" 
                    value={password}
                    onChange={(event)=> setPassword(event.target.value)}
                    className="form-control" 
                    placeholder="Password" 
                    aria-label="Password"/>
            </div>

            <button className="btn btn-primary d-flex w-100 align-items-center justify-content-center
            text-bold fs-5 p-3 my-3 fw-bold" id="google" type="button" onClick={handleSubmit}>
                <img className="px-2 " src={user} alt="Login" />
                Login 
            </button>
        </form>
    </div>
  )
}

export default Login;
