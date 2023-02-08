async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    try {


        var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaConvertida = await consultaCep.json();

        if (consultaConvertida.erro) {
            throw Error('Cep inválido');
        }

        var cidade = document.getElementById("cidade")
        var estado = document.getElementById("estado")
        var endereco = document.getElementById("endereco")
        var bairro = document.getElementById("bairro")


        cidade.value = consultaConvertida.localidade;
        estado.value = consultaConvertida.uf;
        endereco.value = consultaConvertida.logradouro;
        bairro.value = consultaConvertida.bairro

        return consultaConvertida

    } catch (erro) {
        mensagemErro.innerHTML = `<p>Cep não existe</p>`
    }


}

var cep = document.getElementById('cep');

cep.addEventListener("focusout", () => buscaEndereco(cep.value));
