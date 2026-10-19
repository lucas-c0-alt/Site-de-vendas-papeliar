/* Página de produto: o id vem de <body data-produto="..."> */
const produto = buscarProduto(document.body.dataset.produto);
const area = document.getElementById('produto-pagina');

if (produto) {
  area.innerHTML = `
    <nav class="trilha" aria-label="Você está em">
      <a href="index.html">Início</a><span>/</span><a href="vendas.html">Produtos</a><span>/</span>${produto.nome}
    </nav>

    <div class="produto-detalhe">
      <div>
        <div class="produto-foto"><img src="${produto.img}" alt="${produto.nome}"></div>
        <div class="produto-descricao">
          <h2>Descrição</h2>
          ${produto.descricao.map(t => `<p>${t}</p>`).join('')}
        </div>
      </div>

      <div class="produto-compra">
        <span class="rotulo">Papeliar Papelaria</span>
        <h1>${produto.nome}</h1>
        <p class="produto-preco">${formatarPreco(produto.preco)}</p>
        <p class="produto-faixa">Faixa de preço da linha: ${formatarPreco(produto.faixa[0])} a ${formatarPreco(produto.faixa[1])}</p>
        <div class="produto-botoes">
          <button class="botao botao-contorno botao-grande" id="adicionar-carrinho">Colocar no carrinho</button>
          <a class="botao botao-primario botao-grande" href="pagamento.html?produto=${produto.id}">Comprar agora</a>
        </div>
        <ul class="produto-infos">
          <li>Recife e região metropolitana: 1 a 2 dias úteis após a expedição.</li>
          <li>Outras capitais nordestinas: 3 a 6 dias úteis.</li>
          <li>Demais regiões: conforme transportadora e CEP.</li>
          <li>Envio em caixas recicláveis.</li>
        </ul>
      </div>
    </div>

    <h2 class="divisor-titulo">Mais produtos</h2>
    <div class="mais-produtos">
      ${PRODUTOS.filter(p => p.id !== produto.id).map(cartaoProdutoHTML).join('')}
    </div>`;

  document.getElementById('adicionar-carrinho').addEventListener('click', () => {
    Carrinho.adicionar(produto.id);
    mostrarAviso(`${produto.nome} foi adicionado ao carrinho.`);
  });
} else {
  area.innerHTML = `
    <div class="vazio">
      <h2>Produto não encontrado</h2>
      <p>Confira todos os produtos disponíveis na nossa loja.</p>
      <a href="vendas.html" class="botao botao-azul">Ver produtos</a>
    </div>`;
}
