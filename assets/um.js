document.getElementById("formTarefa").addEventListener("submit", function(event) {
    event.preventDefault();

    let descricao = document.getElementById("descricao").value;
    let status = document.getElementById("status").value;

    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    let novaTarefa = {
        id: Date.now(),
        descricao,
        status,
        tempoProducao: 0
    };

    tarefas.push(novaTarefa);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    alert("Tarefa adicionada!");
    this.reset();
});