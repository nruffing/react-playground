import { useEffect, useState, createElement } from "react";
import { useCodeHighlighter } from "../hooks/useCodeHighlighter";

export default function Code({ code, lang }: { code: string, lang: string }) {
  const { highlightCode, loadHighlighter } = useCodeHighlighter();
  const [html, setHtml] = useState<string>('')

  async function loadHtml() {
    await loadHighlighter()
    setHtml(highlightCode(code, lang) ?? '')
  }

  useEffect(() => { loadHtml() })

  return createElement('span', { dangerouslySetInnerHTML: { __html: html } })
}
