/* =====================================================================
   Estude+ — gerador de trilhas
   O usuário digita um tema; o gerador monta uma grade de estudos usando
   uma base curada de fontes confiáveis (Microsoft Learn, Curso em Vídeo,
   Khan Academy, freeCodeCamp, MDN, documentações oficiais, YouTube).
   Temas fora da base recebem uma grade genérica inteligente com buscas
   profundas nessas mesmas fontes.
   Observação técnica: como o portal é 100% estático (GitHub Pages), a
   "varredura" usa esta base curada + links profundos — não há servidor
   consultando a internet em tempo real.
   ===================================================================== */
(function(){

function norm(s){
  return String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9+ ]/g," ").replace(/\s+/g," ").trim();
}
function cap(s){s=String(s||"").trim();return s?s.charAt(0).toUpperCase()+s.slice(1):s;}

/* guia de estudo nativo, gerado para cada módulo */
const DICAS=[
 "Técnica Pomodoro: 25 minutos de foco total + 5 de pausa. Quatro ciclos valem mais que uma tarde inteira de estudo disperso.",
 "Técnica Feynman: ao terminar um tópico, explique-o em voz alta como se ensinasse a um colega. Onde você travar é exatamente onde precisa revisar.",
 "Prática espaçada: revise os tópicos deste módulo 1 dia, 7 dias e 30 dias depois. A curva do esquecimento não perdoa quem estuda uma vez só.",
 "Aprenda fazendo: para cada hora de vídeo ou leitura, reserve pelo menos 30 minutos aplicando em um exemplo seu. Consumo sem prática vira ilusão de aprendizado.",
];
function buildAula(tema,mod,idx){
  const topicos=String(mod.topicos||"").split(/[;,·]/).map(t=>t.trim()).filter(Boolean);
  const lista=topicos.length?("<ul>"+topicos.map(t=>"<li><b>"+cap(t)+"</b></li>").join("")+"</ul>")
    :"<p>Explore os materiais deste módulo e anote os conceitos-chave que encontrar.</p>";
  return {titulo:"Guia de estudo — "+mod.titulo,corpo:
   "<p>Este é o seu mapa para o módulo <b>"+mod.titulo+"</b> da trilha de <b>"+cap(tema)+"</b>. Estude os materiais abaixo na ordem em que aparecem e use este checklist para saber quando o módulo está de fato dominado:</p>"+
   lista+
   "<p><b>Como estudar este módulo:</b> (1) assista/leia o material de cada tópico; (2) reproduza os exemplos você mesmo — sem copiar e colar; (3) crie um mini-exemplo próprio aplicando o tópico; (4) marque o item como concluído somente quando conseguir explicar o conceito com suas palavras.</p>"+
   "<p>Adicione seus próprios vídeos e artigos a este módulo pela <b>Minha área</b> — eles entram aqui como conteúdo extra e contam no progresso.</p>"+
   "<div class=\"dica-box\">💡 "+DICAS[idx%DICAS.length]+"</div>"};
}

/* fontes de busca profunda (para qualquer tema) */
function fontesBusca(tema){
  const q=encodeURIComponent(tema);
  return [
   {t:"video",n:"YouTube — melhores cursos de "+cap(tema),d:"Busca curada no YouTube; escolha um curso bem avaliado e adicione a playlist pela Minha área para assistir no portal.",u:"https://www.youtube.com/results?search_query="+encodeURIComponent("curso completo de "+tema)},
   {t:"curso",n:"Microsoft Learn — trilhas oficiais sobre "+cap(tema),d:"Conteúdo oficial e gratuito da Microsoft.",u:"https://learn.microsoft.com/pt-br/search/?terms="+q},
   {t:"artigo",n:"freeCodeCamp News — artigos sobre "+cap(tema),d:"Milhares de artigos técnicos gratuitos.",u:"https://www.freecodecamp.org/news/search/?query="+q},
   {t:"curso",n:"Curso em Vídeo — busca por "+cap(tema),d:"Cursos gratuitos em português com certificado.",u:"https://www.cursoemvideo.com/?s="+q},
   {t:"artigo",n:"Khan Academy — busca por "+cap(tema),d:"Base teórica gratuita em português.",u:"https://pt.khanacademy.org/search?page_search_query="+q},
  ];
}

