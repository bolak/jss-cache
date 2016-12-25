/* eslint-disable no-underscore-dangle */

export default () => {
  const cache = Object.create(null)

  function onCreateRule(name, decl) {
    if (decl.__jss__) return cache[decl.__jss__]
    return null
  }

  function onProcessRule(rule) {
    const {selector, type, options: {sheet}} = rule

    if (type !== 'regular' || cache[selector]) return
    if (sheet && sheet.options.link) return

    cache[selector] = rule
    rule.originalStyle.__jss__ = selector
  }

  return {onCreateRule, onProcessRule}
}
