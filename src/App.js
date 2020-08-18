import React from 'react'
import './App.css'
import machine from './state'
import { useMachine } from '@xstate/react'

// todo regarder comment envoyer des données depuis ici dans le context
function App () {
  const [state, send] = useMachine(machine)

  return (
    <div className='container'>
      <div className='row row-cols-3 justify-content-center'>
        {state.value === 'finished' && (
          <div className='alert alert-info' role='alert'>
            Mon username est {state.context.username}
          </div>
        )}
        {state.value === 'editingUsername' && (
          <form>
            <div className='form-group'>
              <label htmlFor='username'>Username</label>
              <input
                type='text' className='form-control' onChange={e => {
                  send({
                    type: 'UPDATE_USERNAME',
                    username: e.target.value
                  })
                }}
              />
            </div>
            <button
              type='submit'
              className='btn btn-primary'
              onClick={(event) => {
                event.preventDefault()
                send('SUBMIT_USERNAME')
              }}
            >
              Enregistrer
            </button>
          </form>
        )}
      </div>
      <div className='row row-cols-3 justify-content-center py-4'>
        <pre>
          {JSON.stringify({
            context: state.context,
            state: state.value
          }, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export default App