/* ============ base curada de temas populares ============ */
const BASE=[
{k:["excel","planilha","planilhas"],nome:"Excel do básico ao avançado",c1:"#107C41",c2:"#0E5C2F",
 desc:"Domine a ferramenta mais usada do mundo corporativo: fórmulas, funções, tabelas dinâmicas, dashboards e automação.",
 modulos:[
  {titulo:"Fundamentos e produtividade",h:15,topicos:"Interface e atalhos, formatação, referências relativas e absolutas ($), colar especial, validação de dados",
   itens:[
    {t:"video",n:"Hashtag Treinamentos — cursos gratuitos de Excel",d:"Canal brasileiro de referência; adicione a playlist básica pela Minha área.",u:"https://www.youtube.com/@HashtagTreinamentos"},
    {t:"artigo",n:"Suporte oficial do Excel (Microsoft)",d:"Central de treinamento oficial, em português.",u:"https://support.microsoft.com/pt-br/excel"},
    {t:"entrega",n:"Planilha de controle pessoal formatada",d:"Orçamento ou controle de tarefas com validação de dados."}]},
  {titulo:"Fórmulas e funções essenciais",h:20,topicos:"SOMASE(S) e CONT.SE(S), PROCV e PROCX, ÍNDICE+CORRESP, SE e SES, funções de texto e data",
   itens:[
    {t:"curso",n:"Microsoft Learn — fórmulas e funções",d:"Trilha oficial gratuita.",u:"https://learn.microsoft.com/pt-br/search/?terms=excel%20f%C3%B3rmulas"},
    {t:"artigo",n:"ExcelJet — guia visual de funções (inglês)",d:"A melhor referência rápida de fórmulas.",u:"https://exceljet.net/functions"},
    {t:"entrega",n:"Relatório de vendas fictício com PROCX + SOMASES",d:"Cruzando duas tabelas."}]},
  {titulo:"Tabelas dinâmicas e análise",h:15,topicos:"Tabelas (Ctrl+T), tabelas dinâmicas, segmentação de dados, gráficos dinâmicos, formatação condicional",
   itens:[
    {t:"video",n:"Hashtag — tabela dinâmica na prática",d:"Busque a playlist de tabelas dinâmicas no canal.",u:"https://www.youtube.com/@HashtagTreinamentos"},
    {t:"entrega",n:"Dashboard de uma página com 3 tabelas dinâmicas",d:"Com segmentadores conectados."}]},
  {titulo:"Excel avançado e automação",h:20,topicos:"Power Query (importar e tratar dados), noções de Power Pivot, macros gravadas, introdução ao VBA",
   itens:[
    {t:"curso",n:"Microsoft Learn — Power Query",d:"Transformação de dados sem fórmula.",u:"https://learn.microsoft.com/pt-br/power-query/"},
    {t:"entrega",n:"Fluxo Power Query: importar 12 arquivos mensais e consolidar",d:"Atualizável com um clique."}]},
 ]},
{k:["power bi","powerbi","pbi"],nome:"Power BI completo",c1:"#F2C811",c2:"#E8A33D",
 desc:"Do zero ao dashboard profissional: modelagem, DAX, visuais e publicação — alinhado à certificação PL-300.",
 modulos:[
  {titulo:"Primeiros dashboards",h:15,topicos:"Power BI Desktop, conectar fontes, visuais básicos, filtros e segmentações, publicação no serviço",
   itens:[
    {t:"curso",n:"Microsoft Learn — introdução ao Power BI",d:"Trilha oficial gratuita em português.",u:"https://learn.microsoft.com/pt-br/training/powerplatform/power-bi"},
    {t:"video",n:"Hashtag Treinamentos — Power BI",d:"Cursos gratuitos no canal.",u:"https://www.youtube.com/@HashtagTreinamentos"},
    {t:"entrega",n:"Dashboard de vendas com 5 visuais",d:"Publicado no serviço."}]},
  {titulo:"Power Query e modelagem",h:20,topicos:"ETL no Power Query, modelo estrela, relacionamentos e cardinalidade, boas práticas de modelagem",
   itens:[
    {t:"artigo",n:"Documentação oficial — modelagem no Power BI",d:"Guia de modelos e relacionamentos.",u:"https://learn.microsoft.com/pt-br/power-bi/transform-model/"},
    {t:"entrega",n:"Modelo estrela com fato + 3 dimensões",d:"Documente as decisões."}]},
  {titulo:"DAX na prática",h:25,topicos:"Medidas vs colunas, CALCULATE e contexto, inteligência de tempo, variáveis, medidas de comparação (YoY, YTD)",
   itens:[
    {t:"artigo",n:"DAX Guide (SQLBI) — referência de funções",d:"A bíblia do DAX, dos maiores especialistas do mundo.",u:"https://dax.guide"},
    {t:"video",n:"SQLBI — canal oficial",d:"Marco Russo e Alberto Ferrari.",u:"https://www.youtube.com/@SQLBI"},
    {t:"entrega",n:"Painel com 10 medidas DAX comentadas",d:"Incluindo YoY e YTD."}]},
  {titulo:"Nível profissional (PL-300)",h:20,topicos:"RLS (segurança em nível de linha), performance, design de relatórios, preparação para a certificação PL-300",
   itens:[
    {t:"curso",n:"Microsoft Learn — trilha da certificação PL-300",d:"Preparação oficial e gratuita.",u:"https://learn.microsoft.com/pt-br/credentials/certifications/power-bi-data-analyst-associate/"},
    {t:"entrega",n:"Relatório com RLS por regional + checklist de performance",d:"Simulando um cenário corporativo."}]},
 ]},
{k:["sql","banco de dados","bancos de dados"],nome:"SQL e bancos de dados",c1:"#0EA5E9",c2:"#6366F1",
 desc:"Consultas do básico ao avançado: SELECT, JOINs, agregações, window functions e modelagem.",
 modulos:[
  {titulo:"Fundamentos de consultas",h:15,topicos:"SELECT e WHERE, ORDER BY, funções de agregação, GROUP BY e HAVING, operadores lógicos",
   itens:[
    {t:"curso",n:"Curso em Vídeo — MySQL (com certificado)",d:"Curso gratuito em português.",u:"https://www.cursoemvideo.com/curso/mysql/"},
    {t:"artigo",n:"W3Schools SQL — referência interativa",d:"Sintaxe com exemplos executáveis.",u:"https://www.w3schools.com/sql/"},
    {t:"entrega",n:"20 consultas resolvidas sobre um banco de exemplo",d:"Comente cada consulta."}]},
  {titulo:"JOINs e subconsultas",h:15,topicos:"INNER/LEFT/RIGHT/FULL JOIN, self join, subqueries, EXISTS e IN, UNION",
   itens:[
    {t:"artigo",n:"Mode SQL Tutorial — seção intermediária",d:"Tutorial gratuito e direto.",u:"https://mode.com/sql-tutorial"},
    {t:"entrega",n:"Relatório que exige 3+ JOINs",d:"Ex.: clientes sem pedidos no trimestre."}]},
  {titulo:"SQL avançado",h:20,topicos:"Window functions (ROW_NUMBER, RANK, LAG), CTEs, CASE, índices e noções de performance",
   itens:[
    {t:"pratica",n:"LeetCode — SQL 50 (plano gratuito)",d:"O padrão de entrevista.",u:"https://leetcode.com/studyplan/top-sql-50/"},
    {t:"entrega",n:"5 problemas resolvidos com window functions",d:"Explique cada OVER()."}]},
  {titulo:"Modelagem e projeto final",h:15,topicos:"Chaves e relacionamentos, normalização, modelagem dimensional, projeto de banco completo",
   itens:[
    {t:"artigo",n:"Documentação do PostgreSQL (tutorial)",d:"O banco open source de referência.",u:"https://www.postgresql.org/docs/current/tutorial.html"},
    {t:"entrega",n:"Banco modelado + 10 consultas de negócio",d:"Diagrama incluído no repositório."}]},
 ]},
{k:["python"],nome:"Python essencial",c1:"#3776AB",c2:"#FFD343",
 desc:"A linguagem mais versátil do mercado: lógica, estruturas, funções e automações do dia a dia.",
 modulos:[
  {titulo:"Lógica e primeiros programas",h:20,topicos:"Variáveis e tipos, entrada e saída, condicionais, laços, operadores",
   itens:[
    {t:"video",n:"Curso em Vídeo — Python (canal)",d:"Gustavo Guanabara; adicione a playlist do Mundo 1 pela Minha área.",u:"https://www.youtube.com/@CursoemVideo"},
    {t:"curso",n:"Curso em Vídeo — plataforma com exercícios e certificado",d:"Gratuito.",u:"https://www.cursoemvideo.com/curso/python-3-mundo-1/"},
    {t:"entrega",n:"10 mini-programas de lógica",d:"Publicados no GitHub."}]},
  {titulo:"Estruturas de dados e funções",h:20,topicos:"Listas, dicionários, tuplas e sets, funções e parâmetros, list comprehensions, tratamento de erros",
   itens:[
    {t:"pratica",n:"Exercism — trilha Python com mentoria gratuita",d:"Pratique com feedback.",u:"https://exercism.org/tracks/python"},
    {t:"entrega",n:"Agenda de contatos em Python puro",d:"CRUD completo no terminal."}]},
  {titulo:"Arquivos, módulos e POO",h:20,topicos:"Ler e escrever arquivos, módulos e pip, classes e objetos, ambientes virtuais",
   itens:[
    {t:"artigo",n:"Documentação oficial do Python — tutorial (PT-BR)",d:"O tutorial oficial traduzido.",u:"https://docs.python.org/pt-br/3/tutorial/"},
    {t:"entrega",n:"Organizador de arquivos por extensão",d:"Script útil de verdade."}]},
  {titulo:"Automação e projeto final",h:20,topicos:"Requests e APIs, automação de planilhas (openpyxl), agendamento, projeto integrador",
   itens:[
    {t:"artigo",n:"Automate the Boring Stuff (livro gratuito, inglês)",d:"O clássico de automação com Python.",u:"https://automatetheboringstuff.com"},
    {t:"entrega",n:"Automação que economiza tempo real seu",d:"Ex.: consolidar planilhas e enviar resumo."}]},
 ]},
{k:["ingles","english","idioma ingles"],nome:"Inglês para carreira",c1:"#DC2626",c2:"#1D4ED8",
 desc:"Inglês funcional com foco em trabalho: compreensão, vocabulário, conversação e entrevistas.",
 modulos:[
  {titulo:"Base e compreensão auditiva",h:25,topicos:"Present/past/future essenciais, vocabulário de alta frequência, listening diário, phrasal verbs comuns",
   itens:[
    {t:"curso",n:"BBC Learning English",d:"Conteúdo diário gratuito, por níveis.",u:"https://www.bbc.co.uk/learningenglish"},
    {t:"video",n:"English with Lucy (canal)",d:"Pronúncia e vocabulário; adicione playlists pela Minha área.",u:"https://www.youtube.com/@EnglishwithLucy"},
    {t:"entrega",n:"Diário de listening: 15 min/dia por 30 dias",d:"Anote 3 expressões novas por dia."}]},
  {titulo:"Leitura e vocabulário técnico",h:20,topicos:"Leitura de artigos da sua área, glossário pessoal, falsos cognatos, collocations",
   itens:[
    {t:"artigo",n:"YouGlish — como nativos pronunciam qualquer palavra",d:"Busca em milhões de vídeos reais.",u:"https://youglish.com"},
    {t:"entrega",n:"Glossário com 100 termos da sua área",d:"Com frase de exemplo em cada um."}]},
  {titulo:"Conversação e escrita",h:25,topicos:"Small talk profissional, e-mails em inglês, reuniões (daily/meeting), shadowing",
   itens:[
    {t:"curso",n:"engVid — aulas gratuitas por professores nativos",d:"Milhares de lições em vídeo.",u:"https://www.engvid.com"},
    {t:"entrega",n:"5 e-mails profissionais + 3 áudios seus de 2 minutos",d:"Compare sua evolução."}]},
  {titulo:"Entrevistas e certificação",h:20,topicos:"Método STAR, perguntas clássicas de entrevista, apresentação pessoal, simulados de proficiência",
   itens:[
    {t:"pratica",n:"EF SET — teste de nível gratuito com certificado",d:"Certificado aceito no LinkedIn.",u:"https://www.efset.org/pt/"},
    {t:"entrega",n:"3 entrevistas simuladas gravadas em inglês",d:"Com autoavaliação escrita."}]},
 ]},
{k:["javascript","js"],nome:"JavaScript e web",c1:"#F7DF1E",c2:"#F59E0B",
 desc:"A linguagem da web: fundamentos, DOM, interatividade e primeiros projetos front-end.",
 modulos:[
  {titulo:"Fundamentos da linguagem",h:20,topicos:"Variáveis (let/const), tipos, funções e arrow functions, arrays e objetos, laços",
   itens:[
    {t:"curso",n:"Curso em Vídeo — JavaScript (com certificado)",d:"Gratuito, em português.",u:"https://www.cursoemvideo.com/curso/javascript/"},
    {t:"artigo",n:"MDN Web Docs — JavaScript (PT-BR)",d:"A documentação de referência da web.",u:"https://developer.mozilla.org/pt-BR/docs/Web/JavaScript"},
    {t:"entrega",n:"10 exercícios de lógica em JS",d:"Rodando no console."}]},
  {titulo:"DOM e interatividade",h:20,topicos:"Selecionar e manipular elementos, eventos, formulários, localStorage",
   itens:[
    {t:"artigo",n:"javascript.info — tutorial moderno (inglês)",d:"O melhor guia estruturado de JS.",u:"https://javascript.info"},
    {t:"entrega",n:"Lista de tarefas interativa",d:"Adicionar, concluir e persistir."}]},
  {titulo:"JS moderno e APIs",h:20,topicos:"Promises e async/await, fetch e APIs, módulos ES6, JSON",
   itens:[
    {t:"curso",n:"freeCodeCamp — certificação JavaScript (gratuita)",d:"Centenas de desafios corrigidos.",u:"https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/"},
    {t:"entrega",n:"App que consome uma API pública",d:"Ex.: previsão do tempo ou CEP."}]},
  {titulo:"Projeto final",h:15,topicos:"Estruturar um projeto, Git e GitHub Pages, boas práticas, portfólio",
   itens:[
    {t:"artigo",n:"GitHub Skills — publicando com GitHub Pages",d:"Tutoriais oficiais interativos.",u:"https://skills.github.com"},
    {t:"entrega",n:"Site interativo publicado no GitHub Pages",d:"Seu primeiro projeto público."}]},
 ]},
{k:["estatistica","statistics","probabilidade"],nome:"Estatística aplicada",c1:"#9467BD",c2:"#6366F1",
 desc:"Da descritiva à inferência: pensar com dados, testar hipóteses e evitar as armadilhas clássicas.",
 modulos:[
  {titulo:"Estatística descritiva",h:15,topicos:"Média, mediana e moda, dispersão e desvio padrão, quartis e boxplot, outliers",
   itens:[
    {t:"curso",n:"Khan Academy — Estatística (PT-BR)",d:"Base completa e gratuita.",u:"https://pt.khanacademy.org/math/statistics-probability"},
    {t:"entrega",n:"Análise descritiva de um dataset público",d:"Com interpretação escrita."}]},
  {titulo:"Probabilidade",h:15,topicos:"Regras de probabilidade, condicional e Bayes, distribuições (normal, binomial), valor esperado",
   itens:[
    {t:"artigo",n:"Seeing Theory — probabilidade visual e interativa",d:"Brown University.",u:"https://seeing-theory.brown.edu"},
    {t:"entrega",n:"5 problemas de Bayes resolvidos e explicados",d:"Com contexto de negócio."}]},
  {titulo:"Inferência e testes",h:20,topicos:"Amostragem, intervalo de confiança, teste de hipótese, p-valor, correlação vs causalidade",
   itens:[
    {t:"video",n:"StatQuest (canal)",d:"O melhor professor de estatística do YouTube; adicione playlists pela Minha área.",u:"https://www.youtube.com/@statquest"},
    {t:"entrega",n:"Teste de hipótese completo em um caso real",d:"Da pergunta à conclusão."}]},
  {titulo:"Estatística na prática",h:15,topicos:"Regressão linear simples, interpretação de resultados, armadilhas (Simpson, vieses), comunicação",
   itens:[
    {t:"artigo",n:"Khan Academy — regressão e correlação",d:"Módulos finais da trilha.",u:"https://pt.khanacademy.org/math/statistics-probability"},
    {t:"entrega",n:"Relatório executivo de 1 página com uma análise sua",d:"Para um leitor leigo."}]},
 ]},
{k:["git","github","versionamento"],nome:"Git e GitHub",c1:"#F05032",c2:"#24292F",
 desc:"Controle de versão profissional: histórico, branches, colaboração e portfólio público.",
 modulos:[
  {titulo:"Fundamentos do Git",h:10,topicos:"init/add/commit, status e log, .gitignore, desfazendo alterações",
   itens:[
    {t:"curso",n:"Curso em Vídeo — Git e GitHub (com certificado)",d:"Gratuito, em português.",u:"https://www.cursoemvideo.com/curso/curso-de-git-e-github/"},
    {t:"artigo",n:"Pro Git — livro oficial gratuito (PT-BR)",d:"Capítulos 1 a 3.",u:"https://git-scm.com/book/pt-br/v2"},
    {t:"entrega",n:"Repositório com 10 commits bem descritos",d:"Histórico que conta uma história."}]},
  {titulo:"Branches e fluxo de trabalho",h:10,topicos:"branch/checkout/merge, resolução de conflitos, pull requests, fluxo de trabalho em equipe",
   itens:[
    {t:"curso",n:"GitHub Skills — tutoriais oficiais interativos",d:"Aprenda fazendo, no próprio GitHub.",u:"https://skills.github.com"},
    {t:"entrega",n:"Feature desenvolvida em branch + PR aprovado",d:"Pode ser no seu próprio repo."}]},
  {titulo:"GitHub como portfólio",h:10,topicos:"README profissional, perfil especial, GitHub Pages, licenças",
   itens:[
    {t:"artigo",n:"Documentação do GitHub — perfil e Pages",d:"Guias oficiais.",u:"https://docs.github.com/pt"},
    {t:"entrega",n:"README de perfil + 1 projeto publicado no Pages",d:"Seu cartão de visitas técnico."}]},
 ]},
];

