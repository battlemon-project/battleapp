import React, { PropsWithChildren } from "react";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";

export default function Tippy({ children, html }: PropsWithChildren & { html: React.ReactElement<any> }) {
  return (
    <Tooltip trigger="mouseenter" position="right" size="small" html={html}>
      <u style={{cursor: 'pointer'}}>{children}</u>
    </Tooltip>
  );
}