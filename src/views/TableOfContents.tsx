import Code from "../components/Code";
import { useFormatters } from "../hooks/useFormatters";

// https://www.greatfrontend.com/questions/javascript/table-of-contents

interface Heading {
  level: number;
  heading: HTMLElement;
}

interface HeadingNode {
  level: number;
  innerHtml: string;
  children: HeadingNode[];
}

function findHeadings(element: HTMLElement, headings: Heading[]) {
  if (element.tagName.length > 1 && element.tagName.startsWith("H")) {
    const level = parseInt(element.tagName.substring(1));
    if (level) {
      headings.push({ level, heading: element });
    }
  }

  for (var child of element.children) {
    findHeadings(child as HTMLElement, headings);
  }
}

function buildListItem(
  heading: HeadingNode,
  ul: HTMLUListElement,
  doc: Document,
) {
  const li = doc.createElement("li");
  if (heading.innerHtml) {
    li.innerHTML = heading.innerHtml;
  }

  if (heading.children.length) {
    const childUl = doc.createElement("ul");
    for (var child of heading.children) {
      buildListItem(child, childUl, doc);
    }
    li.appendChild(childUl);
  }

  ul.appendChild(li);
}

function getRootHeading(doc: Document) {
  var headings = [] as Heading[];
  findHeadings(doc.body, headings);

  if (!headings.length) {
    return null;
  }

  const root = { level: 0, innerHtml: "", children: [] } as HeadingNode;
  let current = root;
  const stack = [root] as HeadingNode[];

  for (var heading of headings) {
    const node = {
      level: heading.level,
      innerHtml: heading.heading.innerText,
      children: [],
    } as HeadingNode;

    while (stack.length > 1 && heading.level <= current.level) {
      stack.pop();
      current = stack[stack.length - 1];
    }

    current.children.push(node);
    current = node;
    stack.push(node);
  }

  return root;
}

function tableOfContents(doc: Document): string {
  const root = getRootHeading(doc);

  if (!root) {
    return "";
  }

  const rootUl = doc.createElement("ul");
  for (const heading of root.children) {
    buildListItem(heading, rootUl, doc);
  }
  return rootUl.outerHTML;
}

export default function TableOfContents() {
  const formatters = useFormatters();

  const docHtml = `<!DOCTYPE html>
  <body>
    <h1>Heading1</h1>
    <h2>Heading2a</h2>
    <h2>Heading2b</h2>
    <h3>Heading3a</h3>
    <h3>Heading3b</h3>
    <h4>Heading4</h4>
    <h2>Heading2c</h2>
  </body>`;

  const doc = new DOMParser().parseFromString(docHtml, "text/html");
  const headings = formatters.formatObjAsJson(getRootHeading(doc));
  const toc = formatters.formatHtml(tableOfContents(doc));

  return (
    <>
      <Code code={docHtml} lang="html" />
      <Code code={headings} lang="json" />
      <Code code={toc} lang="html" />
      <span dangerouslySetInnerHTML={{ __html: toc }}></span>
    </>
  );
}
