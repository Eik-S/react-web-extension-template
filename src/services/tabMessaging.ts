import browser from 'webextension-polyfill'
import { VisitedPage } from '../models/visitedPage'
import { Message, Response } from './browserMessaging'

async function sendMessageToTab(tabId: number, message: Message): Promise<Response> {
  return browser.tabs.sendMessage(tabId, message)
}

export function useTabMessaging() {
  async function visitPageOnActiveTab({ url, title }: VisitedPage): Promise<Response> {
    return browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      const activeTab = tabs[0]
      if (activeTab.id === undefined) {
        throw new Error('browser has no active tab to visit page on')
      }
      return sendMessageToTab(activeTab.id, { type: 'NAVIGATE_TO_PAGE', url, title })
    })
  }

  return { visitPageOnActiveTab }
}
