import React, { useState } from 'react';
import api from '../services/api';
import './Formulario.css';

function FormularioProduto({ onProdutoAdicionado }) {
  const [produto, setProduto] = useState({
    nome: '', sku: '', quantidade: '', unidade: '', precoCusto: '', precoVenda: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/produtos', produto);
      alert('Produto adicionado com sucesso!');
      setProduto({ nome: '', sku: '', quantidade: '', unidade: '', precoCusto: '', precoVenda: '' });
      onProdutoAdicionado(); // Atualiza a lista no componente pai
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      alert('Falha ao adicionar produto.');
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h3>Adicionar Novo Produto</h3>
      <div className="form-grid">
        <input name="nome" value={produto.nome} onChange={handleChange} placeholder="Nome do Produto" required />
        <input name="sku" value={produto.sku} onChange={handleChange} placeholder="SKU (Código)" required />
        <input name="quantidade" type="number" value={produto.quantidade} onChange={handleChange} placeholder="Quantidade" required />
        <input name="unidade" value={produto.unidade} onChange={handleChange} placeholder="Unidade (ex: saco, peça)" required />
        <input name="precoCusto" type="number" step="0.01" value={produto.precoCusto} onChange={handleChange} placeholder="Preço de Custo" required />
        <input name="precoVenda" type="number" step="0.01" value={produto.precoVenda} onChange={handleChange} placeholder="Preço de Venda" required />
      </div>
      <button type="submit">Adicionar Produto</button>
    </form>
  );
}

export default FormularioProduto;