import { toKey, ToKeyParam } from 'karabiner.ts'

// colemak from (for easier mnemonics)
export const _q = 'q'
export const _w = 'w'
export const _f = 'e'
export const _p = 'r'
export const _g = 't'
export const _j = 'y'
export const _l = 'u'
export const _u = 'i'
export const _y = 'o'
export const _semicolon = 'p'

export const _a = 'a'
export const _r = 's'
export const _s = 'd'
export const _t = 'f'
export const _d = 'g'
export const _h = 'h'
export const _n = 'j'
export const _e = 'k'
export const _i = 'l'
export const _o = 'semicolon'

export const _z = 'z'
export const _x = 'x'
export const _c = 'c'
export const _v = 'v'
export const _b = 'b'
export const _k = 'n'
export const _m = 'm'

export const homeRowArrows = { h: '←', j: '↓', k: '↑', l: '→' } as const

export const typeSecret$ = (s: string) => `osascript -e '
                           set out to do shell script "security find-generic-password -a $USER -s ${s} -w"
                           
                           tell application "System Events" to keystroke out
                           '`
export const launch$ = (s: string) =>
  `osascript -e 'tell application "${s}" to activate'`
export const alfred$ = (s1: string, s2: string, s3: string) =>
  `osascript -e 'tell application "Alfred 4" to run trigger "${s1}" in workflow "${s2}" with argument "${s3}"'`

export const openAlfred = toKey('␣', '⌥')

export const acejump = toKey('j', '⌘⌥⇧')
export const acejumpLine = toKey('l', '⌘⌥⇧')
export const acejumpSelection = toKey('s', '⌘⌥⇧')
export const acejumpMulti = toKey('m', '⌘⌥⇧')

export const expandSelection = toKey('→', '⌘⌃⇧')
export const shrinkSelection = toKey('←', '⌘⌃⇧')

export const insertLineBelow = toKey('⏎', '⌘')
export const insertLineAbove = toKey('⏎', '⌘⇧')

export const deleteLine = toKey('k', '⌘⇧')

export const focusGit = toKey('g', '⌃⇧')
export const focusExplorer = toKey('e', '⌘⇧')

export const openParen = toKey(9, '⇧')
export const closeParen = toKey(0, '⇧')
export const openBrace = toKey('[', '⇧')
export const closeBrace = toKey(']', '⇧')
export const lessThan = toKey(',', '⇧')
export const greaterThan = toKey('.', '⇧')
export const typeSequence = (s: string) =>
  s.split('').map((v) => {
    if (v === '(') return openParen
    if (v === ')') return closeParen
    if (v === '{') return openBrace
    if (v === '}') return closeBrace
    if (v === '<') return lessThan
    if (v === '>') return greaterThan
    if (v === '"') return toKey("'", '⇧')
    if (v === '$') return toKey(4, '⇧')
    if (v === ' ') return toKey('␣')
    return toKey(v as ToKeyParam)
  })
