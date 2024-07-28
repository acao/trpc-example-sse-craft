import React from "react";

import { Button } from "~/components/button";

export const Topbar = () => {
  return (
    <div className="px-1 py-1 mt-3 mb-1 bg-blue-200">
      <div className="flex items-center flex-row">
        <div className="flex">
          <label>Enable</label>
        </div>
        <div className="ml-auto">
          <Button size="sm" variant="outline" color="secondary">
            Serialize JSON to console
          </Button>
        </div>
      </div>
    </div>
  );
};
