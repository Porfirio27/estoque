const db = require('../db');

// Função para criar uma nova venda
exports.criarVenda = async (req, res) => {
  // O frontend enviará um objeto com a lista de itens da venda
  const { itens, usuario_id } = req.body; // Ex: itens = [{ produto_id: 1, quantidade: 2 }, ...]

  if (!itens || itens.length === 0) {
    return res.status(400).json({ message: 'A venda deve ter pelo menos um item.' });
  }

  // Inicia a transação
  try {
    await db.query('START TRANSACTION');

    // 1. Validar estoque e calcular total
    let totalVenda = 0;
    for (const item of itens) {
      const [rows] = await db.query('SELECT nome, quantidade, precoVenda FROM produtos WHERE id = ? FOR UPDATE', [item.produto_id]);
      const produto = rows[0];

      if (!produto) throw new Error(`Produto com ID ${item.produto_id} não encontrado.`);
      if (produto.quantidade < item.quantidade) throw new Error(`Estoque insuficiente para o produto "${produto.nome}".`);

      totalVenda += produto.precoVenda * item.quantidade;
      item.preco_unitario = produto.precoVenda; // Guarda o preço do item no momento da venda
    }

    // 2. Inserir o registro principal da venda
    const [vendaResult] = await db.query(
      'INSERT INTO vendas (total_venda, usuario_id) VALUES (?, ?)',
      [totalVenda, usuario_id]
    );
    const vendaId = vendaResult.insertId;

    // 3. Inserir os itens da venda
    const itensParaInserir = itens.map(item => [vendaId, item.produto_id, item.quantidade, item.preco_unitario]);
    await db.query('INSERT INTO venda_itens (venda_id, produto_id, quantidade, preco_unitario) VALUES ?', [itensParaInserir]);

    // 4. Atualizar o estoque e registrar a movimentação para cada item
    for (const item of itens) {
      // Baixa o estoque
      await db.query('UPDATE produtos SET quantidade = quantidade - ? WHERE id = ?', [item.quantidade, item.produto_id]);
      // Registra a saída no histórico
      await db.query('INSERT INTO movimentacoes_estoque (produto_id, tipo, quantidade, motivo) VALUES (?, ?, ?, ?)',
        [item.produto_id, 'saida', item.quantidade, `Venda #${vendaId}`]
      );
    }

    // Se tudo correu bem, confirma a transação
    await db.query('COMMIT');
    res.status(201).json({ message: 'Venda finalizada com sucesso!', vendaId: vendaId });

  } catch (error) {
    // Se qualquer passo falhou, desfaz tudo
    await db.query('ROLLBACK');
    res.status(500).json({ message: 'Falha ao processar a venda.', error: error.message });
  }
};

// Função para listar todas as vendas (será útil no futuro)
exports.listarVendas = async (req, res) => {
  try {
    const sql = `
        SELECT v.id, v.data_venda, v.total_venda, u.nome as nome_usuario 
        FROM vendas v 
        LEFT JOIN usuarios u ON v.usuario_id = u.id
        ORDER BY v.data_venda DESC`;
    const [vendas] = await db.query(sql);
    res.status(200).json(vendas);
  } catch (error) {
     res.status(500).json({ message: "Erro ao listar vendas", error: error.message });
  }
}