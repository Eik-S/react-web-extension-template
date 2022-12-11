import { VisitedPage } from './models/visitedPage'
import { MessageType, useBrowserMessaging } from './services/browserMessaging'
import { UnreachableCaseError } from './utils/unreachableCaseError'

const visitedPages: VisitedPage[] = []

const { listenForMessages } = useBrowserMessaging()

listenForMessages(async (message) => {
  const messageType = message.type as MessageType
  console.log('received message', { message })
  switch (messageType) {
    case 'VISITED_PAGES_REQUEST':
      return visitedPages
    case 'PAGE_VISITED':
      const visitedPage = {
        title: message.title,
        url: message.url,
      }
      saveVisitedPage(visitedPage)
      return
    default:
      throw new UnreachableCaseError(messageType)
  }
})

function saveVisitedPage({ title, url }: VisitedPage) {
  const prevVisitedPages = [...visitedPages]
  if (prevVisitedPages.some((page) => page.url === url)) return

  visitedPages.push({ title, url })
  console.log(`User visited new page: ${title}`)
}
