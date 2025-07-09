import React, { useState } from 'react'
import './formCadastro.css'
import { useFetch } from '../hooks/useFetch'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useGet } from '../hooks/useGet';
import axios from 'axios';

const FormCadastro = () => {
    const { postData, response, loading, error } = useFetch('https://carteira-app.onrender.com/usuarios')
    const [form, setForm] = useState({ nome: '', email: '', senha: '', 'produtos': [] })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        //validando campos preenchidos
        if (!form.email || !form.senha) {
            toast.error("Preencha todos os campos")
            return
        }

        //validando formato de email
        const emailValido = /\S+@\S+\.\S+/.test(form.email);
        if (!emailValido) {
            toast.error("Email inválido")
            return
        }

        //validando tamanho da senha
        if (form.senha.length < 6) {
            toast.error("Sua senha deve possuir mais que 6 caracteres")
            return
        }

        try {
            const res = await axios.get('https://carteira-app.onrender.com/usuarios')
            const user = res.data

            const emailExiste = user.some(usuario => usuario.email === form.email)

            if(emailExiste) {
                toast.error("Email já cadastrado")
                return;
            }
            await postData(form)

            if (error) {
                toast.error("Erro ao cadastrar")
            } else {
                toast.success("Usuário cadastrado com sucesso")
                setForm({ nome: '', email: '', senha: '' })
            }
        } catch (err) {
            toast.error("Erro ao verificar usuários")
        }
    } 

    return (
        <div className='form-container-register'>
            <div className='form-apresentation-register'>
                <div className='form-titles-register'>
                    <h1>Carteira<span className='title-carteira-register'>App</span></h1>
                    <h2>Descubra uma nova maneira de cuidar da sua vida financeira, nosso app é perfeito para gerenciar suas finanças pessoais sem complicação. Experimente agora!</h2>
                    <p>Cadastre-se e passe a cuidar mais do seu dinheiro!</p>
                </div>
            </div>
            <form onSubmit={handleSubmit} className='form-register'>
                <div className="form-control-register">
                    <h1>Cadastre sua conta</h1>
                    <div className='form-inputs-register'>
                        <label htmlFor="name">Nome</label>
                        <input type="text" placeholder='Digite seu nome' name='nome' value={form.nome} onChange={handleChange} />
                    </div>
                    <div className='form-inputs-register'>
                        <label htmlFor="email">Email</label>
                        <input type="text" placeholder='Digite seu email' name='email' value={form.email} onChange={handleChange} />
                    </div>
                    <div className='form-inputs-register'>
                        <label htmlFor="password">Senha</label>
                        <input type="password" placeholder='Digite sua senha' name='senha' value={form.senha} onChange={handleChange} />
                    </div>
                    {/* efeito loading */}
                    <button className='btn-cadastrar' type='submit' disabled={loading}>
                        {loading ? (<><span className='loading'></span></>) : ('Cadastrar')}
                    </button>
                    <p>Já tem cadastro? <Link to='/login'>  Faça o login com sua conta</Link></p>

                    <ToastContainer />
                </div>
            </form>
        </div>
    )
}

export default FormCadastro