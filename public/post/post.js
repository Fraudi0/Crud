const API = '/api/pessoas'

const campos = ['nome', 'sobrenome', 'email', 'idade', 'telefone', 'rua', 'bairro', 'cidade', 'estado', 'rg']

function mostrarMensagem(texto, classe) {
    let msg = document.getElementById('mensagem')
    msg.innerHTML = texto
    msg.className = classe
}

async function cadastrar() {
    console.log("Apertou cadastrar")

    let pessoa = {}

    for (let i = 0; i < campos.length; i++) {
        let valor = document.getElementById(campos[i]).value.trim()

        if (valor == "") {
            mostrarMensagem("Preencha todos os campos!", "erro")
            return
        }

        pessoa[campos[i]] = valor
    }

    pessoa.idade = Number(pessoa.idade)

    try {
        let resposta = await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pessoa)
        })

        if (!resposta.ok) {
            throw new Error("Erro " + resposta.status)
        }

        mostrarMensagem("Pessoa cadastrada com sucesso!", "sucesso")

        for (let i = 0; i < campos.length; i++) {
            document.getElementById(campos[i]).value = ""
        }
    } catch (erro) {
        console.log(erro)
        mostrarMensagem("Erro ao cadastrar. Tente novamente.", "erro")
    }
}
