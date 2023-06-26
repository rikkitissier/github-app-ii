import styled from "styled-components";

export const MainUI = styled("div")`
  margin: -8px;
  font-family: var(--HSUIKitFontFamilySystem);

  --issue-open: #3fb950;
  --issue-reopened: var(--issue-open);
  --issue-not_planned: #7d8590;
  --issue-completed: #a371f7;
`;

export const LoadingUI = styled("div")`
  margin: 15px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
