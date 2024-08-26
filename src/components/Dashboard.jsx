import React from "react";
import Widget from "./Widget";
import Navbar from "./Navbar";
import SidePanel from "./SidePanel";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const categoriesData = useSelector(state => state.widgets.categories);

  return (
    <div>
      <div className="mt-4 mb-6 bg-white min-w-full">
        <div className="">
          <input
            type="text"
            placeholder="Search widgets..."
            className="p-2 border border-gray-300 rounded-lg"
            // Removed the onChange event and search query state
          />
        </div>
      </div>
      <div>
        <Navbar />
        <SidePanel />
      </div>
      {categoriesData.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-8">
          <h2 className="text-xl font-bold mb-4">{category.name}</h2>
          <div className="flex flex-wrap gap-4">
            {category.widgets.length > 0 ? (
              category.widgets.map((widget, index) => (
                <Widget
                  key={index}
                  name={widget.name}
                  data={widget.data}
                  type={widget.type}
                  id={widget.id}
                  category={category.name}
                />
              ))
            ) : (
              <p className="text-gray-500">
                No data available for this category
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;

