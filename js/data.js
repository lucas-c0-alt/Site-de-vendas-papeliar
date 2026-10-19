/* Catálogo da Papeliar.
   Categorias, faixas de preço e públicos retirados do Dossiê Institucional (2026).
   O preço de venda usado no site é o valor inicial da faixa de referência simulada. */
const CONTATO = {
  telefone: '(81) 3000-0000',
  email: 'contato@papeliar.com.br'
};

const PRODUTOS = [
  {
    id: 'cadernos-e-agendas',
    nome: 'Cadernos e agendas',
    preco: 18,
    faixa: [18, 69],
    img: 'assets/img/produtos/01_Cadernos_e_agendas.png',
    pagina: 'produto-cadernos-e-agendas.html',
    resumo: 'Para estudar, trabalhar e organizar a rotina.',
    descricao: [
      'Cadernos e agendas para estudantes, famílias, profissionais e escritórios. A linha inclui cadernos especiais, procurados por profissionais criativos para registrar e organizar suas ideias.',
      'A Papeliar também oferece o serviço de personalização de capas e a montagem de kits escolares, ideais para a reposição durante o ano letivo.'
    ]
  },
  {
    id: 'canetas-e-marcadores',
    nome: 'Canetas e marcadores',
    preco: 4,
    faixa: [4, 29],
    img: 'assets/img/produtos/02_Lapis_canetas_e_marcadores.png',
    pagina: 'produto-canetas-e-marcadores.html',
    resumo: 'Cor e precisão para cada ideia.',
    descricao: [
      'Canetas e marcadores para o dia a dia da escola, do escritório e dos projetos criativos.',
      'Itens acessíveis para estudantes e famílias, e disponíveis em compra em lote para escolas, cursos e empresas com padronização de itens.'
    ]
  },
  {
    id: 'pastas-e-organizadores',
    nome: 'Pastas e organizadores',
    preco: 12,
    faixa: [12, 48],
    img: 'assets/img/produtos/03_Pastas_e_organizadores.png',
    pagina: 'produto-pastas-e-organizadores.html',
    resumo: 'Soluções de organização para casa, escola e trabalho.',
    descricao: [
      'Pastas e organizadores que fazem parte das soluções de organização da Papeliar, pensadas para estudantes, escolas, escritórios e profissionais criativos.',
      'Uma forma prática de manter documentos, trabalhos e materiais sempre no lugar certo.'
    ]
  },
  {
    id: 'papeis-e-blocos',
    nome: 'Papéis e blocos',
    preco: 9,
    faixa: [9, 55],
    img: 'assets/img/produtos/04_Papel_e_blocos.png',
    pagina: 'produto-papeis-e-blocos.html',
    resumo: 'A base de todo bom projeto.',
    descricao: [
      'Papéis e blocos para atividades escolares, rotinas de escritório e trabalhos artísticos.',
      'Disponíveis para compra avulsa ou em contratos recorrentes de abastecimento para escolas e empresas.'
    ]
  },
  {
    id: 'mochilas-e-estojos',
    nome: 'Mochilas e estojos',
    preco: 39,
    faixa: [39, 189],
    img: 'assets/img/produtos/05_Mochilas_e_estojos.png',
    pagina: 'produto-mochilas-e-estojos.html',
    resumo: 'Para levar o material com organização.',
    descricao: [
      'Mochilas e estojos para estudantes e famílias que buscam materiais confiáveis e acessíveis para o ano letivo.',
      'Combine com os demais itens da Papeliar e monte o kit escolar ideal para cada perfil.'
    ]
  },
  {
    id: 'materiais-artisticos',
    nome: 'Materiais artísticos',
    preco: 8,
    faixa: [8, 95],
    img: 'assets/img/produtos/06_Materiais_de_artes.png',
    pagina: 'produto-materiais-artisticos.html',
    resumo: 'Onde a criatividade encontra espaço.',
    descricao: [
      'Produtos para atividades artísticas, selecionados para profissionais criativos, estudantes e escolas.',
      'Fazem parte da curadoria de produtos da Papeliar, que enxerga na papelaria ferramentas de educação, criatividade e organização.'
    ]
  },
  {
    id: 'suprimentos-de-escritorio',
    nome: 'Suprimentos de escritório',
    preco: 6,
    faixa: [6, 135],
    img: 'assets/img/produtos/07_Suprimentos_de_escritorio.png',
    pagina: 'produto-suprimentos-de-escritorio.html',
    resumo: 'O trabalho ganha organização.',
    descricao: [
      'Itens de escritório para empresas e profissionais que precisam de suprimentos recorrentes e controle de consumo.',
      'Para empresas, a Papeliar oferece catálogo corporativo, kits corporativos e assinaturas mensais de escritório com previsibilidade de reposição.'
    ]
  },
  {
    id: 'informatica-e-acessorios',
    nome: 'Informática e acessórios',
    preco: 25,
    faixa: [25, 220],
    img: 'assets/img/produtos/08_Informatica_e_acessorios.png',
    pagina: 'produto-informatica-e-acessorios.html',
    resumo: 'Suprimentos para informática do dia a dia.',
    descricao: [
      'Suprimentos para informática e acessórios que completam o portfólio da Papeliar para o trabalho e os estudos.',
      'Disponíveis para clientes da loja, do e-commerce e do canal corporativo, com atendimento omnicanal.'
    ]
  }
];

/* Produtos em destaque na página inicial */
const DESTAQUES = ['mochilas-e-estojos', 'materiais-artisticos'];

function buscarProduto(id) {
  return PRODUTOS.find(p => p.id === id);
}

function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/* Cartão usado na página de vendas e em "Mais produtos" */
function cartaoProdutoHTML(p) {
  return `
    <article class="cartao-produto">
      <a class="foto" href="${p.pagina}"><img src="${p.img}" alt="${p.nome}" loading="lazy"></a>
      <div class="info">
        <h2><a href="${p.pagina}">${p.nome}</a></h2>
        <p class="resumo">${p.resumo}</p>
        <div class="compra">
          <div class="preco"><small>a partir de</small><strong>${formatarPreco(p.preco)}</strong></div>
          <a href="${p.pagina}" class="botao botao-azul">Comprar</a>
        </div>
      </div>
    </article>`;
}
