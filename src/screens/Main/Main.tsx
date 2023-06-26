import { useEffect, useRef, useState, useCallback } from "react";
import { flushSync } from "react-dom";
import useResizeObserver from "use-resize-observer";
import { Button, Spinner } from "@helpscout/ui-kit";
import HelpScout, { Conversation } from "@helpscout/javascript-sdk";
import { useMessageListener } from "@/hooks/useMessageListener";
import { useOctokitContext } from "@/hooks/useOctokitContext";
import { useHelpScoutContext } from "@/hooks/useHelpscoutContext";

import type { CreateIssuePayload, Issue as IssueType } from "@/types";
import { ISSUE_CONVO_PREFIX } from "@/constants";
import { MainUI, LoadingUI } from "./Main.css";
import IssueList from "./components/IssueList";
import Issue from "./components/Issue";
import { generateIssueBody } from "./Main.utils";

const getConversationUrl = (conversation: Conversation): string => {
  return `https://secure.helpscout.net/conversation/${conversation.id}/${conversation.number}`;
};

const rootElement = document.getElementById("root") as HTMLDivElement;

const Main = (): JSX.Element => {
  const octokit = useOctokitContext();
  const ghVersion = import.meta.env.VITE_GH_API_VERSION;
  const org = import.meta.env.VITE_GH_ORG;
  const helpscout = useHelpScoutContext();
  const [viewingIssue, setViewingIssue] = useState<IssueType | null>(null);
  const [issues, setIssues] = useState<IssueType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const rootRef = useRef<HTMLDivElement>(rootElement);
  const { height = 1 } = useResizeObserver<HTMLDivElement>({ ref: rootRef });

  useEffect(() => {
    HelpScout.setAppHeight(height + 20);
  }, [height]);

  useMessageListener("createIssue", async (payload: CreateIssuePayload) => {
    if (!helpscout?.conversation) return null;

    const { title, body: rawBody } = payload;
    const body = generateIssueBody(rawBody, helpscout.conversation);

    await octokit!.request(`POST /repos/${payload.repo}/issues`, {
      title,
      body,
      headers: {
        "X-GitHub-Api-Version": ghVersion,
      },
    });

    setTimeout(() => getSetIssues(false), 1000);
  });

  const getSetIssues = useCallback(
    async (showLoading: boolean = true) => {
      if (!helpscout?.conversation) return;
      const { id } = helpscout.conversation;

      if (showLoading) {
        setIsLoading(true);
      }

      const response = await octokit!.request(
        `GET /search/issues?q=${encodeURIComponent(
          `${ISSUE_CONVO_PREFIX}-${id} ${
            helpscout.conversation &&
            `OR ${getConversationUrl(helpscout.conversation)}`
          } is:issue user:${org}`
        )}`
      );

      setIssues(response.data.items);
      setIsLoading(false);
    },
    [helpscout]
  );

  useEffect(() => {
    if (!helpscout?.conversation) return;
    getSetIssues();
  }, [helpscout?.conversation]);

  const openCreateIssue = (): void => {
    window.open(
      window.location.href + `&do=createIssue`,
      "_blank",
      "popup,width=1000,height=700,location=no"
    );
  };

  const resetView = () => {
    setViewingIssue(null);
  };

  const showIssue = (issue: IssueType) => {
    document.startViewTransition(() => {
      flushSync(() => setViewingIssue(issue));
    });
  };

  const renderIssueList = () => {
    console.log(issues);
    return (
      <>
        <Button
          className="cButton--fullWidth"
          theme="blue"
          onClick={openCreateIssue}
        >
          Create an issue
        </Button>
        {isLoading ? (
          <LoadingUI>
            <Spinner />
          </LoadingUI>
        ) : (
          <IssueList showIssue={showIssue} issues={issues} />
        )}
      </>
    );
  };

  const renderIssue = () => {
    if (!viewingIssue) return;

    return <Issue issue={viewingIssue} goBack={resetView} />;
  };

  return <MainUI>{viewingIssue ? renderIssue() : renderIssueList()}</MainUI>;
};

export { Main };
