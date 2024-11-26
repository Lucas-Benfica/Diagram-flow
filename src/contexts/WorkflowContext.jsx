import { createContext, useState } from "react";

const WorkflowContext = createContext();

export function WorkflowProvider({ children }) {
  const [actionsFlow, setActionsFlow] = useState([]);

  return (
    <WorkflowContext.Provider
      value={{
        actionsFlow,
        setActionsFlow,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
}

export default WorkflowContext;
