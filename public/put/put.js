const API = '/api/pessoas'

const campos = ['nome', 'sobrenome', 'email', 'idade', 'telefone', 'rua', 'bairro', 'cidade', 'estado', 'rg']

window.onload = function () {
    console.log("Página carregada")
    carregarLista()
}

function mostrarMensagem(texto, classe) {
    let msg = document.getElementById('mensagem')
    msg.innerHTML = texto
    msg.className = classe
}

async function carregarLista() {
    try {
        let resposta = await fetch(API)

        if (!resposta.ok) {
            throw new Error("Erro " + resposta.status)
        }

        let pessoas = await resposta.json()
        let select = document.getElementById('selecionar')

        select.innerHTML = '<option value="">Selecione</option>'

        pessoas.forEach(function (p) {
            let opcao = document.createElement('option')
            opcao.value = p.id
            opcao.innerHTML = p.id + " - " + p.nome + " " + p.sobrenome
            select.appendChild(opcao)
        })
    } catch (erro) {
        console.log(erro)
        mostrarMensagem("Erro ao carregar a lista.", "erro")
    }
}

async function carregarPessoa() {
    let id = document.getElementById('selecionar').value
    let form = document.getElementById('formEdicao')

    if (id == "") {
        form.style.display = "none"
        return
    }

    try {
        let resposta = await fetch(API + "/" + id)

        if (!resposta.ok) {
            throw new Error("Erro " + resposta.status)
        }

        let pessoa = await resposta.json()

        for (let i = 0; i < campos.length; i++) {
            document.getElementById(campos[i]).value = pessoa[campos[i]]
        }

        form.style.display = "block"
        mostrarMensagem("", "")
    } catch (erro) {
        console.log(erro)
        mostrarMensagem("Erro ao carregar a pessoa.", "erro")
    }
}

async function atualizar() {
    console.log("Apertou salvar")

    let id = document.getElementById('selecionar').value
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
    pessoa.id = Number(id)

    try {
        let resposta = await fetch(API + "/" + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pessoa)
        })

        if (!resposta.ok) {
            throw new Error("Erro " + resposta.status)
        }

        mostrarMensagem("Pessoa atualizada com sucesso!", "sucesso")
        carregarLista()
    } catch (erro) {
        console.log(erro)
        mostrarMensagem("Erro ao atualizar. Tente novamente.", "erro")
    }
}
