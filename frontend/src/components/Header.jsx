import React from 'react'
import bolsaDinheiro from '../assets/bolsa-de-dinheiro.png'
import './header.css'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div>
            <header>
                <div className="title">
                    <img src={bolsaDinheiro} alt="bolsa de dinheiro" />
                    <h2>Carteira<span className='span-title'>App</span></h2>
                </div>
                <div className="nav">
                    <Link to='/valorInicial'>Início</Link>
                    <Link to='/produtos'>Adicionar Produtos</Link>
                    <Link to='/credito'>Adicionar Crédito</Link>
                    <button className='btn-sair'>
                        <Link to='/login'>Sair</Link>
                    </button>
                </div>
            </header>
        </div>
    )
}

export default Header