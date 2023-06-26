import { StatusBadgeUI } from "./StatusBadge.css";
import { IssueStates } from "@/types";

interface StatusBadgeProps {
  state: IssueStates;
}

export const StatusBadge = ({ state }: StatusBadgeProps) => {
  return <StatusBadgeUI state={state} />;
};
