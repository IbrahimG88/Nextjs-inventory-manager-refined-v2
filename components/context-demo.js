import React, { useContext, createContext, useState, useEffect } from "react";

export const YourContextName = createContext();

const YourContextNameProvider = ({ children }) => {
  const [branch, setBranch] = useState("lab-branch1");

  return (
    <YourContextName.Provider value={{ branch, setBranch }}>
      {children}
    </YourContextName.Provider>
  );
};

const BranchConsumer = ({ children }) => {
  const { branch, setBranch } = useContext(YourContextName);

  const branches = ["lab-branch1", "lab-branch2", "lab-branch3", "lab-branch4"];

  return (
    <div>
      The current branch is: {branch}
      <select value={branch} onChange={(e) => setBranch(e.target.value)}>
        {branches.map((branch) => (
          <option key={branch} value={branch}>
            {branch}
          </option>
        ))}
      </select>
    </div>
  );
};

export { YourContextNameProvider, BranchConsumer };
