// components/user/Card.js
import React from "react";
import { Text } from "./text";
import { Button } from "./button";
import { Element, Node, useNode } from "@craftjs/core";

import { Container, ContainerSettings } from "./container";

// Notice how CardTop and CardBottom do not specify the drag connector. This is because we won't be using these components as draggables; adding the drag handler would be pointless.

export const CardTop = ({ children }: { children: React.ReactNode }) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div ref={connect} className="text-only">
      {children}
    </div>
  );
};

CardTop.craft = {
  rules: {
    // Only accept Text
    canMoveIn: (incomingNodes: Node[]) =>
      incomingNodes.every((incomingNode) => incomingNode.data.type === Text),
  },
};

export const CardBottom = ({ children }: { children: React.ReactNode }) => {
  const {
    connectors: { connect },
  } = useNode();
  return <div ref={connect}>{children}</div>;
};

CardBottom.craft = {
  rules: {
    // Only accept Buttons
    canMoveIn: (incomingNodes: Node[]) =>
      incomingNodes.every((incomingNode) => incomingNode.data.type === Button),
  },
};

export const Card = ({
  background,
  padding = 20,
}: {
  background?: string;
  padding?: number;
}) => {
  return (
    <Container background={background} padding={padding}>
      <Element id="text" is={CardTop} canvas>
        <Text text="Title" fontSize={20} />
        <Text text="Subtitle" fontSize={14} />
      </Element>
      <Element id="button" is={CardBottom} canvas>
        <Button size="sm" text="Learn more" />
      </Element>
    </Container>
  );
};


Card.craft = {
  related: {
    // Since Card has the same settings as Container, we'll just reuse ContainerSettings 
    settings: ContainerSettings
  },
  rules: {
    canDrop: () => true,
    canDrag: () => true,
    canMoveIn: () => true,
    canMoveOut: () => true
  }
}
