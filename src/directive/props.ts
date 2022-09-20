import type { SwipeDirectionEnum } from './type.enum';

export type EventData = {
  dir: `${SwipeDirectionEnum}`;
  xStart: number;
  xEnd: number;
  yStart: number;
  yEnd: number;
};

export type SwipeConfigs = {
  type: `${SwipeDirectionEnum}` | `${SwipeDirectionEnum}`[];
  threshold: number;
  timeout: number;
  ignore: boolean;
  onSwipe: (eventDate: EventData) => void;
};

export type SwipeState = {
  clientX: number | null;
  clientY: number | null;
  xDiff: number | null;
  yDiff: number | null;
  timeDown: number;
  startEl: any;
};
