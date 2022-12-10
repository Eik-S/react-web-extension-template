import { VisitedPage } from '../models/visitedPage'

export type MessageType = 'PAGE_VISITED' | 'VISITED_PAGES_REQUEST'

export function useBackgroundScriptChannel() {
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

  return {
    sendPageVisited,
    requestVisitedPages,
  }
}
