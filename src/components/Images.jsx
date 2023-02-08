const Images = ({ images }) => {
  const firstDefinition = images.definitions[0];

  return (
    <>
      <div>
        {firstDefinition.image_url ? (
          <img
            className="rounded-full mx-auto block w-40"
            src={firstDefinition.image_url}
            alt={images.word}
          />
        ) : (
          <img
            className="rounded-full mx-auto block w-40"
            src="https://via.placeholder.com/100x100"
            alt="No image"
          />
        )}
        <p className="text-center p-4">
          Emoji: {firstDefinition.emoji || "No emoji"}
        </p>
      </div>
    </>
  );
};

export default Images;



// import React from "react";

// const Images = ({ images }) => {
//   return (
//     <>
//       {images.map((image) => {
//         const { image_url, emoji, index } = image;
//         return (
//           <div key={index}>
//             <img
//               className="rounded-full mx-auto block w-40"
//               src={image.definitions[0].image_url}
//               alt={image.word}
//             />
//             <p className="text-center p-4">Emoji:{image.definitions[0].emoji}</p>
//           </div>
//         );
//       })}
//     </>
//   );
// };

// export default Images;



