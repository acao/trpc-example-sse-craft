// components/SettingsPanel.js
import React from "react";

import { Button } from "~/components/button";
import { Slider } from "@radix-ui/react-slider";
import { useEditor } from "@craftjs/core";

export const SettingsPanel = () => {
  const { selected } = useEditor((state, query) => {
    const [currentNodeId] = state.events.selected;
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
    };
  });

  return selected ? (
    <div className="bg-gray-900 mt-2 px-2 py-2 ml-1">
      <div className="flex flex-col space-y-0">
        <div>
          <div className="pb-2">
            <div className="text-md">
              <div>Selected: {selected.name}</div>
            </div>
          </div>
        </div>
        <div className="text-sm pb-10">
        {selected.settings && React.createElement(selected.settings)}
        </div>
        <Button variant="default" color="default">
          Delete
        </Button>
      </div>
    </div>
  ) : null;
};
