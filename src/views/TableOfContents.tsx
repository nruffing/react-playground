import Code from "../components/Code"
import format from "html-format"


// https://www.greatfrontend.com/questions/javascript/table-of-contents

interface Heading {
  level: number,
  heading: Element,
}

interface HeadingNode {
  level: number,
  heading?: Element,
  children: HeadingNode[],
}

function findHeadings(element: Element, headings: Heading[]) {
  if (element.tagName.length > 1 && element.tagName.startsWith("H")) {
    const level = parseInt(element.tagName.substring(1))
    if (level) {
      headings.push({ level, heading: element })
    }
  }

  for (var child of element.children) {
    findHeadings(child, headings)
  }
}

function tableOfContents(doc: Document): string {
  var headings = [] as Heading[]
  findHeadings(doc.body, headings)

  if (!headings.length) {
    return ''
  }


  const root = { level: 0, children: [] } as HeadingNode
  let current = root
  const stack = [root] as HeadingNode[]

  for (var heading of headings) {
    const node = { level: heading.level, heading: heading.heading, children: [] } as HeadingNode

    if (heading.level > current.level) {

    }

    if (current!.level > heading.level) {

    }

  }
}

export default function TableOfContents() {
  const docHtml = `<!DOCTYPE html>
  <body>
    <h1>Heading1</h1>
    <h2>Heading2a</h2>
    <h2>Heading2b</h2>
    <h3>Heading3a</h3>
    <h3>Heading3b</h3>
    <h4>Heading4</h4>
    <h2>Heading2c</h2>
  </body>`

  const doc = new DOMParser().parseFromString(docHtml, 'text/html')
  const toc = format(tableOfContents(doc).replace(/></g, '>\n<'), '  ')

  return (
    <>
      <Code code={docHtml} lang="html" />
      <Code code={toc} lang="html" />
      <span dangerouslySetInnerHTML={ {__html: toc} }></span>
    </>
  )
}
