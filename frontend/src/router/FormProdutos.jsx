import React, { useEffect, useRef, useState } from 'react'
import imgProduto from '../assets/produto.jpg'
import Header from '../components/Header'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './formProdutos.css'
import { usePatch } from '../hooks/usePatch'

const FormProdutos = () => {


  const userValor = parseFloat(localStorage.getItem('valorInicial'))


  const { updateData, loading, error } = usePatch('http://localhost:3000/usuarios')
  const [form, setForm] = useState({ nome: '', preco: '' })
  const userId = localStorage.getItem('userId')
  const [produto, setProduto] = useState([])
  const avisoSaldoLimite = useRef(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch(`http://localhost:3000/usuarios/${userId}`)
        const user = await response.json()

        setProduto(user.produtos || [])
      } catch (err) {
        console.error(err)
      }
    }

    fetchProdutos()
  }, [userId])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const preco = parseFloat(form.preco)

    if (!form.nome || !form.preco) {
      toast.error("Preencha todos os campos")
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/usuarios/${userId}`)
      const user = await response.json()

      const produtosAtuais = user.produtos || []

      const totalGasto = produtosAtuais.reduce((acumulador, item) => acumulador + item.preco, 0) //tudo o que ja foi gasto
      const totalGastoComNovoProduto = totalGasto + preco //o gasto caso adicione um novo produto
      const porcetagem = (totalGastoComNovoProduto / userValor) * 100

      if (totalGastoComNovoProduto > userValor) {
        toast.error("Saldo insuficiente")
        return;
      }
        if (porcetagem > 70 && !avisoSaldoLimite.current) {
          toast.warning("Voce ultrapassou 70% do seu saldo atual")
          avisoSaldoLimite.current = true
        }

      const novoProduto = {
        id: String(Date.now()),
        nome: form.nome,
        preco: parseFloat(form.preco)
      }

      await updateData(userId, { produtos: [...produtosAtuais, novoProduto] })

      setProduto((prevProdutos) => [...prevProdutos, novoProduto])

      console.log(user.produtos)
      console.log(form.preco - userValor)
      setForm({ nome: '', preco: '' })
    } catch (err) {
      console.log(err)
      alert("Erro ao adicionar produto")
    }

  }
  const saldoRestante = produto.reduce((total, item) => total - item.preco, userValor)

  function removerProduto(id) {
    const novaLista = produto.filter((p) => p.id !== id);

    setProduto(novaLista);

    updateData(userId, { produtos: novaLista });
  }

  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="produtos-container">
        <div className="produtos">
          <h1>Produtos adicionados:</h1>
          {produto.map((items) => (
            <div key={items.id} className='add-produtos'>
              <img src={imgProduto} alt="produtos" className='produto-img' />
              <div className="produtos-info">
                <h2 className='product'>Produto: <span className='produto-span'>{items.nome}</span></h2>
                <p className='price-product'> R${items.preco}</p>
              </div>
              <button className='btn-limpar' onClick={() => removerProduto(items.id)}>x</button>
            </div>
          ))}
        </div>
        <form className='form-produtos' onSubmit={handleSubmit}>
          <h1>Adicionar novo produto</h1>
          <div className="form-inputsProdutos">
            <input type="text" placeholder='Nome do produto' className='input-nameProduto' name='nome' value={form.nome} onChange={handleChange} />
            <input type="number" placeholder='Preço do produto' className='input-precoProduto' name='preco' value={form.preco} onChange={handleChange} />
          </div>
          <button className='btn-addProdutos' type='submit'>Adicionar</button>
        </form>
        <div className="saldo">
          <h2>Saldo restante:</h2>
          <h2>R$ {saldoRestante}</h2>
        </div>
        {error && <p className="error">Erro: {error}</p>}
        <ToastContainer />
      </div>
    </div>
  )
}

export default FormProdutos