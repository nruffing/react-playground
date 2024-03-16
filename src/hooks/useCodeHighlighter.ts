import { useEffect } from 'react'
import { BundledHighlighterOptions, BundledLanguage, BundledTheme, HighlighterGeneric, getHighlighter } from 'shiki'

let highlighter: HighlighterGeneric<BundledLanguage, BundledTheme> | undefined = undefined
const options: BundledHighlighterOptions<BundledLanguage, BundledTheme> = {
  themes: ['nord'],
  langs: ['typescript', 'javascript', 'json', 'html', 'css', 'markdown'],
}

export function useCodeHighlighter() {
  async function loadHighlighter() {
    if (!highlighter) {
      highlighter = await getHighlighter(options)
    }
  }

  function highlightCode(code: string, lang: string) {
    return highlighter?.codeToHtml(code, { theme: 'nord', lang })
  }

  return { highlightCode, loadHighlighter }
}
