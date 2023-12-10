import type { Signal } from "@preact/signals-react";

declare module "react" {
  interface DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES {
    signal?: Signal | undefined;
  }
}

