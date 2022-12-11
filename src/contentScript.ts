import { useBrowserMessaging } from './services/browserMessaging'

const { sendPageVisited, listenForMessages } = useBrowserMessaging()

listenForMessages(async (message) => {
  const messageType = message.type
  switch (messageType) {
    case 'NAVIGATE_TO_PAGE':
      window.location.href = message.url
      return
    default:
      return
  }
})

window.onload = sendPageVisited
