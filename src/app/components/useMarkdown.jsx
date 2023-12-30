'use client'
import { useMemo } from 'react';
import { Remarkable } from 'remarkable';

export const useMarkdown = (markdown) => {
  const md = useMemo(() => new Remarkable({ html: true, linkify: true }), []);

  return useMemo(() => md.render(markdown || ''), [markdown, md]);
};
