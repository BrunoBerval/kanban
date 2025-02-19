function carregarTarefas() {
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    document.getElementById("para_fazer").innerHTML = "<h2>Para Fazer</h2>";
    document.getElementById("em_producao").innerHTML = "<h2>Em Produção</h2>";
    document.getElementById("finalizada").innerHTML = "<h2>Finalizada</h2>";

    tarefas.forEach(tarefa => {
        let divTarefa = document.createElement("div");
        divTarefa.innerHTML = `${tarefa.descricao} <button onclick="mudarStatus(${tarefa.id})">Mudar Status</button>`;
        
        if (tarefa.status === "para_fazer") {
            document.getElementById("para_fazer").appendChild(divTarefa);
        } else if (tarefa.status === "em_producao") {
            document.getElementById("em_producao").appendChild(divTarefa);
            sessionStorage.setItem("tempo_" + tarefa.id, Date.now());
        } else {
            document.getElementById("finalizada").appendChild(divTarefa);
        }
    });
}

function mudarStatus(id) {
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    let tarefa = tarefas.find(t => t.id === id);
    
    if (tarefa.status === "para_fazer") {
        tarefa.status = "em_producao";
        sessionStorage.setItem("tempo_" + id, Date.now());
    } else if (tarefa.status === "em_producao") {
        tarefa.status = "finalizada";
        let inicio = sessionStorage.getItem("tempo_" + id);
        if (inicio) {
            let tempoFinal = Math.round((Date.now() - inicio) / 1000);
            tarefa.tempoProducao = tempoFinal;
            localStorage.setItem("tempoFinal_" + id, tempoFinal);
            sessionStorage.removeItem("tempo_" + id);
        }
    }

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    carregarTarefas();
}

window.onload = carregarTarefas;