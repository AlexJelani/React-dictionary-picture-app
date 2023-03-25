const Word = ({ words, playAudio }) => {
  const filteredWords = words.filter(
    (word, index, self) => self.findIndex((w) => w.word === word.word) === index
  );

  const extractedWords = filteredWords.map((word) => {
    if (word.phonetics && Array.isArray(word.phonetics)) {
      const audio = word.phonetics.find((phonetic) => phonetic.audio);
      if (audio) {
        return {
          ...word,
          phonetics: audio,
        };
      } else {
        return {
          ...word,
          phonetics: "no audio"
        };
      }
    }
});


  console.log("extractedWords:", extractedWords);
  if (extractedWords.length > 0) {
    const firstWord = extractedWords[0];
    console.log("firstWord:", firstWord);
    if (firstWord.phonetics && firstWord.phonetics.audio) {
      const audioUrl = firstWord.phonetics.audio;
      return (
        <div className="columns-2 md:columns-3">
          <h1 className="text-4xl">{firstWord.word}</h1>
          <audio src={audioUrl} controls className="w-full" />
          <button onClick={() => playAudio(audioUrl)}></button>
        </div>
      );
    } else {
      return (
        <div className="columns-2 md:columns-3">
          <h1 className="text-4xl">{firstWord.word}</h1>
          <p>No audio available</p>
        </div>
      );
    }
  }
};

export default Word;

