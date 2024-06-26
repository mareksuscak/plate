import {
  type PlateEditor,
  type Value,
  getAboveNode,
  getPluginOptions,
  getPluginType,
  isExpanded,
  removeNodes,
  someNode,
} from '@udecode/plate-common/server';

import type { TTableElement, TablePlugin } from '../types';

import { ELEMENT_TABLE, ELEMENT_TR } from '../createTablePlugin';
import { deleteTableMergeRow } from '../merge/deleteRow';
import { deleteRowWhenExpanded } from '../merge/deleteRowWhenExpanded';

export const deleteRow = <V extends Value>(editor: PlateEditor<V>) => {
  const { enableMerging } = getPluginOptions<TablePlugin, V>(
    editor,
    ELEMENT_TABLE
  );

  if (enableMerging) {
    return deleteTableMergeRow(editor);
  }
  if (
    someNode(editor, {
      match: { type: getPluginType(editor, ELEMENT_TABLE) },
    })
  ) {
    const currentTableItem = getAboveNode<TTableElement>(editor, {
      match: { type: getPluginType(editor, ELEMENT_TABLE) },
    });

    if (!currentTableItem) return;
    if (isExpanded(editor.selection))
      return deleteRowWhenExpanded(editor, currentTableItem);

    const currentRowItem = getAboveNode(editor, {
      match: { type: getPluginType(editor, ELEMENT_TR) },
    });

    if (
      currentRowItem &&
      currentTableItem &&
      // Cannot delete the last row
      currentTableItem[0].children.length > 1
    ) {
      removeNodes(editor, {
        at: currentRowItem[1],
      });
    }
  }
};
