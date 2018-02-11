'use strict'

// import lstore from 'store'
import * as types from './mutation-types'
// import * as _storeKeys from './lstoreKeys'

export default {
  [types.RANDOM_USER] (state, user) {
    state.currentUser = user
  }
}
