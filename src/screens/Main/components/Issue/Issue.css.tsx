import styled from "styled-components";
// @ts-ignore
import IconButton from "@hsds/icon-button";
// @ts-ignore
import CopyValue from "@hsds/copy-value";
import { Link } from "@helpscout/ui-kit";

export const IssueUI = styled("div")`
  min-height: 200px;
  border: none;
  border-radius: 4px;
  background: #f9fafa;
  padding: 10px 15px;
`;

export const BackButtonUI = styled(IconButton)`
  &&& {
    --buttonHeight: 30px;
    transform: scale(0.9) translateY(2px);
    transform-origin: left;
  }
`;

export const IssueNavUI = styled("div")`
  display: flex;
  align-items: center;
  padding: 0 15px 7px;
  margin: -10px -10px 10px -10px;
`;

export const IssueNumberUI = styled("h1")`
  font-size: 13px;
  font-weight: 500;
  margin: 0;
`;

export const IssueSectionUI = styled("div")`
  margin-top: 10px;
`;

export const IssueSubTitleUI = styled("h2")`
  color: #253642;
  font-size: 13px;
  font-weight: 500;
  line-height: 19px;
  margin: 0;
`;

interface IssueValueUIProps {
  readonly $noValue?: boolean;
}

export const IssueValueUI = styled.span<IssueValueUIProps>`
  ${(props) =>
    props.$noValue ? "color: rgb(197, 206, 214)" : "color: #556575"};
  font-size: 13px;
`;

export const IssueTitleUI = styled("h1")`
  color: #253642;
  font-size: 16px;
  font-weight: 600;
  line-height: 18px;
  margin: 2px 0 5px;
`;

export const IssueRepoUI = styled("span")`
  font-size: 13px;
  color: #556575;
  opacity: 0.5;
`;

interface IssueLabelUIProps {
  readonly $color: string;
}

export const IssueLabelUI = styled.li<IssueLabelUIProps>`
  padding: 0;
  margin: 0;
  background-color: ${(props) => `#${props.$color}`};
  color: #fff;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 20px;
`;

export const IssueLabelListUI = styled("ul")`
  padding: 0;
  margin: 0;
  list-style: none;
  display: inline-flex;
  gap: 4px;
`;

export const CopyValueUI = styled(CopyValue)`
  display: flex;
  justify-content: space-between;
`;

export const IssueBodyUI = styled("div")`
  font-size: 12px;
  line-height: 15px;
  font-weight: 300;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
`;

export const LinkUI = styled(Link)`
  font-size: 11px;
  display: inline-block;
  margin-top: 2px;
`;
