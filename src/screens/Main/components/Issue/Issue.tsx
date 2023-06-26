// @ts-ignore
import CaretLeft from "@hsds/icons/caret-left";
import HelpScout from "@helpscout/javascript-sdk";
import { Button } from "@helpscout/ui-kit";

import { Issue as IssueType, Label, IssueStates } from "@/types";

import { StatusText } from "@/components/StatusText";

import {
  IssueUI,
  BackButtonUI,
  IssueNavUI,
  IssueSubTitleUI,
  IssueTitleUI,
  IssueValueUI,
  IssueLabelUI,
  IssueLabelListUI,
  CopyValueUI,
  IssueSectionUI,
  IssueBodyUI,
  LinkUI,
} from "./Issue.css";

type IssueProps = {
  issue: IssueType;
  goBack: Function;
};

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

const buildIssueClipboardDetails = (issue: IssueType) => {
  return `<a href="${issue.html_url}">Issue #${
    issue.number
  }</a> on repository <a href="${issue.repository_url}">${getRepoPath(
    issue.repository_url
  )}</a>`;
};

export const Issue = ({ issue, goBack }: IssueProps) => {
  const {
    state,
    state_reason,
    title,
    number,
    repository_url,
    assignee,
    created_at,
    body,
    html_url,
    pull_request,
  } = issue;

  const copyIssueDetails = () => {
    HelpScout.setClipboardText(
      buildIssueClipboardDetails(issue),
      "Copied issue details"
    );
  };

  return (
    <>
      <IssueNavUI>
        <BackButtonUI icon={CaretLeft} onClick={() => goBack()}>
          Back to issues
        </BackButtonUI>
      </IssueNavUI>
      <IssueUI>
        <StatusText state={getIssueState(state, state_reason)} />
        <IssueTitleUI>{title}</IssueTitleUI>

        {issue.labels && issue.labels.length ? (
          <IssueLabelListUI>
            {issue.labels.map((label) => (
              <IssueLabelUI $color={label.color}>{label.name}</IssueLabelUI>
            ))}
          </IssueLabelListUI>
        ) : null}

        <IssueSectionUI>
          <IssueBodyUI>{body}</IssueBodyUI>
          <LinkUI href={html_url} target="_blank">
            Read More
          </LinkUI>
        </IssueSectionUI>

        <IssueSectionUI>
          <CopyValueUI
            aria-label="Copy Issue Details"
            onClick={copyIssueDetails}
            renderValue={() => (
              <div>
                <IssueSubTitleUI>Number</IssueSubTitleUI>
                <IssueValueUI>#{number}</IssueValueUI>
              </div>
            )}
            value=""
          />
        </IssueSectionUI>

        <IssueSectionUI>
          <IssueSubTitleUI>Repo</IssueSubTitleUI>
          <IssueValueUI>{getRepoPath(repository_url)}</IssueValueUI>
        </IssueSectionUI>

        <IssueSectionUI>
          <IssueSubTitleUI>Date Created</IssueSubTitleUI>
          <IssueValueUI>{new Date(created_at).toLocaleString()}</IssueValueUI>
        </IssueSectionUI>

        <IssueSectionUI>
          <IssueSubTitleUI>Assigned To</IssueSubTitleUI>
          <IssueValueUI $noValue={assignee === null}>
            {assignee ? assignee.login : "Not assigned"}
          </IssueValueUI>
        </IssueSectionUI>
      </IssueUI>
    </>
  );
};
