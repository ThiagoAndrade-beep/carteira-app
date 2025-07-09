import './formLogin.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { useGet } from '../hooks/useGet';
import { useEffect, useState } from 'react';

const FormLogin = () => {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const navigate = useNavigate()

    const {data, loading, error} = useGet('https://carteira-app.onrender.com/usuarios')
    
    useEffect(() => {
        console.log("executou", data)
    }, [data])

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(email)
        console.log(senha)

        const verificarLogin = data.find((item) => item.email === email && item.senha === senha) //retorna 
        
        if(verificarLogin) {
            localStorage.setItem('userId', verificarLogin.id)
            localStorage.setItem('userName', verificarLogin.nome)
            localStorage.setItem('valorInicial', verificarLogin.valor ?? '0')
            navigate('/valorInicial')
        }else {
            toast.error("Email ou senha inválido")
            setSenha("")
            console.log(error)
        }
    }
    
    return (
        <div className='form-container-login'>
            <div className='form-apresentation-login'>
            <div className='form-titles-login'>
                    <h1>Carteira<span className='title-carteira-login'>App</span></h1>
                    <h2>Descubra uma nova maneira de cuidar da sua vida financeira, nosso app é perfeito para gerenciar suas finanças pessoais sem complicação. Experimente agora!</h2>
                    <p>Entre na sua conta e passe a cuidar mais do seu dinheiro!</p>
                </div>
            </div>
            <form onSubmit={handleSubmit} className='form-login'>
                <div className="form-control-login">
                    <h1>Faça login com a sua conta</h1>
                    <div className='form-inputs-login'>
                        <label htmlFor="email">Email</label>
                        <input type="text" placeholder='Digite seu email' name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className='form-inputs-login'>
                        <label htmlFor="password">Senha</label>
                        <input type="password" placeholder='Digite sua senha' name='senha' value={senha} onChange={(e) => setSenha(e.target.value)}/>
                    </div>
                    {/* efeito loading */}
                    <button className='btn-login' type='submit'>Entrar</button>
                    <p>Não tem conta? <Link to='/cadastro'>  Cadastre-se agora</Link></p>

                    <ToastContainer />
                </div>
            </form>
        </div>
    )
}

export default FormLogin