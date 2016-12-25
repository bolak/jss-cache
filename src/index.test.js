/* eslint-disable no-underscore-dangle */

import expect from 'expect.js'
import {create} from 'jss'

import cache from './index'

describe('jss-cache', () => {
  let jss

  beforeEach(() => {
    jss = create().use(cache())
  })

  describe('ensure cache is used', () => {
    it('should not call onCreateRule', () => {
      const styles = {a: {color: 'red'}}
      let onCreateRuleCalled = false
      // After the first call its cached.
      jss.createStyleSheet(styles)
      jss.use({
        onCreateRule: () => {
          onCreateRuleCalled = true
        }
      })
      jss.createStyleSheet(styles)
      expect(onCreateRuleCalled).to.be(false)
      expect(styles.a.__jss__).to.be.a('string')
    })
  })

  describe('cache only regular rules', () => {
    it('should not cache container rules', () => {
      const styles = {
        '@media': {
          button: {color: 'red'}
        }
      }
      jss.createStyleSheet(styles)
      expect(styles['@media'].__jss__).to.be(undefined)
    })
  })

  describe('linked rules should not be cached', () => {
    it('should call onCreateRule', () => {
      const styles = {a: {color: 'red'}}
      const options = {link: true}
      let onCreateRuleCalled = false
      // After the first it should not be cached.
      jss.createStyleSheet(styles, options)
      jss.use({
        onCreateRule: () => {
          onCreateRuleCalled = true
        }
      })
      jss.createStyleSheet(styles, options)
      expect(onCreateRuleCalled).to.be(true)
      expect(styles.a.__jss__).to.be(undefined)
    })
  })
})
