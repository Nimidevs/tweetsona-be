exports.wordsFrequency = (tweets) => {
  const frequencyMap = {};
  const wordsArray = tweets
    .join(" ")
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'"“”‘’…\[\]?]/g, "")
    .split(/\s+/);
  for (let i = 0; i < wordsArray.length; i++) {
    frequencyMap[wordsArray[i]]
      ? frequencyMap[wordsArray[i]]++
      : (frequencyMap[wordsArray[i]] = 1);
  }
  return frequencyMap
};
