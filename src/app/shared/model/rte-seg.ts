import {RtePt} from './rte-pt';
import {RteSegCalcSettings} from './rte-seg-calc-settings';

export {RtePt} from './rte-pt';
export {RteSegCalcSettings} from './rte-seg-calc-settings';

export interface RteSeg {
  rtePts: RtePt[];
  calculationSettings: RteSegCalcSettings;
  travelTimeInSeconds: bigint;
  lengthInMeters: bigint;
}
