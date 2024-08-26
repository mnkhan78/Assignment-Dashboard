import React, { useState } from "react";
import WidgetForm from "./WidgetForm";
import { useDispatch, useSelector } from "react-redux";
import { closeSidePanel } from "../redux/sidePnael/sidePanel.js";
import { removeWidget } from "../redux/widget/widgetSlice.js";

const SidePanel = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidePanel.isOpen);
  const categoriesData = useSelector((state) => state.widgets.categories);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleClose = () => {
    dispatch(closeSidePanel());
  };

  const handleCheckboxChange = (categoryName, widgetId) => {
    dispatch(removeWidget({ categoryName, widgetId }));

    // After dispatching, you can immediately update the selected category
    const updatedCategory = categoriesData.find(
      (category) => category.name === categoryName
    );
    setSelectedCategory(updatedCategory);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-1/2 bg-white shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0 overflow-y-auto" : "translate-x-full"
      }`}
    >
      <div className="flex justify-end p-4">
        <button className="text-black font-bold" onClick={handleClose}>
          X
        </button>
      </div>
      <div className="p-4">
        <div className="mt-4">
          <h3 className="text-lg font-bold">Categories</h3>
          <ul className="flex space-x-4 mt-2">
            {categoriesData.map((category) => (
              <li
                key={category.id}
                className={`cursor-pointer p-2 border-2 border-black ${
                  selectedCategory?.id === category.id
                    ? "text-blue-500 font-bold"
                    : "text-gray-700"
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>
        {selectedCategory && (
          <div className="mt-4">
            <h3 className="text-lg font-bold">Widgets</h3>
            <ul className="mt-2">
              {selectedCategory.widgets.map((widget) => (
                <li key={widget.id} className="text-gray-700 flex items-center">
                  <input
                    onChange={() =>
                      handleCheckboxChange(selectedCategory.name, widget.id)
                    }
                    type="checkbox"
                    id={widget.id}
                    defaultChecked={true}
                    name={widget.name}
                    className="mr-2"
                  />
                  <label htmlFor={widget.id}>{widget.name}</label>
                </li>
              ))}
            </ul>
          </div>
        )}
        <h2 className="text-xl font-bold mt-5">Add a new widget</h2>
        <WidgetForm />
      </div>
    </div>
  );
};

export default SidePanel;
