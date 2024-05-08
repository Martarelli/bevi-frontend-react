import {  useState } from "react";
import axios from "axios";
import user from "../../assets/user-icon.svg"
import { useNavigate } from 'react-router-dom';
import "../../styles/login.css"

 function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.post('http://34.71.240.100/api/auth/login', {
                email: email,
                password: password
            })
            localStorage.setItem('access_token', response.data.access_token)
            setTimeout(() => {
                navigate('/dashboard');   
            }, 500);

            } catch (error) {
                alert('Ocorreu um erro ao processar sua requisição...\n' + error.message)
                console.log('Error fetching data: ' + error.message);
            }
    }

  return (
    <div className="d-flex align-items-center justify-content-center w-100 h-100">
        <div className="form__box background-box rounded d-flex flex-column align-items-center justify-content-center">
            <h1 className="fw-bold">Seja Bem-Vindo</h1>
            <form className="w-100 px-5" >
                <div className="input-group input-group-md py-3 w-100 border-primary">
                    <span className="input-group-text  w-25">Email</span>
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

                <div className="input-group input-group-md py-3 w-100">
                    <span className="input-group-text w-25">Senha</span>
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

                <button className="btn background-button border-dark d-flex w-100 align-items-center justify-content-center
                text-bold fs-5 p-3 my-3 fw-bold" type="button" onClick={handleSubmit}>
                    <img className="px-2 " src={user} alt="Login" />
                    Login 
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login;
