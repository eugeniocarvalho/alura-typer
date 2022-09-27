$("#botao-placar").click(mostraPlacar);


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

  $(".placar").slideDown(500);
  scrollPlacar();
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

  const linha = $(this).parent().parent();

  linha.fadeOut();

  setTimeout(() => {
    linha.remove();

  }, 1000);
}


function mostraPlacar() {
  $(".placar").stop().slideToggle(650);
}


function scrollPlacar() {
  const posicaoPlacar = $(".placar").offset().top;

  $("html").animate({
    scrollTop: posicaoPlacar + "px"
  }, 1000);
}