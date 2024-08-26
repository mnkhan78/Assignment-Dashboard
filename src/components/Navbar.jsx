import React from 'react'
import { useDispatch } from 'react-redux';
import { openSidePanel } from '../redux/sidePnael/sidePanel.js';

const Navbar = () => {
   const dispatch = useDispatch();


   const handleOpen = ()=>{
      dispatch(openSidePanel());
   }



  return (
    <div className="flex items-center justify-between p-4 bg-gray-100">
      <h1 className="text-2xl font-bold">CNAPP Dashboard</h1>

      <div className="flex items-center space-x-1">
        <button className="bg-white-500 text-black py-2 px-4 rounded hover:bg-grey-600 border-2 border-black" onClick={handleOpen}>
          Add Widget +
        </button>
        <button className="bg-slate-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">
          Refresh
        </button>
        <div className="text-gray-600">:</div>
        <button className="bg-white-500 text-blue py-2 px-4 rounded hover:bg-grey-600 border-2 border-black">
          Last 2 days
        </button>
      </div>
    </div>
  );
}

export default Navbar