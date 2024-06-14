import React, { useState } from 'react';
import { render } from 'react-dom';
import Dog from './Dog';
import Search from './Search';


const DogBreed = () => {
  const [dogImages, setDogImages] = useState<string[]>([]); 

  const getDogPics = async (breed: string) => {
    setDogImages([]); 
    try {
      const response = await fetch(
        `https://dog.ceo/api/breed/${breed}/images/random/4`
      );
      const { message } = await response.json();
      setDogImages(message);
    } catch (error) {
      console.error('Error fetching dog images:', error);
      setDogImages([]); 
    }
  };

  return (
    <div>
      <section>
        <Search getDogPics={getDogPics} />
      </section>
      <section>
        <Dog dogImages={dogImages} />
      </section>
    </div>
  );
};

export default DogBreed;
