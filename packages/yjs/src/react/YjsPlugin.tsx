import { toPlatePlugin } from '@udecode/plate-common/react';

import { YjsPlugin as BaseYjsPlugin } from '../lib/YjsPlugin';
import { YjsAboveEditable } from './YjsAboveEditable';

/** Enables support for real-time collaboration using Yjs. */
export const YjsPlugin = toPlatePlugin(BaseYjsPlugin, {
  render: { aboveEditable: YjsAboveEditable },
});
