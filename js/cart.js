/* Carrinho salvo no localStorage: [{ id, qtd }] */
const CHAVE_CARRINHO = 'papeliar_carrinho';

const Carrinho = {
  itens() {
    try {
      return JSON.parse(localStorage.getItem(CHAVE_CARRINHO)) || [];
    } catch (e) {
      return [];
    }
  },

  salvar(itens) {
    localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(itens));
    atualizarContadorCarrinho();
  },

  adicionar(id, qtd = 1) {
    const itens = this.itens();
    const item = itens.find(i => i.id === id);
    if (item) item.qtd += qtd;
    else itens.push({ id, qtd });
    this.salvar(itens);
  },

  alterarQtd(id, qtd) {
    const itens = this.itens()
      .map(i => (i.id === id ? { ...i, qtd } : i))
      .filter(i => i.qtd > 0);
    this.salvar(itens);
  },

  remover(id) {
    this.salvar(this.itens().filter(i => i.id !== id));
  },

  quantidadeTotal() {
    return this.itens().reduce((soma, i) => soma + i.qtd, 0);
  }
};

/* Converte [{id, qtd}] em linhas com produto e subtotal, ignorando ids inválidos */
function detalharItens(itens) {
  return itens
    .map(i => ({ produto: buscarProduto(i.id), qtd: i.qtd }))
    .filter(i => i.produto)
    .map(i => ({ ...i, subtotal: i.produto.preco * i.qtd }));
}

function atualizarContadorCarrinho() {
  const total = Carrinho.quantidadeTotal();
  document.querySelectorAll('[data-contador-carrinho]').forEach(el => {
    el.textContent = total;
    el.hidden = total === 0;
  });
}

function mostrarAviso(mensagem) {
  let aviso = document.querySelector('.aviso');
  if (!aviso) {
    aviso = document.createElement('div');
    aviso.className = 'aviso';
    aviso.setAttribute('role', 'status');
    document.body.appendChild(aviso);
  }
  aviso.textContent = mensagem;
  aviso.classList.add('visivel');
  clearTimeout(aviso._timer);
  aviso._timer = setTimeout(() => aviso.classList.remove('visivel'), 2500);
}
