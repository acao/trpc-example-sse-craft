import { Node, useNode } from "@craftjs/core";
import React, { useCallback, useRef } from "react";
import ContentEditable from "react-contenteditable";
import * as Slider from "@radix-ui/react-slider";
import {
  Field,
  Fieldset,
  Label,
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
  Textarea,
} from "@headlessui/react";
import { HexColorPicker } from "react-colorful";

export const Text = ({
  text,
  fontSize,
  color,
  padding,
}: {
  text: string;
  color?: string;
  fontSize?: string | number;
  padding?: number;
}) => {
  const {
    connectors: { connect, drag },
    actions: { setProp },
    store
  } = useNode();
  const visibleText = useRef(text);
  return (
    <div ref={(ref) => connect(drag(ref!))}>
      <ContentEditable
        html={visibleText.current}
        onChange={(e) => (visibleText.current = e.target.value)}
        onBlur={(e) =>
          setProp(
            (props) =>
              (props.text = visibleText.current.replace(/<\/?[^>]+(>|$)/g, ""))
          )
        }
        tagName="p"
        style={{ fontSize: `${fontSize}px`, color, padding: `${padding}px` }}
      />
    </div>
  );
};

const TextSettings = () => {
  const {
    actions: { setProp },
    fontSize,
    color,
    padding,
    text
  } = useNode((node) => ({
    fontSize: node.data.props.fontSize,
    color: node.data.props.color,
    padding: node.data.props.padding,
    text: node.data.props.text,
  }));

  return (
    <div className="grid gap-2 pb-10 text-sm">
      <fieldset>
        <label>Font Size: {fontSize}px</label>
        <Slider.Root
          className="SliderRoot"
          defaultValue={[fontSize]}
          max={141}
          step={1}
          onValueChange={(value) => {
            setProp((props) => (props.fontSize = value));
          }}
        >
          <Slider.Track className="SliderTrack">
            <Slider.Range className="SliderRange" />
          </Slider.Track>
          <Slider.Thumb className="SliderThumb" aria-label="Volume" />
        </Slider.Root>
      </fieldset>
      <fieldset>
        <Popover>
          <PopoverButton>
            <label>
              Text color:{" "}
              <input
                className="ml-2 border-2 bg-white w-20 rounded-md"
                style={{ backgroundColor: color, padding: 2 }}
                value={color}
                readOnly
              />
            </label>
          </PopoverButton>
          <PopoverBackdrop className="fixed inset-0 bg-black/15" />
          <PopoverPanel anchor="bottom" className="flex flex-col">
            <HexColorPicker
              color={color}
              onChange={(value) => setProp((props) => (props.color = value))}
            />
          </PopoverPanel>
        </Popover>
      </fieldset>
      <Fieldset>
        <Label>Padding: {padding}px</Label>

        <Slider.Root
          className="SliderRoot"
          defaultValue={[padding]}
          max={100}
          step={1}
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
      {/* <Fieldset>
        <Label>Text:</Label>
        <textarea
          className="bg-white text-black p-1 w-[90%]"
          value={text}
          onChange={(e) => setProp((props) => (props.text = e.target.value))}
        />
      </Fieldset> */}
    </div>
  );
};

Text.craft = {
  rules: {
    canDrag: (node: Node) => node.data.props.text != "Drag",
  },
  props: {
    text: "Hi",
    fontSize: 12,
    color: "white",
    padding: 2,
  },
  related: {
    settings: TextSettings,
  },
};
