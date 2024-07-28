"use client";

import { trpc } from "~/lib/trpc";

import * as React from "react";
import { usePage, usePageEdits } from "./hooks";
import { Toolbox } from "./pageEditor/toolbox";
import { SettingsPanel } from "./pageEditor/settings";

import debounce from "lodash.debounce";

const defaultPage = `{
  "ROOT": {
    "type": {
      "resolvedName": "Container"
    },
    "isCanvas": true,
    "props": {
        "padding": 12
    },
    "displayName": "Container",
    "custom": {},
    "hidden": false,
    "nodes": [
      "QHkIPZk-du"
    ],
    "linkedNodes": {}
  },
  "QHkIPZk-du": {
    "type": {
      "resolvedName": "Container"
    },
    "isCanvas": false,
    "props": {},
    "displayName": "Container",
    "custom": {},
    "parent": "ROOT",
    "hidden": false,
    "nodes": [
      "45ybI3y_Xe",
      "WasvVCdsrK",
      "lTUTUuFYry"
    ],
    "linkedNodes": {}
  },
  "45ybI3y_Xe": {
    "type": {
      "resolvedName": "Heading"
    },
    "isCanvas": true,
    "props": {
      "text": "Example Heading",
      "level": "h2"
    },
    "displayName": "Heading",
    "custom": {},
    "parent": "QHkIPZk-du",
    "hidden": false,
    "nodes": [
      "SH4f9mvoV6"
    ],
    "linkedNodes": {}
  },
  "SH4f9mvoV6": {
    "type": {
      "resolvedName": "Heading"
    },
    "isCanvas": false,
    "props": {
      "text": "Heading 1",
      "level": "h2"
    },
    "displayName": "Heading",
    "custom": {},
    "parent": "45ybI3y_Xe",
    "hidden": false,
    "nodes": [],
    "linkedNodes": {}
  },
  "WasvVCdsrK": {
    "type": {
      "resolvedName": "Text"
    },
    "isCanvas": true,
    "props": {
      "text": "Hi",
      "fontSize": 12,
      "color": "black",
      "padding": 2
    },
    "displayName": "Text",
    "custom": {},
    "parent": "QHkIPZk-du",
    "hidden": false,
    "nodes": [
      "ZDuRPJXxly"
    ],
    "linkedNodes": {}
  },
  "ZDuRPJXxly": {
    "type": {
      "resolvedName": "Text"
    },
    "isCanvas": false,
    "props": {
      "text": "Drop a card here",
      "fontSize": 12,
      "color": "black",
      "padding": 2
    },
    "displayName": "Text",
    "custom": {},
    "parent": "WasvVCdsrK",
    "hidden": false,
    "nodes": [],
    "linkedNodes": {}
  },
  "lTUTUuFYry": {
    "type": {
      "resolvedName": "Heading"
    },
    "isCanvas": true,
    "props": {
      "text": "Example Heading",
      "level": "h2"
    },
    "displayName": "Heading",
    "custom": {},
    "parent": "QHkIPZk-du",
    "hidden": false,
    "nodes": [
      "mx1dkHOgQK"
    ],
    "linkedNodes": {}
  },
  "mx1dkHOgQK": {
    "type": {
      "resolvedName": "Heading"
    },
    "isCanvas": false,
    "props": {
      "text": "Heading 2",
      "level": "h2"
    },
    "displayName": "Heading",
    "custom": {},
    "parent": "lTUTUuFYry",
    "hidden": false,
    "nodes": [],
    "linkedNodes": {}
  }
}`;

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

  const dataRef = React.useRef<string | null>(null);

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

            if (dataString.length < 3 || dataString === dataRef.current) {
              return;
            }
            dataRef.current = dataString;
            console.log("mutating....");
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
                <React.Suspense fallback="loading...">
                  <EditorFrame channelId={channelId} />
                </React.Suspense>
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

  return <Frame data={page ?? defaultPage} />;
};
