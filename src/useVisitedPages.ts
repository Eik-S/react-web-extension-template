import { useEffect, useState } from 'react'
import { VisitedPage } from './models/visitedPage'
import { useBackgroundScriptChannel } from './services/backgroundScriptChannel'

export function useVisitedPages() {
  const { requestVisitedPages } = useBackgroundScriptChannel()

  const [visitedPages, setVisitedPages] = useState<VisitedPage[]>([])

  useEffect(() => {
    requestVisitedPages().then(setVisitedPages)
  }, [])

  return {
    visitedPages,
  }
}
