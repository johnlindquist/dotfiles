import { ifApp, ifVar } from 'karabiner.ts'

export const ifChrome = ifApp('com.google.Chrome')
export const ifVSCode = ifApp('com.microsoft.VSCode')

export const ifMultitouchFingerCount = (n: number) =>
  ifVar('multitouch_extension_finger_count_total', n)
// I use my trackpad with these keys as well. The condition makes sure I'm not touching the trackpad
export const unlessMultitouch = ifMultitouchFingerCount(0)

export const escapeMode = 'escape-mode'
export const ifEscapeMode = ifVar(escapeMode)
