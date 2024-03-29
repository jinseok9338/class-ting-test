
import './App.css'
import { ErrorBoundary } from 'react-error-boundary'
import { QueryClientProvider } from 'react-query'
import AppRouter from './router'
import { QuizProvider } from './contexts/quizContext'
import ErrorFallback from './components/error'
import { queryClient } from './api/client'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Suspense } from 'react'
import LoadingSpinner from './components/loadingSpinner'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
function App() {
  ChartJS.register(ArcElement, Tooltip, Legend);
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
    >
      <Suspense fallback={<LoadingSpinner />}>
        <QueryClientProvider client={queryClient}>
          <QuizProvider>
            <AppRouter />
          </QuizProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Suspense>
    </ErrorBoundary>


  )
}

export default App
