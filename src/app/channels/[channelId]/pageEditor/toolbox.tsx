// components/Toolbox.js
import { Element, useEditor } from "@craftjs/core";
import React from "react";

import { Button as ThemeButton } from "~/components/button";
import { Button, Text, Container, Card, Heading } from "./components";

export const Toolbox = () => {
  const { connectors, query } = useEditor();
  return (
    <div className="px-2 py-2">
      <div className="flex flex-col items-left justify-center space-y-1 flex-1">
        <div className="flex flex-row pb-2">Drag to add</div>
        <div className="flex flex-row flex-1">
          <ThemeButton
            ref={(ref) =>
              connectors.create(ref, <Button text="Click me" size="sm" variant="default" />)
            }
            size="flex-full"
          >
            Button
          </ThemeButton>
        </div>
        <div className="flex flex-row flex-1">
          <ThemeButton
            ref={(ref) =>
              connectors.create(ref, <Text text="Hi world" fontSize={14} />)
            }
            size="flex-full"
          >
            Text
          </ThemeButton>
        </div>
        <div className="flex flex-row">
          <ThemeButton
            ref={(ref) =>
              connectors.create(
                ref,
                <Element is={Container} padding={20} canvas />
              )
            }
            size="flex-full"
          >
            Container
          </ThemeButton>
        </div>
        <div className="flex flex-row">
          <ThemeButton
            ref={(ref) =>
              connectors.create(ref, <Element is={Heading} canvas />)
            }
            size="flex-full"
          >
            Heading
          </ThemeButton>
        </div>
        <div className="flex flex-row">
          <ThemeButton
            ref={(ref) => connectors.create(ref, <Card />)}
            size="flex-full"
          >
            Card
          </ThemeButton>
        </div>
      </div>
    </div>
  );
};
