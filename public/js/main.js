const numeroFrase = $(".frase").text().split(/\S+/).length;

$("#tamanho-frase").text(numeroFrase);

const campo = $(".campo-digitacao");

campo.on("input", () => {
  const numerosCaracteres = campo.val().length;

  $("#contador-caracteres").text(numerosCaracteres);
  $("#contados-palavras").text(campo.val().split(/\S+/).length - 1)
});

let tempoRestante = $("#tempo-digitacao").text();

campo.one("focus", () => {
  const cronometro = setInterval(() => {
    if (tempoRestante <= 1) {
      campo.attr("disabled", true);
      clearInterval(cronometro);
    }

    tempoRestante--;

    $("#tempo-digitacao").text(tempoRestante);

  }, 1000);
});