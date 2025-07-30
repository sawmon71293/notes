import { defineStore } from 'pinia'

export const useSnackbarStore = defineStore('snackbar', {
  state: () => ({
    message: '',
    show: false,
  }),
  actions: {
    trigger( msg:string) {
      this.message = msg
      this.show = true
      setTimeout(() => {
        this.show = false
      }, 3000)
    },
  },
})
