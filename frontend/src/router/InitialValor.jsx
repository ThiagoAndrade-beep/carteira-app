import React, { useState } from 'react'
import Header from '../components/Header'
import './initialValor.css'
import { usePatch } from '../hooks/usePatch'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const InitialValor = () => {

    const { updateData, loading, error } = usePatch ('https://carteira-app.onrender.com/usuarios')
    const [form, setForm] = useState({ valor: '' })
    const navigate = useNavigate()
    const userName = localStorage.getItem('userName')

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const valor = parseFloat(form.valor)

        if (!form.valor) {
            toast.error("Adicione um valor")
            return;
        }

        if (valor === 0 || valor < 0) {
            toast.error("Adicione um valor maior!")
            return;
        }

        const userId = localStorage.getItem('userId')

        await updateData(userId, {valor: form.valor})

        localStorage.setItem('valorInicial', form.valor)

        toast.success("Valor adicionado!")
        setForm({valor: ""})
        navigate('/produtos')
    }

    return (
        <div>
            <div className="header">
                <Header />
            </div>

            <form className='form-valor' onSubmit={handleSubmit}>
                <h1>Seja bem vindo(a), {userName}</h1>
                <div className="form-container-valor">
                    <h2 className='title-valor'>Insira seu valor inicial</h2>
                    <h3 className='subTitle-valor'>Valor Inicial:</h3>
                    <input type="number" className='input-number' placeholder='123' name='valor' value={form.valor} onChange={handleChange} />
                    <button type='submit' className='btn-adicionar'>
                        {loading ? "Adicionando..." : "Adicionar" }
                    </button>
                    {error && <p className="error">Erro: {error}</p>}

                    <ToastContainer />
                </div>
            </form>
        </div>
    )
}

export default InitialValor