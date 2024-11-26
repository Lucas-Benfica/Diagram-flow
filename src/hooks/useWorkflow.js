import { useContext } from "react";
import WorkflowContext from "../contexts/WorkflowContext";

export default function useWorkflow() {
  return useContext(WorkflowContext);
}
