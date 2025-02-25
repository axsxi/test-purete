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
        let score = Math.round(((size - yesCount) / size) * 100);
        scores.push(score);
        startIndex += size;
    });

    const resultContainer = document.getElementById("result-container");
    resultContainer.innerHTML = "<h2>Résultats par catégorie :</h2>";

    scores.forEach((score, index) => {
        resultContainer.innerHTML += `
            <div class="result-item">
                <h3>${themeNames[index]}</h3>
                <p>Score : <strong>${score}%</strong></p>
                <div class="progress-bar">
                    <div class="progress" style="width: ${score}%;"></div>
                </div>
            </div>
        `;
    });

    let globalScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    resultContainer.innerHTML += `
        <h2>Score de pureté global : <strong>${globalScore}%</strong></h2>
        <p>${getScoreMessage(globalScore)}</p>
    `;
});

// Fonction qui affiche un message en fonction du score global
function getScoreMessage(score) {
    if (score === 100) return "Tu es un ange pur ! 😇";
    if (score >= 80) return "Plutôt sage, mais pas totalement innocent(e) ! 😉";
    if (score >= 50) return "Un(e) aventurier(e) modéré(e)... 😏";
    if (score >= 30) return "Tu as bien vécu, et ça se voit ! 😈";
    return "Une LÉGENDE de la débauche. 🔥";
}

document.addEventListener("DOMContentLoaded", () => { 
    const drinkCount = localStorage.getItem("drinkCount") || 0;
    
    let verres = Math.floor(drinkCount / 10); // 1 verre tous les 10 "Oui"
    let shots = Math.floor(drinkCount / 25); // 1 shot tous les 25 "Oui"
    let gorgéesRestantes = drinkCount % 10; // Gorgées qui ne forment pas un verre complet

    let drinkMessage = `<h2>Pénalité : ${drinkCount} gorgées à boire 🍻</h2>`;

    if (verres > 0) {
        drinkMessage += `<p>💥 Tu dois boire ${verres} verre(s) entier(s) ! 🍷</p>`;
    }

    if (shots > 0) {
        drinkMessage += `<p>🔥 En plus, ${shots} shot(s) pour fêter ça ! 🥃</p>`;
    }

    // On affiche seulement les gorgées restantes si elles sont pertinentes
    if (gorgéesRestantes > 0 && verres === 0) {
        drinkMessage += `<p>Tu dois boire ${gorgéesRestantes} gorgée(s)... courage ! 😈</p>`;
    }

    const resultContainer = document.getElementById("result-container");
    resultContainer.innerHTML += drinkMessage;
});
