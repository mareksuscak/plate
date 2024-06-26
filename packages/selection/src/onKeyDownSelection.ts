import {
  type KeyboardHandlerReturnType,
  type PlateEditor,
  type Value,
  getAncestorNode,
  isHotkey,
  isRangeInSameBlock,
  isSelectionCoverBlock,
  select,
} from '@udecode/plate-common/server';

import { blockSelectionActions } from './blockSelectionStore';

export const onKeyDownSelection =
  <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(
    editor: E
  ): KeyboardHandlerReturnType =>
  (event) => {
    if (isHotkey('mod+a', event)) {
      const ancestorNode = getAncestorNode(editor);

      if (!ancestorNode) return;

      const [, path] = ancestorNode;

      if (isSelectionCoverBlock(editor)) {
        return blockSelectionActions.selectedAll();
      }
      // TODO： should select the blocks then selected all should exclude table and columns
      if (!isRangeInSameBlock(editor)) {
        return blockSelectionActions.selectedAll();
      }

      select(editor, path);

      event.preventDefault();
      event.stopPropagation();
    }
    if (isHotkey('escape', event)) {
      const ancestorNode = getAncestorNode(editor);
      const id = ancestorNode?.[0].id;

      blockSelectionActions.addSelectedRow(id);

      event.preventDefault();
      event.stopPropagation();
    }
  };
