import styled, { css } from "styled-components";
import { IssueStates } from "../../types";

export const StatusBadgeUI = styled("span")<{ state: IssueStates }>`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 12px;

  ${(props) => {
    const varName = `--issue-${props.state}`;
    return css`
      background-color: var(${varName});
    `;
  }}
`;
