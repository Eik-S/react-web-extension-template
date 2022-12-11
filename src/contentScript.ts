import { useBrowserMessaging } from './services/browserMessaging'

const { sendPageVisited } = useBrowserMessaging()

window.onload = sendPageVisited
