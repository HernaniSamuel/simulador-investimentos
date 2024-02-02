document.getElementById('simuladorForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let valorConta = parseFloat(document.getElementById('valorConta').value);
    const valorMensal = parseFloat(document.getElementById('valorMensal').value);
    const rentabilidadeMedia = parseFloat(document.getElementById('rentabilidadeMedia').value) / 100;
    const valorAlmejado = parseFloat(document.getElementById('valorAlmejado').value);

    let mesAtual = 0;
    let valoresConta = [valorConta];
    let aplicacoesMensais = [valorConta]; // Inicializa com o valor em conta
    let acumuladoMensal = valorConta;

    while (valorConta < valorAlmejado) {
        let rendimentoMes = valorConta * rentabilidadeMedia;
        valorConta += valorMensal + rendimentoMes;
        mesAtual++;
        acumuladoMensal += valorMensal;

        valoresConta.push(valorConta);
        aplicacoesMensais.push(acumuladoMensal);
    }

    let anos = Math.floor(mesAtual / 12);
    let meses = mesAtual % 12;
    document.getElementById('tempoNecessario').textContent = `Tempo necessário: ${anos} ano(s) e ${meses} mês(es)`;

    desenharGrafico(valoresConta, aplicacoesMensais, mesAtual);
});

// Atualize a função desenharGrafico conforme necessário


function desenharGrafico(valoresConta, aplicacoesMensais, totalMeses) {
    var ctx = document.getElementById('graficoInvestimento').getContext('2d');
    if (window.graficoInvestimento && typeof window.graficoInvestimento.destroy === 'function') {
        window.graficoInvestimento.destroy();
    }

    window.graficoInvestimento = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: totalMeses}, (_, i) => `Mês ${i + 1}`),
            datasets: [{
                label: 'Valor Total em Conta',
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                borderColor: 'rgba(0, 123, 255, 1)',
                data: valoresConta,
            }, {
                label: 'Aplicação Mensal Acumulada',
                backgroundColor: 'rgba(255, 193, 7, 0.2)',
                borderColor: 'rgba(255, 193, 7, 1)',
                data: aplicacoesMensais,
            }]
        },
        options: {}
    });
}

