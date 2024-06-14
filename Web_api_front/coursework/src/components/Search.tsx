import React, { useState, useEffect } from 'react';
interface Props {
  getDogPics: (breed: string) => void;
}

const Search: React.FC<Props> = ({ getDogPics }) => {
  const [breedList, setBreedList] = useState<string[]>([]);

  useEffect(() => {
    getBreedList();
  }, []);

  async function getBreedList() {
    try {
      const data = await fetch('https://dog.ceo/api/breeds/list/all');
      const { message } = await data.json();
      setBreedList(Object.keys(message));
    } catch (error) {
      console.error('Error fetching breed list:', error);
      setBreedList([]);
    }
  }

  return (
    <div>
      <label htmlFor="breedList" style={{ color: 'DodgerBlue',  fontSize:'40px', fontWeight:'bold'}}>Choose a breed of the dog</label>
      <br />
      <select name="breedList" onChange={(e) => getDogPics(e.target.value)}>
        <option value="">Select a breed</option>
        {breedList.map((breed) => (
          <option value={breed} key={breed}>
            {breed}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Search;
