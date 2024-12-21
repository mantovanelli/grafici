
async function fetchDataFromNotion() {
    const notionDatabaseID = 'your-database-id'; // Sostituisci con l'ID del tuo database
    const token = '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'; // Sostituisci con il tuo token di accesso

    const response = await fetch(`https://api.notion.com/v1/databases/${notionDatabaseID}/query`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    return data.results; // Torna i risultati
}

function createChart(data) {
    const dates = data.map(item => item.properties['Data di Controllo'].date.start); // Assicurati che il campo 'Data di Controllo' sia un campo di tipo data in Notion
    const expenses = data.map(item => item.properties['Spesa'].number); // Assicurati che 'Spesa' sia un campo numerico
    const returns = data.map(item => item.properties['Resa'].number); // Assicurati che 'Resa' sia un campo numerico
    const percentage = data.map(item => item.properties['% spesa'].number); // Assicurati che '% spesa' sia un campo numerico
    const profit = data.map(item => item.properties['Utile'].number); // Assicurati che 'Utile' sia un campo numerico

    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line', // Grafico a linee
        data: {
            labels: dates, // Date sull'asse X
            datasets: [
                {
                    label: 'Spesa',
                    data: expenses,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: false,
                    borderWidth: 2
                },
                {
                    label: 'Resa',
                    data: returns,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    fill: false,
                    borderWidth: 2
                },
                {
                    label: '% Spesa',
                    data: percentage,
                    borderColor: 'rgba(255, 159, 64, 1)',
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    fill: false,
                    borderWidth: 2
                },
                {
                    label: 'Utile',
                    data: profit,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: false,
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Data di Controllo'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Valori'
                    }
                }
            }
        }
    });
}

// Recupera i dati da Notion e crea il grafico
fetchDataFromNotion().then(data => {
    createChart(data);
}).catch(error => console.error("Errore nel recupero dei dati:", error));
