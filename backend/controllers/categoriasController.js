const db = require('../db');

exports.criarCategoria = async (req, res) => {
  const { nome } = req.body;
  if (!nome) {
    return res.status(400).json({ message: 'O nome da categoria é obrigatório.' });
  }
  try {
    const [result] = await db.query('INSERT INTO categorias (nome) VALUES (?)', [nome]);
    res.status(201).json({ id: result.insertId, nome });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar categoria", error: error.message });
  }
};

exports.listarCategorias = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM categorias ORDER BY nome');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar categorias", error: error.message });
  }
};