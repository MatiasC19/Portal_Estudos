/* =====================================================================
   StudyHub — dados das trilhas
   Trilha 1: Ciência de Dados (completa: aulas nativas 1-7, players, testes)
   Trilha 2: Engenharia de Dados (núcleo inicial)
   ===================================================================== */

const TRILHAS_BUILTIN = [
{
 id:"ds", nome:"Ciência de Dados", icon:"cpu", c1:"#1F77B4", c2:"#7A4DBE",
 desc:"De Analista a Cientista de Dados Especialista: Python, estatística, ML, deep learning, MLOps e IA Generativa. 18 módulos, aulas nativas, players e compilador Python.",
 fases:[
  {id:"f1",cor:"var(--f1)",corB:"var(--f1b)",tag:"Fase 1",nome:"Fundamentos",icon:"code"},
  {id:"f2",cor:"var(--f2)",corB:"var(--f2b)",tag:"Fase 2",nome:"Análise de Dados",icon:"bars"},
  {id:"f3",cor:"var(--f3)",corB:"var(--f3b)",tag:"Fase 3",nome:"Machine Learning",icon:"cpu"},
  {id:"f4",cor:"var(--f4)",corB:"var(--f4b)",tag:"Fase 4",nome:"Aprofundamento",icon:"layers"},
  {id:"f5",cor:"var(--f5)",corB:"var(--f5b)",tag:"Fase 5",nome:"Produção e Carreira",icon:"rocket"},
  {id:"f6",cor:"var(--f6)",corB:"var(--f6b)",tag:"Fase 6",nome:"Especialista — global",icon:"globe"},
 ],
 milestones:{empregavel:9,nucleo:13},
 modulos:[
 {n:1,fase:"f1",titulo:"Python do zero",h:40,
  topicos:"Sintaxe, estruturas de controle, funções, listas, dicionários, arquivos e POO básica.",
  aula:{titulo:"Como pensar em Python",corpo:`
<p>Python é a língua franca da ciência de dados por um motivo: ela lê quase como pseudocódigo. Se você já escreve SQL, já pensa de forma declarativa — aqui você vai adicionar o pensamento <b>imperativo</b>: dizer ao computador o passo a passo.</p>
<p><b>Os 4 blocos que resolvem 90% dos problemas:</b></p>
<ul>
<li><b>Variáveis e tipos</b> — caixas com rótulo: <code>vendas = 1500</code> (int), <code>regiao = "Sul"</code> (str), <code>ativo = True</code> (bool), <code>itens = [10, 20]</code> (list), <code>cliente = {"nome": "Ana"}</code> (dict).</li>
<li><b>Decisão</b> — <code>if / elif / else</code>: o WHERE do mundo imperativo.</li>
<li><b>Repetição</b> — <code>for item in lista:</code> percorre coleções; é assim que você processa linhas sem SQL.</li>
<li><b>Funções</b> — <code>def</code> empacota lógica reutilizável, como uma view parametrizada.</li>
</ul>
<pre><code>def classificar_venda(valor):
    if valor >= 1000:
        return "alta"
    elif valor >= 500:
        return "média"
    return "baixa"

for v in [1500, 700, 200]:
    print(v, "->", classificar_venda(v))</code></pre>
<p>Repare na <b>indentação</b>: em Python, o recuo de 4 espaços define o que está dentro do if, do for e da função. Errar o recuo é o erro nº 1 de iniciantes — o compilador do portal vai te avisar quando acontecer.</p>
<div class="dica-box">💡 <b>Hábito de ouro:</b> antes de rodar, leia o código em voz alta como uma frase. Se a frase não faz sentido, o código provavelmente também não faz.</div>`},
  itens:[
   {id:"m1v1",t:"video",n:"Curso em Vídeo — Python 3 (Mundo 1)",d:"Gustavo Guanabara. Assista aqui no portal.",u:"https://www.youtube.com/@CursoemVideo/playlists",embed:"PLHz_AreHm4dlKP6QQCekuIPky1CiwmdI6"},
   {id:"m1c1",t:"curso",n:"Curso em Vídeo — Mundos 2 e 3 + exercícios",d:"Plataforma oficial, com desafios de cada aula.",u:"https://www.cursoemvideo.com/curso/python-3-mundo-1/"},
   {id:"m1ce",t:"cert",n:"Emitir certificado gratuito do Curso em Vídeo",d:"Conclua as atividades na plataforma para liberar.",u:"https://www.cursoemvideo.com",cert:true},
   {id:"m1p1",t:"pratica",n:"40–60 exercícios no Exercism (trilha Python)",d:"Prática com mentoria gratuita.",u:"https://exercism.org/tracks/python"},
   {id:"m1e1",t:"entrega",n:"Repositório no GitHub com todos os exercícios",d:"Primeiro tijolo do portfólio."},
  ]},
 {n:2,fase:"f1",titulo:"Python para dados — NumPy e Pandas",h:40,
  topicos:"Arrays, Series/DataFrame, leitura de CSV/Excel/SQL, filtros, groupby, merge/join e limpeza. Traduza seu SQL para Pandas.",
  aula:{titulo:"Do SQL ao Pandas — o mapa de tradução",corpo:`
<p>Você já domina a lógica de dados — só falta o dialeto. Pandas é, na prática, um SQL que vive dentro do Python: a tabela vira <code>DataFrame</code>, a coluna vira <code>Series</code>, e cada cláusula tem um equivalente direto.</p>
<ul>
<li><code>SELECT coluna FROM t</code> → <code>df["coluna"]</code></li>
<li><code>WHERE valor > 100</code> → <code>df[df["valor"] > 100]</code></li>
<li><code>GROUP BY regiao</code> → <code>df.groupby("regiao")["valor"].sum()</code></li>
<li><code>INNER JOIN</code> → <code>pd.merge(df1, df2, on="id")</code></li>
<li><code>ORDER BY valor DESC</code> → <code>df.sort_values("valor", ascending=False)</code></li>
</ul>
<pre><code>import pandas as pd

vendas = pd.read_csv("vendas.csv")          # ou read_excel, read_sql
top = (vendas[vendas["valor"] > 0]           # WHERE
       .groupby("regiao")["valor"].sum()     # GROUP BY + SUM
       .sort_values(ascending=False)         # ORDER BY
       .head(5))                             # LIMIT 5
print(top)</code></pre>
<p>A diferença de mentalidade: em SQL você descreve o resultado; em Pandas você <b>encadeia transformações</b>. Esse encadeamento (method chaining) é o estilo profissional — cada linha faz uma coisa e o pipeline se lê de cima para baixo.</p>
<div class="dica-box">💡 <b>Armadilha clássica:</b> filtro com duas condições exige parênteses e <code>&amp;</code>/<code>|</code> no lugar de AND/OR: <code>df[(df["uf"]=="SP") &amp; (df["valor"]>100)]</code>.</div>`},
  itens:[
   {id:"m2c1",t:"curso",n:"Kaggle Learn — Python",d:"Curto e direto, com exercícios corrigidos.",u:"https://www.kaggle.com/learn/python",cert:true},
   {id:"m2c2",t:"curso",n:"Kaggle Learn — Pandas",d:"O essencial de manipulação de dados.",u:"https://www.kaggle.com/learn/pandas",cert:true},
   {id:"m2v1",t:"video",n:"Hashtag Programação — Python para dados",d:"Complemento em português.",u:"https://www.youtube.com/@HashtagProgramacao"},
   {id:"m2l1",t:"livro",n:"Python Data Science Handbook (gratuito)",d:"Jake VanderPlas — capítulos de NumPy e Pandas.",u:"https://jakevdp.github.io/PythonDataScienceHandbook/"},
   {id:"m2p1",t:"pratica",n:"Refazer em Pandas 5 consultas SQL do seu trabalho",d:"Com dados fictícios ou anonimizados — nunca dados reais de clientes."},
   {id:"m2e1",t:"entrega",n:"Notebook comparando SQL × Pandas",d:"Mesmos problemas, duas soluções."},
  ]},
 {n:3,fase:"f1",titulo:"Estatística e probabilidade",h:40,
  topicos:"Descritiva, distribuições, probabilidade, amostragem, intervalo de confiança, testes de hipótese, correlação e p-valor.",
  aula:{titulo:"Estatística que decide (e não só descreve)",corpo:`
<p>Todo dashboard mostra médias. O cientista de dados pergunta: <b>essa diferença é real ou é ruído?</b> Esta é a pergunta que a estatística inferencial responde — e que separa relatório de decisão.</p>
<ul>
<li><b>Média vs. mediana:</b> a média é puxada por outliers (um cliente gigante distorce tudo); a mediana resiste. Ticket médio de vendas quase sempre pede as duas.</li>
<li><b>Desvio padrão:</b> mede a dispersão. Duas regiões com a mesma média e desvios diferentes são negócios completamente diferentes.</li>
<li><b>Intervalo de confiança:</b> em vez de dizer "a conversão é 5,2%", diga "entre 4,8% e 5,6% com 95% de confiança". Amostras pequenas geram intervalos largos — desconfie de conclusões com poucos dados.</li>
<li><b>p-valor (a intuição honesta):</b> se não existisse efeito nenhum, qual a chance de eu ver uma diferença tão grande quanto essa só por acaso? p-valor baixo (convencionalmente &lt; 0,05) = improvável que seja acaso. Ele <b>não</b> mede o tamanho nem a importância do efeito.</li>
</ul>
<pre><code>from scipy import stats

vendas_sul   = [120, 135, 110, 140, 128]
vendas_norte = [100, 115,  98, 120, 105]
t, p = stats.ttest_ind(vendas_sul, vendas_norte)
print(f"p-valor: {p:.4f}")  # < 0.05? diferença provavelmente real</code></pre>
<div class="dica-box">💡 <b>Erro que reprova em entrevista:</b> tratar p = 0,04 como "provado" e p = 0,06 como "nada". O p-valor é um contínuo de evidência, não um interruptor.</div>`},
  itens:[
   {id:"m3c1",t:"curso",n:"Khan Academy — Estatística e Probabilidade (PT-BR)",d:"Base teórica completa e gratuita.",u:"https://pt.khanacademy.org/math/statistics-probability"},
   {id:"m3v1",t:"video",n:"StatQuest — Statistics Fundamentals",d:"O melhor professor de estatística do YouTube (ative legendas).",u:"https://www.youtube.com/@statquest/playlists",embed:"PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9"},
   {id:"m3c2",t:"curso",n:"Seeing Theory — estatística visual interativa",d:"Brown University; intuição visual de probabilidade.",u:"https://seeing-theory.brown.edu"},
   {id:"m3e1",t:"entrega",n:"Notebook de análise estatística com conclusões escritas",d:"Comunicar resultado é metade do trabalho."},
  ]},
 {n:4,fase:"f2",titulo:"Visualização de dados em Python",h:20,
  topicos:"Matplotlib, Seaborn e Plotly. Você já domina storytelling no Power BI — aqui é a tradução para código.",
  aula:{titulo:"A gramática dos gráficos em código",corpo:`
<p>No Power BI você arrasta; em Python você declara. A vantagem do código: reprodutibilidade (o gráfico nasce igual toda vez) e automação (100 gráficos em um loop). A anatomia do matplotlib tem duas peças:</p>
<ul>
<li><b>Figure</b> — a folha de papel;</li>
<li><b>Axes</b> — o gráfico desenhado nela (pode haver vários por figura).</li>
</ul>
<pre><code>import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(8, 4))
ax.bar(["Sul", "Norte", "Leste"], [130, 90, 75])
ax.set_title("Vendas por região")
ax.set_ylabel("R$ mil")
plt.show()</code></pre>
<p><b>Escolhendo o gráfico</b> (a mesma lógica do BI): comparação entre categorias → barras; evolução no tempo → linha; distribuição → histograma/boxplot; relação entre duas variáveis → dispersão. O Seaborn (<code>import seaborn as sns</code>) embeleza e resume: <code>sns.histplot</code>, <code>sns.boxplot</code>, <code>sns.scatterplot</code> resolvem 80% da EDA em uma linha cada.</p>
<div class="dica-box">💡 Menos é mais: um bom gráfico de análise tem UM recado. Se precisa de legenda com 12 itens, são 12 gráficos disfarçados de um.</div>`},
  itens:[
   {id:"m4c1",t:"curso",n:"Kaggle Learn — Data Visualization",d:"Seaborn na prática, com certificado.",u:"https://www.kaggle.com/learn/data-visualization",cert:true},
   {id:"m4v1",t:"video",n:"freeCodeCamp — tutoriais de visualização",d:"Buscar 'data visualization python' no canal.",u:"https://www.youtube.com/@freecodecamp"},
   {id:"m4p1",t:"pratica",n:"Recriar em Python 3 visuais de um dashboard seu do Power BI",d:"Compare esforço e resultado."},
   {id:"m4e1",t:"entrega",n:"Galeria de gráficos publicada no GitHub",d:"README com imagem de cada gráfico."},
  ]},
 {n:5,fase:"f2",titulo:"Análise Exploratória (EDA) + 1º projeto",h:25,
  topicos:"Processo completo: perguntas de negócio, limpeza, outliers, análises univariada/bivariada, insights e comunicação.",
  aula:{titulo:"EDA como investigação, não como ritual",corpo:`
<p>EDA ruim é rodar <code>df.describe()</code> e colar 20 gráficos sem conclusão. EDA boa é uma <b>investigação guiada por perguntas</b>. O processo em 6 passos:</p>
<ul>
<li><b>1. Perguntas primeiro.</b> Escreva 3 perguntas de negócio antes de abrir o dado ("quais categorias puxam o faturamento?", "atraso na entrega derruba a nota?").</li>
<li><b>2. Raio-X.</b> <code>df.shape</code>, <code>df.info()</code>, <code>df.head()</code> — quantas linhas, quais tipos, o que é cada coluna.</li>
<li><b>3. Qualidade.</b> Nulos (<code>df.isna().sum()</code>), duplicados (<code>df.duplicated().sum()</code>), tipos errados (data como texto é clássico).</li>
<li><b>4. Univariada.</b> Uma variável por vez: histogramas para numéricas, contagens para categóricas. É aqui que outliers aparecem.</li>
<li><b>5. Bivariada.</b> Cruze com a pergunta: nota × tempo de entrega, valor × região. Correlação (<code>df.corr()</code>) dá pistas — mas correlação não é causa.</li>
<li><b>6. Conclusão escrita.</b> Cada pergunta do passo 1 ganha uma resposta em texto, com número e gráfico de apoio. Sem o texto, não houve análise.</li>
</ul>
<div class="dica-box">💡 No projeto Olist, uma pergunta rende ouro em entrevista: "o problema de nota baixa é do produto ou da logística?" — persiga essa trilha e documente o caminho.</div>`},
  itens:[
   {id:"m5c1",t:"curso",n:"freeCodeCamp — Data Analysis with Python",d:"Com certificação gratuita ao final.",u:"https://www.freecodecamp.org/learn/data-analysis-with-python/",cert:true},
   {id:"m5v1",t:"video",n:"Programação Dinâmica — análise de dados",d:"Canal brasileiro de referência.",u:"https://www.youtube.com/@ProgramacaoDinamica"},
   {id:"m5p1",t:"pratica",n:"EDA completa do dataset Olist (e-commerce BR)",d:"3 perguntas de negócio; responda cada uma com dados.",u:"https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce"},
   {id:"m5e1",t:"entrega",n:"Projeto 1 do portfólio — EDA com storytelling",d:"Conclusões em texto, como relatório executivo."},
  ]},
 {n:6,fase:"f2",titulo:"Matemática para Machine Learning",h:25,
  topicos:"Álgebra linear (vetores, matrizes), derivada e gradiente, função de custo — o essencial para entender os algoritmos.",
  aula:{titulo:"Gradiente sem mistério",corpo:`
<p>Quase todo algoritmo de ML aprende do mesmo jeito: <b>errar, medir o erro e ajustar na direção que reduz o erro</b>. A matemática por trás disso cabe em três ideias:</p>
<ul>
<li><b>Vetores e matrizes</b> são só tabelas: uma linha do seu dataset é um vetor; o dataset inteiro é uma matriz. Multiplicar matrizes é aplicar a mesma conta em todas as linhas de uma vez — por isso NumPy é rápido.</li>
<li><b>Derivada</b> é inclinação: em cada ponto, ela diz se a curva sobe ou desce e com que força. Para a função de erro, a derivada aponta "para onde o erro cresce".</li>
<li><b>Gradiente descendente</b>: se a derivada aponta para onde o erro cresce, ande no sentido <b>contrário</b>, em passos pequenos (a learning rate), até chegar ao fundo do vale.</li>
</ul>
<pre><code># minimizar f(x) = (x - 3)^2  |  derivada: 2*(x - 3)
x, lr = 0.0, 0.1
for passo in range(30):
    gradiente = 2 * (x - 3)
    x = x - lr * gradiente      # anda contra o gradiente
print(round(x, 4))              # ~3.0: o mínimo</code></pre>
<p>Learning rate grande demais = pular o vale de um lado para o outro; pequena demais = levar uma eternidade. Esse trade-off aparecerá de novo no deep learning, com o mesmo remédio: experimentar.</p>
<div class="dica-box">💡 O teste prático deste módulo pede exatamente esse passo de gradiente — implemente e veja a convergência acontecer no seu print.</div>`},
  itens:[
   {id:"m6c1",t:"curso",n:"Khan Academy — Álgebra Linear",d:"Vetores, matrizes e transformações.",u:"https://pt.khanacademy.org/math/linear-algebra"},
   {id:"m6v1",t:"video",n:"3Blue1Brown — Essence of Linear Algebra",d:"Intuição visual incomparável (legendado).",u:"https://www.youtube.com/@3blue1brown/playlists",embed:"PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab"},
   {id:"m6e1",t:"entrega",n:"Notebook com regressão linear implementada do zero",d:"Comente cada passo do algoritmo."},
  ]},
 {n:7,fase:"f3",titulo:"Machine Learning — fundamentos",h:50,
  topicos:"Supervisionado × não supervisionado, regressão linear/logística, árvores, KNN, treino/validação/teste, overfitting e scikit-learn.",
  aula:{titulo:"O mapa do Machine Learning",corpo:`
<p>Machine Learning é ensinar pelo exemplo: em vez de programar regras ("se atraso &gt; 5 dias, cliente insatisfeito"), você mostra milhares de casos históricos e o algoritmo descobre as regras sozinho.</p>
<ul>
<li><b>Supervisionado</b> — há uma resposta certa no histórico (churn sim/não, preço). Divide-se em <b>classificação</b> (categorias) e <b>regressão</b> (números).</li>
<li><b>Não supervisionado</b> — sem resposta certa; o algoritmo encontra estrutura (agrupar clientes parecidos: clustering).</li>
</ul>
<p><b>A regra sagrada — treino e teste:</b> o modelo nunca pode ser avaliado nos dados em que aprendeu, ou você mede memorização, não inteligência. Guarde 20-30% dos dados escondidos para a prova final. Quando o modelo vai muito bem no treino e mal no teste, ele decorou: isso é <b>overfitting</b>, o inimigo nº 1 da área.</p>
<pre><code>from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
modelo = DecisionTreeClassifier(max_depth=4)
modelo.fit(X_tr, y_tr)                       # aprende
print(accuracy_score(y_te, modelo.predict(X_te)))  # prova final</code></pre>
<p>Esse padrão <code>fit → predict → avaliar</code> é idêntico para todos os modelos do scikit-learn — troque <code>DecisionTreeClassifier</code> por outro algoritmo e o resto do código não muda. É por isso que a biblioteca domina o mercado.</p>
<div class="dica-box">💡 Comece sempre com um modelo simples (baseline). Ele é a régua honesta para saber se os modelos sofisticados valem a complexidade.</div>`},
  itens:[
   {id:"m7c1",t:"curso",n:"Kaggle Learn — Intro to Machine Learning",d:"Primeiro modelo em poucas horas.",u:"https://www.kaggle.com/learn/intro-to-machine-learning",cert:true},
   {id:"m7c2",t:"curso",n:"Google — ML Crash Course (PT-BR)",d:"Reforço com exercícios interativos.",u:"https://developers.google.com/machine-learning/crash-course"},
   {id:"m7v1",t:"video",n:"StatQuest — Machine Learning",d:"Cada algoritmo explicado com clareza.",u:"https://www.youtube.com/@statquest/playlists",embed:"PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF"},
   {id:"m7l1",t:"livro",n:"ISLR — cap. 1 a 4 (PDF oficial gratuito)",d:"A referência mundial acessível de ML estatístico.",u:"https://www.statlearning.com"},
   {id:"m7p1",t:"pratica",n:"Competição Titanic — primeiro submit",d:"Baseline próprio primeiro; depois estude soluções alheias.",u:"https://www.kaggle.com/competitions/titanic"},
   {id:"m7e1",t:"entrega",n:"Projeto 2 do portfólio — classificação com relatório",d:"Métricas + interpretação de negócio."},
  ]},
 {n:8,fase:"f3",titulo:"ML intermediário",h:40,
  topicos:"Random Forest, Gradient Boosting (XGBoost/LightGBM), validação cruzada, tuning, pipelines e dados desbalanceados.",
  itens:[
   {id:"m8c1",t:"curso",n:"Kaggle Learn — Intermediate ML",d:"Pipelines, missing values e XGBoost.",u:"https://www.kaggle.com/learn/intermediate-machine-learning",cert:true},
   {id:"m8c2",t:"curso",n:"Andrew Ng — ML Specialization (auditar grátis)",d:"Referência mundial; certificado via auxílio financeiro.",u:"https://www.coursera.org/specializations/machine-learning-introduction"},
   {id:"m8v1",t:"video",n:"Mario Filho — ML aplicado",d:"Canal brasileiro focado em ML que funciona na prática.",u:"https://www.youtube.com/@MarioFilhoML"},
   {id:"m8p1",t:"pratica",n:"Competição House Prices — iterar e subir no ranking",d:"Documente cada iteração e o ganho de métrica.",u:"https://www.kaggle.com/competitions/house-prices-advanced-regression-techniques"},
   {id:"m8e1",t:"entrega",n:"Projeto 3 do portfólio — regressão com pipeline completo",d:"Do dado bruto à previsão, reproduzível."},
  ]},
 {n:9,fase:"f3",titulo:"Feature engineering e avaliação de modelos",h:25,
  topicos:"Criação/seleção de features, encoding, métricas (precision, recall, F1, ROC-AUC, RMSE), matriz de confusão e SHAP.",
  itens:[
   {id:"m9c1",t:"curso",n:"Kaggle Learn — Feature Engineering",d:"Transformar dados em sinal.",u:"https://www.kaggle.com/learn/feature-engineering",cert:true},
   {id:"m9c2",t:"curso",n:"Kaggle Learn — ML Explainability",d:"SHAP e interpretabilidade.",u:"https://www.kaggle.com/learn/machine-learning-explainability",cert:true},
   {id:"m9p1",t:"pratica",n:"Refatorar projetos 2 e 3 com novas features",d:"Compare métricas antes/depois."},
   {id:"m9e1",t:"entrega",n:"Relatório comparativo + SHAP",d:"▲ Marco: comece a aplicar para vagas."},
  ]},
 {n:10,fase:"f4",titulo:"Deep Learning — introdução",h:35,
  topicos:"Redes neurais, ativação, backpropagation (intuição), TensorFlow/Keras, regularização e quando usar DL × ML clássico.",
  itens:[
   {id:"m10c1",t:"curso",n:"Kaggle Learn — Intro to Deep Learning",d:"Keras na prática.",u:"https://www.kaggle.com/learn/intro-to-deep-learning",cert:true},
   {id:"m10v1",t:"video",n:"3Blue1Brown — Neural Networks",d:"A melhor intuição visual sobre redes neurais.",u:"https://www.youtube.com/@3blue1brown/playlists",embed:"PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi"},
   {id:"m10c2",t:"curso",n:"freeCodeCamp — Machine Learning with Python",d:"Com certificação gratuita (TensorFlow).",u:"https://www.freecodecamp.org/learn/machine-learning-with-python/",cert:true},
   {id:"m10e1",t:"entrega",n:"Projeto 4 — deep learning vs XGBoost",d:"Inclua a comparação DL × ML clássico."},
  ]},
 {n:11,fase:"f4",titulo:"Especialização — Séries Temporais ou NLP",h:30,
  topicos:"Séries temporais: tendência, sazonalidade, ARIMA/Prophet, previsão de demanda (sinergia com ERP). NLP: texto, embeddings, sentimento.",
  itens:[
   {id:"m11c1",t:"curso",n:"Kaggle Learn — Time Series",d:"Recomendado pelo seu perfil (ERP/vendas).",u:"https://www.kaggle.com/learn/time-series",cert:true},
   {id:"m11c2",t:"curso",n:"fast.ai — Practical Deep Learning (opcional)",d:"Se escolher visão/NLP, o melhor curso prático gratuito.",u:"https://course.fast.ai"},
   {id:"m11v1",t:"video",n:"Téo Me Why — trilhas gratuitas de dados",d:"Cursos ao vivo em português.",u:"https://www.youtube.com/@teomewhy"},
   {id:"m11p1",t:"pratica",n:"Prever vendas — competição Store Sales",d:"Ou dados públicos; nunca dados reais da empresa sem autorização.",u:"https://www.kaggle.com/competitions/store-sales-time-series-forecasting"},
   {id:"m11e1",t:"entrega",n:"Projeto 5 — previsão de demanda",d:"Explique sazonalidade e erro de previsão para leigos."},
  ]},
 {n:12,fase:"f5",titulo:"Git, deploy e MLOps básico",h:30,
  topicos:"Git/GitHub, ambientes virtuais, API com FastAPI, app com Streamlit, noções de Docker e ciclo de vida de modelos.",
  itens:[
   {id:"m12c1",t:"curso",n:"Curso em Vídeo — Git e GitHub",d:"Com certificado gratuito.",u:"https://www.cursoemvideo.com/curso/curso-de-git-e-github/",cert:true},
   {id:"m12v1",t:"video",n:"freeCodeCamp — Streamlit / FastAPI",d:"Buscar os cursos completos no canal.",u:"https://www.youtube.com/@freecodecamp"},
   {id:"m12p1",t:"pratica",n:"Publicar seu melhor modelo no Streamlit Cloud",d:"Hospedagem gratuita.",u:"https://streamlit.io/cloud"},
   {id:"m12e1",t:"entrega",n:"Projeto 6 — app web com modelo em produção",d:"Link público no README e no LinkedIn."},
  ]},
 {n:13,fase:"f5",titulo:"Portfólio, Kaggle e entrevistas",h:30,
  topicos:"GitHub e LinkedIn organizados, READMEs, storytelling dos projetos, perguntas técnicas e cases de negócio.",
  itens:[
   {id:"m13c1",t:"curso",n:"Kaggle — competições ativas",d:"Escolha 1 competição em andamento e participe.",u:"https://www.kaggle.com/competitions"},
   {id:"m13v1",t:"video",n:"Mario Filho e Téo Me Why — carreira em dados",d:"Como o mercado brasileiro avalia candidatos.",u:"https://www.youtube.com/@MarioFilhoML"},
   {id:"m13p1",t:"pratica",n:"Reescrever READMEs + 2 artigos no LinkedIn/Medium",d:"Explique como quem apresenta a um gestor."},
   {id:"m13e1",t:"entrega",n:"Portfólio: 6 projetos + perfil atualizado",d:"■ Marco: núcleo completo."},
  ]},
 {n:14,fase:"f6",titulo:"A/B testing e inferência causal",h:30,
  topicos:"Desenho de experimentos, poder estatístico, métricas de guardrail, vieses e causalidade — o que separa sênior de júnior em empresas de produto.",
  itens:[
   {id:"m14c1",t:"curso",n:"Udacity — A/B Testing by Google (gratuito)",d:"O curso clássico de experimentação.",u:"https://www.udacity.com/course/ab-testing--ud257"},
   {id:"m14l1",t:"livro",n:"Causal Inference for the Brave and True (gratuito)",d:"De Matheus Facure (autor brasileiro) — referência internacional, em Python.",u:"https://matheusfacure.github.io/python-causality-handbook/"},
   {id:"m14e1",t:"entrega",n:"Relatório de experimento A/B com recomendação",d:"Formato usado em entrevistas de empresas de produto/tech."},
  ]},
 {n:15,fase:"f6",titulo:"Cloud para dados (AWS / GCP / Azure)",h:35,
  topicos:"Conceitos de nuvem, storage, data warehouse (BigQuery), pipelines e treino/serviço de modelos na nuvem.",
  itens:[
   {id:"m15c1",t:"curso",n:"Microsoft Learn — fundamentos de dados (DP-900)",d:"Trilhas gratuitas com badges.",u:"https://learn.microsoft.com/pt-br/training/"},
   {id:"m15c2",t:"curso",n:"AWS Skill Builder — fundamentos gratuitos",d:"Base do Cloud Practitioner.",u:"https://skillbuilder.aws"},
   {id:"m15c3",t:"curso",n:"Google Cloud Skills Boost",d:"Labs práticos; use o BigQuery Sandbox (gratuito).",u:"https://www.cloudskillsboost.google"},
   {id:"m15e1",t:"entrega",n:"Projeto 7 — análise/modelo rodando na nuvem",d:"Aprofunde na nuvem mais pedida nas vagas que você mira."},
  ]},
 {n:16,fase:"f6",titulo:"MLOps e engenharia de ML",h:35,
  topicos:"Docker, MLflow (tracking/registry), orquestração, CI/CD com GitHub Actions, monitoramento e drift de modelos.",
  itens:[
   {id:"m16c1",t:"curso",n:"MLOps Zoomcamp — DataTalksClub (gratuito, com certificado)",d:"Curso completo; certificado ao concluir os projetos.",u:"https://github.com/DataTalksClub/mlops-zoomcamp",cert:true},
   {id:"m16c2",t:"curso",n:"Made With ML",d:"Boas práticas de ML em produção, gratuito.",u:"https://madewithml.com"},
   {id:"m16v1",t:"video",n:"DataTalksClub — aulas do Zoomcamp",d:"Todas as aulas ficam no canal.",u:"https://www.youtube.com/@DataTalksClub"},
   {id:"m16e1",t:"entrega",n:"Esteira completa: treino → deploy → monitoramento",d:"O repositório que impressiona em vaga internacional."},
  ]},
 {n:17,fase:"f6",titulo:"IA Generativa e LLMs",h:35,
  topicos:"Como LLMs funcionam, prompt engineering, embeddings, RAG, APIs de LLM e avaliação de aplicações de IA.",
  itens:[
   {id:"m17c1",t:"curso",n:"Hugging Face — cursos gratuitos (LLM/NLP/Agents)",d:"A plataforma central do ecossistema open source.",u:"https://huggingface.co/learn"},
   {id:"m17c2",t:"curso",n:"DeepLearning.AI — short courses gratuitos",d:"Prompt engineering, RAG, agentes; 1-2h cada.",u:"https://www.deeplearning.ai/short-courses/"},
   {id:"m17v1",t:"video",n:"Andrej Karpathy — Neural Networks: Zero to Hero",d:"Construa um GPT do zero.",u:"https://www.youtube.com/@AndrejKarpathy/playlists"},
   {id:"m17e1",t:"entrega",n:"Projeto 8 — app de RAG publicado (Streamlit)",d:"A habilidade mais demandada do mercado atual."},
  ]},
 {n:18,fase:"f6",titulo:"Inglês técnico e preparação internacional",h:30,
  topicos:"Vocabulário técnico, entrevistas em inglês, SQL/Python de entrevista, portfólio bilíngue e vagas globais remotas.",
  itens:[
   {id:"m18p1",t:"pratica",n:"Consumir as Fases 4-6 em inglês, sem legenda",d:"StatQuest, Karpathy e documentações são seu 'curso de inglês técnico'."},
   {id:"m18c1",t:"curso",n:"LeetCode — SQL 50 + Python fácil/médio",d:"Padrão de entrevista internacional (plano gratuito).",u:"https://leetcode.com/studyplan/top-sql-50/"},
   {id:"m18c2",t:"curso",n:"StrataScratch — questões reais de entrevistas",d:"Muitas questões gratuitas de empresas reais.",u:"https://www.stratascratch.com"},
   {id:"m18p2",t:"pratica",n:"Traduzir portfólio: READMEs, LinkedIn e CV em inglês",d:"Vagas remotas: LinkedIn global, Wellfound, Turing, Toptal."},
   {id:"m18e1",t:"entrega",n:"3 entrevistas simuladas em inglês + CV bilíngue",d:"Peça feedback na comunidade Data Hackers."},
  ]},
 ],
 exercicios:[
 {id:"e1",mod:1,titulo:"Par ou ímpar",
  enun:'Crie a função <code>par_ou_impar(n)</code> que recebe um número inteiro e retorna a string <code>"par"</code> ou <code>"ímpar"</code>.',
  esperado:'par_ou_impar(4) → "par"\npar_ou_impar(7) → "ímpar"\npar_ou_impar(0) → "par"',
  starter:'def par_ou_impar(n):\n    # seu código aqui\n    ...\n\n# teste você mesmo antes de verificar:\nprint(par_ou_impar(4))',
  test:'assert par_ou_impar(4)=="par", f"par_ou_impar(4) deveria ser \'par\', retornou {par_ou_impar(4)!r}"\nassert par_ou_impar(7)=="ímpar", f"par_ou_impar(7) deveria ser \'ímpar\', retornou {par_ou_impar(7)!r}"\nassert par_ou_impar(0)=="par", f"par_ou_impar(0) deveria ser \'par\' (zero é par), retornou {par_ou_impar(0)!r}"\nassert par_ou_impar(-3)=="ímpar", f"par_ou_impar(-3) deveria ser \'ímpar\', retornou {par_ou_impar(-3)!r}"',
  dica:"Use o operador % (resto da divisão): se n % 2 == 0, o número é par. Lembre que zero é par e o teste também usa número negativo.",
  gab:'def par_ou_impar(n):\n    if n % 2 == 0:\n        return "par"\n    return "ímpar"'},
 {id:"e2",mod:1,titulo:"FizzBuzz das vendas",
  enun:'Clássico de entrevista: crie <code>fizzbuzz(n)</code> que retorna uma <b>lista</b> de 1 até n onde múltiplos de 3 viram <code>"Fizz"</code>, múltiplos de 5 viram <code>"Buzz"</code>, múltiplos de ambos viram <code>"FizzBuzz"</code> e os demais ficam como número.',
  esperado:'fizzbuzz(5) → [1, 2, "Fizz", 4, "Buzz"]\nfizzbuzz(15)[14] → "FizzBuzz"',
  starter:'def fizzbuzz(n):\n    resultado = []\n    # seu código aqui\n    return resultado\n\nprint(fizzbuzz(5))',
  test:'r=fizzbuzz(15)\nassert isinstance(r,list), "A função deve retornar uma lista"\nassert len(r)==15, f"fizzbuzz(15) deve ter 15 elementos, tem {len(r)}"\nassert r[0]==1 and r[1]==2, "Números que não são múltiplos de 3 nem 5 devem ficar como inteiros"\nassert r[2]=="Fizz", f"posição 3 deveria ser \'Fizz\', veio {r[2]!r}"\nassert r[4]=="Buzz", f"posição 5 deveria ser \'Buzz\', veio {r[4]!r}"\nassert r[14]=="FizzBuzz", f"posição 15 deveria ser \'FizzBuzz\', veio {r[14]!r}"',
  dica:"Teste PRIMEIRO a condição de múltiplo de 3 E 5 (n % 15 == 0), senão 'Fizz' ou 'Buzz' capturam antes. Use range(1, n+1).",
  gab:'def fizzbuzz(n):\n    resultado = []\n    for i in range(1, n + 1):\n        if i % 15 == 0:\n            resultado.append("FizzBuzz")\n        elif i % 3 == 0:\n            resultado.append("Fizz")\n        elif i % 5 == 0:\n            resultado.append("Buzz")\n        else:\n            resultado.append(i)\n    return resultado'},
 {id:"e3",mod:1,titulo:"Média de vendas",
  enun:'Crie <code>media(valores)</code> que recebe uma lista de números e retorna a média aritmética arredondada para 2 casas decimais (use <code>round</code>). Se a lista estiver vazia, retorne <code>0</code>.',
  esperado:'media([100, 200, 250]) → 183.33\nmedia([]) → 0',
  starter:'def media(valores):\n    # seu código aqui\n    ...\n\nprint(media([100, 200, 250]))',
  test:'assert media([100,200,250])==183.33, f"media([100,200,250]) deveria ser 183.33, retornou {media([100,200,250])}"\nassert media([10])==10.0 or media([10])==10, "média de um único valor é o próprio valor"\nassert media([])==0, "lista vazia deve retornar 0 (proteja a divisão por zero!)"',
  dica:"sum(valores) / len(valores) resolve — mas proteja o caso de lista vazia ANTES de dividir, senão dá ZeroDivisionError. Isso vale para qualquer denominador na sua carreira.",
  gab:'def media(valores):\n    if len(valores) == 0:\n        return 0\n    return round(sum(valores) / len(valores), 2)'},
 {id:"e4",mod:2,titulo:"GROUP BY em Python puro",
  enun:'Você faz isso em SQL todo dia. Agora em Python: crie <code>total_por_regiao(vendas)</code> que recebe uma lista de dicionários com as chaves <code>"regiao"</code> e <code>"valor"</code> e retorna um dicionário {região: soma}.',
  esperado:'total_por_regiao([\n  {"regiao": "Sul", "valor": 100},\n  {"regiao": "Norte", "valor": 50},\n  {"regiao": "Sul", "valor": 30},\n]) → {"Sul": 130, "Norte": 50}',
  starter:'def total_por_regiao(vendas):\n    totais = {}\n    # seu código aqui\n    return totais\n\nvendas = [\n    {"regiao": "Sul", "valor": 100},\n    {"regiao": "Norte", "valor": 50},\n    {"regiao": "Sul", "valor": 30},\n]\nprint(total_por_regiao(vendas))',
  test:'v=[{"regiao":"Sul","valor":100},{"regiao":"Norte","valor":50},{"regiao":"Sul","valor":30}]\nr=total_por_regiao(v)\nassert r=={"Sul":130,"Norte":50}, f"esperado Sul=130 e Norte=50, retornou {r}"\nassert total_por_regiao([])=={}, "lista vazia deve retornar dicionário vazio"',
  dica:"Percorra a lista e use dict.get: totais[v['regiao']] = totais.get(v['regiao'], 0) + v['valor']. É o equivalente do SELECT regiao, SUM(valor) ... GROUP BY regiao.",
  gab:'def total_por_regiao(vendas):\n    totais = {}\n    for v in vendas:\n        totais[v["regiao"]] = totais.get(v["regiao"], 0) + v["valor"]\n    return totais'},
 {id:"e5",mod:2,titulo:"INNER JOIN em Python puro",
  enun:'Crie <code>juntar(clientes, pedidos)</code> que faz o equivalente a um INNER JOIN por <code>"id"</code>/<code>"id_cliente"</code>: retorna uma lista de dicionários com <code>"nome"</code> e <code>"valor"</code> de cada pedido que tem cliente correspondente.',
  esperado:'clientes = [{"id": 1, "nome": "Ana"}, {"id": 2, "nome": "Bruno"}]\npedidos = [{"id_cliente": 1, "valor": 100}, {"id_cliente": 3, "valor": 999}]\njuntar(clientes, pedidos) → [{"nome": "Ana", "valor": 100}]',
  starter:'def juntar(clientes, pedidos):\n    resultado = []\n    # dica: crie primeiro um dicionário id -> nome\n    return resultado\n\nclientes = [{"id": 1, "nome": "Ana"}, {"id": 2, "nome": "Bruno"}]\npedidos = [{"id_cliente": 1, "valor": 100}, {"id_cliente": 3, "valor": 999}]\nprint(juntar(clientes, pedidos))',
  test:'c=[{"id":1,"nome":"Ana"},{"id":2,"nome":"Bruno"}]\np=[{"id_cliente":1,"valor":100},{"id_cliente":3,"valor":999},{"id_cliente":2,"valor":40}]\nr=juntar(c,p)\nassert r==[{"nome":"Ana","valor":100},{"nome":"Bruno","valor":40}], f"esperado [Ana/100, Bruno/40] — o pedido do cliente 3 não tem cliente e deve ser descartado (INNER JOIN). Retornou {r}"',
  dica:"Monte um índice: mapa = {c['id']: c['nome'] for c in clientes}. Depois, para cada pedido, inclua no resultado apenas se pedido['id_cliente'] estiver no mapa — exatamente o comportamento do INNER JOIN (descarta o que não casa).",
  gab:'def juntar(clientes, pedidos):\n    mapa = {c["id"]: c["nome"] for c in clientes}\n    resultado = []\n    for ped in pedidos:\n        if ped["id_cliente"] in mapa:\n            resultado.append({"nome": mapa[ped["id_cliente"]], "valor": ped["valor"]})\n    return resultado'},
 {id:"e6",mod:3,titulo:"Desvio padrão amostral",
  enun:'Crie <code>desvio_padrao(amostra)</code> que calcula o desvio padrão <b>amostral</b> (divisor n−1), arredondado para 4 casas. Use apenas <code>math</code> — nada de bibliotecas prontas: o objetivo é entender a fórmula.',
  esperado:'desvio_padrao([10, 12, 23, 23, 16, 23, 21, 16]) → 5.2372',
  starter:'import math\n\ndef desvio_padrao(amostra):\n    # 1) calcule a média\n    # 2) some os quadrados das diferenças para a média\n    # 3) divida por (n - 1) e tire a raiz\n    ...\n\nprint(desvio_padrao([10, 12, 23, 23, 16, 23, 21, 16]))',
  test:'r=desvio_padrao([10,12,23,23,16,23,21,16])\nassert abs(r-5.2372)<0.001, f"esperado 5.2372 (divisor n-1, amostral). Retornou {r}. Se veio ~4.898, você usou n (populacional) em vez de n-1."\nassert abs(desvio_padrao([5,5,5])-0)<1e-9, "valores iguais têm desvio padrão 0"',
  dica:"média = sum(a)/n; soma_q = sum((x - média)**2 for x in a); resultado = math.sqrt(soma_q / (n - 1)). O erro mais comum é dividir por n — isso é o desvio populacional, não o amostral.",
  gab:'import math\n\ndef desvio_padrao(amostra):\n    n = len(amostra)\n    m = sum(amostra) / n\n    soma_q = sum((x - m) ** 2 for x in amostra)\n    return round(math.sqrt(soma_q / (n - 1)), 4)'},
 {id:"e7",mod:3,titulo:"Z-score",
  enun:'Crie <code>z_score(x, media, desvio)</code> que retorna quantos desvios padrão o valor x está da média, arredondado para 2 casas. É a base de padronização e detecção de outliers.',
  esperado:'z_score(85, 70, 10) → 1.5\nz_score(55, 70, 10) → -1.5',
  starter:'def z_score(x, media, desvio):\n    ...\n\nprint(z_score(85, 70, 10))',
  test:'assert z_score(85,70,10)==1.5, f"esperado 1.5, retornou {z_score(85,70,10)}"\nassert z_score(55,70,10)==-1.5, f"esperado -1.5, retornou {z_score(55,70,10)}"\nassert z_score(70,70,10)==0.0 or z_score(70,70,10)==0, "valor igual à média tem z-score 0"',
  dica:"z = (x − média) / desvio. Um z-score acima de 3 ou abaixo de −3 costuma indicar outlier.",
  gab:'def z_score(x, media, desvio):\n    return round((x - media) / desvio, 2)'},
 {id:"e8",mod:4,titulo:"Gráfico de barras em ASCII",
  enun:'Antes do matplotlib, o conceito: crie <code>grafico_barras(dados)</code> que recebe um dict {categoria: quantidade} e retorna uma <b>lista de strings</b> no formato <code>"Categoria: ####"</code> (um # por unidade), na ordem do dicionário.',
  esperado:'grafico_barras({"Sul": 4, "Norte": 2}) →\n["Sul: ####", "Norte: ##"]',
  starter:'def grafico_barras(dados):\n    linhas = []\n    # seu código aqui\n    return linhas\n\nfor linha in grafico_barras({"Sul": 4, "Norte": 2}):\n    print(linha)',
  test:'r=grafico_barras({"Sul":4,"Norte":2})\nassert r==["Sul: ####","Norte: ##"], f"esperado [\'Sul: ####\', \'Norte: ##\'], retornou {r}"\nassert grafico_barras({"X":0})==["X: "], "categoria com 0 deve gerar barra vazia (\'X: \')"',
  dica:'Multiplicação de string resolve: "#" * quantidade. Formate com f-string ou concatenação: f"{categoria}: " + "#" * qtd.',
  gab:'def grafico_barras(dados):\n    linhas = []\n    for categoria, qtd in dados.items():\n        linhas.append(f"{categoria}: " + "#" * qtd)\n    return linhas'},
 {id:"e9",mod:6,titulo:"Um passo de gradiente descendente",
  enun:'O coração do ML: para minimizar <code>f(x) = (x − 3)²</code>, a derivada é <code>2(x − 3)</code>. Crie <code>passo_gradiente(x, lr)</code> que retorna o novo x após um passo: <code>x − lr · gradiente</code>, arredondado para 6 casas.',
  esperado:'passo_gradiente(0, 0.1) → 0.6   (andou em direção ao mínimo x = 3)\npasso_gradiente(3, 0.1) → 3.0   (no mínimo, o gradiente é zero)',
  starter:'def passo_gradiente(x, lr):\n    ...\n\n# veja a convergência acontecendo:\nx = 0\nfor i in range(20):\n    x = passo_gradiente(x, 0.1)\nprint(x)  # deve se aproximar de 3',
  test:'assert passo_gradiente(0,0.1)==0.6, f"passo_gradiente(0, 0.1) deveria ser 0.6, retornou {passo_gradiente(0,0.1)}"\nassert passo_gradiente(3,0.1)==3.0, "no mínimo (x=3) o gradiente é 0 e x não muda"\nx=0\nfor _ in range(50): x=passo_gradiente(x,0.1)\nassert abs(x-3)<0.01, f"após 50 passos, x deveria convergir para ~3, chegou em {x}"',
  dica:"gradiente = 2 * (x - 3); novo_x = x - lr * gradiente. Se o teste de convergência falhar, confira o sinal: descemos o gradiente (subtração), não subimos.",
  gab:'def passo_gradiente(x, lr):\n    gradiente = 2 * (x - 3)\n    return round(x - lr * gradiente, 6)'},
 {id:"e10",mod:7,titulo:"Matriz de confusão e acurácia",
  enun:'Crie <code>matriz_confusao(y_true, y_pred)</code> que retorna um dict com <code>"tp"</code>, <code>"tn"</code>, <code>"fp"</code>, <code>"fn"</code> (classe positiva = 1) e <code>acuracia(y_true, y_pred)</code> arredondada para 4 casas.',
  esperado:'y_true = [1, 0, 1, 1, 0]\ny_pred = [1, 0, 0, 1, 1]\nmatriz_confusao(...) → {"tp": 2, "tn": 1, "fp": 1, "fn": 1}\nacuracia(...) → 0.6',
  starter:'def matriz_confusao(y_true, y_pred):\n    m = {"tp": 0, "tn": 0, "fp": 0, "fn": 0}\n    # percorra os pares (real, previsto) com zip\n    return m\n\ndef acuracia(y_true, y_pred):\n    ...\n\ny_true = [1, 0, 1, 1, 0]\ny_pred = [1, 0, 0, 1, 1]\nprint(matriz_confusao(y_true, y_pred))\nprint(acuracia(y_true, y_pred))',
  test:'yt=[1,0,1,1,0]; yp=[1,0,0,1,1]\nm=matriz_confusao(yt,yp)\nassert m=={"tp":2,"tn":1,"fp":1,"fn":1}, f"esperado tp=2, tn=1, fp=1, fn=1 — retornou {m}. Lembre: FP = previu 1 e era 0; FN = previu 0 e era 1."\nassert acuracia(yt,yp)==0.6, f"acurácia esperada 0.6 (3 acertos em 5), retornou {acuracia(yt,yp)}"',
  dica:"Use zip(y_true, y_pred). TP: real 1 e previsto 1. TN: 0 e 0. FP: real 0, previsto 1 (alarme falso). FN: real 1, previsto 0 (deixou passar). Acurácia = (tp + tn) / total.",
  gab:'def matriz_confusao(y_true, y_pred):\n    m = {"tp": 0, "tn": 0, "fp": 0, "fn": 0}\n    for real, prev in zip(y_true, y_pred):\n        if real == 1 and prev == 1: m["tp"] += 1\n        elif real == 0 and prev == 0: m["tn"] += 1\n        elif real == 0 and prev == 1: m["fp"] += 1\n        else: m["fn"] += 1\n    return m\n\ndef acuracia(y_true, y_pred):\n    acertos = sum(1 for r, p in zip(y_true, y_pred) if r == p)\n    return round(acertos / len(y_true), 4)'},
 {id:"e11",mod:7,titulo:"Train/test split manual",
  enun:'Crie <code>dividir_treino_teste(dados, frac_treino)</code> que devolve uma tupla <code>(treino, teste)</code>: os primeiros <code>int(len · frac)</code> elementos vão para treino, o restante para teste. (Na prática se embaralha antes — aqui o foco é a mecânica da divisão.)',
  esperado:'dividir_treino_teste([1,2,3,4,5,6,7,8,9,10], 0.8) → ([1..8], [9, 10])',
  starter:'def dividir_treino_teste(dados, frac_treino):\n    # dica: fatiamento de listas resolve em 2 linhas\n    ...\n\nprint(dividir_treino_teste(list(range(1, 11)), 0.8))',
  test:'tr,te=dividir_treino_teste(list(range(1,11)),0.8)\nassert tr==[1,2,3,4,5,6,7,8], f"treino esperado [1..8], veio {tr}"\nassert te==[9,10], f"teste esperado [9, 10], veio {te}"\ntr,te=dividir_treino_teste([1,2,3],0.5)\nassert len(tr)==1 and len(te)==2, "com frac 0.5 e 3 itens, int(1.5)=1 vai para treino"',
  dica:"corte = int(len(dados) * frac_treino); return dados[:corte], dados[corte:]. Nunca avalie um modelo nos dados de treino — é por isso que essa divisão existe.",
  gab:'def dividir_treino_teste(dados, frac_treino):\n    corte = int(len(dados) * frac_treino)\n    return dados[:corte], dados[corte:]'},
 {id:"e12",mod:8,titulo:"Normalização min-max",
  enun:'Crie <code>normalizar(valores)</code> que aplica min-max scaling: cada valor vira <code>(x − mín) / (máx − mín)</code>, arredondado para 4 casas. Se todos os valores forem iguais, retorne uma lista de zeros (proteja a divisão!).',
  esperado:'normalizar([10, 20, 30]) → [0.0, 0.5, 1.0]\nnormalizar([5, 5]) → [0, 0]',
  starter:'def normalizar(valores):\n    ...\n\nprint(normalizar([10, 20, 30]))',
  test:'assert normalizar([10,20,30])==[0.0,0.5,1.0], f"esperado [0.0, 0.5, 1.0], retornou {normalizar([10,20,30])}"\nassert normalizar([5,5])==[0,0] or normalizar([5,5])==[0.0,0.0], "valores iguais: retorne zeros (evite dividir por zero)"',
  dica:"mn, mx = min(valores), max(valores). Se mx == mn, retorne [0] * len(valores). Senão, list comprehension: [round((x - mn) / (mx - mn), 4) for x in valores].",
  gab:'def normalizar(valores):\n    mn, mx = min(valores), max(valores)\n    if mx == mn:\n        return [0] * len(valores)\n    return [round((x - mn) / (mx - mn), 4) for x in valores]'},
 {id:"e13",mod:9,titulo:"Precision, recall e F1",
  enun:'Crie <code>f1_score(tp, fp, fn)</code>: precision = tp/(tp+fp), recall = tp/(tp+fn), F1 = média harmônica <code>2·P·R/(P+R)</code>, arredondado para 4 casas. Se qualquer denominador for zero, retorne <code>0</code>.',
  esperado:'f1_score(8, 2, 4) → 0.7273   (P = 0.8, R ≈ 0.667)\nf1_score(0, 0, 5) → 0',
  starter:'def f1_score(tp, fp, fn):\n    ...\n\nprint(f1_score(8, 2, 4))',
  test:'assert f1_score(8,2,4)==0.7273, f"esperado 0.7273, retornou {f1_score(8,2,4)}"\nassert f1_score(0,0,5)==0, "sem nenhum TP, F1 é 0 (e cuidado com divisão por zero)"\nassert f1_score(10,0,0)==1.0, "modelo perfeito: F1 = 1.0"',
  dica:"Proteja cada divisão: se (tp+fp)==0 ou (tp+fn)==0, retorne 0; se (P+R)==0, retorne 0. Em dados desbalanceados (fraude, churn), F1 diz muito mais que acurácia — tema certo de entrevista.",
  gab:'def f1_score(tp, fp, fn):\n    if (tp + fp) == 0 or (tp + fn) == 0:\n        return 0\n    p = tp / (tp + fp)\n    r = tp / (tp + fn)\n    if (p + r) == 0:\n        return 0\n    return round(2 * p * r / (p + r), 4)'},
 {id:"e14",mod:11,titulo:"Média móvel (séries temporais)",
  enun:'Crie <code>media_movel(serie, janela)</code> que retorna a lista de médias móveis (arredondadas para 2 casas). O resultado tem <code>len(serie) − janela + 1</code> elementos. É a primeira ferramenta de suavização de qualquer previsão de demanda.',
  esperado:'media_movel([10, 20, 30, 40, 50], 3) → [20.0, 30.0, 40.0]',
  starter:'def media_movel(serie, janela):\n    resultado = []\n    # dica: fatie a lista com serie[i:i+janela]\n    return resultado\n\nprint(media_movel([10, 20, 30, 40, 50], 3))',
  test:'assert media_movel([10,20,30,40,50],3)==[20.0,30.0,40.0], f"esperado [20.0, 30.0, 40.0], retornou {media_movel([10,20,30,40,50],3)}"\nassert media_movel([1,2],2)==[1.5], f"esperado [1.5], retornou {media_movel([1,2],2)}"',
  dica:"for i in range(len(serie) - janela + 1): fatia = serie[i:i+janela]; adicione round(sum(fatia)/janela, 2). O erro comum é o limite do range — confira o +1.",
  gab:'def media_movel(serie, janela):\n    resultado = []\n    for i in range(len(serie) - janela + 1):\n        fatia = serie[i:i + janela]\n        resultado.append(round(sum(fatia) / janela, 2))\n    return resultado'},
 {id:"e15",mod:14,titulo:"Lift de um teste A/B",
  enun:'Crie <code>lift(conv_a, tot_a, conv_b, tot_b)</code> que calcula as taxas de conversão dos grupos A (controle) e B (variante) e retorna o lift percentual de B sobre A: <code>(taxa_b / taxa_a − 1) · 100</code>, arredondado para 2 casas.',
  esperado:'lift(50, 1000, 65, 1000) → 30.0   (5% → 6,5% = +30%)',
  starter:'def lift(conv_a, tot_a, conv_b, tot_b):\n    ...\n\nprint(lift(50, 1000, 65, 1000))',
  test:'assert lift(50,1000,65,1000)==30.0, f"esperado 30.0, retornou {lift(50,1000,65,1000)}"\nassert lift(100,1000,90,1000)==-10.0, f"variante pior deve dar lift negativo (-10.0), retornou {lift(100,1000,90,1000)}"',
  dica:"taxa_a = conv_a / tot_a; taxa_b = conv_b / tot_b; lift = (taxa_b / taxa_a - 1) * 100. Atenção: lift positivo NÃO prova significância estatística — é isso que o módulo de A/B ensina a testar.",
  gab:'def lift(conv_a, tot_a, conv_b, tot_b):\n    taxa_a = conv_a / tot_a\n    taxa_b = conv_b / tot_b\n    return round((taxa_b / taxa_a - 1) * 100, 2)'},
 {id:"e16",mod:17,titulo:"Bag of words (base de NLP/LLM)",
  enun:'Crie <code>bag_of_words(texto)</code> que retorna um dict com a contagem de cada palavra: converta para minúsculas, separe por espaços e remova a pontuação <code>.,!?</code> das bordas de cada palavra (use <code>strip</code>).',
  esperado:'bag_of_words("O dado é o novo petróleo. Dado!") →\n{"o": 2, "dado": 2, "é": 1, "novo": 1, "petróleo": 1}',
  starter:'def bag_of_words(texto):\n    contagem = {}\n    # minúsculas -> split -> strip(".,!?") -> contar\n    return contagem\n\nprint(bag_of_words("O dado é o novo petróleo. Dado!"))',
  test:'r=bag_of_words("O dado é o novo petróleo. Dado!")\nassert r=={"o":2,"dado":2,"é":1,"novo":1,"petróleo":1}, f"esperado o:2, dado:2, é:1, novo:1, petróleo:1 — retornou {r}. Confira minúsculas e o strip da pontuação."\nassert bag_of_words("")=={}, "texto vazio retorna dict vazio"',
  dica:'para cada p in texto.lower().split(): p = p.strip(".,!?"); se p não for vazio, contagem[p] = contagem.get(p, 0) + 1. Vetorizar texto em números é o primeiro passo de todo modelo de linguagem.',
  gab:'def bag_of_words(texto):\n    contagem = {}\n    for p in texto.lower().split():\n        p = p.strip(".,!?")\n        if p:\n            contagem[p] = contagem.get(p, 0) + 1\n    return contagem'},
 ]
},
{
 id:"eng", nome:"Engenharia de Dados", icon:"box", c1:"#0E7C7B", c2:"#3B7DD8",
 desc:"O caminho dos pipelines: SQL avançado, Docker, orquestração, data warehouse, dbt e Spark. Núcleo inicial — aulas nativas e testes serão adicionados nas próximas versões.",
 fases:[
  {id:"e1",cor:"var(--f1)",corB:"var(--f1b)",tag:"Núcleo",nome:"Fundamentos de Engenharia",icon:"box"},
 ],
 milestones:null,
 modulos:[
 {n:1,fase:"e1",titulo:"SQL avançado e modelagem",h:30,
  topicos:"Window functions, CTEs, índices e planos de execução, modelagem dimensional (fato/dimensão) — o degrau acima do SQL de rotina.",
  itens:[
   {id:"g1c1",t:"curso",n:"Modo SQL Tutorial — seções intermediária e avançada",d:"Tutorial gratuito e direto ao ponto.",u:"https://mode.com/sql-tutorial"},
   {id:"g1p1",t:"pratica",n:"LeetCode SQL 50 — resolver as 50 questões",d:"Padrão de entrevista.",u:"https://leetcode.com/studyplan/top-sql-50/"},
   {id:"g1e1",t:"entrega",n:"Modelo dimensional (estrela) de um processo do ERP, documentado",d:"Diagrama + justificativa das decisões."},
  ]},
 {n:2,fase:"e1",titulo:"Python para engenharia de dados",h:25,
  topicos:"Scripts robustos: funções, logging, tratamento de erros, leitura/escrita de arquivos e APIs (requests).",
  itens:[
   {id:"g2c1",t:"curso",n:"Data Engineering Zoomcamp — Módulo 1 (DataTalksClub)",d:"Gratuito, com certificado ao concluir o curso.",u:"https://github.com/DataTalksClub/data-engineering-zoomcamp",cert:true},
   {id:"g2v1",t:"video",n:"DataTalksClub — aulas no canal",d:"Playlists do Zoomcamp.",u:"https://www.youtube.com/@DataTalksClub"},
   {id:"g2e1",t:"entrega",n:"Script de ingestão: baixa um CSV público e grava em banco",d:"Com logging e tratamento de erro."},
  ]},
 {n:3,fase:"e1",titulo:"Linux, Docker e Git",h:25,
  topicos:"Terminal, containers, docker-compose e versionamento — o ambiente padrão de qualquer time de dados.",
  itens:[
   {id:"g3c1",t:"curso",n:"Curso em Vídeo — Git e GitHub",d:"Com certificado gratuito.",u:"https://www.cursoemvideo.com/curso/curso-de-git-e-github/",cert:true},
   {id:"g3c2",t:"curso",n:"Docker — Get Started (documentação oficial)",d:"O tutorial oficial é excelente.",u:"https://docs.docker.com/get-started/"},
   {id:"g3e1",t:"entrega",n:"Postgres + pgAdmin rodando via docker-compose",d:"Repositório com o compose e README."},
  ]},
 {n:4,fase:"e1",titulo:"Orquestração de pipelines (Airflow)",h:30,
  topicos:"DAGs, agendamento, dependências, retries e monitoramento de pipelines.",
  itens:[
   {id:"g4c1",t:"curso",n:"Data Engineering Zoomcamp — módulo de orquestração",d:"Gratuito, hands-on.",u:"https://github.com/DataTalksClub/data-engineering-zoomcamp"},
   {id:"g4c2",t:"curso",n:"Apache Airflow — documentação e tutorial oficial",d:"Conceitos e primeiro DAG.",u:"https://airflow.apache.org/docs/"},
   {id:"g4e1",t:"entrega",n:"DAG diário: extrai dados de API pública e carrega no banco",d:"Com retry e alerta de falha."},
  ]},
 {n:5,fase:"e1",titulo:"Data Warehouse e dbt",h:35,
  topicos:"BigQuery (sandbox gratuito), particionamento, custos, e transformações versionadas com dbt (staging → marts, testes de dados).",
  itens:[
   {id:"g5c1",t:"curso",n:"dbt Fundamentals (dbt Learn — gratuito, com badge)",d:"O curso oficial.",u:"https://learn.getdbt.com"},
   {id:"g5c2",t:"curso",n:"BigQuery Sandbox — comece sem cartão",d:"Warehouse gratuito para estudar.",u:"https://cloud.google.com/bigquery/docs/sandbox"},
   {id:"g5e1",t:"entrega",n:"Projeto dbt: staging + 2 marts + testes de dados",d:"Sobre um dataset público no BigQuery."},
  ]},
 {n:6,fase:"e1",titulo:"Spark e processamento em larga escala",h:40,
  topicos:"RDD vs DataFrame, transformações preguiçosas, particionamento e quando (não) usar Spark.",
  itens:[
   {id:"g6c1",t:"curso",n:"Data Engineering Zoomcamp — módulo de batch (Spark)",d:"Gratuito, hands-on.",u:"https://github.com/DataTalksClub/data-engineering-zoomcamp"},
   {id:"g6c2",t:"curso",n:"PySpark — guia oficial de início rápido",d:"Documentação da Apache.",u:"https://spark.apache.org/docs/latest/api/python/getting_started/index.html"},
   {id:"g6e1",t:"entrega",n:"Job PySpark que agrega um dataset grande e salva em parquet",d:"Compare o tempo com Pandas e explique a diferença."},
  ]},
 ],
 exercicios:[]
}
];
