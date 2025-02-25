const questions = [
  // 🟠 Innocence générale (Mensonges, tricherie, vandalisme...)
  "As-tu déjà menti à un proche pour éviter des ennuis ?",
  "As-tu déjà triché à un examen ou un contrôle ?",
  "As-tu déjà volé quelque chose (même une petite chose) ?",
  "As-tu déjà été collé(e) ou puni(e) à l’école ?",
  "As-tu déjà vandalisé un bien public ou privé ?",
  "As-tu déjà insulté un professeur ou une figure d’autorité ?",
  "As-tu déjà été impliqué(e) dans une bagarre ?",
  "As-tu déjà fait semblant d’être malade pour éviter quelque chose ?",
  "As-tu déjà piraté un compte ou utilisé un mot de passe qui ne t’appartenait pas ?",
  "As-tu déjà falsifié une signature ou un document officiel ?",

  // 🟡 Expériences sociales (Relations, amitiés, disputes...)
  "As-tu déjà ghosté un(e) ami(e) sans explication ?",
  "As-tu déjà coupé contact avec un(e) ami(e) de longue date ?",
  "As-tu déjà eu un(e) meilleur(e) ami(e) ?",
  "As-tu déjà eu une dispute qui a dégénéré en bagarre physique ?",
  "As-tu déjà fait du commérage sur quelqu’un ?",
  "As-tu déjà été trahi(e) par un(e) ami(e) proche ?",
  "As-tu déjà rencontré quelqu’un que tu ne connaissais que via Internet ?",
  "As-tu déjà pleuré à cause d’un(e) ami(e) ?",
  "As-tu déjà menti à un(e) ami(e) pour te sortir d’une situation difficile ?",
  "As-tu déjà volontairement ignoré un message alors que tu l’avais vu ?",

  // 🩷 Amour & Romance (Premier baiser, relation sérieuse...)
  "As-tu déjà eu un crush sur quelqu’un ?",
  "As-tu déjà avoué tes sentiments à quelqu’un ?",
  "As-tu déjà été en couple ?",
  "As-tu déjà embrassé quelqu’un sur la bouche ?",
  "As-tu déjà eu une relation de plus de 6 mois ?",
  "As-tu déjà dit 'je t’aime' à quelqu’un en le pensant vraiment ?",
  "As-tu déjà eu le cœur brisé ?",
  "As-tu déjà eu un rendez-vous amoureux ?",
  "As-tu déjà pleuré à cause d’une relation amoureuse ?",
  "As-tu déjà écrit une lettre ou un long message d’amour à quelqu’un ?",

  // ❤️ Expériences sexuelles (Flirts, relations, expériences variées...)
  "As-tu déjà flirté avec quelqu’un ?",
  "As-tu déjà été dragué(e) en public ?",
  "As-tu déjà eu une relation sexuelle ?",
  "As-tu déjà eu une expérience intime dans un lieu public ?",
  "As-tu déjà envoyé une photo suggestive à quelqu’un ?",
  "As-tu déjà reçu une photo osée de quelqu’un ?",
  "As-tu déjà eu une relation d’un soir ?",
  "As-tu déjà regretté une expérience sexuelle ?",
  "As-tu déjà été attiré(e) par quelqu’un qui était en couple ?",
  "As-tu déjà trompé quelqu’un ou été trompé(e) ?",

  // 🍷 Drogues & Alcool (Alcool, tabac, substances...)
  "As-tu déjà bu de l’alcool ?",
  "As-tu déjà été ivre ?",
  "As-tu déjà fumé une cigarette ?",
  "As-tu déjà essayé une drogue autre que le tabac ou l’alcool ?",
  "As-tu déjà eu un black-out à cause de l’alcool ?",

  // ⚖️ Légalité & Illégalité (Vols, fraude, délits...)
  "As-tu déjà volé dans un magasin ?",
  "As-tu déjà fraudé dans les transports en commun ?",
  "As-tu déjà eu affaire à la police ?",
  "As-tu déjà conduit sans permis ou pris des risques au volant ?",
  "As-tu déjà fait quelque chose d’illégal sans te faire attraper ?"
];

let currentQuestionIndex = 0;
let answers = [];
let drinkCount = 0;

// Récupérer la liste des joueurs stockée en localStorage
const players = JSON.parse(localStorage.getItem("players"));

if (!players || players.length === 0) {
  console.error("Aucun joueur trouvé, utilisation des valeurs par défaut.");
} else {
  console.log("Joueurs chargés :", players);
}

function getRandomPlayer() {
  if (players.length > 0) {
    return players[Math.floor(Math.random() * players.length)];
  }
  return "Quelqu'un"; // Sécurité si la liste est vide
}

// Nettoyer les anciennes réponses avant de démarrer un nouveau test
localStorage.removeItem("answers");
localStorage.removeItem("drinkCount");

// Fonction pour charger la question actuelle
function loadQuestion() {
  const container = document.getElementById("questions-container");
  container.innerHTML = "";

  if (currentQuestionIndex < questions.length) {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    const questionText = document.createElement("p");
    questionText.textContent = questions[currentQuestionIndex];

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    const yesButton = document.createElement("button");
    yesButton.classList.add("btn");
    yesButton.textContent = "Oui";
    yesButton.onclick = () => answerQuestion("yes");

    const noButton = document.createElement("button");
    noButton.classList.add("btn");
    noButton.textContent = "Non";
    noButton.onclick = () => answerQuestion("no");

    buttonContainer.appendChild(yesButton);
    buttonContainer.appendChild(noButton);

    questionDiv.appendChild(questionText);
    questionDiv.appendChild(buttonContainer);
    
    container.appendChild(questionDiv);
  } else {
    localStorage.setItem("answers", JSON.stringify(answers));
    localStorage.setItem("drinkCount", drinkCount);
    window.location.href = "/test-purete/html/result.html";
  }
}

// Fonction pour enregistrer la réponse et passer à la question suivante
function answerQuestion(answer) {
  console.log("Réponse donnée :", answer);

  answers.push(answer);

  if (answer === "yes") {
    drinkCount++;
    const selectedPlayer = getRandomPlayer();
    console.log("Le joueur sélectionné est :", selectedPlayer);

    // Vérification et affichage du pop-up
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popup-message");

    if (popup && popupMessage) {
      console.log("Le pop-up a été trouvé, affichage en cours...");
      popupMessage.innerText = `${selectedPlayer} doit boire une gorgée ! 🍻`;
      popup.style.display = "flex";  // Mettre en display:flex au lieu de block
      popup.style.justifyContent = "center"; 
      popup.style.alignItems = "center"; 
    } else {
      console.error("Erreur : le pop-up ou son message n'a pas été trouvé dans le DOM.");
    }
  } else {
    console.log("Passage à la question suivante.");
    currentQuestionIndex++;
    loadQuestion();
  }
}

document.addEventListener("DOMContentLoaded", loadQuestion);
