// Fonction pour créer une nouvelle fiche d'apprentissage
function createFlashcard(question, answer) {
    const flashcard = { question, answer };
    return flashcard;
  }
  
  // Fonction pour ajouter une fiche d'apprentissage à la liste
  function addFlashcardToList(flashcard) {
    const flashcardList = document.getElementById("flashcardList");
    const flashcardItem = document.createElement("div");
    flashcardItem.innerHTML = `
      <strong>Question:</strong> ${flashcard.question}<br>
      <strong>Réponse:</strong> ${flashcard.answer}<br><br>
    `;
    flashcardList.appendChild(flashcardItem);
  }
  
 // Fonction pour sauvegarder les questions et réponses dans le localStorage
function saveDataToLocalStorage(question, answer) {
    // Vérifier si des données existent déjà dans le localStorage
    let data = localStorage.getItem('flashcards');
    // Si aucune donnée n'existe, initialiser un tableau vide
    if (!data) {
      data = [];
    } else {
      // Si des données existent, les parser en tant que tableau
      data = JSON.parse(data);
    }
    // Ajouter la nouvelle question et réponse au tableau
    data.push({ question, answer, category:1 });
    // Sauvegarder le tableau mis à jour dans le localStorage
    localStorage.setItem('flashcards', JSON.stringify(data));
  }
  
  // Écouter le soumission du formulaire
  document.addEventListener("DOMContentLoaded", function() {
    // Votre code JavaScript ici
    document.getElementById("flashcardForm").addEventListener("submit", function(event) {
      event.preventDefault();
      const question = document.getElementById("question").value;
      const answer = document.getElementById("answer").value;
      saveDataToLocalStorage(question, answer);
      // Réinitialiser le formulaire
      this.reset();
    });
  });

  function reviewFlashcards() {
    const categories = [1, 2, 3, 4, 5, 6, 7];
    let currentDelay = 1; // Délai initial d'une journée
    let currentCategoryIndex = 0;

    const reviewCategory = (category) => {
        const data = JSON.parse(localStorage.getItem('flashcards')) || [];
        const categoryCards = data.filter(card => card.category === category);

        categoryCards.forEach(card => {
            const userAnswer = prompt(card.question); // Demander à l'utilisateur de répondre à la question

            // Vérifier si la réponse de l'utilisateur est correcte
            if (userAnswer && userAnswer.trim().toLowerCase() === card.answer.trim().toLowerCase()) {
                alert("Bonne réponse !");
                // Passer à la catégorie suivante après le délai
                setTimeout(() => {
                    moveToNextCategory();
                }, currentDelay * 24 * 60 * 60 * 1000); // Convertir le délai en millisecondes (1 jour = 24 heures * 60 minutes * 60 secondes * 1000)
            } else {
                alert("Mauvaise réponse. Réessayez plus tard !");
            }
        });
    };

    const moveToNextCategory = () => {
        currentCategoryIndex++;
        if (currentCategoryIndex < categories.length) {
            reviewCategory(categories[currentCategoryIndex]);
        } else {
            // Toutes les catégories ont été révisées
            alert("Toutes les catégories ont été révisées !");
        }
    };

    // Commencer par la première catégorie
    reviewCategory(categories[currentCategoryIndex]);
}
  function removeLearnedCards() {
    // Récupérer les données du localStorage
    const data = JSON.parse(localStorage.getItem('flashcards')) || [];
  
    // Filtrer les fiches de la catégorie 7
    const category7Cards = data.filter(card => card.category === 7);
  
    // Supprimer les fiches de la catégorie 7 du tableau de données
    category7Cards.forEach(card => {
      const index = data.findIndex(c => c === card);
      if (index !== -1) {
        data.splice(index, 1);
      }
    });
  
    // Mettre à jour les données dans le localStorage
    localStorage.setItem('flashcards', JSON.stringify(data));
  }

  // Fonction pour réviser les fiches d'une catégorie donnée avec un délai en jours
function reviewFlashcardsWithDelay(category, delay) {
    setTimeout(() => {
      reviewFlashcards(category); 
      const nextCategory = category < 7 ? category + 1 : 1; 
      const nextDelay = delay * 2;
      reviewFlashcardsWithDelay(nextCategory, nextDelay); 
    }, delay * 24 * 60 * 60 * 1000); 
  }
  
  // Fonction qui va nous permettre de gérer le délai entre les catégorie
  reviewFlashcardsWithDelay(1, 1);
  
  // Fonction qui va permettre de gérer l'ajout des card selons les catégories
  reviewFlashcards(); 

  removeLearnedCards()



