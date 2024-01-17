"use client";

import { type Highlighter, getHighlighter } from "shikiji";
import useSWR from "swr";

let cacheHighlighter: Highlighter;

const initHighlighter = async (
  langs: string[],
  themes: string[]
): Promise<Highlighter> => {
  let highlighter = cacheHighlighter;

  highlighter = await getHighlighter({
    langs: langs ?? ["txt"],
    themes: themes,
  });

  cacheHighlighter = highlighter;

  return highlighter;
};

export const useHighlighter = (options: {
  langs: string[];
  themes: string[];
}) =>
  useSWR(
    "-",
    async () => {
      const highlighter = await initHighlighter(options.langs, options.themes);

      return highlighter;
    },
    { revalidateOnFocus: false }
  );
