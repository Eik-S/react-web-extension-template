import { useBackgroundScriptChannel } from './services/backgroundScriptChannel'

const { sendPageVisited } = useBackgroundScriptChannel()

window.onload = sendPageVisited

export {}
