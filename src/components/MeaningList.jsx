
const MeaningList = ({mean}) => {
    console.log(mean)
  return (
    <div className="columns-2 md:columns-3">
        {mean.map(val => val.meanings.map(means => means.definitions.map(def=> (

        <div key={def.definition}>
            <li>{def.definition}</li>
            <hr />
        </div>

        ))))}
    </div>
  )
}

export default MeaningList