import Dashboard from "./components/Dashboard";
import { useEffect} from "react";
import { useDispatch } from "react-redux";
import { setCategories } from "./redux/widget/widgetSlice";

function App() {

  const dispatch = useDispatch();


  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetch('/widgets.json'); // Fetch from public folder
        const data = await response.json();
        
        // Save to local storage
        localStorage.setItem('widgetData', JSON.stringify(data));
        
        // Update Redux store
        dispatch(setCategories(data.categories));
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      }
    };

    const storedData = localStorage.getItem('widgetData');

    if (!storedData) {
      fetchInitialData();
    } 
    else {
      dispatch(setCategories(JSON.parse(storedData).categories));
    }
  }, [dispatch]);




  return (
    <div className="bg-slate-100 p-6">
      <Dashboard />
    </div>
  );
}

export default App;
