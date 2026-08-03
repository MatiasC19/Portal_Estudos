/* =====================================================================
   StudyHub — lógica da aplicação (multi-trilhas)
   Views: home · trilha · módulo · minha área · nova trilha · configurações
   ===================================================================== */

/* ---------------- ícones ---------------- */
const P={
 chart:'<path d="M3 3v18h18"/><path d="M7 15v2M12 10v7M17 6v11"/>',
 chevD:'<path d="M6 9l6 6 6-6"/>',
 menu:'<path d="M3 6h18M3 12h18M3 18h18"/>',
 rail:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>',
 play:'<path d="M7 4l13 8-13 8z"/>',
 ext:'<path d="M14 5h5v5"/><path d="M19 5l-8 8"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>',
 panel:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18"/>',
 check:'<path d="M5 13l4 4L19 7"/>',
 reset:'<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/>',
 arrL:'<path d="M19 12H5"/><path d="M11 6l-6 6 6 6"/>',
 arrR:'<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>',
 flask:'<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/>',
 book:'<path d="M4 5a2 2 0 0 1 2-2h14v18H6a2 2 0 0 1-2-2z"/><path d="M20 17H6a2 2 0 0 0-2 2"/>',
 video:'<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3"/>',
 award:'<circle cx="12" cy="9" r="5"/><path d="M9 13l-2 8 5-3 5 3-2-8"/>',
 target:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
 box:'<path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
 code:'<path d="M8 6l-6 6 6 6M16 6l6 6-6 6"/>',
 bars:'<path d="M4 20h16"/><path d="M6 20v-6M11 20V9M16 20V4"/>',
 cpu:'<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M6 6l1.5 1.5M16.5 16.5L18 18M16.5 7.5L18 6M6 18l1.5-1.5"/>',
 layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
 rocket:'<path d="M5 15c-1.5 2.5-1 4-1 4s1.5.5 4-1"/><path d="M14 4c3 0 6 3 6 6-2 5-7 9-11 10l-5-5C5 11 9 4 14 4z"/><circle cx="14" cy="10" r="1.6"/>',
 globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 close:'<path d="M6 6l12 12M18 6L6 18"/>',
 zap:'<path d="M13 2L4 14h6l-1 8 9-12h-6z"/>',
 flag:'<path d="M5 21V4"/><path d="M5 4h12l-2 4 2 4H5"/>',
 star:'<path d="M12 3l2.7 5.6 6.3.9-4.5 4.4 1 6.1-5.5-3-5.5 3 1-6.1L3 9.5l6.3-.9z"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 trash:'<path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 13h10l1-13"/>',
 home:'<path d="M3 11l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/>',
 gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M17 7l2.1-2.1M4.9 19.1L7 17"/>',
 down:'<path d="M12 3v12"/><path d="M6 11l6 6 6-6"/><path d="M4 21h16"/>',
 up:'<path d="M12 21V9"/><path d="M6 13l6-6 6 6"/><path d="M4 3h16"/>',
};
function ic(n,s=16,fill=false){return `<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="${fill?"currentColor":"none"}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]||""}</svg>`;}
function escapeHtml(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
const isYT=u=>!!u&&(u.includes("youtube.com")||u.includes("youtu.be"));
function ytParse(u){
  try{
    const url=new URL(u);
    if(url.hostname.includes("youtu.be"))return{v:url.pathname.slice(1).split("/")[0]};
    const v=url.searchParams.get("v"),list=url.searchParams.get("list");
    if(v)return{v};
    if(list)return{list};
    if(url.pathname.startsWith("/shorts/"))return{v:url.pathname.split("/")[2]};
    if(url.pathname.startsWith("/embed/"))return{v:url.pathname.split("/")[2]};
  }catch(e){}
  return null;
}

/* ---------------- estado / persistência ---------------- */
const KEY="trilha_ds_progresso_v2", KEYX="trilha_ds_extras_v1", KEYT="studyhub_trilhas_v1", KEYC="studyhub_config_v1";
let estado={},extras=[],customs=[],config={ritmo:9},storageOk=false;
function temStorage(){return typeof window.storage!=="undefined"&&window.storage;}
async function lerChave(k){
  if(temStorage()){try{const r=await window.storage.get(k);if(r&&r.value)return r.value;}catch(e){}}
  try{return localStorage.getItem(k);}catch(e){return null;}
}
async function gravarChave(k,v){
  let ok=false;
  if(temStorage()){try{await window.storage.set(k,v);ok=true;}catch(e){}}
  try{localStorage.setItem(k,v);ok=true;}catch(e){}
  return ok;
}
async function carregar(){
  try{
    const e=await lerChave(KEY);estado=e?JSON.parse(e):{};
    const x=await lerChave(KEYX);extras=x?JSON.parse(x):[];
    extras=extras.map(it=>it.tid?it:Object.assign({tid:"ds"},it)); // migração v4→v5
    const t=await lerChave(KEYT);customs=t?JSON.parse(t):[];
    const c=await lerChave(KEYC);config=c?JSON.parse(c):{ritmo:9};
    if(!config.ritmo)config.ritmo=9;
    storageOk=true;
  }catch(err){estado={};extras=[];customs=[];config={ritmo:9};storageOk=false;}
  setSaveMsg();
}
let saveTimer=null;
function salvar(){
  clearTimeout(saveTimer);
  saveTimer=setTimeout(async()=>{
    const a=await gravarChave(KEY,JSON.stringify(estado));
    const b=await gravarChave(KEYX,JSON.stringify(extras));
    const d=await gravarChave(KEYT,JSON.stringify(customs));
    const e=await gravarChave(KEYC,JSON.stringify(config));
    storageOk=a&&b&&d&&e;
    setSaveMsg();
  },350);
}
function setSaveMsg(){
  const el=document.getElementById("saveState");
  if(!el)return;
  if(storageOk){el.className="ok";el.textContent="progresso salvo";}
  else{el.className="warn";el.textContent="progresso só nesta sessão";}
}

/* ---------------- trilhas ---------------- */
function normalizarCustom(c){
  return {id:c.id,nome:c.nome,desc:c.desc||"Trilha pessoal criada por você.",icon:"star",c1:c.c1||"#1F77B4",c2:c.c2||"#7A4DBE",
    custom:true,milestones:null,
    fases:[{id:"c1",cor:"var(--f1)",corB:"var(--f1b)",tag:"Trilha pessoal",nome:"Módulos",icon:"star"}],
    modulos:(c.modulos||[]).map(m=>Object.assign({fase:"c1",itens:[]},m)),
    exercicios:[]};
}
function getTrilhas(){return TRILHAS_BUILTIN.concat(customs.map(normalizarCustom));}
function getTrilha(tid){return getTrilhas().find(t=>t.id===tid);}
let EXIDX={};
function indexarExercicios(){EXIDX={};getTrilhas().forEach(t=>(t.exercicios||[]).forEach(e=>EXIDX[e.id]=e));}
const exDoMod=(t,n)=>(t.exercicios||[]).filter(e=>e.mod===n);
const extrasDoMod=(tid,n)=>extras.filter(x=>x.tid===tid&&x.mod===n);
function addExtra(tid,mod,t,nome,url){
  const id="x"+Date.now().toString(36)+Math.floor(Math.random()*99);
  extras.push({id,tid,mod,t,n:nome,u:url});salvar();return id;
}
function delExtra(id){extras=extras.filter(x=>x.id!==id);delete estado["x_"+id];salvar();}

function progressoModulo(t,m){
  const exs=exDoMod(t,m.n),xts=extrasDoMod(t.id,m.n);
  const total=(m.itens?m.itens.length:0)+exs.length+xts.length;
  const done=(m.itens||[]).filter(it=>estado[it.id]).length
    +exs.filter(e=>estado["ex_"+e.id]).length
    +xts.filter(x=>estado["x_"+x.id]).length;
  return total?done/total:0;
}
function trilhaTotais(t){
  const h=t.modulos.reduce((s,m)=>s+(m.h||0),0);
  const feitas=t.modulos.reduce((s,m)=>s+(m.h||0)*progressoModulo(t,m),0);
  return {h,feitas,pct:h?Math.round(100*feitas/h):0};
}

/* ---------------- pyodide ---------------- */
let pyodidePromise=null;
const HARNESS=`
import sys, io, json, traceback
def _run_exercise(user_code, test_code):
    ns = {}
    buf = io.StringIO()
    old = sys.stdout
    sys.stdout = buf
    ok = True
    err = ""
    try:
        exec(user_code, ns)
        exec(test_code, ns)
    except AssertionError as e:
        ok = False
        err = "TESTE: " + str(e)
    except Exception:
        ok = False
        err = traceback.format_exc(limit=3)
    finally:
        sys.stdout = old
    return json.dumps({"ok": ok, "out": buf.getvalue(), "err": err})
`;
function getPyodide(){
  if(!pyodidePromise){
    const st=document.getElementById("pyStatus");
    st.textContent="⏳ carregando Python…";
    pyodidePromise=new Promise((res,rej)=>{
      const s=document.createElement("script");
      s.src="https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js";
      s.onload=async()=>{
        try{
          const py=await loadPyodide({indexURL:"https://cdn.jsdelivr.net/pyodide/v0.25.1/full/"});
          py.runPython(HARNESS);
          st.textContent="🐍 Python pronto";
          res(py);
        }catch(e){rej(e);}
      };
      s.onerror=()=>rej(new Error("cdn"));
      document.head.appendChild(s);
    }).catch(e=>{st.textContent="⚠ Python indisponível";pyodidePromise=null;throw e;});
  }
  return pyodidePromise;
}
async function executarExercicio(ex,btn){
  const card=btn.closest(".ex");
  const saida=card.querySelector(".saida"),pre=card.querySelector(".saida pre"),ver=card.querySelector(".veredito");
  const code=card.querySelector(".editor").value;
  btn.disabled=true;btn.innerHTML=ic("clock")+" Executando…";
  saida.classList.add("show");pre.textContent="";
  ver.className="veredito";ver.innerHTML="Executando no ambiente Python do navegador…";
  try{
    const py=await getPyodide();
    py.globals.set("uc",code);py.globals.set("tc",ex.test);
    const res=JSON.parse(py.runPython("_run_exercise(uc, tc)"));
    pre.textContent=res.out||"(sem saída no print)";
    if(res.ok){
      ver.className="veredito ok";
      ver.innerHTML="✅ <b>Correto!</b> Todos os testes passaram. Exercício marcado como concluído.";
      if(!estado["ex_"+ex.id]){estado["ex_"+ex.id]=true;salvar();atualizarUI();}
      const est=card.querySelector(".est");est.innerHTML=ic("check",13)+" concluído";est.classList.add("ok");
    }else{
      ver.className="veredito err";
      ver.innerHTML="❌ <b>Ainda não.</b><br><span style='font-family:var(--mono);font-size:12px'>"+escapeHtml(res.err)+"</span>"+
        "<div class='ajuste'>💡 <b>Ajuste sugerido:</b> "+ex.dica+"</div>";
    }
  }catch(e){
    ver.className="veredito err";
    ver.innerHTML="⚠ Não foi possível carregar o ambiente Python (requer internet no primeiro uso, ~10&nbsp;MB via CDN). Verifique a conexão e tente de novo.";
  }
  btn.disabled=false;btn.innerHTML=ic("play",14,true)+" Executar e verificar";
}

/* ---------------- roteador / sidebar ---------------- */
const content=document.getElementById("content");
const crumb=document.getElementById("crumb");
let viewAtual={tipo:"home"};

function irPara(v){
  viewAtual=v;
  if(v.tipo==="home")renderHome();
  else if(v.tipo==="trilha")renderTrilha(v.tid);
  else if(v.tipo==="mod")renderModulo(v.tid,v.n);
  else if(v.tipo==="area")renderArea();
  else if(v.tipo==="nova")renderNova();
  else if(v.tipo==="config")renderConfig();
  else if(v.tipo==="viewer")renderViewer(v);
  renderCtx();
  document.body.classList.remove("side-open");
  window.scrollTo({top:0});
  marcarNav();
  atualizarUI();
}
function montarNav(){
  document.getElementById("sideToggle").innerHTML=ic("rail",15);
  document.getElementById("burger").innerHTML=ic("menu",18);
  document.getElementById("navHome").innerHTML=`<span class="nic">${ic("home",16)}</span><span class="lbl">Início</span>`;
  document.getElementById("navArea").innerHTML=`<span class="nic">${ic("star",16)}</span><span class="lbl">Minha área</span>`;
  document.getElementById("navNova").innerHTML=`<span class="nic">${ic("plus",16)}</span><span class="lbl">Nova trilha</span>`;
  document.getElementById("navConfig").innerHTML=`<span class="nic">${ic("gear",16)}</span><span class="lbl">Configurações</span>`;
  document.getElementById("navHome").addEventListener("click",()=>irPara({tipo:"home"}));
  document.getElementById("navArea").addEventListener("click",()=>irPara({tipo:"area"}));
  document.getElementById("navNova").addEventListener("click",()=>irPara({tipo:"nova"}));
  document.getElementById("navConfig").addEventListener("click",()=>irPara({tipo:"config"}));
  document.getElementById("sideToggle").addEventListener("click",()=>{
    document.body.classList.toggle("rail");
    try{localStorage.setItem("studyhub_rail",document.body.classList.contains("rail")?"1":"0");}catch(e){}
  });
  try{if(localStorage.getItem("studyhub_rail")==="1")document.body.classList.add("rail");}catch(e){}
  document.getElementById("burger").addEventListener("click",()=>document.body.classList.toggle("side-open"));
}
function renderCtx(){
  const ctx=document.getElementById("ctxnav");
  const tid=viewAtual.tid;
  if(!tid||viewAtual.tipo==="viewer"&&!viewAtual.tid){ctx.innerHTML="";return;}
  const t=getTrilha(tid);
  if(!t){ctx.innerHTML="";return;}
  ctx.innerHTML=`<div class="side-sec">Trilha atual · ${escapeHtml(t.nome)}</div>`+
    t.fases.map(f=>{
      const mods=t.modulos.filter(m=>m.fase===f.id);
      if(!mods.length)return"";
      return `<div class="fcard" id="fc-${f.id}">
        <button class="fhead" data-fgroup="${f.id}" style="--c:${f.cor}" aria-expanded="false">
          <span class="fic">${ic(f.icon,15)}</span>
          <span class="ftt"><b>${escapeHtml(f.nome)}</b><span>${f.tag} · ${mods.length} módulo(s)</span></span>
          <span class="fpc" data-fasepct="${f.id}">0%</span>
          <span class="chev">${ic("chevD",13)}</span>
        </button>
        <div class="fmods">`+
        mods.map(m=>`<button class="nav-mod" data-mod="${m.n}" style="--c:${f.cor}" title="${escapeHtml(m.titulo)}">
          <span class="nn">${String(m.n).padStart(2,"0")}</span>
          <span class="nt">${escapeHtml(m.titulo)}</span>
          <span class="np" data-navpct="${m.n}">0%</span></button>`).join("")+
        `</div></div>`;
    }).join("");
  ctx.onclick=e=>{
    const fh=e.target.closest("[data-fgroup]");
    if(fh){
      if(document.body.classList.contains("rail")){
        document.body.classList.remove("rail");
        try{localStorage.setItem("studyhub_rail","0");}catch(err){}
        document.getElementById("fc-"+fh.getAttribute("data-fgroup")).classList.add("open");
      }else{
        const card=document.getElementById("fc-"+fh.getAttribute("data-fgroup"));
        card.classList.toggle("open");
        fh.setAttribute("aria-expanded",card.classList.contains("open"));
      }
      return;
    }
    const b=e.target.closest("[data-mod]");
    if(b)irPara({tipo:"mod",tid,n:Number(b.getAttribute("data-mod"))});
  };
  if(viewAtual.tipo==="mod"){
    const m=t.modulos.find(x=>x.n===viewAtual.n);
    if(m){const c=document.getElementById("fc-"+m.fase);if(c)c.classList.add("open");}
  }else if(t.fases.length){
    const c=document.getElementById("fc-"+t.fases[0].id);if(c)c.classList.add("open");
  }
}
function marcarNav(){
  document.querySelectorAll("#ctxnav .nav-mod").forEach(b=>{
    b.classList.toggle("active",viewAtual.tipo==="mod"&&Number(b.getAttribute("data-mod"))===viewAtual.n);
  });
  document.getElementById("navHome").classList.toggle("active",viewAtual.tipo==="home"||viewAtual.tipo==="trilha"||viewAtual.tipo==="mod");
  document.getElementById("navArea").classList.toggle("active",viewAtual.tipo==="area");
  document.getElementById("navNova").classList.toggle("active",viewAtual.tipo==="nova");
  document.getElementById("navConfig").classList.toggle("active",viewAtual.tipo==="config");
}
function atualizarUI(){
  const tid=viewAtual.tid;
  if(tid){
    const t=getTrilha(tid);
    if(t){
      t.modulos.forEach(m=>{
        const p=Math.round(100*progressoModulo(t,m));
        const el=document.querySelector(`#ctxnav [data-navpct="${m.n}"]`);
        if(el){el.textContent=p+"%";el.closest(".nav-mod").classList.toggle("done",p===100);}
      });
      t.fases.forEach(f=>{
        const mods=t.modulos.filter(m=>m.fase===f.id);
        const hF=mods.reduce((s,m)=>s+(m.h||0),0);
        const hD=mods.reduce((s,m)=>s+(m.h||0)*progressoModulo(t,m),0);
        const el=document.querySelector(`#ctxnav [data-fasepct="${f.id}"]`);
        if(el)el.textContent=(hF?Math.round(100*hD/hF):0)+"%";
      });
    }
  }
  if(viewAtual.tipo==="trilha")preencherTrilha();
  setSaveMsg();
}

/* ---------------- home ---------------- */
function renderHome(){
  crumb.textContent="Início — minhas trilhas";
  const trilhas=getTrilhas();
  content.innerHTML=`
    <div class="hero solo">
      <div>
        <div class="eyebrow">StudyHub · ${trilhas.length} trilha(s) disponíveis</div>
        <h1>Bem-vindo de volta. <em>Continue de onde parou.</em></h1>
        <p class="sub">Suas trilhas de estudo em um só lugar: aulas nativas para ler no portal, players de vídeo integrados, testes com correção automática e a sua curadoria pessoal de conteúdos.</p>
      </div>
    </div>
    <h3 class="secT">${ic("layers",17)} Minhas trilhas</h3>
    <div class="tcards">${trilhas.map(t=>{
      const tot=trilhaTotais(t);
      return `<button class="tcard" data-gotrilha="${t.id}" style="--c1:${t.c1};--c2:${t.c2}">
        <div class="tc-top"><span class="tc-ic">${ic(t.icon,20)}</span>
          <span><b>${escapeHtml(t.nome)}</b><span>${t.modulos.length} módulos · ${tot.h}h${t.custom?" · trilha pessoal":""}</span></span></div>
        <div class="tc-body">
          <div class="tc-desc">${escapeHtml(t.desc)}</div>
          <div class="tc-meta"><span>${Math.round(tot.feitas)}h de ${tot.h}h</span><span>${tot.pct}%</span></div>
          <div class="pbar"><i style="width:${tot.pct}%"></i></div>
          <span class="tc-cta">${tot.pct>0?"Continuar trilha":"Começar trilha"} ${ic("arrR",13)}</span>
        </div>
      </button>`;
    }).join("")}</div>
    <h3 class="secT">${ic("plus",17)} Quer estudar outro tema?</h3>
    <div class="panel"><p style="font-size:13.5px;color:var(--ink-soft)">Crie uma trilha personalizada em <b>Nova trilha</b>: defina os módulos e alimente cada um com vídeos (players no portal), artigos e livros pela <b>Minha área</b>. Todo item conta no seu progresso.</p></div>`;
  content.querySelectorAll("[data-gotrilha]").forEach(b=>b.addEventListener("click",()=>irPara({tipo:"trilha",tid:b.getAttribute("data-gotrilha")})));
}

/* ---------------- trilha (dashboard) ---------------- */
function renderTrilha(tid){
  const t=getTrilha(tid);
  if(!t){irPara({tipo:"home"});return;}
  crumb.textContent="Trilha · "+t.nome;
  const nEx=(t.exercicios||[]).length;
  const nCert=t.modulos.reduce((s,m)=>s+(m.itens||[]).filter(i=>i.cert).length,0);
  content.innerHTML=`
    <div class="hero" style="--h1:${t.c1};--h2:${t.c2}">
      <div>
        <div class="eyebrow">${t.fases.length} fase(s) · ${t.modulos.length} módulos · ${trilhaTotais(t).h}h${nEx?` · ${nEx} testes práticos`:""}</div>
        <h1>${escapeHtml(t.nome)}</h1>
        <p class="sub">${escapeHtml(t.desc)}</p>
      </div>
      <div class="hstats">
        <div class="hstat"><div class="hs-top">${ic("zap",13)} progresso</div><b id="stPct">0%</b><div class="hbar hb1"><i id="bPct"></i></div></div>
        <div class="hstat"><div class="hs-top">${ic("clock",13)} horas</div><b id="stHoras">—</b><div class="hbar hb2"><i id="bHoras"></i></div></div>
        <div class="hstat"><div class="hs-top">${ic("flask",13)} testes</div><b id="stEx">${nEx?"—":"n/d"}</b><div class="hbar hb3"><i id="bEx"></i></div></div>
        <div class="hstat"><div class="hs-top">${ic("award",13)} certificados</div><b id="stCert">${nCert?"—":"n/d"}</b><div class="hbar hb4"><i id="bCert"></i></div></div>
      </div>
    </div>
    <div class="grid2">
      <div class="panel">
        <h2>${ic("chart",14)} Curva de progresso da trilha</h2>
        <svg id="curve" viewBox="0 0 720 260" style="width:100%" role="img" aria-label="Curva de progresso"></svg>
        <div class="curve-note">tracejado = plano · sólido = concluído${t.milestones?" · ▲ empregável · ■ núcleo completo":""}</div>
      </div>
      <div class="panel">
        <h2>${ic("flag",14)} Planejamento</h2>
        <div class="ritmo">
          <label for="ritmo">Meu ritmo:</label>
          <select id="ritmo">
            <option value="20">Acelerado — 20 h/semana</option>
            <option value="16">Intensivo — 16 h/semana</option>
            <option value="9">Sustentável — 9 h/semana</option>
          </select>
        </div>
        <div class="eta" id="eta"></div>
        <div class="milestones" id="milestones"></div>
      </div>
    </div>
    <h3 class="secT">${ic("layers",17)} Fases da trilha</h3>
    <div class="ftiles" id="ftiles"></div>`;
  const sel=document.getElementById("ritmo");
  sel.value=String(config.ritmo||9);
  sel.addEventListener("change",()=>{config.ritmo=Number(sel.value);salvar();preencherTrilha();});
  document.getElementById("ftiles").addEventListener("click",e=>{
    const b=e.target.closest("[data-gofase]");
    if(b)irPara({tipo:"mod",tid,n:Number(b.getAttribute("data-gofase"))});
  });
  preencherTrilha();
}
function preencherTrilha(){
  if(viewAtual.tipo!=="trilha")return;
  const t=getTrilha(viewAtual.tid);if(!t)return;
  const tot=trilhaTotais(t);
  const exs=t.exercicios||[];
  const exDone=exs.filter(e=>estado["ex_"+e.id]).length;
  let certs=0,certTot=0;
  t.modulos.forEach(m=>(m.itens||[]).forEach(it=>{if(it.cert){certTot++;if(estado[it.id])certs++;}}));
  document.getElementById("stPct").textContent=tot.pct+"%";
  document.getElementById("stHoras").textContent=Math.round(tot.feitas)+"h / "+tot.h+"h";
  if(exs.length)document.getElementById("stEx").textContent=exDone+" / "+exs.length;
  if(certTot)document.getElementById("stCert").textContent=certs+" / "+certTot;
  document.getElementById("bPct").style.width=tot.pct+"%";
  document.getElementById("bHoras").style.width=tot.pct+"%";
  document.getElementById("bEx").style.width=(exs.length?Math.round(100*exDone/exs.length):0)+"%";
  document.getElementById("bCert").style.width=(certTot?Math.round(100*certs/certTot):0)+"%";
  const ritmo=config.ritmo||9,sem=h=>Math.ceil(h/ritmo);
  const rTot=Math.max(0,tot.h-tot.feitas);
  document.getElementById("eta").innerHTML=rTot===0?"<b>Trilha completa!</b>":`trilha completa: faltam <b>${Math.round(rTot)}h</b> ≈ <b>${sem(rTot)} semanas</b> neste ritmo`;
  const ms=document.getElementById("milestones");
  if(t.milestones){
    const hEmp=t.modulos.filter(m=>m.n<=t.milestones.empregavel).reduce((s,m)=>s+m.h,0);
    const hNuc=t.modulos.filter(m=>m.n<=t.milestones.nucleo).reduce((s,m)=>s+m.h,0);
    const rEmp=Math.max(0,hEmp-Math.min(tot.feitas,hEmp)),rNuc=Math.max(0,hNuc-Math.min(tot.feitas,hNuc));
    ms.innerHTML=`▲ <b>Empregável</b> (${hEmp}h): ${rEmp===0?"<b>atingido — aplique para vagas!</b>":`≈ ${sem(rEmp)} semanas`}<br>■ <b>Núcleo completo</b> (${hNuc}h): ${rNuc===0?"<b>atingido</b>":`≈ ${sem(rNuc)} semanas`}`;
  }else ms.innerHTML="";
  desenharCurva(t);
}
function desenharCurva(t){
  const svg=document.getElementById("curve");if(!svg)return;
  const W=720,H=260,mL=44,mR=14,mT=14,mB=32,iw=W-mL-mR,ih=H-mT-mB;
  const totalH=t.modulos.reduce((s,m)=>s+(m.h||0),0)||1;
  let acP=0,acR=0;const plano=[{x:0,y:0}],real=[{x:0,y:0}];
  t.modulos.forEach((m,i)=>{acP+=m.h||0;acR+=(m.h||0)*progressoModulo(t,m);plano.push({x:i+1,y:acP/totalH});real.push({x:i+1,y:acR/totalH});});
  const N=t.modulos.length||1;
  const X=v=>mL+iw*v/N,Y=v=>mT+ih*(1-v);
  const path=p=>p.map((q,i)=>(i?"L":"M")+X(q.x).toFixed(1)+","+Y(q.y).toFixed(1)).join(" ");
  let g="";
  for(let k=0;k<=4;k++){const y=Y(k/4);
    g+=`<line x1="${mL}" y1="${y}" x2="${W-mR}" y2="${y}" stroke="var(--chart-grid)"/>`;
    g+=`<text x="${mL-8}" y="${y+4}" text-anchor="end" font-family="IBM Plex Mono" font-size="10" fill="var(--ink-soft)">${k*25}%</text>`;}
  for(let m=1;m<=N;m++)g+=`<text x="${X(m)}" y="${H-12}" text-anchor="middle" font-family="IBM Plex Mono" font-size="9" fill="var(--ink-soft)">${m}</text>`;
  g+=`<text x="${(mL+W-mR)/2}" y="${H-1}" text-anchor="middle" font-family="IBM Plex Mono" font-size="9" fill="var(--ink-soft)">módulo</text>`;
  if(t.milestones){
    const xE=X(t.milestones.empregavel),xN=X(t.milestones.nucleo);
    g+=`<line x1="${xE}" y1="${mT}" x2="${xE}" y2="${H-mB}" stroke="var(--f3)" stroke-dasharray="3 4" opacity=".7"/><text x="${xE}" y="${mT+2}" text-anchor="middle" font-size="10" fill="var(--f3)">▲</text>`;
    g+=`<line x1="${xN}" y1="${mT}" x2="${xN}" y2="${H-mB}" stroke="var(--f5)" stroke-dasharray="3 4" opacity=".7"/><text x="${xN}" y="${mT+2}" text-anchor="middle" font-size="10" fill="var(--f5)">■</text>`;
  }
  g+=`<path d="${path(plano)}" fill="none" stroke="var(--ink-soft)" stroke-width="1.5" stroke-dasharray="5 5" opacity=".55"/>`;
  g+=`<path d="${path(real)}" fill="none" stroke="${t.c1}" stroke-width="2.5" stroke-linejoin="round"/>`;
  real.forEach((p,i)=>{if(i===0)return;const full=progressoModulo(t,t.modulos[i-1])===1;
    g+=`<circle cx="${X(p.x)}" cy="${Y(p.y)}" r="${full?4.5:3}" fill="${full?"var(--ok)":"#fff"}" stroke="${t.c1}" stroke-width="1.8"/>`;});
  const tiles=document.getElementById("ftiles");
  if(tiles){
    tiles.innerHTML=t.fases.map(f=>{
      const mods=t.modulos.filter(m=>m.fase===f.id);
      if(!mods.length)return"";
      const hF=mods.reduce((s,m)=>s+(m.h||0),0);
      const hD=mods.reduce((s,m)=>s+(m.h||0)*progressoModulo(t,m),0);
      const p=hF?Math.round(100*hD/hF):0;
      return `<button class="ftile" data-gofase="${mods[0].n}" style="--c1:${t.c1};--c2:${t.c2}">
        <div class="fic">${ic(f.icon,19)}</div>
        <div class="fn">${f.tag} · ${escapeHtml(f.nome)}</div>
        <div class="fm">${mods.length} módulo(s) · ${hF}h · ${p}% concluído</div>
        <div class="hbar"><i style="width:${p}%"></i></div>
      </button>`;
    }).join("");
  }
  svg.innerHTML=g;
}

/* ---------------- extras (render + form) ---------------- */
function playerDeUrl(u,titulo){
  const yt=ytParse(u);
  if(!yt)return"";
  const src=yt.v?("https://www.youtube-nocookie.com/embed/"+yt.v+"?autoplay=1"):("https://www.youtube-nocookie.com/embed/videoseries?list="+yt.list+"&autoplay=1");
  return `<div class="player"><div class="frame" data-src="${escapeHtml(src)}">
      <div class="ph" tabindex="0" role="button" aria-label="Reproduzir ${escapeHtml(titulo)}"><div class="playbtn">${ic("play",20,true)}</div><span>Assistir no portal</span></div>
    </div>
    <div class="fb">Se o player não iniciar, <a href="${escapeHtml(u)}" target="_blank" rel="noopener">abra no YouTube</a>.</div></div>`;
}
function renderExtraItem(x,mostrarOrigem){
  const feito=!!estado["x_"+x.id];
  const tipoIc={video:"video",artigo:"panel",livro:"book"}[x.t]||"panel";
  const tipoLabel={video:"vídeo",artigo:"artigo",livro:"livro"}[x.t]||x.t;
  const player=(x.t==="video"&&isYT(x.u))?playerDeUrl(x.u,x.n):"";
  let acts="";
  if(x.u&&!player){
    if(isYT(x.u))acts=`<a class="yt" href="${escapeHtml(x.u)}" target="_blank" rel="noopener">${ic("video",13)} Abrir no YouTube</a>`;
    else acts=`<button type="button" data-view="${escapeHtml(x.u)}" data-nome="${escapeHtml(x.n)}">${ic("panel",13)} Abrir aqui no portal</button>
      <a href="${escapeHtml(x.u)}" target="_blank" rel="noopener">${ic("ext",13)} Nova aba</a>`;
  }else if(x.u&&player){
    acts=`<a href="${escapeHtml(x.u)}" target="_blank" rel="noopener">${ic("ext",13)} Abrir no YouTube</a>`;
  }
  const trilha=getTrilha(x.tid);
  const mod=trilha?trilha.modulos.find(m=>m.n===x.mod):null;
  const origem=mostrarOrigem&&trilha&&mod?`<span class="desc" style="display:block">${escapeHtml(trilha.nome)} · Módulo ${String(x.mod).padStart(2,"0")} — ${escapeHtml(mod.titulo)}</span>`:"";
  return `<div class="item ${feito?"feito":""}">
    <span class="tipo ${x.t}">${ic(tipoIc,11)} ${tipoLabel}</span>
    <div class="txt">
      <div class="nome">${escapeHtml(x.n)}<span class="extra-flag">${ic("star",10)} extra</span></div>
      ${origem}${player}
      <div class="acts">${acts}<button type="button" class="del" data-delx="${x.id}">${ic("trash",13)} Remover</button></div>
    </div>
    <label class="chk"><input type="checkbox" data-chk="x_${x.id}" ${feito?"checked":""} aria-label="Concluir ${escapeHtml(x.n)}">concluído</label>
  </div>`;
}
function formExtra(tidFixo,modFixo){
  const trilhas=getTrilhas();
  const selTid=tidFixo?`<input type="hidden" id="fxTid" value="${tidFixo}">`
    :`<div class="field"><label for="fxTid">Trilha</label><select id="fxTid">${trilhas.map(t=>`<option value="${t.id}">${escapeHtml(t.nome)}</option>`).join("")}</select></div>`;
  const selMod=modFixo?`<input type="hidden" id="fxMod" value="${modFixo}">`
    :`<div class="field"><label for="fxMod">Módulo</label><select id="fxMod"></select></div>`;
  return `<div class="panel mt">
    <h2>${ic("plus",14)} Adicionar conteúdo ${modFixo?"a este módulo":"à trilha"}</h2>
    <div class="addform">
      ${selTid}${selMod}
      <div class="field"><label for="fxTipo">Tipo</label>
        <select id="fxTipo"><option value="video">Vídeo</option><option value="artigo">Artigo</option><option value="livro">Livro</option></select></div>
      <div class="field"><label for="fxNome">Título</label><input id="fxNome" type="text" placeholder="Ex.: Pandas em 1 hora" maxlength="120"></div>
      <div class="field"><label for="fxUrl">Link (URL)</label><input id="fxUrl" type="url" placeholder="https://…  (vídeo: cole o link do YouTube)"></div>
      <button class="btn-add" id="fxAdd">${ic("plus",14)} Adicionar</button>
    </div>
    <div class="form-msg" id="fxMsg"></div>
  </div>`;
}
function ligarFormExtra(afterAdd){
  const btn=document.getElementById("fxAdd");
  if(!btn)return;
  const selTid=document.getElementById("fxTid"),selMod=document.getElementById("fxMod");
  function popularMods(){
    if(selMod.tagName!=="SELECT")return;
    const t=getTrilha(selTid.value);
    selMod.innerHTML=(t?t.modulos:[]).map(m=>`<option value="${m.n}">${String(m.n).padStart(2,"0")} — ${escapeHtml(m.titulo)}</option>`).join("");
  }
  if(selTid.tagName==="SELECT"){selTid.addEventListener("change",popularMods);popularMods();}
  btn.addEventListener("click",()=>{
    const tid=selTid.value,mod=Number(selMod.value);
    const t=document.getElementById("fxTipo").value;
    const nome=document.getElementById("fxNome").value.trim();
    const url=document.getElementById("fxUrl").value.trim();
    const msg=document.getElementById("fxMsg");
    if(!tid||!mod){msg.className="form-msg err";msg.textContent="Escolha trilha e módulo.";return;}
    if(!nome){msg.className="form-msg err";msg.textContent="Informe um título para o conteúdo.";return;}
    if(!url||!/^https?:\/\//i.test(url)){msg.className="form-msg err";msg.textContent="Informe um link válido começando com http(s)://";return;}
    if(t==="video"&&isYT(url)&&!ytParse(url)){msg.className="form-msg err";msg.textContent="Não reconheci esse link do YouTube — cole o link do vídeo (watch?v=…), do youtu.be ou de uma playlist (list=…).";return;}
    addExtra(tid,mod,t,nome,url);
    afterAdd(tid,mod);
  });
}

/* ---------------- módulo ---------------- */
function renderModulo(tid,n){
  const t=getTrilha(tid);if(!t){irPara({tipo:"home"});return;}
  const m=t.modulos.find(x=>x.n===n);if(!m){irPara({tipo:"trilha",tid});return;}
  const f=t.fases.find(x=>x.id===m.fase)||t.fases[0];
  const exs=exDoMod(t,n),xts=extrasDoMod(tid,n);
  crumb.textContent=`${t.nome} · Módulo ${String(n).padStart(2,"0")} — ${m.titulo}`;
  const tipoIc={curso:"book",video:"video",cert:"award",pratica:"target",entrega:"box",livro:"book"};
  const tipoLabel={curso:"curso",video:"vídeo",cert:"certificado",pratica:"prática",entrega:"entregável",livro:"livro"};
  const itens=m.itens||[];
  const noPortal=itens.filter(it=>it.embed||!it.u);
  const externos=itens.filter(it=>it.u&&!it.embed);
  const renderItem=it=>{
    const feito=!!estado[it.id];
    const player=it.embed?`
      <div class="player"><div class="frame" data-src="https://www.youtube-nocookie.com/embed/videoseries?list=${it.embed}&autoplay=1">
        <div class="ph" tabindex="0" role="button" aria-label="Reproduzir ${escapeHtml(it.n)}"><div class="playbtn">${ic("play",20,true)}</div><span>Assistir no portal</span></div>
      </div>
      <div class="fb">Se o player não iniciar, <a href="https://www.youtube.com/playlist?list=${it.embed}" target="_blank" rel="noopener">abra no YouTube</a>.</div></div>`:"";
    let acts="";
    if(it.u&&!it.embed){
      if(isYT(it.u))acts=`<div class="acts"><a class="yt" href="${it.u}" target="_blank" rel="noopener">${ic("video",13)} Abrir no YouTube</a></div>`;
      else acts=`<div class="acts">
        <button type="button" data-view="${it.u}" data-nome="${escapeHtml(it.n)}">${ic("panel",13)} Abrir aqui no portal</button>
        <a href="${it.u}" target="_blank" rel="noopener">${ic("ext",13)} Nova aba</a></div>`;
    }
    return `<div class="item ${feito?"feito":""}">
      <span class="tipo ${it.t}">${ic(tipoIc[it.t]||"book",11)} ${tipoLabel[it.t]||it.t}</span>
      <div class="txt"><div class="nome">${escapeHtml(it.n)}</div><div class="desc">${it.d||""}</div>${player}${acts}</div>
      <label class="chk"><input type="checkbox" data-chk="${it.id}" ${feito?"checked":""} aria-label="Concluir ${escapeHtml(it.n)}">concluído</label>
    </div>`;
  };
  content.innerHTML=`
    <div class="mod-hero" style="--c:${t.custom?t.c1:f.cor};--cb:${t.custom?t.c2:(f.corB||f.cor)}">
      <div class="mic">${ic(f.icon,22)}</div>
      <div style="flex:1">
        <span class="tag">${escapeHtml(t.nome)} · ${f.tag}</span>
        <h1>${String(n).padStart(2,"0")} — ${escapeHtml(m.titulo)}</h1>
        <div class="meta">
          <span>${ic("clock",13)} ${m.h||0}h estimadas</span>
          <span>${ic("book",13)} ${itens.length} conteúdo(s)</span>
          <span>${ic("flask",13)} ${exs.length} teste(s)</span>
          <span>${ic("star",13)} ${xts.length} extra(s) seus</span>
        </div>
        <p class="sub">${escapeHtml(m.topicos||"")}</p>
      </div>
      <button class="mod-close" data-closemod title="Fechar módulo e voltar à trilha" aria-label="Fechar módulo">${ic("close",16)}</button>
    </div>
    ${m.aula?`<div class="panel mt" id="pAula">
      <h2 class="p-head" tabindex="0" role="button" aria-expanded="true">${ic("book",14)} Aula no portal — ${escapeHtml(m.aula.titulo)} <span class="chev">${ic("chevD",14)}</span></h2>
      <div class="p-body"><div class="aula">${m.aula.corpo}</div></div>
    </div>`:""}
    ${noPortal.length?`<div class="panel mt">
      <h2 class="p-head" tabindex="0" role="button" aria-expanded="true">${ic("video",14)} Conteúdo no portal <span class="chev">${ic("chevD",14)}</span></h2>
      <div class="p-body">${noPortal.map(renderItem).join("")}</div>
    </div>`:""}
    <div class="panel mt">
      <h2 class="p-head" tabindex="0" role="button" aria-expanded="true">${ic("star",14)} Conteúdo extra — adicionado por você <span class="chev">${ic("chevD",14)}</span></h2>
      <div class="p-body">${xts.length?xts.map(x=>renderExtraItem(x,false)).join(""):`<p class="empty">Nenhum conteúdo extra aqui ainda. Adicione abaixo — vídeos do YouTube viram player dentro do portal.</p>`}</div>
    </div>
    ${formExtra(tid,n)}
    ${externos.length?`<div class="panel mt closed">
      <h2 class="p-head" tabindex="0" role="button" aria-expanded="false">${ic("ext",14)} Aprofundamento — plataformas externas (opcional) <span class="chev">${ic("chevD",14)}</span></h2>
      <div class="p-body"><p class="empty">Cursos e certificações em plataformas com login (Kaggle, freeCodeCamp etc.). Elas não permitem exibição dentro de outros sites, por segurança delas — abrem em nova aba ou no visualizador.</p>${externos.map(renderItem).join("")}</div>
    </div>`:""}
    ${exs.length?`<h3 class="secT">${ic("flask",17)} Testes práticos — compilador interno (Python no navegador)</h3>`+
      exs.map(ex=>{
        const feito=!!estado["ex_"+ex.id];
        return `<div class="ex" data-ex="${ex.id}">
          <div class="ex-head" tabindex="0" role="button" aria-expanded="false">
            <span class="badge">${ic("code",11)} teste</span><span class="et">${ex.titulo}</span>
            <span class="est ${feito?"ok":""}">${feito?ic("check",13)+" concluído":"pendente"}</span>
            <span class="chev">${ic("chevD",14)}</span>
          </div>
          <div class="ex-body">
            <p class="enun">${ex.enun}</p>
            <div class="esperado"><b>Resultado esperado</b><pre>${ex.esperado}</pre></div>
            <textarea class="editor" spellcheck="false" aria-label="Editor de código Python">${ex.starter}</textarea>
            <div class="ex-actions">
              <button class="btn-run" data-run="${ex.id}">${ic("play",14,true)} Executar e verificar</button>
              <button class="btn-ghost" data-reset="${ex.id}">${ic("reset",13)} Restaurar código</button>
            </div>
            <div class="saida"><div class="s-h">Saída do programa (print)</div><pre></pre><div class="veredito"></div></div>
            <details class="gab"><summary>Ver gabarito (tente sozinho primeiro!)</summary><pre>${escapeHtml(ex.gab)}</pre></details>
          </div>
        </div>`;
      }).join(""):""}
    <div class="navmod-foot">
      <button ${t.modulos[0].n===n?"disabled":""} data-goto="${n-1}">${ic("arrL",15)} Módulo anterior</button>
      <button ${t.modulos[t.modulos.length-1].n===n?"disabled":""} data-goto="${n+1}">Próximo módulo ${ic("arrR",15)}</button>
    </div>`;
  content.querySelectorAll("[data-goto]").forEach(b=>b.addEventListener("click",()=>irPara({tipo:"mod",tid,n:Number(b.getAttribute("data-goto"))})));
  content.querySelector("[data-closemod]").addEventListener("click",()=>irPara({tipo:"trilha",tid}));
  content.querySelectorAll(".p-head").forEach(ph=>{
    const tg=()=>{const p=ph.closest(".panel");p.classList.toggle("closed");ph.setAttribute("aria-expanded",!p.classList.contains("closed"));};
    ph.addEventListener("click",tg);
    ph.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();tg();}});
  });
  content.querySelectorAll(".ex-head").forEach(h=>{
    const tg=()=>{const c=h.closest(".ex");c.classList.toggle("open");h.setAttribute("aria-expanded",c.classList.contains("open"));};
    h.addEventListener("click",tg);
    h.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();tg();}});
  });
  content.querySelectorAll(".editor").forEach(ed=>{
    ed.addEventListener("keydown",e=>{
      if(e.key==="Tab"){e.preventDefault();const s=ed.selectionStart;ed.setRangeText("    ",s,ed.selectionEnd,"end");}
    });
  });
  ligarFormExtra(()=>renderModulo(tid,n));
}

