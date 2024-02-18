const DELAYS_BY_CATEGORY = {
  FIRST: 1,    
  SECOND: 2,  
  THIRD: 4,  
  FOURTH: 8, 
  FIFTH: 16,   
  SIXTH: 32, 
  SEVENTH: 64, 
  DONE: null,
};

const calculDelayDays = async (category, delay) => {
    setTimeout(() => {
      reviewFlashcards(category); 
      const nextCategory = category < 7 ? category + 1 : 1; 
      const nextDelay = delay * 2;
      reviewFlashcardsWithDelay(nextCategory, nextDelay); 
    }, delay * 24 * 60 * 60 * 1000); 
  }


const calculateDelayByCategory = async (category) => {
  return DELAYS_BY_CATEGORY[category] ?? 0; // Retourne le délai associé à la catégorie, ou 0 si la catégorie n'existe pas
};


  module.exports = calculDelayDays,calculateDelayByCategory;