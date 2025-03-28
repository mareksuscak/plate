import type { TElement } from '@udecode/plate';

export interface MediaPluginOptions {
  isUrl?: (text: string) => boolean;

  /** Transforms the url. */
  transformUrl?: (url: string) => string;
}

export interface TMediaElement extends TElement {
  url: string;
  id?: string;
  align?: 'center' | 'left' | 'right';
  isUpload?: boolean;
  name?: string;
  placeholderId?: string;
}
