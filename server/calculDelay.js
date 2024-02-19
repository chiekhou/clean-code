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