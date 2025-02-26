const questions = [
  // Innocence générale (Mensonges, tricherie, vandalisme...)
  "As-tu déjà menti à un proche pour éviter des ennuis ?",
  "As-tu déjà triché à un examen ou un contrôle ?",
  "As-tu déjà volé quelque chose (même une petite chose) ?",
  "As-tu déjà été collé(e) ou puni(e) à l’école ?",
  "As-tu déjà vandalisé un bien public ou privé ?",
  "As-tu déjà affronté un professeur ou une figure d’autorité en l’insultant directement ?",
  "As-tu déjà été impliqué(e) dans une bagarre ?",
  "As-tu déjà fait semblant d’être malade pour éviter quelque chose ?",
  "As-tu déjà piraté un compte ou utilisé un mot de passe qui ne t’appartenait pas ?",
  "As-tu déjà falsifié une signature ou un document officiel ?",

  // Expériences sociales (Relations, amitiés, disputes...)
  "As-tu déjà ghosté un(e) ami(e) sans explication ?",
  "As-tu déjà coupé contact avec un(e) ami(e) de longue date ?",
  "As-tu déjà manipulé quelqu’un pour obtenir ce que tu voulais ?",
  "As-tu déjà menti sur toi-même pour impressionner quelqu’un ?",
  "As-tu déjà fait du commérage sur quelqu’un ?",
  "As-tu déjà été impliqué(e) dans une rumeur qui s’est propagée ?",
  "As-tu déjà humilié quelqu’un en public ou en privé ?",
  "As-tu déjà ignoré un message volontairement alors que tu l’avais vu ?",
  "As-tu déjà profité de quelqu’un pour un avantage personnel ?",
  "As-tu déjà coupé les ponts avec quelqu’un du jour au lendemain ?",

  // Amour & Romance (Premier baiser, relation sérieuse...)
  "As-tu déjà été dans une relation toxique ?",
  "As-tu déjà séduit quelqu’un par pur défi ?",
  "As-tu déjà entretenu une double relation en même temps ?",
  "As-tu déjà eu une relation avec quelqu’un de beaucoup plus âgé(e) que toi ?",
  "As-tu déjà embrassé quelqu’un que tu venais de rencontrer ?",
  "As-tu déjà regretté une relation amoureuse ?",
  "As-tu déjà flirté avec quelqu’un alors que tu étais en couple ?",
  "As-tu déjà mis fin à une relation par message ou appel ?",
  "As-tu déjà manipulé quelqu’un émotionnellement dans une relation ?",
  "As-tu déjà pleuré après une rupture ?",

  // Expériences sexuelles (Flirts, relations, expériences variées...)
  "As-tu déjà eu un rapport sexuel dans un endroit insolite ?",
  "As-tu déjà eu une aventure d’un soir sans jamais revoir la personne ?",
  "As-tu déjà été tenté(e) par un plan à trois ou plus ?",
  "As-tu déjà regretté une expérience sexuelle ?",
  "As-tu déjà été surpris(e) en pleine action ?",
  "As-tu déjà eu une relation avec quelqu’un rencontré via une application de rencontre ?",
  "As-tu déjà menti sur ton expérience sexuelle pour impressionner ?",
  "As-tu déjà eu une relation avec une personne en couple ?",
  "As-tu déjà eu une attirance pour un(e) ami(e) proche ?",
  "As-tu déjà pratiqué le sexe au téléphone ou en ligne ?",

  // Drogues & Alcool (Alcool, tabac, substances...)
  "As-tu déjà bu de l’alcool au point de ne plus te souvenir de ta soirée ?",
  "As-tu déjà testé une drogue illégale ?",
  "As-tu déjà conduit en ayant bu de l’alcool ?",
  "As-tu déjà été malade à cause d’un excès d’alcool ?",
  "As-tu déjà été sous l’emprise de l’alcool ou de drogue en public ?",

  // Légalité & Illégalité (Vols, fraude, délits...)
  "As-tu déjà volé quelque chose de plus de 50€ ?",
  "As-tu déjà été arrêté(e) par la police, même brièvement ?",
  "As-tu déjà participé à un délit mineur (fraude, intrusion, etc.) ?",
  "As-tu déjà conduit sans permis ou pris des risques au volant ?",
  "As-tu déjà menti à une figure d’autorité pour éviter des ennuis ?"
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
  return "Quelqu'un";
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
    yesButton.classList.add("btn-yes");
    yesButton.textContent = "Oui";
    yesButton.onclick = () => answerQuestion("yes");

    const noButton = document.createElement("button");
    noButton.classList.add("btn-no");
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
      popup.style.display = "flex";
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
