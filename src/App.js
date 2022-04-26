import React, { useState, createContext } from 'react'
import {
  AmplifyProvider,
  Alert,
  Heading,
  View,
  Text,
} from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

import Logo from './components/Logo/Logo'
import Check from './components/Check/Check'
import DirectoryThumbs from './components/DirectoryThumbs/DirectoryThumbs'
import Results from './components/Results/Results'
import './App.css'

export const ResultsContext = createContext(null)

function App() {
  const [results, setResults] = useState([])
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <AmplifyProvider>
      <ResultsContext.Provider
        value={{
          results,
          setResults,
          setHasError,
          setErrorMessage,
          setLoading,
        }}
      >
        <View>
          <header>
            <Logo />
          </header>
          <main>
            <div className="check container">
              {!results.length > 0 && <Check />}
            </div>
            <div className="results container">
              {loading && <Alert variation="info">...Loading...</Alert>}
              {!results.length > 0 && !loading && (
                <>
                  <Text textAlign="center">
                    Is your company listed accurately in these online
                    directories?
                  </Text>
                  <DirectoryThumbs />
                </>
              )}
              {results.length > 0 && !loading && <Results />}
              {hasError && !loading && (
                <Alert variation="error">{errorMessage}</Alert>
              )}
            </div>
          </main>
        </View>
      </ResultsContext.Provider>
    </AmplifyProvider>
  )
}

export default App
