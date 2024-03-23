import React, { PropsWithChildren } from "react";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
export default function T({ children, html }: PropsWithChildren & { html: React.ReactElement<any> }) {
  return (
    <Tippy content={html}>
      <u style={{cursor: 'pointer'}}>{children}</u>
    </Tippy>
  );
}