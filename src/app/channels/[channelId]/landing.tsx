"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { Avatar } from "~/components/avatar";
import { Textarea } from "~/components/input";
import { trpc } from "~/lib/trpc";
import { cx } from "class-variance-authority";
import { format, formatDistanceToNow, isToday } from "date-fns";
import { useSession } from "next-auth/react";
import * as React from "react";
import {
  useLivePosts,
  usePage,
  useThrottledIsTypingMutation,
  useWhoIsTyping,
} from "./hooks";
import { Topbar } from "./pageEditor/topbar";
import { Toolbox } from "./pageEditor/toolbox";
import { SettingsPanel } from "./pageEditor/settings";

import debounce from "lodash.debounce";

const pluralize = (count: number, singular: string, plural: string) =>
  count === 1 ? singular : plural;

const listWithAnd = (list: string[]) => {
  if (list.length === 0) {
    return "";
  }
  if (list.length === 1) {
    return list[0];
  }
  if (list.length === 2) {
    return `${list[0]} and ${list[1]}`;
  }
  return `${list.slice(0, -1).join(", ")}, and ${list.at(-1)}`;
};

import {
  Card,
  Container,
  Button,
  Text,
  CardBottom,
  CardTop,
} from "./pageEditor/components";
import { Editor, Frame, Element, useEditor } from "@craftjs/core";
import { Heading } from "./pageEditor/components/heading";

export function Landing(props: Readonly<{ channelId: string }>) {
  const { channelId } = props;
  //   const livePosts = useLivePosts(channelId);
  //   const currentlyTyping = useWhoIsTyping(channelId);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  //   const session = useSession().data;
  const editPage = trpc.channel.editPage.useMutation();

  return (
    <div className="flex flex-1 h-full flex-col">
      <div
        className="flex flex-1 overflow-y-scroll p-4 sm:p-6 lg:p-8 h-full"
        ref={scrollRef}
      >
        <Editor
          resolver={{
            Card,
            Text,
            Container,
            CardBottom,
            CardTop,
            Heading,
            Button,
          }}
          onNodesChange={debounce((query) => {
            const dataString = query.serialize();
            if (dataString.length < 3) {
              return;
            }
            editPage.mutate({
              channelId: channelId,
              pageData: query.serialize(),
            });
          }, 300)}
        >
          <div className="flex flex-col flex-1 h-full w-full">
            {/* Inside this div things will not be reversed. */}

            <div className="flex flex-row flex-1">
              <div className="flex flex-col flex-1 h-full w-full">
                <EditorFrame channelId={channelId} />
              </div>
              <div className="flex flex-col h-full w-[25%]">
                <Toolbox />
                <SettingsPanel />
              </div>
            </div>
          </div>
        </Editor>
      </div>
    </div>
  );
}

const EditorFrame = ({ channelId }: { channelId: string }) => {
  const { actions } = useEditor();
  const page = usePage(channelId, actions);
 
  return (
    <Frame data={page ?? undefined}>
      <Element is={Container} canvas>
        <Container>
          <Element is={Heading} canvas>
            <Heading text="Heading 1" />
          </Element>
          <Element is={Text} canvas>
            <Text text="Drop a card here" />
          </Element>
        </Container>
        <Element is={Container} canvas>
          <Heading text="Heading 2" />
        </Element>
      </Element>
    </Frame>
  );
};
