// Generated with util/create-component.js
export interface YoutubeVideoProps {
  isApp?: boolean;
  isMobile?: boolean;
  vedioId?: string; // for legacy
  videoUrl: string;
  width?: string;
  height?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
}

export interface PlayerVars {
  autoplay?: 0 | 1;
  cc_load_policy?: 1;
  color?: "red" | "white";
  controls?: 0 | 1 | 2;
  disablekb?: 0 | 1;
  enablejsapi?: 0 | 1;
  end?: number;
  fs?: 0 | 1;
  hl?: string;
  iv_load_policy?: 1 | 3;
  list?: string;
  listType?: "playlist" | "search" | "user_uploads";
  loop?: 0 | 1;
  modestbranding?: 1;
  origin?: string;
  playlist?: string;
  playsinline?: 0 | 1;
  rel?: 0 | 1;
  showinfo?: 0 | 1;
  start?: number;
  mute?: 0 | 1;
}

export interface Options {
  height?: string;
  width?: string;
  host?: string;
  playerVars?: PlayerVars;
}
