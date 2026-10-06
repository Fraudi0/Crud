const API = '/api/pessoas'

window.onload = function () {
    console.log("Página carregada")
    listarPessoas()
}

function mostrarMensagem(texto, classe) {
    let msg = document.getElementById('mensagem')
    msg.innerHTML = texto
    msg.className = classe
}

async function listarPessoas() {
    let corpo = document.getElementById('listaPessoas')

    try {
        let resposta = await fetch(API)

        if (!resposta.ok) {
            throw new Error("Erro " + resposta.status)
        }

        let pessoas = await resposta.json()

        corpo.innerHTML = ""

        if (pessoas.length == 0) {
            mostrarMensagem("Nenhuma pessoa cadastrada.", "")
            return
        }

        pessoas.forEach(function (p) {
            let linha = document.createElement('tr')
            linha.innerHTML = `
                <td>${p.id}</td>
                <td>${p.nome} ${p.sobrenome}</td>
                <td>${p.email}</td>
                <td>${p.cidade}</td>
                <td><button class="btn-excluir" onclick="excluir(${p.id})">Excluir</button></td>
            `
            corpo.appendChild(linha)
        })
    } catch (erro) {
        console.log(erro)
        mostrarMensagem("Erro ao carregar a lista.", "erro")
    }
}

async function excluir(id) {
    console.log("Excluindo " + id)

    let confirmar = confirm("Tem certeza que deseja excluir esta pessoa?")

    if (!confirmar) {
        return
    }

    try {
        let resposta = await fetch(API + "/" + id, {
            method: 'DELETE'
        })

        if (!resposta.ok) {
            throw new Error("Erro " + resposta.status)
        }

        mostrarMensagem("Pessoa excluída com sucesso!", "sucesso")
        listarPessoas()
    } catch (erro) {
        console.log(erro)
        mostrarMensagem("Erro ao excluir. Tente novamente.", "erro")
    }
}
