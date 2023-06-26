import {
  IssueListItemUI,
  IssueListItemTitleUI,
  IssueListItemBodyUI,
  IssueListItemRepoUI,
} from "./IssueListItem.css";
import { Issue, IssueStates } from "@/types";

import { StatusText } from "@/components/StatusText";

const getIssueState = (state: string, state_reason: string): IssueStates => {
  if (
    state_reason === "not_planned" ||
    state_reason === "reopened" ||
    state_reason === "completed"
  ) {
    return state_reason;
  }
  return "open";
};

const getRepoPath = (repoUrl: string): string => {
  return repoUrl.replace("https://api.github.com/repos/", "");
};

type IssueListItemProps = {
  issue: Issue;
  onClickIssue: Function;
};

export const IssueListItem = ({ issue, onClickIssue }: IssueListItemProps) => {
  const { state, state_reason, title, repository_url, number } = issue;

  return (
    <IssueListItemUI role="button" onClick={() => onClickIssue(issue)}>
      <IssueListItemBodyUI>
        <StatusText state={getIssueState(state, state_reason)} />
        <IssueListItemTitleUI>{title}</IssueListItemTitleUI>
        <IssueListItemRepoUI>
          #{number} &middot; {getRepoPath(repository_url)}
        </IssueListItemRepoUI>
      </IssueListItemBodyUI>
    </IssueListItemUI>
  );
};
