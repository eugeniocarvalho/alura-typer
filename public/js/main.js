const tempoInicial = $("#tempo-digitacao").text();
const campo = $(".campo-digitacao");
const frase = $(".frase").text();


// igual a $(document).ready()
$(() => {
  atualizaTamanhoFrase();
  inicializaContadores();
  inicializaConometro();
  inicializaMarcadores();
  $("#botao-reiniciar").click(reiniciaJogo);

});


function atualizaTamanhoFrase() {
  const numeroFrase = $(".frase").text().split(/\S+/).length;
  $("#tamanho-frase").text(numeroFrase - 1);
}


function inicializaContadores() {
  campo.on("input", () => {
    const numerosCaracteres = campo.val().length;

    $("#contador-caracteres").text(numerosCaracteres);
    $("#contador-palavras").text(campo.val().split(/\S+/).length - 1);
  });
}


function inicializaMarcadores() {
  campo.on("input", function () {
    const digitado = campo.val();
    const comparavel = frase.substr(0, digitado.length);
    
    if (digitado == comparavel) {
      campo.removeClass("borda-vermelho");
      campo.addClass("borda-verde");
    }
    else {
      campo.removeClass("borda-verde");
      campo.addClass("borda-vermelho");
      
    }
    
  });
}

  
function inicializaConometro() {
  let tempoRestante = $("#tempo-digitacao").text();

  campo.one("focus", () => {
    const cronometro = setInterval(() => {
      if (tempoRestante <= 1) {
        clearInterval(cronometro);
        finalizaJogo();
      }
      
      tempoRestante--;
      
      $("#tempo-digitacao").text(tempoRestante);
      
    }, 1000);
  });
}


function finalizaJogo() {
  campo.attr("disabled", true);
  campo.toggleClass("campo-desativado");
  
  inserePlacar();
}


function reiniciaJogo() {
  campo.val("");
  campo.attr("disabled", false);
  campo.removeClass("campo-desativado");
  campo.removeClass("borda-vermelho");
  campo.removeClass("borda-verde");

  $("#tempo-digitacao").text(tempoInicial);
  $("#contador-caracteres").text("0");
  $("#contador-palavras").text("0");
  inicializaConometro();
}


function inserePlacar() {
  const corpoTabela = $(".placar").find("tbody");
  const nomeUsuario = "Eugênio";
  const numPalavras = $("#contador-palavras").text();

  const linha = novaLinha(nomeUsuario, numPalavras);

  linha.find(".botao-remover").click(removeLinha);

  // adiciona depois
  // corpoTabela.append(linha);
  
  // add antes
  corpoTabela.prepend(linha);
}

function novaLinha(usuario, numPalavras) {

  const linha = $("<tr>");
  const colunaUsuario = $("<td>").text(usuario);
  const colunaPalavras = $("<td>").text(numPalavras + " palavras");
  const colunaRemover = $("<td>");

  const link = $("<a>").attr("href", "#").addClass("botao-remover");
  const icone = $("<i>").addClass("small").addClass("material-icons").addClass("icone-excluir").text("delete");

  link.append(icone);

  colunaRemover.append(link);

  linha.append(colunaUsuario);
  linha.append(colunaPalavras);
  linha.append(colunaRemover);

  return linha;
}


function removeLinha() {

  event.preventDefault();
  $(this).parent().parent().remove();

}