function acharBase(tema){
  const t=norm(tema);
  if(!t)return null;
  for(const b of BASE){
    for(const k of b.k){
      if(t===k||t.includes(k)||k.includes(t))return b;
    }
  }
  return null;
}

const PAL_GEN=[["#4F46E5","#7C3AED"],["#0E7C7B","#3B7DD8"],["#D95F02","#E7298A"],["#16A34A","#0E7C7B"],["#9467BD","#D62728"]];

function gerar(tema){
  tema=String(tema||"").trim();
  const base=acharBase(tema);
  let plano;
  if(base){
    plano={nome:base.nome,desc:base.desc,c1:base.c1,c2:base.c2,curada:true,
      modulos:base.modulos.map(m=>({titulo:m.titulo,h:m.h,topicos:m.topicos,itens:m.itens.map(i=>Object.assign({},i))}))};
  }else{
    const pal=PAL_GEN[Math.abs(norm(tema).split("").reduce((a,c)=>a+c.charCodeAt(0),0))%PAL_GEN.length];
    const f=fontesBusca(tema);
    plano={nome:"Trilha de "+cap(tema),c1:pal[0],c2:pal[1],curada:false,
      desc:"Grade gerada pelo Estude+ a partir de fontes confiáveis. Refine adicionando vídeos e artigos pela Minha área.",
      modulos:[
       {titulo:"Fundamentos de "+cap(tema),h:15,topicos:"Conceitos essenciais, vocabulário da área, primeiros passos guiados, erros comuns de iniciante",itens:[f[0],f[3],{t:"entrega",n:"Resumo de 1 página: o que é e para que serve "+cap(tema),d:"Escrever consolida o aprendizado."}]},
       {titulo:"Prática guiada",h:20,topicos:"Exercícios básicos, reprodução de exemplos, primeiro mini-projeto",itens:[f[1],f[4],{t:"entrega",n:"Mini-projeto aplicando o básico de "+cap(tema),d:"Simples, porém completo."}]},
       {titulo:"Aprofundamento",h:20,topicos:"Técnicas intermediárias, boas práticas, casos reais, comunidade e referências",itens:[f[2],f[0],{t:"entrega",n:"Estudo de caso comentado",d:"Analise um exemplo real da área."}]},
       {titulo:"Projeto final",h:15,topicos:"Projeto integrador, revisão dos módulos, publicação do resultado, próximos passos",itens:[f[1],{t:"entrega",n:"Projeto final de "+cap(tema)+" publicado",d:"GitHub, PDF ou apresentação."}]},
      ]};
  }
  plano.modulos.forEach((m,i)=>{m.n=i+1;m.aula=buildAula(base?base.nome:tema,m,i);});
  return plano;
}

window.GERADOR={gerar:gerar,temasCurados:BASE.map(b=>b.nome)};
})();
