import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ColorScale, SemanticGrid, SemanticSwatch } from './color-scale';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ColorScale,
    SemanticSwatch,
    SemanticGrid,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
