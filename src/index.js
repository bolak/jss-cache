/* eslint-disable no-underscore-dangle */

export const marker = '__jss__'

export default () => {
  const cache = Object.create(null)

  function onCreateRule(name, decl) {
    if (decl[marker]) return cache[decl[marker]]
    return null
  }

  function onProcessRule(rule) {
    const {selector, type, options: {sheet}} = rule

    if (type !== 'regular' || cache[selector]) return
    if (sheet && sheet.options.link) return

    cache[selector] = rule
    rule.originalStyle[marker] = selector
  }

  return {onCreateRule, onProcessRule}
}
