const numeroFrase = $(".frase").text().split(/\S+/).length;

$("#tamanho-frase").text(numeroFrase);

const campo = $(".campo-digitacao");

campo.on("input", () => {
  const numerosCaracteres = campo.val().length;

  $("#contador-caracteres").text(numerosCaracteres);
  $("#contados-palavras").text(campo.val().split(/\S+/).length - 1)
});
