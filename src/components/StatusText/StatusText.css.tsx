import styled, { css } from "styled-components";
import { IssueStates } from "../../types";

export const StatusTextUI = styled("span")<{ state: IssueStates }>`
  font-size: 12px;
  text-transform: uppercase;
  font-family: var(--HSUIKitFontFamilySystem);
  font-weight: 500;

  ${(props) => {
    const varName = `--issue-${props.state}`;
    return css`
      color: var(${varName});
    `;
  }}
`;
