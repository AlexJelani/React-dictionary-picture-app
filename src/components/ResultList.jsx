import React from "react";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { InputContext } from "../App";
import MeaningList from "./MeaningList";
import Example from "./Example";
import Synonym from "./Synonym";
import Antonym from "./Antonym";
import Word from "./Word";
import Data from "./Data";
import Images from "./Images";
axios.defaults.baseURL = "https://api.dictionaryapi.dev/api/v2/entries/en";

const ResultList = () => {
  const { inputValue } = useContext(InputContext);

  const [response, setResponse] = useState(null);
  const [response2, setResponse2] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [images, setImages] = useState(Data);

  const fetchDataAndData2 = async (param) => {
    try {
      setLoading(true);
      const [res1, res2] = await Promise.all([
        axios(`/${param}`),
        axios.get(`https://us-central1-node-js-11abf.cloudfunctions.net/app/dictionary?word=${param}`),
      ]);

      setAudioUrl(res1.data[0].phonetics[0].audio);
      setResponse(res1.data);
      setResponse2(res2.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const playAudio = (audioUrl) => {
    let audio = new Audio(audioUrl);
    console.log("playAudio function called");

    audio.play();
  };

  useEffect(() => {
    if (inputValue.length) {
      fetchDataAndData2(inputValue);
    }
  }, [inputValue]);

  if (loading) {
    return (
      <div className="flex flex-col space-y-3 animate-pulse p-4 container mx-auto max-w-2xl">
        <div className="h-6 bg-gray-300 mt-5 rounded-md"></div>
        <div className="h-40 bg-gray-300 mt-5 rounded-md"></div>
        <div className="h-8 bg-gray-300 mt-5 rounded-md"></div>
        <div className="h-40 bg-gray-300 mt-5 rounded-md"></div>
      </div>
    );
  }
  if (error) {
    return (
      <h3 className="text-center mt-10 font-semibold text-gray-500">
        No Definitions Found &#128543;
      </h3>
    );
  }
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      {response && (
        <div>
          <h3 className="text-2xl font-bold mt-4">Images</h3>
          <Images images={response2} />
          <h3 className="text-2xl font-bold mt-4">Word & Audio</h3>
          <Word words={response} playAudio={playAudio} />
          <h3 className="text-2xl font-bold mt-4">Meaning & Definitions</h3>
          <MeaningList mean={response} />
          <h3 className="text-2xl font-bold mt-4">Example:</h3>
          <Example mean={response} />
          <h3 className="text-2xl font-bold mt-4">Synonym:</h3>
          <Synonym mean={response} />
          <h3 className="text-2xl font-bold mt-4">Antonym:</h3>
          <Antonym mean={response} />
        </div>
      )}
      {!response && <div className="text-center text-6xl">Type a word in the box</div>}
    </div>
  );
};

export default ResultList;
