/* eslint-disable no-underscore-dangle */

import expect from 'expect.js'
import {create} from 'jss'

import cache, {marker} from './index'

describe('jss-cache', () => {
  let jss

  beforeEach(() => {
    jss = create().use(cache())
  })

  describe('ensure marker based cache is used', () => {
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
      expect(styles.a[marker]).to.be.a('string')
    })

    it('should not cache non-regular rules', () => {
      const styles = {
        '@media': {
          button: {color: 'red'}
        }
      }
      jss.createStyleSheet(styles)
      expect(styles['@media'][marker]).to.be(undefined)
    })

    it('should allow cloning of styles without the marker', () => {
      const styles = {
        button: {color: 'red'}
      }
      jss.createStyleSheet(styles)
      expect({...styles.button}[marker]).to.be(undefined)
    })

    it('should not leak the flag to CSS', () => {
      const styles = {a: {color: 'red'}}
      const sheet = jss.createStyleSheet(styles)
      expect(styles.a[marker]).to.be.a('string')
      expect(sheet.toString().indexOf(marker)).to.be(-1)
    })

    it('should not call processors on a cached rule', () => {
      const styles = {a: {color: 'red'}}
      let onProcessRuleCalled = false
      // After the first call its cached.
      jss.createStyleSheet(styles)
      jss.use({
        onProcessRule: () => {
          onProcessRuleCalled = true
        }
      })
      jss.createStyleSheet(styles)
      expect(onProcessRuleCalled).to.be(false)
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
      expect(styles.a[marker]).to.be(undefined)
    })
  })
})
