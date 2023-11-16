import { createSlice } from '@reduxjs/toolkit'

import authState from './initialState'

import type { IUser } from './types'
import type { PayloadAction } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    },

    unsetUser: state => {
      state.user = undefined
    },
  },
})

export const { setUser, unsetUser } = authSlice.actions
export default authSlice.reducer
