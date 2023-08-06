import React, { useContext, createContext, useState, useEffect } from "react";
import { fetcher } from "../lib/fetcher";

export const testsListContext = createContext();

const TestsListContextProvider = ({ children }) => {
  const [testsList, setTestsList] = useState([]);

  // modify to get testsList:
  useEffect(() => {
    const fetchTestsList = async () => {
      const data = await fetcher("/api/get-testslist");

      // update testsList value if its value has changed each 5 seconds interval
      if (data && JSON.stringify(data) !== JSON.stringify(testsList)) {
        setTestsList(data);
      } else if (!data) {
        console.error("Error fetching tests list from database");
      }
    };

    fetchTestsList();

    // Refresh data every 5 seconds
    const intervalId = setInterval(() => fetchTestsList(), 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [testsList]);

  return (
    <testsListContext.Provider value={{ testsList, setTestsList }}>
      {children}
    </testsListContext.Provider>
  );
};

const TestsListConsumer = ({ children }) => {
  let testsListToUpdate; // need to have a value for the button to show up
  const { testsList, setTestsList } = useContext(testsListContext);

  return (
    <div>
      Press Save to update the testsList with the updated One:
      {testsListToUpdate ? (
        <button onClick={() => setTestsList(testsListToUpdate)}>
          Click Me
        </button>
      ) : null}
      <ul>
        {testsList.map((test) => (
          <li key={test.id}>{test.testName}</li>
        ))}
      </ul>
    </div>
  );
};

export { TestsListContextProvider, TestsListConsumer };

// still you need to define testsListToUpdate with the new value you want to update
// the consumer will send the updated testsList back
