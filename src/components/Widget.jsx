import React from "react";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import { useDispatch } from "react-redux";
import { removeWidget } from "../redux/widget/widgetSlice.js";

const Widget = ({ name, data, type ,id , category }) => {
  const dispatch = useDispatch();

  const handleDelete = ()=>{
     dispatch(removeWidget({ categoryName: category, widgetId: id }));
     window.location.reload();

  }

  
  



  return (
    <div className="border bg-white border-slate-400 rounded-lg w-[425px]  h-60 p-1 ">

      <div>
         <div className="flex justify-between">
         <h3>{name}</h3>
          <button 
           onClick={handleDelete}
          className=" ">X</button>
         </div>
        
        {Object.keys(data).length > 0 ? (
          type === "pie" ? (
            <PieChart data={data} />
          ) : (
            <LineChart data={data} />
          )
        ) : (
          <p className="text-gray-500">No graph data available</p>
        )}
      </div>
    </div>
  );
};

export default Widget;
