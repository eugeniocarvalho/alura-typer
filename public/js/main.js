const tempoInicial = $("#tempo-digitacao").text();
const campo = $(".campo-digitacao");

// igual a $(document).ready()
$(() =>{
  atualizaTamanhoFrase();
  inicializaContadores();
  inicializaConometro();
  $("#botao-reiniciar").click(reiniciaJogo);

});


function atualizaTamanhoFrase() {
  const numeroFrase = $(".frase").text().split(/\S+/).length;
  $("#tamanho-frase").text(numeroFrase);
}


function inicializaContadores() {
  campo.on("input", () => {
    const numerosCaracteres = campo.val().length;

    $("#contador-caracteres").text(numerosCaracteres);
    $("#contador-palavras").text(campo.val().split(/\S+/).length - 1);
  });
}


function inicializaConometro() {
  let tempoRestante = $("#tempo-digitacao").text();

  campo.one("focus", () => {
    const cronometro = setInterval(() => {
      if (tempoRestante <= 1) {
        campo.attr("disabled", true);
        campo.toggleClass("campo-desativado");
        clearInterval(cronometro);
      }

      tempoRestante--;

      $("#tempo-digitacao").text(tempoRestante);

    }, 1000);
  });
}


function reiniciaJogo() {
  campo.val("");
  campo.attr("disabled", false);
  $("#tempo-digitacao").text(tempoInicial);
  $("#contador-caracteres").text("0");
  $("#contador-palavras").text("0");
  inicializaConometro();
  campo.toggleClass("campo-desativado");
}