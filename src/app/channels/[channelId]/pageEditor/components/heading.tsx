import { useNode } from "@craftjs/core";
import { Fieldset, Label, Select } from "@headlessui/react";
import { useRef } from "react";
import ContentEditable from "react-contenteditable";

const sizes = {
  h1: 36,
  h2: 30,
  h3: 24,
  h4: 20,
  h5: 18,
  h6: 16,
};

export const Heading = ({
  children,
  level = "h2",
  text,
}: {
  children?: React.ReactNode;
  level?: keyof typeof sizes;
  text: string;
}) => {
  const {
    actions: { setProp },
    connectors: { connect },
  } = useNode();
  const visibleText = useRef(text);

  const HeadingLevel = level;
  return (
    <HeadingLevel  ref={connect}  style={{ fontSize: sizes[level] }}>
      <ContentEditable
       
        html={visibleText.current}
        onChange={(e) => (visibleText.current = e.target.value)}
        onBlur={(e) =>
          setProp(
            (props) =>
              (props.text = visibleText.current.replace(/<\/?[^>]+(>|$)/g, ""))
          )
        }
        tagName="span"
      />
    </HeadingLevel>
  );
};

export const HeadingSettings = () => {
  const {
    actions: { setProp },
    level,
    text,
  } = useNode((node) => ({
    level: node.data.props.level,
    text: node.data.props.text,
  }));
  return (
    <div className="block pb-10 text-sm">
      <Fieldset>
        <Label className={"pb-3"}>
          Level:
          <Select
            className="bg-white text-black p-1 ml-2"
            name="level"
            defaultValue={level ?? "h2"}
            onChange={(e) => setProp((props) => (props.level = e.target.value))}
          >
            {Object.keys(sizes).map((size, index) => (
              <option key={index} value={size}>
                {size}
              </option>
            ))}
          </Select>
        </Label>
        <Label className={"pb-3"}>
          Text:
          <input
            className="bg-white text-black p-1 w-[90%]"
            value={text}
            onChange={(e) => setProp((props) => (props.text = e.target.value))}
          />
        </Label>
      </Fieldset>
    </div>
  );
};

Heading.craft = {
  defaultProps: {
    text: "Example Heading",
    level: "h2",
  },
  related: {
    settings: HeadingSettings,
  },
  rules: {
    canMoveIn: () => true,
    canMoveOut: () => true,
    canDrag: () => true,
    canDrop: () => true,
  },
};