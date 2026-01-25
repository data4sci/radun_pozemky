import { marked } from 'marked';

/**
 * Converts Markdown text to HTML with basic formatting support
 * Supports: bold, italic, links, lists, paragraphs
 */
export function renderMarkdown(text: string): string {
  // Configure marked for basic, safe Markdown rendering
  marked.setOptions({
    gfm: true, // GitHub Flavored Markdown
    breaks: true, // Convert \n to <br>
  });

  return marked.parse(text) as string;
}
