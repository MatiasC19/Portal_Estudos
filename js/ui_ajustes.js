/* =====================================================================
   StudyHub — ajustes de interface (carregado após js/app.js)
   Ajuste 1: o formulário de conteúdo extra passa a existir SOMENTE na
   Minha área. Dentro dos módulos, no lugar do formulário, aparece um
   atalho discreto "Adicionar pela Minha área".
   (Este arquivo sobrescreve formExtra() definida em js/app.js; numa
   próxima manutenção pode ser consolidado direto no app.js.)
   ===================================================================== */
(function(){
  if(typeof formExtra!=="function")return;
  var formExtraOriginal=formExtra;
  formExtra=function(tidFixo,modFixo){
    /* chamada vinda de dentro de um módulo (trilha+módulo fixos):
       não renderiza mais o formulário — só o atalho para a Minha área */
    if(tidFixo){
      return '<div class="panel mt">'+
        '<h2>'+ic("star",14)+' Quer adicionar v\u00eddeos, artigos ou livros a este m\u00f3dulo?</h2>'+
        '<p style="font-size:13px;color:var(--ink-soft);margin-bottom:10px">A curadoria pessoal fica centralizada na <b>Minha \u00e1rea</b>: l\u00e1 voc\u00ea escolhe a trilha e o m\u00f3dulo de destino, e o conte\u00fado aparece aqui como "extra", contando no progresso.</p>'+
        '<div class="acts"><button type="button" class="btn-add" data-goarea>'+ic("star",14)+' Adicionar pela Minha \u00e1rea</button></div>'+
        '</div>';
    }
    return formExtraOriginal(tidFixo,modFixo);
  };
  /* navegação do atalho (delegação — vale para qualquer módulo) */
  content.addEventListener("click",function(e){
    var g=e.target.closest&&e.target.closest("[data-goarea]");
    if(g)irPara({tipo:"area"});
  });
})();
