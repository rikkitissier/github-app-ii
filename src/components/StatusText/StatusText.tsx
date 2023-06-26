import { StatusTextUI } from "./StatusText.css";
import { IssueStates } from "@/types";

interface StatusTextProps {
  state: IssueStates;
}

const getStatusText = (state: IssueStates): string => {
  switch (state) {
    case "not_planned":
      return "Not Planned";
    case "completed":
      return "Completed";
    case "open":
    case "reopened":
    default:
      return "Open";
  }
};

export const StatusText = ({ state }: StatusTextProps) => {
  return <StatusTextUI state={state}>{getStatusText(state)}</StatusTextUI>;
};
