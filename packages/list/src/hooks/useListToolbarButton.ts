import { useEditorRef, useEditorSelector } from '@udecode/plate-common';
import { getPluginType, someNode } from '@udecode/plate-common/server';

import { ELEMENT_UL, toggleList } from '../index';

export const useListToolbarButtonState = ({ nodeType = ELEMENT_UL } = {}) => {
  const pressed = useEditorSelector(
    (editor) =>
      !!editor.selection &&
      someNode(editor, { match: { type: getPluginType(editor, nodeType) } }),
    [nodeType]
  );

  return {
    nodeType,
    pressed,
  };
};

export const useListToolbarButton = (
  state: ReturnType<typeof useListToolbarButtonState>
) => {
  const editor = useEditorRef();

  return {
    props: {
      onClick: () => {
        toggleList(editor, { type: state.nodeType });
      },
      onMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
      },
      pressed: state.pressed,
    },
  };
};