/* ---------------- minha área ---------------- */
function renderArea(){
  crumb.textContent="Minha área";
  const trilhas=getTrilhas();
  content.innerHTML=`
    <div class="hero solo">
      <div>
        <div class="eyebrow">seu perfil de estudos · ${extras.length} conteúdo(s) adicionados</div>
        <h1>${ic("star",26)} Minha <em>área</em></h1>
        <p class="sub">Acompanhe suas trilhas e personalize-as: adicione vídeos (players no portal), artigos e livros. Tudo conta no progresso.</p>
      </div>
    </div>
    <h3 class="secT">${ic("chart",17)} Andamento das minhas trilhas</h3>
    <div class="tcards">${trilhas.map(t=>{
      const tot=trilhaTotais(t);
      return `<button class="tcard" data-gotrilha="${t.id}" style="--c1:${t.c1};--c2:${t.c2}">
        <div class="tc-top"><span class="tc-ic">${ic(t.icon,20)}</span>
          <span><b>${escapeHtml(t.nome)}</b><span>${t.modulos.length} módulos · ${tot.h}h</span></span></div>
        <div class="tc-body">
          <div class="tc-meta"><span>${Math.round(tot.feitas)}h de ${tot.h}h</span><span>${tot.pct}%</span></div>
          <div class="pbar"><i style="width:${tot.pct}%"></i></div>
        </div>
      </button>`;
    }).join("")}</div>
    ${formExtra(null,null)}
    <h3 class="secT">${ic("book",17)} Meus conteúdos adicionados</h3>
    ${extras.length?`<div class="panel">${extras.map(x=>renderExtraItem(x,true)).join("")}</div>`
      :`<div class="panel"><p class="empty">Você ainda não adicionou nada. Use o formulário acima — o vídeo que você quer assistir vira parte oficial do módulo escolhido.</p></div>`}`;
  content.querySelectorAll("[data-gotrilha]").forEach(b=>b.addEventListener("click",()=>irPara({tipo:"trilha",tid:b.getAttribute("data-gotrilha")})));
  ligarFormExtra(()=>renderArea());
}

