/* Página de pagamento.
   ?produto=<id>      -> "Comprar agora" (apenas o produto escolhido)
   ?origem=carrinho   -> todos os itens do carrinho */
const parametros = new URLSearchParams(location.search);
const idProduto = parametros.get('produto');
const veioDoProduto = idProduto && buscarProduto(idProduto);

const itens = detalharItens(veioDoProduto ? [{ id: idProduto, qtd: 1 }] : Carrinho.itens());
const resumo = document.getElementById('resumo-pagamento');

if (itens.length === 0) {
  document.getElementById('pagamento-layout').outerHTML = `
    <div class="vazio">
      <h2>Nenhum produto selecionado</h2>
      <p>Escolha um produto na loja para seguir com o pagamento.</p>
      <a href="vendas.html" class="botao botao-azul">Ver produtos</a>
    </div>`;
} else {
  const total = itens.reduce((soma, i) => soma + i.subtotal, 0);
  resumo.innerHTML = `
    <h2>Produtos selecionados</h2>
    <ul>
      ${itens.map(({ produto, qtd, subtotal }) => `
        <li>
          <span class="mini"><img src="${produto.img}" alt=""></span>
          <span>${produto.nome}<small>${qtd} × ${formatarPreco(produto.preco)}</small></span>
          <strong>${formatarPreco(subtotal)}</strong>
        </li>`).join('')}
    </ul>
    <div class="resumo-total"><span>Total a pagar</span><strong>${formatarPreco(total)}</strong></div>
    <p class="origem">${veioDoProduto
      ? `Compra direta · <a href="${veioDoProduto.pagina}">voltar ao produto</a>`
      : 'Itens do seu carrinho · <a href="carrinho.html">editar carrinho</a>'}</p>`;
  configurarCampos();
}

/* Máscaras dos campos e pré-visualização do cartão */
function configurarCampos() {
  const campo = id => document.getElementById(id);
  const somenteDigitos = v => v.replace(/\D/g, '');

  campo('numero-cartao').addEventListener('input', e => {
    const digitos = somenteDigitos(e.target.value).slice(0, 16);
    e.target.value = digitos.replace(/(\d{4})(?=\d)/g, '$1 ');
    campo('visual-numero').textContent = digitos.padEnd(16, '•').match(/.{4}/g).join(' ');
  });

  campo('nome-cartao').addEventListener('input', e => {
    campo('visual-nome').textContent = e.target.value.trim() || 'Nome no cartão';
  });

  campo('validade').addEventListener('input', e => {
    const digitos = somenteDigitos(e.target.value).slice(0, 4);
    e.target.value = digitos.length > 2 ? `${digitos.slice(0, 2)}/${digitos.slice(2)}` : digitos;
    campo('visual-validade').textContent = e.target.value || 'MM/AA';
  });

  campo('cvv').addEventListener('input', e => {
    e.target.value = somenteDigitos(e.target.value).slice(0, 4);
  });

  /* O botão de confirmar ainda não tem função; evita envio pelo Enter */
  campo('form-pagamento').addEventListener('submit', e => e.preventDefault());
}
