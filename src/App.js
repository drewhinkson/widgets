import React from 'react';
import Accordion from './components/Accordion';
import Search from './components/Search';
import DropDown from './components/DropDown';
import { useState } from 'react';
const items = [
  {
    title: 'What is React?',
    content: 'react is frontend javascript framework',
  },
  {
    title: 'Why use react?',
    content: 'react is a favorite js lib',
  },
  {
    title: 'how do you use react?',
    content: 'you use react by creating components',
  },
];

const options = [
  {
    label: 'The color red',
    value: 'red',
  },
  {
    label: 'the color green',
    value: 'green',
  },
  {
    label: 'the color blue',
    value: 'blue',
  },
];
const App = () => {
  const [selected, setSelected] = useState(options[0]);
  const [showDropDown, setShowDropDown] = useState(true);
  return (
    <div className='ui segment'>
      <button onClick={() => setShowDropDown(!showDropDown)}>
        Toggle DropDown
      </button>
      {showDropDown ? (
        <DropDown
          selected={selected}
          onSelectedChange={setSelected}
          options={options}
        />
      ) : null}
    </div>
  );
};

export default App;