/* ---------------- nova trilha ---------------- */
const PALETAS=[["#1F77B4","#7A4DBE"],["#0E7C7B","#3B7DD8"],["#D95F02","#E7298A"],["#2CA02C","#0E7C7B"],["#9467BD","#D62728"],["#8C564B","#FF7F0E"]];
function renderNova(){
  crumb.textContent="Nova trilha";
  content.innerHTML=`
    <div class="hero solo">
      <div>
        <div class="eyebrow">crie sua própria trilha de estudos</div>
        <h1>${ic("plus",26)} Nova <em>trilha</em></h1>
        <p class="sub">Defina o tema e os módulos; depois alimente cada módulo com vídeos, artigos e livros pela Minha área ou dentro do próprio módulo. O progresso é calculado automaticamente.</p>
      </div>
    </div>
    <div class="panel mt">
      <h2>${ic("plus",14)} Criar trilha</h2>
      <div class="addform nf">
        <div class="field"><label for="ntNome">Nome da trilha</label><input id="ntNome" type="text" placeholder="Ex.: Engenharia de Analytics" maxlength="60"></div>
        <div class="field"><label for="ntDesc">Descrição (opcional)</label><input id="ntDesc" type="text" placeholder="Objetivo da trilha" maxlength="160"></div>
        <div class="field"><label for="ntCor">Cor</label><select id="ntCor">${PALETAS.map((p,i)=>`<option value="${i}">Paleta ${i+1}</option>`).join("")}</select></div>
        <button class="btn-add" id="ntAdd">${ic("plus",14)} Criar trilha</button>
      </div>
      <div class="form-msg" id="ntMsg"></div>
    </div>
    <h3 class="secT">${ic("layers",17)} Minhas trilhas personalizadas</h3>
    <div id="listaCustoms"></div>`;
  document.getElementById("ntAdd").addEventListener("click",()=>{
    const nome=document.getElementById("ntNome").value.trim();
    const desc=document.getElementById("ntDesc").value.trim();
    const pal=PALETAS[Number(document.getElementById("ntCor").value)||0];
    const msg=document.getElementById("ntMsg");
    if(!nome){msg.className="form-msg err";msg.textContent="Dê um nome à trilha.";return;}
    customs.push({id:"c"+Date.now().toString(36),nome,desc,c1:pal[0],c2:pal[1],modulos:[]});
    salvar();indexarExercicios();
    msg.className="form-msg ok";msg.textContent="Trilha criada! Adicione módulos abaixo.";
    document.getElementById("ntNome").value="";document.getElementById("ntDesc").value="";
    listarCustoms();
  });
  listarCustoms();
}
function listarCustoms(){
  const box=document.getElementById("listaCustoms");
  if(!box)return;
  if(!customs.length){box.innerHTML=`<div class="panel"><p class="empty">Nenhuma trilha personalizada ainda. Crie a primeira acima — por exemplo, "Engenharia de Analytics" ou "Inglês para dados".</p></div>`;return;}
  box.innerHTML=customs.map(c=>`
    <div class="panel mt" data-tri="${c.id}">
      <h2>${ic("star",14)} ${escapeHtml(c.nome)} <span style="margin-left:auto;display:inline-flex;gap:8px">
        <button class="btn-ghost" data-abrir="${c.id}">${ic("ext",13)} Abrir trilha</button>
        <button class="btn-warn" data-deltri="${c.id}">${ic("trash",13)} Excluir trilha</button></span></h2>
      ${(c.modulos||[]).length?(c.modulos.map(m=>`
        <div class="item"><span class="tipo curso">${ic("book",11)} módulo</span>
          <div class="txt"><div class="nome">${String(m.n).padStart(2,"0")} — ${escapeHtml(m.titulo)}</div><div class="desc">${m.h||0}h estimadas · ${extrasDoMod(c.id,m.n).length} conteúdo(s)</div></div>
          <button class="btn-warn" data-delmod="${c.id}:${m.n}" style="margin-top:2px">${ic("trash",13)}</button>
        </div>`).join("")):`<p class="empty">Sem módulos ainda.</p>`}
      <div class="addform nf" style="margin-top:12px">
        <div class="field"><label>Título do módulo</label><input type="text" data-nmtit="${c.id}" placeholder="Ex.: Fundamentos" maxlength="80"></div>
        <div class="field"><label>Horas estimadas</label><input type="number" data-nmh="${c.id}" min="1" max="200" value="20"></div>
        <div class="field" style="visibility:hidden"><label>.</label><input type="text" disabled></div>
        <button class="btn-add" data-nmadd="${c.id}">${ic("plus",14)} Adicionar módulo</button>
      </div>
    </div>`).join("");
  box.onclick=e=>{
    const ab=e.target.closest("[data-abrir]");
    if(ab){irPara({tipo:"trilha",tid:ab.getAttribute("data-abrir")});return;}
    const dt=e.target.closest("[data-deltri]");
    if(dt){
      const id=dt.getAttribute("data-deltri");
      if(confirm("Excluir esta trilha e seus módulos? Os conteúdos extras dela também serão removidos.")){
        customs=customs.filter(c=>c.id!==id);
        extras=extras.filter(x=>x.tid!==id);
        salvar();indexarExercicios();listarCustoms();
      }
      return;
    }
    const dm=e.target.closest("[data-delmod]");
    if(dm){
      const [id,nStr]=dm.getAttribute("data-delmod").split(":"),nn=Number(nStr);
      const c=customs.find(x=>x.id===id);
      if(c&&confirm("Excluir este módulo?")){
        c.modulos=c.modulos.filter(m=>m.n!==nn);
        extras=extras.filter(x=>!(x.tid===id&&x.mod===nn));
        salvar();listarCustoms();
      }
      return;
    }
    const na=e.target.closest("[data-nmadd]");
    if(na){
      const id=na.getAttribute("data-nmadd");
      const tit=document.querySelector(`[data-nmtit="${id}"]`).value.trim();
      const h=Number(document.querySelector(`[data-nmh="${id}"]`).value)||10;
      if(!tit){alert("Dê um título ao módulo.");return;}
      const c=customs.find(x=>x.id===id);
      const nn=c.modulos.length?Math.max(...c.modulos.map(m=>m.n))+1:1;
      c.modulos.push({n:nn,titulo:tit,h,topicos:""});
      salvar();listarCustoms();
    }
  };
}

