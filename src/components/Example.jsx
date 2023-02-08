const Example = ({ mean }) => {
  console.log(mean);
  return (
    <div className="columns-2 md:columns-3">
      {mean.map((val, valIndex) =>
        val.meanings.map((means, meansIndex) =>
          means.definitions.map((def, defIndex) => (
            <div key={valIndex + '-' + meansIndex + '-' + defIndex}>
              {def.example ? <li>{def.example}</li> : ""}
            </div>
          ))
        )
      )}
    </div>
  );
};

export default Example;

