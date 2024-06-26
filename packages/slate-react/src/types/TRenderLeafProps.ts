import type { EText, TText, Value } from '@udecode/slate';
import type { Modify } from '@udecode/utils';
import type { RenderLeafProps } from 'slate-react';

export type TRenderLeafProps<
  V extends Value = Value,
  N extends TText = EText<V>,
> = Modify<
  RenderLeafProps,
  {
    leaf: N;
    text: N;
  }
>;

export type RenderLeafFn<V extends Value = Value> = (
  props: TRenderLeafProps<V>
) => React.ReactElement;