/* ---------------- configurações ---------------- */
function renderConfig(){
  crumb.textContent="Configurações";
  content.innerHTML=`
    <div class="hero solo">
      <div>
        <div class="eyebrow">preferências e dados</div>
        <h1>${ic("gear",26)} Configura<em>ções</em></h1>
        <p class="sub">Ajuste seu ritmo, faça backup do progresso (recomendado, já que os dados ficam no navegador) e gerencie seus dados.</p>
      </div>
    </div>
    <div class="panel mt">
      <h2>${ic("flag",14)} Ritmo de estudo padrão</h2>
      <div class="ritmo">
        <label for="cfgRitmo">Horas por semana:</label>
        <select id="cfgRitmo">
          <option value="20">Acelerado — 20 h/semana</option>
          <option value="16">Intensivo — 16 h/semana</option>
          <option value="12">Intermediário — 12 h/semana</option>
          <option value="9">Sustentável — 9 h/semana</option>
        </select>
      </div>
    </div>
    <div class="panel mt">
      <h2>${ic("down",14)} Backup dos dados</h2>
      <p style="font-size:13px;color:var(--ink-soft);margin-bottom:10px">O progresso fica salvo no seu navegador. Exporte um arquivo de backup para não perder nada ao trocar de máquina ou limpar o navegador.</p>
      <div class="acts">
        <button class="btn-add" id="btnExport">${ic("down",14)} Exportar backup (.json)</button>
      </div>
      <div class="field" style="margin-top:14px"><label for="impArea">Importar backup — cole o conteúdo do arquivo aqui</label>
        <textarea id="impArea" rows="4" placeholder='{"estado":…}'></textarea></div>
      <div class="acts" style="margin-top:8px"><button class="btn-ghost" id="btnImport">${ic("up",14)} Importar</button></div>
      <div class="form-msg" id="cfgMsg"></div>
    </div>
    <div class="panel mt">
      <h2>${ic("trash",14)} Zona de risco</h2>
      <div class="acts">
        <button class="btn-warn" id="btnResetProg">${ic("reset",13)} Zerar progresso (mantém trilhas e extras)</button>
        <button class="btn-warn" id="btnResetAll">${ic("trash",13)} Apagar tudo (progresso, extras e trilhas pessoais)</button>
      </div>
    </div>`;
  const sel=document.getElementById("cfgRitmo");
  sel.value=String(config.ritmo||9);
  sel.addEventListener("change",()=>{config.ritmo=Number(sel.value);salvar();});
  document.getElementById("btnExport").addEventListener("click",()=>{
    const blob=new Blob([JSON.stringify({estado,extras,customs,config},null,2)],{type:"application/json"});
    const a=document.createElement("a");
    a.href=URL.createObjectURL(blob);a.download="studyhub-backup.json";a.click();
    URL.revokeObjectURL(a.href);
  });
  document.getElementById("btnImport").addEventListener("click",()=>{
    const msg=document.getElementById("cfgMsg");
    try{
      const d=JSON.parse(document.getElementById("impArea").value);
      if(!d||typeof d!=="object")throw new Error("formato");
      estado=d.estado||{};extras=d.extras||[];customs=d.customs||[];config=d.config||{ritmo:9};
      salvar();indexarExercicios();
      msg.className="form-msg ok";msg.textContent="Backup importado com sucesso!";
      atualizarUI();
    }catch(e){msg.className="form-msg err";msg.textContent="Não consegui ler esse JSON — confira se colou o arquivo inteiro.";}
  });
  document.getElementById("btnResetProg").addEventListener("click",()=>{
    if(confirm("Zerar todo o progresso (checkmarks e testes)? Trilhas e conteúdos extras serão mantidos.")){estado={};salvar();atualizarUI();alert("Progresso zerado.");}
  });
  document.getElementById("btnResetAll").addEventListener("click",()=>{
    if(confirm("Apagar TUDO: progresso, conteúdos extras e trilhas pessoais? Essa ação não tem volta (exporte um backup antes)." )){
      estado={};extras=[];customs=[];salvar();indexarExercicios();irPara({tipo:"home"});
    }
  });
}

