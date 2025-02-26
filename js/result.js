document.addEventListener("DOMContentLoaded", () => { 
    const themeSizes = [10, 10, 10, 10, 5, 5]; // Nombre de questions par thème (50 au total)
    const themeNames = [
        "Innocence générale",
        "Expériences sociales",
        "Amour & Romance",
        "Expériences sexuelles",
        "Drogues & Alcool",
        "Légalité & Illégalité"
    ];

    const storedAnswers = localStorage.getItem("answers");

    if (!storedAnswers) {
        document.getElementById("result-container").innerHTML = "<p>Erreur : aucun score trouvé. Assurez-vous d'avoir terminé le test.</p>";
        return;
    }

    const answers = JSON.parse(storedAnswers);

    // Vérifier si on a bien 50 réponses
    if (answers.length !== 50) {
        document.getElementById("result-container").innerHTML = `<p>Erreur : nombre de réponses incorrect (${answers.length}/50). Veuillez recommencer le test.</p>`;
        return;
    }

    let scores = [];
    let startIndex = 0;

    themeSizes.forEach((size, index) => {
        let yesCount = answers.slice(startIndex, startIndex + size).filter(answer => answer === "yes").length;
        let score = Math.round((yesCount / size) * 100); // Plus le score est élevé, plus l'impureté est grande
        scores.push(score);
        startIndex += size;
    });

    const resultContainer = document.getElementById("result-container");
    resultContainer.innerHTML = "<h2>Résultats par catégorie :</h2>";

    scores.forEach((score, index) => {
        resultContainer.innerHTML += `
            <div class="result-item">
                <h3>${themeNames[index]}</h3>
                <p>Score d'impureté : <strong>${score}%</strong></p>
                <div class="progress-bar">
                    <div class="progress" style="width: ${score}%; background-color: ${getProgressColor(score)};"></div>
                </div>
            </div>
        `;
    });

    let globalScore = scores.reduce((a, b) => a + b, 0) - 250; // Score global en points (peut être négatif)

    resultContainer.innerHTML += `
        <h2>Score de pureté global : <strong>${globalScore} points</strong></h2>
        <p>${getScoreMessage(globalScore)}</p>
    `;
});

// Fonction qui change la couleur de la barre de progression
function getProgressColor(score) {
    if (score <= 10) return "#00ff00"; // Vert (très pur)
    if (score <= 30) return "#a0ff00"; // Jaune-vert
    if (score <= 50) return "#ffff00"; // Jaune
    if (score <= 70) return "#ff8000"; // Orange
    return "#ff0000"; // Rouge (très impur)
}

// Fonction qui affiche un message en fonction du score global
function getScoreMessage(score) {
    if (score <= -100) return "Tu es un ange pur ! 😇";
    if (score <= 0) return "Plutôt sage, mais pas totalement innocent(e) ! 😉";
    if (score <= 100) return "Un(e) aventurier(e) modéré(e)... 😏";
    if (score <= 200) return "Tu as bien vécu, et ça se voit ! 😈";
    return "Une LÉGENDE de la débauche. 🔥";
}
