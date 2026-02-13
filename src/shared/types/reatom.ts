import type { AsyncDataExt } from '@reatom/core';

export type PropsResourceAtom<TAtom> = AsyncDataExt<unknown[], TAtom, TAtom | null>;
