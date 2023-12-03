import * as React from "react";
import type { Signal } from "@preact/signals-react";

declare module "react" {
  interface HTMLAttributes<T> extends React.AriaAttributes, React.DOMAttributes<T>, React.HTMLAttributes<T> {
    children?: React.ReactNode | Signal | undefined;
  }
}