/* ---------------- viewer ---------------- */
function renderViewer(v){
  crumb.textContent="Visualizando: "+v.nome;
  content.innerHTML=`
    <div class="viewer-bar">
      <button id="vBack">${ic("arrL",14)} Voltar</button>
      <a href="${v.url}" target="_blank" rel="noopener">${ic("ext",13)} Abrir em nova aba</a>
      <span style="font-family:var(--mono);font-size:12px;color:var(--ink-soft);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:50%">${v.url}</span>
    </div>
    <iframe class="viewer-frame" src="${v.url}" referrerpolicy="strict-origin-when-cross-origin" title="${escapeHtml(v.nome)}"></iframe>
    <div class="viewer-note">Se a janela ficar em branco, este site bloqueia a exibição dentro de outros portais (proteção do próprio site). Use "Abrir em nova aba" — e volte aqui para marcar como concluído.</div>`;
  document.getElementById("vBack").addEventListener("click",()=>{
    if(v.voltar)irPara(v.voltar);else irPara({tipo:"home"});
  });
}

/* ---------------- eventos globais ---------------- */
content.addEventListener("change",e=>{
  const id=e.target.getAttribute&&e.target.getAttribute("data-chk");
  if(!id)return;
  if(e.target.checked)estado[id]=true;else delete estado[id];
  const item=e.target.closest(".item");
  if(item)item.classList.toggle("feito",e.target.checked);
  atualizarUI();salvar();
});
content.addEventListener("click",e=>{
  const dx=e.target.closest("[data-delx]");
  if(dx){
    delExtra(dx.getAttribute("data-delx"));
    if(viewAtual.tipo==="mod")renderModulo(viewAtual.tid,viewAtual.n);
    else if(viewAtual.tipo==="area")renderArea();
    atualizarUI();
    return;
  }
  const v=e.target.closest("[data-view]");
  if(v){
    irPara({tipo:"viewer",url:v.getAttribute("data-view"),nome:v.getAttribute("data-nome"),
      tid:viewAtual.tid,voltar:Object.assign({},viewAtual)});
    return;
  }
  const ph=e.target.closest(".ph");
  if(ph){const fr=ph.parentElement;
    fr.innerHTML=`<iframe src="${fr.getAttribute("data-src")}" title="Player do YouTube" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;return;}
  const run=e.target.closest("[data-run]");
  if(run){const ex=EXIDX[run.getAttribute("data-run")];if(ex)executarExercicio(ex,run);return;}
  const rst=e.target.closest("[data-reset]");
  if(rst){const ex=EXIDX[rst.getAttribute("data-reset")];
    if(ex)rst.closest(".ex-body").querySelector(".editor").value=ex.starter;}
});
content.addEventListener("keydown",e=>{
  const ph=e.target.closest&&e.target.closest(".ph");
  if(ph&&(e.key==="Enter"||e.key===" ")){e.preventDefault();ph.click();}
});

/* ---------------- boot ---------------- */
(async function(){
  montarNav();
  await carregar();
  indexarExercicios();
  irPara({tipo:"home"});
})();
