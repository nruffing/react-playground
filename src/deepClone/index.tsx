import Code from "../components/Code";
import { useFormatters } from "../hooks/useFormatters";

// https://www.greatfrontend.com/questions/javascript/deep-clone-ii

function deepClone<T>(value: T, cloned: { source: any, clone: any }[] = []): T {
  if (!value) {
    return value
  }
  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return deepCloneArray(value, cloned) as T
    }
    if (value instanceof Date) {
      return new Date(value.getTime()) as T
    }
    if (value instanceof RegExp) {
      return new RegExp(value.source, value.flags) as T
    }
    return deepCloneObject(value, cloned)
  }
  return value
}

function deepCloneObject<T extends object>(value: T, cloned: { source: any, clone: any }[]): T {
  const alreadyCloned = cloned.find(c => c.source === value)
  if (alreadyCloned?.clone) {
    return alreadyCloned.clone
  }

  const clone = {} as Record<string | symbol, unknown>
  cloned.push({ source: value, clone })
  
  for (const entry of Object.entries(value)) {
    clone[entry[0]] = deepClone(entry[1], cloned)
  }
  for (const sym of Object.getOwnPropertySymbols(value)) {
    clone[sym] = deepClone((value as any)[sym], cloned)
  }

  const proto = Object.getPrototypeOf(value)
  if (proto && proto !== Object.prototype) {
    Object.setPrototypeOf(clone, proto)
  }

  return clone as T
}

function deepCloneArray<T>(value: Array<T>, cloned: { source: any, clone: any }[]): Array<T> {
  return value.map(i => deepClone(i), cloned)
}

export default function DeepClone() {
  const formatters = useFormatters()

  const toClone = {
    num: 0,
    str: '',
    boolean: true,
    unf: undefined,
    nul: null,
    obj: { name: 'foo', id: 1 },
    arr: [0, 1, 2],
    date: new Date(),
    reg: new RegExp('/bar/ig'),
    [Symbol('s')]: 'baz',
  }
  const cloned = deepClone(toClone)

  return <>
    <a href="https://www.greatfrontend.com/questions/javascript/deep-clone-ii" target="_blank">Great Frontend</a>
    <Code code={formatters.formatObjAsJson(toClone)} lang="json" />
    <Code code={formatters.formatObjAsJson(cloned)} lang="json" />
  </>
}