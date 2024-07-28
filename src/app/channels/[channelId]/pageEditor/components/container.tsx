"use client"
import React from "react";
import {} from "@radix-ui/react-slot";
import { useNode } from "@craftjs/core";
import * as Slider from "@radix-ui/react-slider";
import {
  Fieldset,
  Label,
  Legend,
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { HexColorPicker } from "react-colorful";

export const Container = ({
  background,
  padding = 0,
  children,
}: {
  background?: string;
  padding?: number;
  children?: React.ReactNode;
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <div
      ref={(ref) => connect(drag(ref))}
      style={{ margin: "5px 0", background, padding: `${padding}px` }}
    >
      {children}
    </div>
  );
};

export const ContainerSettings = () => {
  const {
    background,
    padding,
    actions: { setProp },
  } = useNode((node) => ({
    background: node.data.props.background,
    padding: node.data.props.padding,
  }));
  return (
    <>
      <Fieldset>
        <Label>Padding: {padding}px</Label>

        <Slider.Root
          className="SliderRoot"
          defaultValue={[padding]}
          max={142}
          step={2}
          onValueChange={(value) => {
            setProp((props) => (props.padding = value));
          }}
        >
          <Slider.Track className="SliderTrack">
            <Slider.Range className="SliderRange" />
          </Slider.Track>
          <Slider.Thumb className="SliderThumb" aria-label="Volume" />
        </Slider.Root>
      </Fieldset>
      <Fieldset>
        <Popover>
          <PopoverButton>
            <Label>
              Background:
              <input
                className="ml-2 border-2 bg-white w-20 rounded-sm"
                style={{ backgroundColor: background, padding: 2 }}
                value={background}
                readOnly
              />
            </Label>
          </PopoverButton>
          <PopoverBackdrop className="fixed inset-0 bg-black/15" />
          <PopoverPanel anchor="bottom" className="flex flex-col">
            <HexColorPicker
              color={background}
              onChange={(value) =>
                setProp((props) => (props.background = value))
              }
            />
          </PopoverPanel>
        </Popover>
      </Fieldset>
    </>
  );
};

Container.craft = {
  related: {
    settings: ContainerSettings,
  },
  defaultProps: {
    background: "#fff",
    padding: 12,
  },
  rules: {
    canDrop: () => true,
    canDrag: () => true,
    canMoveIn: () => true,
    canMoveOut: () => true
  }
};
