import { assign, createMachine, send } from 'xstate'

export default createMachine({
  initial: 'idle',
  context: {
    // eslint-disable-next-line no-undef
    username: localStorage.getItem('username') || '',
    editedUsername: ''
  },
  states: {
    idle: {
      entry: ['proxyEditUsername'],
      on: {
        EDIT_USERNAME: 'editingUsername',
        END: 'finished'
      }
    },
    editingUsername: {
      on: {
        UPDATE_USERNAME: {
          actions: ['changeUsernameValue']
        },
        SUBMIT_USERNAME: {
          actions: ['setUsernameValue', 'sendFinished']
        },
        END: 'finished'
      }
    },
    finished: {
      type: 'final'
    }
  }
}, {
  actions: {
    proxyEditUsername: send((context, event) => {
      if (!context.username) {
        return 'EDIT_USERNAME'
      }

      return 'END'
    }),
    changeUsernameValue: assign({
      editedUsername: (context, event) => event.username
    }),
    setUsernameValue: assign({
      username: context => {
        // eslint-disable-next-line no-undef
        localStorage.setItem('username', context.editedUsername)
        return context.editedUsername
      },
      editedUsername: ''
    }),
    sendFinished: send('END')
  }
})
