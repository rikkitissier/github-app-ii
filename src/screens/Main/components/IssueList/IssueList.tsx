import { Repository, Issue } from "@/types";
import { IssueListUI, IssuesListEmptyUI } from "./IssueList.css";

import { IssueListItem } from "./components/IssueListItem";

type IssueListProps = {
  showIssue: Function;
  issues: Issue[];
};

const IssueList = ({ showIssue, issues }: IssueListProps): JSX.Element => {
  return (
    <>
      {issues.length ? (
        <IssueListUI>
          {issues.map((issue: Issue) => (
            <IssueListItem
              issue={issue}
              key={issue.id}
              onClickIssue={showIssue}
            />
          ))}
        </IssueListUI>
      ) : (
        <IssuesListEmptyUI>
          No issues logged for this conversation
        </IssuesListEmptyUI>
      )}
    </>
  );
};

export { IssueList };
