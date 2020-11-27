import React, { useState, useEffect, useRef } from 'react';

const DropDown = ({ options, selected, onSelectedChange, showDropDown }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    document.body.addEventListener('click', (e) => {
      if (ref.current && ref.current.contains(e.target)) {
        return;
      }
      setOpen(false);
    });
    return () => {};
  }, []);
  const renderedOptions = options.map((option) => {
    if (option.value === selected.value) {
      return null;
    }
    return (
      <div
        key={option.value}
        className='item'
        onClick={() => onSelectedChange(option)}>
        {option.label}
      </div>
    );
  });
  return (
    <div>
      <div ref={ref} className='ui form'>
        <div className='field'>
          <label className='label'>Select a color:</label>
          <div
            className={`ui selection dropdown ${open ? 'visible active' : ''}`}
            onClick={() => setOpen(!open)}>
            <i className='dropdown icon'></i>
            <div className='text'>{selected.label}</div>
            <div className={`menu ${open ? 'visible transition' : ''}`}>
              {renderedOptions}
            </div>
          </div>
        </div>
        <p style={{ color: selected.value }}>hello</p>
      </div>
    </div>
  );
};

export default DropDown;
