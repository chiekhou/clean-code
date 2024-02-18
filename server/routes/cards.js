const router = require("express").Router();
const {Learning ,Cards} = require("../db/models");
const {calculDelayDays,calculateDelayByCategory } = require('../calculDelay');

const CATEGORY_VALUES = ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH', 'SEVENTH', 'DONE'];

router.post('/', async (req, res) => {
  const { question, answer, tag} = req.body;
  try {
    const newCard = await Cards.create({
        question,
        answer,
        tag
    });

    res.json(newCard);
  } catch (err) {
    console.error(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const cards = await Cards.findAll();
    res.json(cards);
  
  } catch (err) {
    console.error(err);
  }
});

router.patch('/:id/answer',async (req, res) => {

  const { id } = req.params;
  const { isValid} = req.body

  try {
    const card = await Cards.findByPk(id);

    const learning = await Learning.create({
      cardId : card.id,
      isValid : true
    });


 if (!card) {
  return res.status(404).json({ error: "Carte d'apprentissage non trouvée" });
}


if (isValid) {
  if (card.category === "SEVENTH") {
    card.category = 'DONE';

  } else {
    const nextCategoryIndex = CATEGORY_VALUES.indexOf(card.category) + 1;
      const nextCategory = CATEGORY_VALUES[nextCategoryIndex];
      card.category = nextCategory;
    }
    await card.save();
    return res.status(204).end();
  } else {
    card.category = 'FIRST'; 
    await card.save();
    return res.status(200).json({ message: 'Réponse incorrecte, réessayez plus tard' });
    
  }

   // Appeler calculDelayDays avec le délai calculé en fonction de la catégorie
   const delay = calculateDelayByCategory(card.category);
   await calculDelayDays(card.category, delay);

   
} catch (err) {
  console.error(err);
  res.status(500).json({ error: 'Erreur lors de la gestion de la réponse' });
}
});

router.get('/quizz', async (req, res) => {
try {
  const learnings = await Learning.findAll({
    include: [Cards],
  });
 
  res.json(learnings);

} catch (err) {
  console.error(err);
}
});



module.exports = router;