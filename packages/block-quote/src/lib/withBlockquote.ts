import type { ExtendEditor, TElement } from '@udecode/plate-common';

import { BlockquotePlugin } from './BlockquotePlugin';

export const withBlockquote: ExtendEditor = ({ editor }) => {
  const { shouldMergeNodesRemovePrevNode } = editor;

  if (shouldMergeNodesRemovePrevNode) {
    editor.shouldMergeNodesRemovePrevNode = (prevNodeEntry, curNodeEntry) => {
      const prevNode = prevNodeEntry[0] as TElement;

      if (prevNode.type === BlockquotePlugin.key) return false;

      return shouldMergeNodesRemovePrevNode(prevNodeEntry, curNodeEntry);
    };
  }

  return editor;
};
