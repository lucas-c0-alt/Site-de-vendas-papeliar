/* Menu lateral e rodapé compartilhados por todas as páginas */
const ICONES = {
  inicio: '<svg viewBox="0 0 24 24"><path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>',
  vendas: '<svg viewBox="0 0 24 24"><path d="M6 7h12l-1 13H7L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>',
  sobre: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v6"/><path d="M12 7.5v.5"/></svg>',
  contato: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  carrinho: '<svg viewBox="0 0 24 24"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.5 12h11L21 7H6.2"/></svg>',
  telefone: '<svg viewBox="0 0 24 24"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2Z"/></svg>',
  menu: '<svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
  fechar: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>'
};

const LINKS_MENU = [
  { pagina: 'inicio', texto: 'Início', href: 'index.html' },
  { pagina: 'vendas', texto: 'Produtos', href: 'vendas.html' },
  { pagina: 'sobre', texto: 'Sobre nós', href: 'sobre.html' },
  { pagina: 'contato', texto: 'Contato', href: 'contato.html' },
  { pagina: 'carrinho', texto: 'Carrinho', href: 'carrinho.html' }
];

function montarMenuLateral() {
  const paginaAtual = document.body.dataset.page;
  // Páginas de produto e pagamento fazem parte do fluxo de vendas
  const ativo = { produto: 'vendas', pagamento: 'carrinho' }[paginaAtual] || paginaAtual;

  const links = LINKS_MENU.map(l => `
    <li>
      <a href="${l.href}" class="${l.pagina === ativo ? 'ativo' : ''}" ${l.pagina === ativo ? 'aria-current="page"' : ''}>
        <span class="icone">${ICONES[l.pagina]}</span>
        <span>${l.texto}</span>
        ${l.pagina === 'carrinho' ? '<span class="contador" data-contador-carrinho hidden>0</span>' : ''}
      </a>
    </li>`).join('');

  const menu = document.createElement('aside');
  menu.className = 'menu-lateral';
  menu.id = 'menu-lateral';
  menu.innerHTML = `
    <a href="index.html" class="menu-logo"><img src="assets/img/logo.png" alt="Papeliar Papelaria"></a>
    <nav aria-label="Menu principal"><ul>${links}</ul></nav>
    <div class="menu-rodape">
      <p class="menu-slogan">Mais que papel, ideias para o seu futuro.</p>
    </div>`;

  const barraTopo = document.createElement('header');
  barraTopo.className = 'barra-topo';
  barraTopo.innerHTML = `
    <button class="botao-menu" aria-label="Abrir menu" aria-controls="menu-lateral" aria-expanded="false">${ICONES.menu}</button>
    <a href="index.html"><img src="assets/img/logo.png" alt="Papeliar Papelaria"></a>
    <a href="carrinho.html" class="botao-menu" aria-label="Carrinho">${ICONES.carrinho}<span class="contador" data-contador-carrinho hidden>0</span></a>`;

  const fundo = document.createElement('div');
  fundo.className = 'menu-fundo';

  document.body.prepend(barraTopo, menu, fundo);

  const botao = barraTopo.querySelector('button');
  const alternar = abrir => {
    document.body.classList.toggle('menu-aberto', abrir);
    botao.setAttribute('aria-expanded', abrir);
    botao.innerHTML = abrir ? ICONES.fechar : ICONES.menu;
  };
  botao.addEventListener('click', () => alternar(!document.body.classList.contains('menu-aberto')));
  fundo.addEventListener('click', () => alternar(false));
}

function montarRodape() {
  const rodape = document.createElement('footer');
  rodape.className = 'rodape';
  rodape.innerHTML = `
    <div class="rodape-conteudo">
      <div class="rodape-marca">
        <strong>Papeliar Papelaria</strong>
        <span>Mais que papel, ideias para o seu futuro.</span>
      </div>
      <div class="rodape-contato">
        <a href="tel:+558130000000">${ICONES.telefone}<span>${CONTATO.telefone}</span></a>
        <a href="mailto:${CONTATO.email}">${ICONES.contato}<span>${CONTATO.email}</span></a>
      </div>
    </div>
    <p class="rodape-copy">© ${new Date().getFullYear()} Papeliar Papelaria · Recife – PE</p>`;
  document.querySelector('main').after(rodape);
}

document.addEventListener('DOMContentLoaded', () => {
  montarMenuLateral();
  montarRodape();
  atualizarContadorCarrinho();
});
