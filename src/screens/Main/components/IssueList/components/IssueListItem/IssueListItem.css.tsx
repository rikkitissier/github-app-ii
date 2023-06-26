import styled from "styled-components";
import { StatusBadgeUI } from "@/components/StatusBadge/StatusBadge.css";
// @ts-ignore
import { focusRing } from "@hsds/utils-mixins";

export const IssueListItemUI = styled("div")`
  border: none;
  border-radius: 4px;
  background: #f9fafa;
  padding: 10px;

  display: flex;
  align-items: flex-start;
  text-align: left;

  cursor: pointer;

  ${focusRing};
  --focusRingRadius: 4px;

  ${StatusBadgeUI} {
    flex-shrink: 0;
    margin-top: 3px;
  }

  &:hover {
    background: #f3fbff;
  }
`;

export const IssueListItemTitleUI = styled("h1")`
  color: #253642;
  font-size: 14px;
  font-family: Aktiv Grotesk;
  font-weight: bold;
  line-height: 17px;
  margin: 2px 0 5px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

export const IssueListItemBodyUI = styled("div")`
  margin-left: 5px;
`;

export const IssueListItemRepoUI = styled("span")`
  font-size: 13px;
  color: #556575;
  opacity: 0.5;
`;
