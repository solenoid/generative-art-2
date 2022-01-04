let idIndex = 1
/**
 * Generate application wide unique ids with prefix support.
 */
export const idGenerator = (prefix) => `${prefix}-${idIndex++}`

/**
 * Assumes well formed rgb(2, 3, 4) strings as input.
 */
export const rgbToHex = (s) => {
  const triple = eval(s.replace('rgb(', '[').replace(')', ']'))
  return `#${triple.map((n) => n.toString(16).padStart(2, '0')).join('')}`
}
