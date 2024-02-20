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


const calculateDelayByCategory = async (category) => {
  return DELAYS_BY_CATEGORY[category] ?? 0; 
};


const scheduleNextDelay = async (category, delay) => {
  const nextCategory = category < 7 ? category + 1 : 1;
  const nextDelay = calculateDelayByCategory(nextCategory);

  setTimeout(async () => {
    await scheduleNextDelay(nextCategory, nextDelay);
  }, delay * 24 * 60 * 60 * 1000); 
}

const startDelaySchedule = async (initialCategory) => {
  const initialDelay = calculateDelayByCategory(initialCategory);
  await scheduleNextDelay(initialCategory, initialDelay);
}

module.exports = { startDelaySchedule };