import { CHALLENGE_IFRAME_ID, CHALLENGE_IFRAME_CLASS } from "../constants";

export const ChallengeIframe = () => (
  <div id={CHALLENGE_IFRAME_ID} className={CHALLENGE_IFRAME_CLASS} />
);

export type ChallengeType = typeof ChallengeIframe;
