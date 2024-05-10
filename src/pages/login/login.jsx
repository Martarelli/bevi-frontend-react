import {  useState } from "react";
import axios from "axios";
import user from "../../assets/user-icon.svg"
import { useNavigate } from 'react-router-dom';
import "../../styles/login.css"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { object , string}  from 'yup'

const schema = object({
    email: string().email("Informe um email válido.").required("Email é um campo obrigatório."),
    password: string().required("Password é um campo obrigatório.")
})
 function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({resolver: yupResolver(schema)});

    async function onSubmit(data) {
        try {
            const response = await axios.post('http://34.71.240.100/api/auth/login', data)
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
            <form className="w-100 px-5 d-flex flex-column gap-3" onSubmit={handleSubmit(onSubmit)} >
                <div>
                    <div className="input-group input-group-md py-1 w-100 border-primary">
                        <span className="input-group-text  w-25">Email</span>
                        <input 
                            type="text"               
                            {...register("email")}
                            id="email" 
                            value={email}
                            onInput={(event)=> setEmail(event.target.value)}
                            className="form-control" 
                            placeholder="Email" 
                            aria-label="Email"/>
                    </div>
                    <span className='error__message'>{errors?.email?.message}</span>
                </div>

                <div>
                    <div className="input-group input-group-md py-1 w-100">
                        <span className="input-group-text w-25">Senha</span>
                        <input 
                            type="password"          
                            {...register("password")}
                            id="password" 
                            value={password}
                            onInput={(event)=> setPassword(event.target.value)}
                            className="form-control" 
                            placeholder="Password" 
                            aria-label="Password"/>
                    </div>
                    <span className='error__message'>{errors?.password?.message}</span>
                </div>

                <button className="btn background-button border-dark d-flex w-100 align-items-center justify-content-center
                text-bold fs-5 p-3 my-3 fw-bold" type="submit">
                    <img className="px-2 " src={user} alt="Login" />
                    Login 
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login;
