const db = require('../db');

// Criar um novo produto
exports.criarProduto = async (req, res) => {
  const { nome, sku, quantidade, unidade, precoCusto, precoVenda, categoria_id } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO produtos (nome, sku, quantidade, unidade, precoCusto, precoVenda, categoria_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nome, sku, quantidade, unidade, precoCusto, precoVenda, categoria_id]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar produto", error: error.message });
  }
};

// Listar todos os produtos (com nome da categoria)
exports.listarProdutos = async (req, res) => {
  try {
    const sql = `
      SELECT p.*, c.nome AS nome_categoria
      FROM produtos p
      LEFT JOIN categorias c ON p.categoria_id = c.id
      ORDER BY p.nome;
    `;
    const [rows] = await db.query(sql);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar produtos", error: error.message });
  }
};

// (Opcional por agora, mas útil para o futuro: Deletar e Atualizar)
exports.deletarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query('DELETE FROM produtos WHERE id = ?', [id]);
        if(result.affectedRows === 0) {
            return res.status(404).json({ message: "Produto não encontrado."});
        }
        res.status(200).json({ message: "Produto deletado com sucesso." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar produto.", error: error.message });
    }
}