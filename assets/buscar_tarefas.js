function carregarTarefas() {
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    
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

        // Criando o botão de avançar status da tarefa
        let avancarStatusBtn = document.createElement("button");
        avancarStatusBtn.textContent = ">>";
        avancarStatusBtn.classList.add("avanca-btn");
        avancarStatusBtn.onclick = function() {
            if (tarefa.status === "para_fazer") {
                tarefa.status = "em_producao";
            } else if (tarefa.status === "em_producao") {
                tarefa.status = "finalizada";
            }

            localStorage.setItem("tarefas", JSON.stringify(tarefas));
            return carregarTarefas();
        };

        // Adicionando o botão ao post-it
        postit.appendChild(avancarStatusBtn);

        //Criando o botão de retroceder status da tarefa
        let retrocederStatusBtn = document.createElement("button");
        retrocederStatusBtn.textContent = "<<";
        retrocederStatusBtn.classList.add("retrocede-btn");
        retrocederStatusBtn.onclick = function() {
            if (tarefa.status === "em_producao") {
                tarefa.status = "para_fazer";
            } else if (tarefa.status === "finalizada") {
                tarefa.status = "em_producao";
            }

            localStorage.setItem("tarefas", JSON.stringify(tarefas));
            return carregarTarefas();
        };

        // Adicionando o botão ao post-it
        postit.appendChild(retrocederStatusBtn);

        // Adicionando o post-it à coluna correspondente
        
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