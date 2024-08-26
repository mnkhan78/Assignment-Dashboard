import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWidget  } from '../redux/widget/widgetSlice.js'; 
import { closeSidePanel } from '../redux/sidePnael/sidePanel.js';

const WidgetForm = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.widgets.categories);
 

  const [categoryName, setCategoryName] = useState('');
  const [widgetName, setWidgetName] = useState('');
  const [widgetTitle, setWidgetTitle] = useState('');
  const [widgetData, setWidgetData] = useState({});
  const [keyValuePairs, setKeyValuePairs] = useState([{ key: '', value: '' }]);

  useEffect(() => {
    
  }, []);

  const handleKeyValueChange = (index, field, value) => {
    const newKeyValuePairs = [...keyValuePairs];
    newKeyValuePairs[index][field] = value;
    setKeyValuePairs(newKeyValuePairs);
  };

  const addKeyValuePair = () => {
    setKeyValuePairs([...keyValuePairs, { key: '', value: '' }]);
  };

  const removeKeyValuePair = (index) => {
    const newKeyValuePairs = [...keyValuePairs];
    newKeyValuePairs.splice(index, 1);
    setKeyValuePairs(newKeyValuePairs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create the widget object
    const newWidget = {
      id: Date.now()+ Math.random().toString(36).slice(-4) , // Generate a unique ID for the widget
      name: widgetName,
      type: 'pie', // Example type, adjust as needed
      title: widgetTitle,
      data: keyValuePairs.reduce((acc, pair) => {
        if (pair.key && pair.value) {
          acc[pair.key] = parseFloat(pair.value);
        }
        return acc;
      }, {})
    };

    // Dispatch action to add the widget
    dispatch(addWidget({ categoryName, widget: newWidget }));

    const updatedCategory = categories.find(cat => cat.name === categoryName);
    
    

    // Reset form fields after submission
    setCategoryName('');
    setWidgetName('');
    setWidgetTitle('');
    setKeyValuePairs([{ key: '', value: '' }]);

    dispatch(closeSidePanel());

   

   
    

  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Category Name:</label>
        <select
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Widget Name:</label>
        <input
          className="bg-gray-200 border border-gray-300 m-2 rounded-lg"
          type="text"
          value={widgetName}
          onChange={(e) => setWidgetName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Widget Title:</label>
        <input
          className="bg-gray-200 border border-gray-300 m-2 rounded-lg"
          type="text"
          value={widgetTitle}
          onChange={(e) => setWidgetTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Add Data:</label>
        {keyValuePairs.map((pair, index) => (
          <div key={index}>
            <input
              className="bg-gray-200 border border-gray-300 m-2 rounded-lg"
              type="text"
              placeholder="Data Key"
              value={pair.key}
              onChange={(e) =>
                handleKeyValueChange(index, 'key', e.target.value)
              }
              required
            />
            <input
              className="bg-gray-200 border border-gray-300 m-2 rounded-lg"
              type="number"
              placeholder="Data Value"
              value={pair.value}
              onChange={(e) =>
                handleKeyValueChange(index, 'value', e.target.value)
              }
              required
            />
            <button
              className="bg-red-600 text-white rounded-lg text-sm px-5 py-1"
              type="button"
              onClick={() => removeKeyValuePair(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className="bg-green-600 text-white rounded-lg text-sm px-5 py-1 mt-1"
          type="button"
          onClick={addKeyValuePair}
        >
          Add Data
        </button>
      </div>
      <button
        className="bg-purple-600 text-white rounded-lg text-sm px-5 py-1 my-2"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default WidgetForm;
