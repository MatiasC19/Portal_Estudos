/* =====================================================================
   StudyHub — aulas nativas adicionais (leitura no portal)
   Ciência de Dados: módulos 8 a 18 · Engenharia de Dados: módulos 1 a 6
   Este arquivo injeta o campo `aula` nos módulos definidos em js/data.js.
   ===================================================================== */

(function(){
const AULAS={
ds:{
8:{titulo:"Florestas e boosting — o estado da arte em dados tabulares",corpo:`
<p>Uma árvore de decisão sozinha decora os dados. A solução do mercado: <b>combinar centenas de árvores fracas</b> em um comitê forte. Há duas famílias:</p>
<ul>
<li><b>Bagging (Random Forest):</b> treina árvores em amostras aleatórias diferentes e tira a média. Reduz variância; robusto e quase sem tuning — ótimo primeiro modelo sério.</li>
<li><b>Boosting (XGBoost, LightGBM):</b> treina árvores em sequência, cada uma corrigindo os erros da anterior. É o que vence competições tabulares há uma década.</li>
</ul>
<p><b>Validação cruzada</b> é o upgrade do train/test: divida em 5 partes, treine em 4 e teste na quinta, girando 5 vezes. A média das 5 notas é uma estimativa muito mais estável — e o desvio entre elas denuncia modelo instável.</p>
<pre><code>from sklearn.model_selection import cross_val_score
from sklearn.ensemble import RandomForestClassifier

modelo = RandomForestClassifier(n_estimators=300, random_state=42)
notas = cross_val_score(modelo, X, y, cv=5, scoring="f1")
print(notas.mean().round(3), "+/-", notas.std().round(3))</code></pre>
<p><b>Pipelines</b> (<code>sklearn.pipeline.Pipeline</code>) amarram pré-processamento + modelo num objeto só: o que for aprendido no treino (médias para imputação, escalas) é aplicado ao teste sem vazamento. Em entrevista, citar pipeline é sinal de quem já produziu de verdade.</p>
<div class="dica-box">💡 Ordem de tuning que rende mais em boosting: número de árvores + learning rate primeiro; profundidade depois; o resto é ajuste fino.</div>`},
9:{titulo:"O dado certo vale mais que o modelo",corpo:`
<p>Trocar de algoritmo costuma render 1-2% de melhora; <b>criar a feature certa rende 10%</b>. Feature engineering é traduzir conhecimento de negócio em colunas que o modelo entende:</p>
<ul>
<li><b>Datas:</b> dia da semana, mês, é feriado?, dias desde a última compra.</li>
<li><b>Agregações:</b> média de gasto do cliente, nº de pedidos nos últimos 90 dias.</li>
<li><b>Razões:</b> preço do item ÷ preço médio da categoria.</li>
<li><b>Encoding de categóricas:</b> one-hot para poucas categorias; target/frequency encoding para muitas.</li>
</ul>
<p><b>O pecado capital — vazamento (leakage):</b> usar no treino uma informação que não existiria na hora da previsão real (ex.: prever cancelamento usando a "data do cancelamento"). O sintoma é um modelo bom demais para ser verdade. Sempre pergunte: "essa coluna existia no momento da decisão?"</p>
<p><b>Métrica é decisão de negócio, não de estatística:</b> fraude (achar todos os positivos) pede <i>recall</i>; spam (não acusar inocentes) pede <i>precision</i>; equilíbrio pede F1; ranking pede ROC-AUC. Acurácia engana em dados desbalanceados — 99% de acurácia prevendo "nunca é fraude" é um modelo inútil.</p>
<div class="dica-box">💡 SHAP responde "por que o modelo previu isso?" por indivíduo — e é o que o gestor (e o regulador) quer ouvir. Aprender a ler um gráfico SHAP vale uma entrevista inteira.</div>`},
10:{titulo:"Neurônios, camadas e quando o deep learning compensa",corpo:`
<p>Uma rede neural é uma pilha de regressões com uma torção: entre uma camada e outra existe uma <b>função de ativação</b> não linear (ReLU: negativo vira zero). Sem ela, mil camadas equivalem a uma regressão linear; com ela, a rede aproxima qualquer função.</p>
<ul>
<li><b>Forward pass:</b> os dados atravessam as camadas e viram uma previsão.</li>
<li><b>Loss:</b> mede o quão errada foi a previsão.</li>
<li><b>Backpropagation:</b> a regra da cadeia distribui a culpa do erro para cada peso; o gradiente descendente (módulo 6!) ajusta cada um. Repita por várias épocas.</li>
</ul>
<pre><code>import tensorflow as tf
modelo = tf.keras.Sequential([
    tf.keras.layers.Dense(64, activation="relu"),
    tf.keras.layers.Dense(32, activation="relu"),
    tf.keras.layers.Dense(1, activation="sigmoid"),
])
modelo.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])
modelo.fit(X_tr, y_tr, epochs=20, validation_split=0.2)</code></pre>
<p><b>Honestidade que impressiona em entrevista:</b> para dados tabulares (planilhas, ERP), XGBoost costuma empatar ou vencer redes neurais com muito menos custo. Deep learning brilha em <b>imagem, texto e áudio</b> — dados sem colunas prontas. Saber quando NÃO usar DL é maturidade.</p>
<div class="dica-box">💡 Overfitting em redes se combate com dropout, early stopping e mais dados — nessa ordem de simplicidade.</div>`},
11:{titulo:"Prevendo o futuro com humildade — séries temporais",corpo:`
<p>Série temporal é qualquer métrica com carimbo de tempo: vendas diárias, estoque, inadimplência mensal. Ela se decompõe em três forças:</p>
<ul>
<li><b>Tendência</b> — direção de longo prazo;</li>
<li><b>Sazonalidade</b> — padrões que se repetem (dezembro, dia 5, sexta-feira);</li>
<li><b>Ruído</b> — o resto, imprevisível por definição.</li>
</ul>
<p><b>Regra de ouro nº 1 — nunca embaralhe o tempo:</b> validar previsão exige treinar no passado e testar no futuro (ex.: treinar até junho, prever julho). Usar train_test_split aleatório aqui é vazamento clássico — o modelo "vê o futuro".</p>
<p><b>Regra de ouro nº 2 — respeite o baseline ingênuo:</b> "amanhã = hoje" ou "este mês = mesmo mês do ano passado" são previsões surpreendentemente difíceis de bater. Se seu ARIMA/Prophet/LightGBM não vence o ingênuo, ele não merece produção.</p>
<pre><code># baseline sazonal: prever o mesmo mês do ano anterior
previsao = serie.shift(12)
erro = (serie - previsao).abs().mean()   # MAE do baseline</code></pre>
<p>Com seu histórico de ERP, previsão de demanda é o projeto com a maior chance de virar resultado financeiro visível — estoque parado e ruptura são dores que todo gestor entende.</p>
<div class="dica-box">💡 Reporte o erro em unidades de negócio ("erramos em média 12 unidades/dia, 8% da venda média"), nunca só "MAE = 12".</div>`},
12:{titulo:"Do notebook ao produto",corpo:`
<p>Modelo em notebook é estudo; modelo acessível por outras pessoas é produto. O caminho mínimo:</p>
<ul>
<li><b>Git/GitHub</b> — o fluxo diário se resume a: <code>git add .</code> → <code>git commit -m "mensagem clara"</code> → <code>git push</code>. Commits pequenos e frequentes contam a história do projeto (recrutador olha isso).</li>
<li><b>Ambiente reproduzível</b> — <code>python -m venv .venv</code> + <code>requirements.txt</code>. "Na minha máquina funciona" não existe em produção.</li>
<li><b>Streamlit</b> — transforma um script em app web: <code>st.title</code>, <code>st.slider</code>, <code>st.write(previsao)</code>. Deploy gratuito no Streamlit Cloud em minutos. Ideal para demonstrar a um humano.</li>
<li><b>FastAPI</b> — expõe o modelo como API JSON para outros sistemas consumirem. Ideal para integrar com o ERP.</li>
</ul>
<pre><code># app.py — modelo virando aplicação em 8 linhas
import streamlit as st, joblib
modelo = joblib.load("modelo.pkl")
st.title("Previsão de demanda")
qtd = st.slider("Vendas na última semana", 0, 500, 100)
if st.button("Prever"):
    st.metric("Previsão para a próxima semana", int(modelo.predict([[qtd]])[0]))</code></pre>
<p><b>Docker em uma frase:</b> uma caixa que empacota seu código + dependências + sistema, rodando igual em qualquer máquina. Você só precisa da noção agora; o aprofundamento vem no módulo de MLOps.</p>
<div class="dica-box">💡 Um único link público de app funcionando vale mais no LinkedIn do que dez certificados listados.</div>`},
13:{titulo:"Contando a história dos seus projetos",corpo:`
<p>Recrutadores gastam ~30 segundos no seu GitHub. O que eles precisam encontrar nesse tempo:</p>
<ul>
<li><b>README com estrutura fixa:</b> problema de negócio (1 parágrafo) → dados → abordagem → <b>resultado com número</b> → como rodar. Uma imagem do gráfico principal no topo.</li>
<li><b>6 repositórios afiados</b> valem mais que 30 abandonados. Arquive o resto.</li>
<li><b>Storytelling</b> — a fórmula que funciona em entrevista e em post: contexto ("estoque parado custava X") → ação ("modelei a demanda com...") → resultado ("erro 23% menor que o método atual") → aprendizado.</li>
</ul>
<p><b>Nas entrevistas técnicas caem sempre:</b> explicar precision × recall com exemplo de negócio; por que dividir treino/teste; o que é overfitting e como evitar; um case aberto ("como você preveria churn aqui?"). Para o case, pense em voz alta na ordem: qual decisão o modelo apoia? → quais dados existem? → baseline simples → métrica de sucesso → riscos.</p>
<p><b>LinkedIn:</b> título com as palavras que o recrutador busca ("Analista de Dados | Python, SQL, Machine Learning"), e 2 artigos curtos explicando seus projetos — escrever sobre o que aprendeu é o marketing mais barato que existe.</p>
<div class="dica-box">💡 Grave-se apresentando cada projeto em 3 minutos. Se não couber em 3 minutos, você ainda não entendeu o próprio projeto — e a entrevista vai revelar isso.</div>`},
14:{titulo:"Experimentos que provam causa (e não só correlação)",corpo:`
<p>Dashboards mostram que quem usa o recurso X compra mais. Mas quem usa X talvez já fosse cliente engajado — <b>correlação não é causa</b>. O A/B test resolve com uma ideia simples e poderosa: <b>aleatorização</b>. Sorteando quem vê a variante, os dois grupos ficam estatisticamente idênticos em tudo — exceto na mudança. Qualquer diferença de resultado só pode vir dela.</p>
<p><b>O desenho de um experimento sério, antes de olhar qualquer dado:</b></p>
<ul>
<li><b>Métrica primária</b> (uma só!) e o efeito mínimo que interessa detectar;</li>
<li><b>Tamanho da amostra e duração</b> calculados a partir disso (poder estatístico ≈ 80%);</li>
<li><b>Métricas de guardrail</b> — o que não pode piorar (latência, cancelamentos, reclamações).</li>
</ul>
<p><b>Os três pecados que invalidam experimentos reais:</b> espiar o resultado todo dia e parar quando "deu significativo" (peeking — infla falsos positivos); testar 20 métricas e comemorar a única que passou; e encerrar antes de completar ciclos de negócio inteiros (semana cheia, fechamento de mês).</p>
<p>Quando não dá para sortear (mudança de preço para todo mundo, por exemplo), entra a <b>inferência causal</b> — grupos de controle sintéticos, diferenças-em-diferenças — o tema do livro do Matheus Facure indicado neste módulo.</p>
<div class="dica-box">💡 Frase de sênior em entrevista: "antes do teste eu registro hipótese, métrica primária e duração — depois disso, o resultado é o que for". Pré-registro separa ciência de torcida.</div>`},
15:{titulo:"A nuvem para quem trabalha com dados",corpo:`
<p>Nuvem é alugar computação e armazenamento por minuto em vez de comprar servidor. Para dados, quatro peças resolvem quase tudo:</p>
<ul>
<li><b>Object storage</b> (S3, GCS, Blob) — o HD infinito onde ficam arquivos brutos (CSV, parquet). Centavos por GB.</li>
<li><b>Data warehouse</b> (BigQuery, Redshift, Synapse) — banco colunar feito para consultas analíticas em bilhões de linhas. Você paga pelo que a consulta lê.</li>
<li><b>Computação</b> (VMs, functions) — onde scripts e treinos rodam.</li>
<li><b>Serviços de ML</b> (SageMaker, Vertex) — treino e deploy gerenciados.</li>
</ul>
<p><b>O padrão moderno é ELT:</b> extrair → carregar cru no warehouse → transformar lá dentro com SQL. O warehouse virou o centro de gravidade da análise — e seu SQL de anos de ERP vale ouro aqui.</p>
<p><b>Custos, a lição que dói:</b> o warehouse cobra por dados <i>lidos</i>. <code>SELECT *</code> numa tabela de 2 TB custa dinheiro de verdade; selecionar 3 colunas de uma tabela particionada por data custa centavos. Particionamento e seleção de colunas são as duas alavancas.</p>
<div class="dica-box">💡 Comece pelo BigQuery Sandbox: gratuito, sem cartão de crédito, com datasets públicos gigantes para praticar. Depois espelhe o aprendizado na nuvem mais pedida nas vagas que você mira.</div>`},
16:{titulo:"Modelos vivem em produção (ou morrem no notebook)",corpo:`
<p>MLOps é aplicar disciplina de engenharia ao ciclo de vida do modelo. O problema que ele resolve: modelos <b>apodrecem</b>. O mundo muda (preços, comportamento, mix de produtos), os dados mudam com ele, e a acurácia que era 90% no deploy vira 70% seis meses depois — em silêncio. Isso é <b>drift</b>.</p>
<p>O ciclo completo tem quatro estações:</p>
<ul>
<li><b>Rastrear</b> — cada treino registrado com parâmetros, métricas e artefatos (MLflow). Responde "qual modelo está no ar e por quê?"</li>
<li><b>Empacotar</b> — Docker congela código + dependências; roda igual no seu PC e no servidor.</li>
<li><b>Automatizar</b> — CI/CD (GitHub Actions): a cada push, testes rodam e o deploy acontece sem passos manuais. Menos heroísmo, menos erro.</li>
<li><b>Monitorar</b> — comparar a distribuição dos dados de entrada de hoje com a do treino; alarme quando desviar. Re-treinar vira rotina, não emergência.</li>
</ul>
<pre><code>import mlflow
with mlflow.start_run():
    mlflow.log_param("n_estimators", 300)
    mlflow.log_metric("f1", 0.87)
    mlflow.sklearn.log_model(modelo, "modelo")</code></pre>
<p>O MLOps Zoomcamp monta essa esteira inteira, de graça e com certificado — e o repositório final é exatamente o que vagas internacionais pedem para ver.</p>
<div class="dica-box">💡 Pergunta que separa candidatos: "e quando o modelo degradar?" Quem responde com monitoramento + re-treino automatizado já pensou além do notebook.</div>`},
17:{titulo:"Como um LLM realmente funciona (sem mágica)",corpo:`
<p>Um modelo de linguagem faz uma única coisa, bilhões de vezes: <b>prever o próximo token</b> (pedaço de palavra) dado tudo que veio antes. Treinado em trilhões de tokens, esse objetivo simples força o modelo a comprimir gramática, fatos e padrões de raciocínio nos seus pesos. Gerar texto é prever, anexar, repetir.</p>
<ul>
<li><b>Tokens:</b> "previsão de demanda" vira algo como ["prev","isão"," de"," dem","anda"]. Modelos cobram e limitam por token.</li>
<li><b>Embeddings:</b> cada texto vira um vetor de números onde proximidade = similaridade de significado. É o que permite buscar por sentido, não por palavra exata.</li>
<li><b>Temperatura:</b> baixa = respostas determinísticas; alta = criativas. Para dados, quase sempre baixa.</li>
</ul>
<p><b>RAG (Retrieval-Augmented Generation)</b> é a arquitetura mais demandada do mercado: em vez de esperar que o modelo "saiba" sobre seus documentos, você (1) quebra os documentos em trechos, (2) gera embeddings e guarda num índice, (3) na pergunta, busca os trechos mais similares e (4) entrega ao LLM como contexto: "responda usando isto". Resultado: respostas fundamentadas nos SEUS dados, com fonte citada e menos alucinação.</p>
<p><b>Prompts que funcionam</b> têm papel ("você é um analista..."), contexto, tarefa específica e formato de saída definido. Trate prompt como código: versione e teste.</p>
<div class="dica-box">💡 O projeto 8 (app de RAG sobre documentos) une tudo: embeddings, busca, prompt e deploy — e é a demonstração mais convincente de habilidade prática em IA hoje.</div>`},
18:{titulo:"Inglês técnico como ferramenta de trabalho",corpo:`
<p>Fluência para o mercado de dados não é sotaque perfeito — é <b>trabalhar em inglês</b>: ler documentação sem tradutor, entender uma daily, explicar um projeto. E a boa notícia: o inglês técnico é um subconjunto pequeno e repetitivo do idioma. Você o adquire por imersão dirigida:</p>
<ul>
<li><b>Fases 4-6 desta trilha em inglês, sem legenda.</b> StatQuest e Karpathy falam claro e pausado; a documentação do scikit-learn é seu livro-texto. Ao final, você terá centenas de horas de imersão sem ter "estudado inglês" um dia.</li>
<li><b>Vocabulário que cai em entrevista:</b> accuracy/precision/recall trade-off, overfitting, feature engineering, pipeline, deploy, stakeholder, insight, driver, forecast. Monte um glossário pessoal com frases inteiras, não palavras soltas.</li>
<li><b>Entrevista comportamental = método STAR:</b> Situation, Task, Action, Result. Prepare 5 histórias suas nesse formato, escreva, grave-se contando. As perguntas variam; suas histórias, não.</li>
</ul>
<p><b>Portfólio bilíngue:</b> READMEs com seção em inglês primeiro, LinkedIn com headline e about em inglês, CV de uma página no padrão internacional (resultado com números, sem foto). Vagas remotas: LinkedIn global, Wellfound e comunidades como Data Hackers, onde também se consegue entrevista simulada com feedback.</p>
<div class="dica-box">💡 Métrica honesta de prontidão: assistir a um vídeo técnico novo em velocidade 1x, sem legenda, e conseguir resumi-lo em inglês em 5 frases. Quando isso ficar confortável, aplique para vagas internacionais — antes de se sentir "pronto".</div>`},
},
eng:{
1:{titulo:"SQL avançado — o degrau acima da rotina",corpo:`
<p>O SQL do dia a dia resolve relatórios; o SQL de engenharia resolve <b>pipelines</b>. Três ferramentas fazem a diferença:</p>
<ul>
<li><b>Window functions</b> — cálculos "por grupo, sem agrupar": ranking, acumulado, valor anterior. <code>ROW_NUMBER() OVER (PARTITION BY cliente ORDER BY data DESC)</code> pega o último pedido de cada cliente em uma linha de código — sem subquery tortuosa.</li>
<li><b>CTEs</b> (<code>WITH etapa AS (...)</code>) — quebram uma consulta gigante em passos nomeados e legíveis. Consulta legível é consulta que outro engenheiro consegue manter.</li>
<li><b>Índices e planos de execução</b> — <code>EXPLAIN</code> mostra o caminho que o banco escolheu. Índice certo transforma minutos em milissegundos; índice errado só deixa o INSERT lento.</li>
</ul>
<pre><code>WITH ultimo_pedido AS (
  SELECT *, ROW_NUMBER() OVER (
    PARTITION BY cliente_id ORDER BY data DESC) AS rn
  FROM pedidos
)
SELECT cliente_id, valor FROM ultimo_pedido WHERE rn = 1;</code></pre>
<p><b>Modelagem dimensional</b> é a planta-baixa do analytics: tabelas <b>fato</b> (eventos com números: vendas, pagamentos) cercadas por <b>dimensões</b> (quem, o quê, quando, onde). O formato estrela existe para que analistas façam JOIN simples e rápido — desenhe a estrela de um processo do seu ERP e você nunca mais esquecerá o conceito.</p>
<div class="dica-box">💡 Em entrevistas de engenharia, window functions são O filtro técnico de SQL. As 50 questões do LeetCode SQL cobrem exatamente esse repertório.</div>`},
2:{titulo:"Python de engenharia — scripts que não quebram às 3h da manhã",corpo:`
<p>O Python do notebook explora; o Python de engenharia <b>roda sozinho, todo dia, sem ninguém olhando</b>. A diferença está em quatro hábitos:</p>
<ul>
<li><b>Logging em vez de print:</b> <code>logging.info("carregadas %s linhas", n)</code> gera registro com hora e nível — quando o job falhar de madrugada, o log conta o que aconteceu.</li>
<li><b>Erros tratados com intenção:</b> <code>try/except</code> nas fronteiras (rede, disco, API), registrando o erro e decidindo: tentar de novo, pular ou abortar. Silenciar exceção com <code>except: pass</code> é enterrar problema.</li>
<li><b>Configuração fora do código:</b> conexões e chaves vêm de variáveis de ambiente (<code>os.environ</code>), nunca escritas no script — segurança básica e o que permite o mesmo código rodar em homologação e produção.</li>
<li><b>Idempotência:</b> rodar o script duas vezes não pode duplicar dados. Padrões: apagar-e-recarregar a partição do dia, ou UPSERT por chave.</li>
</ul>
<pre><code>import logging, os, requests
logging.basicConfig(level=logging.INFO)

def extrair(url):
    r = requests.get(url, timeout=30)
    r.raise_for_status()          # falhou? explode com contexto
    logging.info("extraidos %s bytes", len(r.content))
    return r.json()</code></pre>
<div class="dica-box">💡 Teste de maturidade do seu script de ingestão: desligue a internet no meio da execução e rode de novo depois. Se o resultado final fica correto e sem duplicatas, você escreveu Python de engenharia.</div>`},
3:{titulo:"Linux, Docker e Git — o ambiente padrão do time de dados",corpo:`
<p>Todo servidor de dados que você vai tocar roda Linux; toda entrega moderna viaja em container; todo código de time vive em Git. O kit de sobrevivência:</p>
<ul>
<li><b>Terminal essencial:</b> <code>cd</code>, <code>ls -la</code>, <code>cat</code>, <code>grep erro arquivo.log</code>, <code>tail -f log</code> (acompanhar ao vivo), <code>chmod</code>, <code>|</code> para encadear. Duas semanas de uso diário e vira reflexo.</li>
<li><b>Docker em uma imagem mental:</b> o container é uma caixa lacrada com seu app + dependências + sistema mínimo. A <i>imagem</i> é a receita; o <i>container</i> é o bolo rodando. Acabou o "funciona na minha máquina".</li>
<li><b>docker-compose</b> sobe um ambiente inteiro com um comando — banco + ferramenta + rede descritos num YAML versionado junto com o código.</li>
</ul>
<pre><code># docker-compose.yml — Postgres de estudo em 30 segundos
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: exemplo_local   # nunca use senha real em arquivo
    ports:
      - "5432:5432"
# subir: docker compose up -d</code></pre>
<p><b>Git para engenharia</b> acrescenta duas ideias ao básico: <i>branches</i> (desenvolver sem quebrar o main) e <i>pull requests</i> (revisão antes de integrar). O histórico de commits é a documentação que ninguém precisa escrever.</p>
<div class="dica-box">💡 Entregável deste módulo: Postgres + pgAdmin via compose, no seu GitHub. É pequeno, mas demonstra exatamente o tripé que times cobram no primeiro dia.</div>`},
4:{titulo:"Airflow — pipelines com horário, ordem e plano B",corpo:`
<p>Agendar scripts no Agendador de Tarefas funciona até o dia em que o passo 2 falha e o passo 3 roda mesmo assim sobre dados velhos. <b>Orquestração</b> resolve isso: o Airflow executa seus passos como um <b>DAG</b> — um grafo onde cada tarefa só roda quando suas dependências terminam com sucesso.</p>
<ul>
<li><b>DAG:</b> o pipeline (ex.: extrair → validar → carregar → avisar), com agenda (<code>@daily</code>).</li>
<li><b>Retries com espera:</b> falhou a API? Tenta de novo em 5 minutos, três vezes, antes de acordar alguém.</li>
<li><b>Backfill:</b> reprocessar o histórico ("rode este pipeline para cada dia de janeiro") — impagável quando a regra de negócio muda.</li>
<li><b>UI:</b> quadrados verdes e vermelhos mostrando cada execução — o raio-X da saúde dos seus dados.</li>
</ul>
<pre><code>from airflow.decorators import dag, task
from datetime import datetime

@dag(schedule="@daily", start_date=datetime(2026, 1, 1), catchup=False)
def vendas_diarias():
    @task(retries=3)
    def extrair(): ...
    @task
    def carregar(dados): ...
    carregar(extrair())

vendas_diarias()</code></pre>
<p>A regra de idempotência do módulo 2 vira lei aqui: com retries e backfill, toda tarefa <b>será</b> executada mais de uma vez para a mesma data. Escreva cada tarefa assumindo isso.</p>
<div class="dica-box">💡 Comece com um DAG de 3 tarefas rodando local. Entender scheduling + dependência + retry no pequeno é 80% do valor do Airflow.</div>`},
5:{titulo:"Data warehouse e dbt — SQL com engenharia de software",corpo:`
<p>O padrão moderno é <b>ELT</b>: carregue o dado cru no warehouse primeiro, transforme depois, lá dentro, com SQL. O warehouse (BigQuery e afins) aguenta o tranco; o histórico cru preservado permite reconstruir qualquer regra. E quem organiza as transformações é o <b>dbt</b>.</p>
<p>O dbt trata SQL como código de verdade:</p>
<ul>
<li><b>Modelos em camadas:</b> <code>staging</code> (limpa e padroniza cada fonte) → <code>marts</code> (tabelas de negócio prontas para o BI). Cada modelo é um SELECT num arquivo versionado no Git.</li>
<li><b>Dependências automáticas:</b> <code>{{ ref("stg_pedidos") }}</code> declara de onde o modelo bebe; o dbt monta o grafo e executa na ordem certa.</li>
<li><b>Testes de dados:</b> declarar que <code>pedido_id</code> é único e não-nulo, e que <code>status</code> só aceita valores válidos. O pipeline <b>falha</b> se o dado chegar sujo — antes do dashboard mentir para o gestor.</li>
<li><b>Documentação e linhagem geradas</b> a partir do próprio código.</li>
</ul>
<pre><code>-- models/marts/fct_vendas.sql
SELECT p.pedido_id, p.data, c.regiao, p.valor
FROM {{ ref("stg_pedidos") }}  p
JOIN {{ ref("stg_clientes") }} c USING (cliente_id)</code></pre>
<div class="dica-box">💡 BigQuery Sandbox (grátis, sem cartão) + dbt Fundamentals (curso oficial gratuito com badge) formam o combo perfeito: ao final você tem um projeto com staging, marts e testes — o portfólio mínimo de analytics engineering.</div>`},
6:{titulo:"Spark — quando os dados não cabem mais em uma máquina",corpo:`
<p>Pandas carrega tudo na memória de UMA máquina; quando o dado passa de alguns GB, acabou o jogo. O <b>Spark</b> divide os dados em partições espalhadas por um cluster e leva o processamento até elas. A API de DataFrame é parente do Pandas — a mudança é de mentalidade, não de sintaxe:</p>
<ul>
<li><b>Avaliação preguiçosa:</b> transformações (<code>filter</code>, <code>groupBy</code>) só montam o plano; nada roda até uma ação (<code>count</code>, <code>write</code>). Isso permite ao Spark otimizar o plano inteiro antes de executar.</li>
<li><b>Shuffle é o vilão de performance:</b> operações que reorganizam dados entre máquinas (joins, groupBy em chave nova) custam rede e disco. Menos shuffle = job mais rápido.</li>
<li><b>Parquet é o formato nativo do ecossistema:</b> colunar e comprimido — ler 3 colunas de 300 sai quase de graça.</li>
</ul>
<pre><code>from pyspark.sql import SparkSession, functions as F
spark = SparkSession.builder.getOrCreate()

vendas = spark.read.parquet("s3://dados/vendas/")
resumo = (vendas.filter(F.col("valor") > 0)
                .groupBy("regiao")
                .agg(F.sum("valor").alias("total")))
resumo.write.mode("overwrite").parquet("s3://dados/marts/resumo/")</code></pre>
<p><b>Maturidade é saber quando NÃO usar:</b> para 2 GB, Pandas (ou DuckDB) resolve em segundos, sem cluster. Spark entra quando o volume, e não a moda, exige — dizer isso em entrevista conta pontos.</p>
<div class="dica-box">💡 O entregável pede a comparação Pandas × Spark no mesmo dataset. O resultado vai te surpreender nos dois sentidos — e a explicação do porquê é a aula de verdade.</div>`},
}
};
/* injeta as aulas nos módulos correspondentes */
if(typeof TRILHAS_BUILTIN!=="undefined"){
  TRILHAS_BUILTIN.forEach(function(t){
    var mapa=AULAS[t.id];
    if(!mapa)return;
    t.modulos.forEach(function(m){
      if(mapa[m.n]&&!m.aula)m.aula=mapa[m.n];
    });
  });
}
})();
