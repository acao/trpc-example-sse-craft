"use client"
import React from "react";
import clsx from "clsx";
import { useNode } from "@craftjs/core";
import {
  Field,
  Fieldset,
  Input,
  Label,
  Radio,
  RadioGroup,
  Select,
} from "@headlessui/react";
import { ButtonStyles, buttonVariants } from "~/components/button";

export const Button = ({
  size,
  variant,
  text,
  children,
}: {
  size: string | number;
  variant?: keyof typeof ButtonStyles.variant;
  text?: string;
  children?: React.ReactNode;
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <button
      ref={(ref) => connect(drag(ref))}
      className={buttonVariants({ variant, size })}
    >
      {text ?? children}
    </button>
  );
};

const ButtonSettings = () => {
  const {
    actions: { setProp },
    size,
    variant,
    text,
  } = useNode((node) => ({
    size: node.data.props.size,
    variant: node.data.props.variant,
    text: node.data.props.text,
  }));

  return (
    <div className="block pb-10 text-sm">
      <Fieldset>
        <Label className={"pb-3"}>
          Size:
          <Select
            className="bg-white text-black p-1 ml-2"
            name="size"
            defaultValue={size ?? ButtonStyles.size.default}
            onChange={(e) => setProp((props) => (props.size = e.target.value))}
          >
            {Object.keys(ButtonStyles.size).map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </Select>
        </Label>
        <Label className={"pb-3"}>
          Variant:
          <Select
            className="bg-white text-black p-1 ml-2"
            name="variant"
            defaultValue={variant ?? ButtonStyles.variant.default}
            onChange={(e) =>
              setProp((props) => (props.variant = e.target.value))
            }
          >
            {Object.keys(ButtonStyles.variant).map((variant) => (
              <option key={variant} value={variant}>
                {variant}
              </option>
            ))}
          </Select>
        </Label>
        <Field>
          <Label>Text:</Label>
          <Input
            className="bg-white text-black p-1 w-[90%]"
            value={text}
            onChange={(e) => setProp((props) => (props.text = e.target.value))}
          />
        </Field>
      </Fieldset>
    </div>
  );
};

Button.craft = {
  props: {
    size: "sm",
    variant: "default",

    text: "Click me",
  },
  related: {
    settings: ButtonSettings,
  },
};
