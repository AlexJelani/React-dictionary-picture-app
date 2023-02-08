const Antonym = ({ mean }) => {
  return (
    <div className="columns-2 md:columns-3">
    {mean.map((val, index1) =>
      val.meanings.map((means, index2) =>
        means.synonyms?.map((ant, index3) => <li key={`${index1}-${index2}-${index3}`}>{ant}</li>)
      )
    )}
  </div>
  );
};
  export default Antonym;