import React from 'react';
import { Trash2 } from 'lucide-react';
import './Lista.css';

function ListaProdutos({ produtos, onDeletar }) {
  if (!produtos || produtos.length === 0) {
    return <p>Nenhum produto cadastrado.</p>;
  }

  return (
    <div className="list-container">
      <h2>Produtos em Estoque</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>SKU</th>
            <th>Estoque</th>
            <th>Preço Venda</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.nome}</td>
              <td>{produto.sku}</td>
              <td>{`${produto.quantidade} ${produto.unidade}`}</td>
              <td>R$ {parseFloat(produto.precoVenda).toFixed(2)}</td>
              <td>
                <button className="delete-button" onClick={() => onDeletar(produto.id)}>
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaProdutos;