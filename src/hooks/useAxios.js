import { useEffect, useState } from "react";
import axios from "axios";

// const useAxios = (url) => {
//     const [response, setResponse] = useState(null);

   
//         const fetchData = async (formatter = data => data, restOfUrl="") => {
            
//             const res = await axios.get(`${url}${restOfUrl}`);
           
//             setResponse(data=>[...data, formatter(res.data)]);
            
//         }
       
//         const clearResponses = () => setResponse([]);

//     return [response, fetchData, clearResponses];
// }
function useAxios(keyInLS, baseUrl) {
    const [responses, setResponses] = useLocalStorage(keyInLS);
  
    const addResponseData = async (formatter = data => data, restOfUrl = "") => {
      const response = await axios.get(`${baseUrl}${restOfUrl}`);
      setResponses(data => [...data, formatter(response.data)]);
    };
  
    const clearResponses = () => setResponses([]);
  
    return [responses, addResponseData, clearResponses];
  }
  
  function useLocalStorage(key, initialValue = []) {
    if (localStorage.getItem(key)) {
      initialValue = JSON.parse(localStorage.getItem(key));
    }
    const [value, setValue] = useState(initialValue);
  
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);
  
    return [value, setValue];
  }
  
 
export default useAxios;