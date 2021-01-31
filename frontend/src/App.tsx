import { HomePage } from './pages'
import { AuthProvider } from './contexts'

function App() {
  return (
    <AuthProvider>
      <div id="App">
        <HomePage />
      </div>
    </AuthProvider>
  )
}

export default App
