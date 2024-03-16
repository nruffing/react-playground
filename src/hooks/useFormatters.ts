import htmlFormat from "html-format";

export function useFormatters() {
  function formatHtml(html: string) {
    if (!html) {
      return "";
    }
    return htmlFormat(html.replace(/></g, ">\n<"), "  ");
  }

  function formatObjAsJson(obj: any) {
    return JSON.stringify(obj, undefined, 2);
  }

  return { formatHtml, formatObjAsJson };
}
