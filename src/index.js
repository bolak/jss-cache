/* eslint-disable no-underscore-dangle */

export const marker = '__jss__'

export default () => {
  const cache = Object.create(null)

  function onCreateRule(name, decl, {parent}) {
    if (parent) {
      const selector = parent.rules.raw[name][marker]
      if (selector) return cache[selector]
    }

    return null
  }

  function onProcessRule(rule) {
    const {selector, type, options: {sheet, parent}} = rule

    if (type !== 'regular' || cache[selector]) return
    if (!parent) return
    if (sheet && sheet.options.link) return

    cache[selector] = rule
    const originalStyle = parent.rules.raw[rule.name]
    if (!originalStyle[marker]) {
      Object.defineProperty(originalStyle, marker, {value: selector})
    }
  }

  return {onCreateRule, onProcessRule}
}
