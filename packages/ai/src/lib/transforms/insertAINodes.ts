import type { Path } from 'slate';

import {
  type SlateEditor,
  type TDescendant,
  collapseSelection,
  getEndPoint,
  insertNodes,
  withoutNormalizing,
} from '@udecode/plate-common';

import { BaseAIPlugin } from '../BaseAIPlugin';

export const insertAINodes = (
  editor: SlateEditor,
  nodes: TDescendant[],
  {
    target,
  }: {
    target?: Path;
  } = {}
) => {
  if (!target && !editor.selection?.focus.path) return;

  const aiNodes = nodes.map((node) => ({
    ...node,
    [BaseAIPlugin.key]: true,
  }));

  withoutNormalizing(editor, () => {
    insertNodes(editor, aiNodes, {
      at: getEndPoint(editor, target || editor.selection!.focus.path),
      select: true,
    });
    collapseSelection(editor, { edge: 'end' });
  });
};
