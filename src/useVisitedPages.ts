import { useEffect, useState } from 'react'
import { VisitedPage } from './models/visitedPage'
import { useBrowserMessaging } from './services/browserMessaging'

export function useVisitedPages() {
  const { requestVisitedPages } = useBrowserMessaging()

  const [visitedPages, setVisitedPages] = useState<VisitedPage[]>([])

  useEffect(() => {
    requestVisitedPages().then(setVisitedPages)
  }, [])

  return {
    visitedPages,
  }
}
