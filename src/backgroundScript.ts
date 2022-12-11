import { VisitedPage } from './models/visitedPage'
import { useBrowserMessaging } from './services/browserMessaging'

const visitedPages: VisitedPage[] = []

const { listenForMessages } = useBrowserMessaging()

listenForMessages(async (message) => {
  const messageType = message.type
  switch (messageType) {
    case 'VISITED_PAGES_REQUEST':
      return visitedPages
    case 'PAGE_VISITED':
      saveVisitedPage(message)
      return
    default:
      return
  }
})

function saveVisitedPage({ title, url }: VisitedPage) {
  const prevVisitedPages = [...visitedPages]
  if (prevVisitedPages.some((page) => page.url === url)) return

  visitedPages.push({ title, url })
}
