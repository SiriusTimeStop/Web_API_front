import React from 'react';

interface Props {
  dogImages: string[];
}

const Dog: React.FC<Props> = ({ dogImages }) => {
  return (
    <div>
      {dogImages ? (
        dogImages.map((dog: string, index: number) => {
          return <img 
                className="dog"
                src={dog} 
                key={index}
                style={{ width: '350px', height: '250px', margin: '10px' }} />;
        })
      ) : (
        <h1>Waiting...</h1>
      )}
    </div>
  );
};

export default Dog;
