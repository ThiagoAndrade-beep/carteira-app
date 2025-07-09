import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreditValor = () => {

    const [form, setForm] = useState({ valor: '' })
    const [saldo, setSaldo] = useState(() => { 
        const saldoUser = parseFloat(localStorage.getItem('valorInicial'))
        return saldoUser;
    }) //o saldo vai começar com o valor que esta salvo

    useEffect(() => {
        localStorage.setItem('valorInicial', saldo)
    }, [saldo])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const valor = parseFloat(form.valor)

        if(isNaN(valor) || valor <= 0) {
            toast.error("Adicione um valor válido")
            return;
        }

        if(saldo) {
            setSaldo(prev => prev + valor)
            toast.success("Saldo adicionado")
        }
        console.log("Seu agora é de:", saldo)
    }

    return (
        <div>
            <div className="header">
                <Header />
            </div>

            <form className='form-valor' onSubmit={handleSubmit}>
                <h1>Precisa de mais dinheiro ? Adicione um crédito</h1>
                <div className="form-container-valor">
                    <h2 className='title-valor'>Insira o valor que deseja acrescentar</h2>
                    <h3 className='subTitle-valor'>Valor:</h3>
                    <input type="number" className='input-number' placeholder='123' name='valor' value={form.valor} onChange={handleChange} />
                    <button type='submit' className='btn-adicionar'>
                        Adicionar
                    </button>
                    {/* {error && <p className="error">Erro: {error}</p>} */}

                     <ToastContainer /> 
                </div>
            </form>
        </div>
    )
}

export default CreditValor