import { useEffect, useState } from 'react'
import { VisitedPage } from './models/visitedPage'
import { useBrowserMessaging } from './services/browserMessaging'
import { useTabMessaging } from './services/tabMessaging'

export function useVisitedPages() {
  const { requestVisitedPages } = useBrowserMessaging()
  const { visitPageOnActiveTab } = useTabMessaging()

  const [visitedPages, setVisitedPages] = useState<VisitedPage[]>([])

  useEffect(() => {
    requestVisitedPages().then(setVisitedPages)
  }, [])

  function visitPage({ title, url }: VisitedPage) {
    visitPageOnActiveTab({ title, url })
    window.close()
  }

  return {
    visitedPages,
    visitPage,
  }
}
