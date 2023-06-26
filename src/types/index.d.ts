declare global {
  interface Document {
    startViewTransition: any;
  }
}

export interface CreateIssuePayload {
  repo: string;
  body: string;
  title: string;
  includeMessage: boolean;
}

export interface Repository {
  id: number;
  full_name: string;
  has_issues: boolean;
}

export interface DropListItem {
  id: string;
  value: string;
}

export interface Issue {
  id: string;
  number: number;
  state: string;
  title: string;
  url: string;
  html_url: string;
  body: string;
  created_at: string;
  state_reason: string;
  repository_url: string;
  labels?: Label[];
  assignee?: Assignee;
  pull_request?: PullRequest;
}

export interface PullRequest {
  url: string;
  html_url: string;
}

export interface Label {
  name: string;
  color: string;
}

export interface Assignee {
  login: string;
  avatar_url: string;
}

export type IssueStates = "open" | "completed" | "reopened" | "not_planned";
