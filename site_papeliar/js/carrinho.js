/* Página do carrinho: lista, quantidades e total */
const conteudo = document.getElementById('carrinho-conteudo');

function renderizarCarrinho() {
  const itens = detalharItens(Carrinho.itens());

  if (itens.length === 0) {
    conteudo.innerHTML = `
      <div class="vazio">
        <svg viewBox="0 0 24 24"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.5 12h11L21 7H6.2"/></svg>
        <h2>Seu carrinho está vazio</h2>
        <p>Escolha seus produtos na loja e clique em "Colocar no carrinho".</p>
        <a href="vendas.html" class="botao botao-azul">Ver produtos</a>
      </div>`;
    return;
  }

  const total = itens.reduce((soma, i) => soma + i.subtotal, 0);
  const quantidade = itens.reduce((soma, i) => soma + i.qtd, 0);

  conteudo.innerHTML = `
    <div class="carrinho-layout">
      <ul class="carrinho-lista">
        ${itens.map(({ produto, qtd, subtotal }) => `
          <li class="carrinho-item">
            <a class="miniatura" href="${produto.pagina}"><img src="${produto.img}" alt="${produto.nome}"></a>
            <div>
              <h2><a href="${produto.pagina}">${produto.nome}</a></h2>
              <p class="unitario">${formatarPreco(produto.preco)} cada</p>
              <button class="remover" data-remover="${produto.id}">Remover</button>
            </div>
            <div class="quantidade" aria-label="Quantidade de ${produto.nome}">
              <button data-qtd="${produto.id}" data-delta="-1" aria-label="Diminuir">−</button>
              <span>${qtd}</span>
              <button data-qtd="${produto.id}" data-delta="1" aria-label="Aumentar">+</button>
            </div>
            <p class="subtotal">${formatarPreco(subtotal)}</p>
          </li>`).join('')}
      </ul>

      <aside class="resumo-pedido">
        <h2>Resumo do pedido</h2>
        <div class="resumo-linha"><span>Itens</span><span>${quantidade}</span></div>
        <div class="resumo-linha"><span>Produtos diferentes</span><span>${itens.length}</span></div>
        <div class="resumo-total"><span>Total</span><strong>${formatarPreco(total)}</strong></div>
        <a href="pagamento.html?origem=carrinho" class="botao botao-primario botao-grande botao-bloco">Comprar</a>
      </aside>
    </div>`;
}

conteudo.addEventListener('click', e => {
  const remover = e.target.closest('[data-remover]');
  const alterar = e.target.closest('[data-qtd]');
  if (remover) {
    Carrinho.remover(remover.dataset.remover);
  } else if (alterar) {
    const item = Carrinho.itens().find(i => i.id === alterar.dataset.qtd);
    if (item) Carrinho.alterarQtd(item.id, item.qtd + Number(alterar.dataset.delta));
  } else {
    return;
  }
  renderizarCarrinho();
});

renderizarCarrinho();
