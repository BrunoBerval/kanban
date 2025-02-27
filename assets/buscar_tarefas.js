function carregarTarefas() {
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    document.getElementById("para_fazer").innerHTML = "<h2>Para Fazer</h2>";
    document.getElementById("em_producao").innerHTML = "<h2>Em Produção</h2>";
    document.getElementById("finalizada").innerHTML = "<h2>Finalizada</h2>";

    tarefas.forEach(tarefa => {
        let postit = document.createElement("div");
        postit.classList.add("postit", tarefa.urgencia); // Adiciona a classe correspondente à urgência
        
        let descricao = document.createElement("p");
        postit.textContent = tarefa.descricao;
        postit.appendChild(descricao);

        
        if (tarefa.status === "para_fazer" || tarefa.status === "em_producao") {
            let dataCriacao = document.createElement("p");
            dataCriacao.textContent = `Criado em: ${tarefa.data_de_criacao}`;
            postit.appendChild(dataCriacao);
        } else {
        let dataCriacao = document.createElement("p");
        dataCriacao.textContent = `Finalizado em: ${formatDate(new Date())}`;
        postit.appendChild(dataCriacao);}

        // Criando o botão de remover
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = function() {
            let tarefaDesc = tarefa.descricao; // Pega o ID da tarefa diretamente
            // Pega a lista de tarefas do localStorage, remove a tarefa e atualiza o localStorage
            localStorage.setItem("tarefas", JSON.stringify(
            JSON.parse(localStorage.getItem("tarefas")).filter(tarefa => tarefa.descricao !== tarefaDesc)
            ));
            postit.remove();
        };

        // Adicionando o botão ao post-it
        postit.appendChild(deleteBtn);
        
        if (tarefa.status === "para_fazer") {
            document.getElementById("para_fazer").appendChild(postit);
        } else if (tarefa.status === "em_producao") {
            document.getElementById("em_producao").appendChild(postit);
        } else {
            document.getElementById("finalizada").appendChild(postit);
        }  
    });
}

window.onload = carregarTarefas;