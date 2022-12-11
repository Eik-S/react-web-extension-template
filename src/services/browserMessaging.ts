import { VisitedPage } from '../models/visitedPage'
import browser from 'webextension-polyfill'

export type MessageType = 'PAGE_VISITED' | 'VISITED_PAGES_REQUEST'

export function useBrowserMessaging() {
  async function sendPageVisited(): Promise<void> {
    console.log('Page visited: ', window.location.href, document.title)
    await browser.runtime.sendMessage({
      type: 'PAGE_VISITED',
      url: window.location.href,
      title: document.title,
    })
  }

  async function requestVisitedPages(): Promise<VisitedPage[]> {
    return (await browser.runtime.sendMessage({
      type: 'VISITED_PAGES_REQUEST',
    })) as VisitedPage[]
  }

  function listenForMessages(cb: (message: any) => void) {
    browser.runtime.onMessage.addListener(cb)
  }

  return {
    sendPageVisited,
    requestVisitedPages,
    listenForMessages,
  }
}
