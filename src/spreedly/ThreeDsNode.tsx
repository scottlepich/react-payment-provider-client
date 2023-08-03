import { CHALLENGE_IFRAME, CHALLENGE_IFRAME_CLASSES } from "./constants";

export const ThreeDsNode = () => (
  <div id={CHALLENGE_IFRAME} className={CHALLENGE_IFRAME_CLASSES} />
);

export type ThreeDsNodeType = typeof ThreeDsNode;
