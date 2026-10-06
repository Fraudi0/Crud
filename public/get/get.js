const API = '/api/pessoas'

window.onload = function () {
    console.log("Página carregada")
    listarPessoas()
}

async function listarPessoas() {
    let corpo = document.getElementById('listaPessoas')
    let msg = document.getElementById('mensagem')

    try {
        let resposta = await fetch(API)

        if (!resposta.ok) {
            throw new Error("Erro " + resposta.status)
        }

        let pessoas = await resposta.json()

        corpo.innerHTML = ""

        if (pessoas.length == 0) {
            msg.innerHTML = "Nenhuma pessoa cadastrada."
            return
        }

        msg.innerHTML = pessoas.length + " pessoa(s) cadastrada(s)"

        pessoas.forEach(function (p) {
            let linha = document.createElement('tr')
            linha.innerHTML = `
                <td>${p.id}</td>
                <td>${p.nome}</td>
                <td>${p.sobrenome}</td>
                <td>${p.email}</td>
                <td>${p.idade}</td>
                <td>${p.telefone}</td>
                <td>${p.rua}</td>
                <td>${p.bairro}</td>
                <td>${p.cidade}</td>
                <td>${p.estado}</td>
                <td>${p.rg}</td>
            `
            corpo.appendChild(linha)
        })
    } catch (erro) {
        console.log(erro)
        msg.className = "erro"
        msg.innerHTML = "Erro ao carregar a lista."
    }
}
