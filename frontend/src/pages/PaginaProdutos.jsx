import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ListaProdutos from '../components/ListaProdutos';
import FormularioProduto from '../components/FormularioProduto';

function PaginaProdutos() {
  const [produtos, setProdutos] = useState([]);

  // Função para buscar os produtos da API
  async function fetchProdutos() {
    try {
      const response = await api.get('/produtos');
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }

  // useEffect para buscar os dados quando a página carregar
  useEffect(() => {
    fetchProdutos();
  }, []);

  // Função para deletar um produto
  const handleDeletarProduto = async (id) => {
    // Pede confirmação ao usuário
    if (window.confirm('Tem certeza que deseja deletar este produto?')) {
      try {
        await api.delete(`/produtos/${id}`);
        alert('Produto deletado com sucesso!');
        fetchProdutos(); // Atualiza a lista após deletar
      } catch (error) {
        console.error('Erro ao deletar produto:', error);
        alert('Falha ao deletar produto.');
      }
    }
  };

  return (
    <div>
      <FormularioProduto onProdutoAdicionado={fetchProdutos} />
      <ListaProdutos produtos={produtos} onDeletar={handleDeletarProduto} />
    </div>
  );
}

export default PaginaProdutos;