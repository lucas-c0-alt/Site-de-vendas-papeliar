/* Página de vendas: lista de produtos e filtro por preço */
const grade = document.getElementById('vendas-grade');
const botaoFiltro = document.getElementById('botao-filtro');
const opcoes = document.getElementById('filtro-opcoes');
const estado = document.getElementById('filtro-estado');

const DESCRICAO_ORDEM = {
  crescente: 'Ordenado do menor para o maior preço',
  decrescente: 'Ordenado do maior para o menor preço',
  padrao: ''
};

function renderizar(ordem) {
  const lista = [...PRODUTOS];
  if (ordem === 'crescente') lista.sort((a, b) => a.preco - b.preco);
  if (ordem === 'decrescente') lista.sort((a, b) => b.preco - a.preco);
  grade.innerHTML = lista.map(cartaoProdutoHTML).join('');
  estado.textContent = DESCRICAO_ORDEM[ordem];
}

function abrirFiltro(abrir) {
  opcoes.hidden = !abrir;
  botaoFiltro.setAttribute('aria-expanded', abrir);
}

botaoFiltro.addEventListener('click', e => {
  e.stopPropagation();
  abrirFiltro(opcoes.hidden);
});

opcoes.addEventListener('click', e => {
  const opcao = e.target.closest('button[data-ordem]');
  if (!opcao) return;
  opcoes.querySelectorAll('button').forEach(b => b.setAttribute('aria-checked', b === opcao));
  renderizar(opcao.dataset.ordem);
  abrirFiltro(false);
});

document.addEventListener('click', e => {
  if (!e.target.closest('.filtro')) abrirFiltro(false);
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') abrirFiltro(false);
});

renderizar('padrao');
