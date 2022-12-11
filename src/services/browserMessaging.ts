import { VisitedPage } from '../models/visitedPage'
import browser from 'webextension-polyfill'
import { UnreachableCaseError } from '../utils/unreachableCaseError'

export type MessageType = 'PAGE_VISITED' | 'VISITED_PAGES_REQUEST' | 'NAVIGATE_TO_PAGE'

interface GenericMessage {
  type: MessageType
}

interface RequestMessage extends GenericMessage {
  type: 'VISITED_PAGES_REQUEST'
}

export interface PageMessage extends GenericMessage {
  type: 'PAGE_VISITED' | 'NAVIGATE_TO_PAGE'
  url: string
  title: string
}

export type Message = RequestMessage | PageMessage
export type Response = VisitedPage[] | void

async function sendMessageToBrowser(message: Message): Promise<Response> {
  return browser.runtime.sendMessage(message)
}

export function useBrowserMessaging() {
  async function sendPageVisited(): Promise<void> {
    await sendMessageToBrowser({
      type: 'PAGE_VISITED',
      url: window.location.href,
      title: document.title,
    })
  }

  async function requestVisitedPages(): Promise<VisitedPage[]> {
    const visitedPages = (await sendMessageToBrowser({
      type: 'VISITED_PAGES_REQUEST',
    })) as VisitedPage[]
    return visitedPages
  }

  function listenForMessages(cb: (message: Message) => Promise<Response>) {
    browser.runtime.onMessage.addListener((message: Message) => {
      const messageType = message.type
      switch (messageType) {
        case 'VISITED_PAGES_REQUEST':
          return cb(message)
        case 'PAGE_VISITED':
          return cb(message)
        case 'NAVIGATE_TO_PAGE':
          return cb(message)
        default:
          throw new UnreachableCaseError(messageType)
      }
    })
  }

  return {
    sendPageVisited,
    requestVisitedPages,
    listenForMessages,
  }
}
