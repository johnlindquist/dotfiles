import {
  FromKeyParam,
  layer,
  map,
  NumberKeyValue,
  simlayer,
  toSetVar,
  withCondition,
  withMapper,
} from 'karabiner.ts'
import { escapeMode, ifChrome, ifVSCode, unlessMultitouch } from '../condition'
import {
  _a,
  _b,
  _c,
  _d,
  _e,
  _f,
  _g,
  _h,
  _i,
  _j,
  _k,
  _l,
  _m,
  _n,
  _o,
  _p,
  _q,
  _r,
  _s,
  _semicolon,
  _t,
  _u,
  _v,
  _w,
  _x,
  _y,
  _z,
  acejump,
  acejumpLine,
  acejumpMulti,
  acejumpSelection,
  alfred$,
  closeBrace,
  closeParen,
  deleteLine,
  expandSelection,
  focusGit,
  greaterThan,
  homeRowArrows,
  insertLineAbove,
  insertLineBelow,
  launch$,
  lessThan,
  openBrace,
  openParen,
  shrinkSelection,
  typeSecret$,
  typeSequence,
} from '../from-to'

export const quickModeLayer = simlayer('q', 'quick-mode').manipulators([
  map(_n).to$('~/.kit/kar quick-thoughts-editor'),
  map(_g).to$('~/.kit/kar gratitude-page'),
])

export const zeroModeLayer = simlayer(0, 'zero-mode')
  .description('Displays | display_layout_k')
  .manipulators([withMapper([1, 2, 3, 4])((k) => map(k).to(k, 'Hyper'))])

export const closeModeLayer = simlayer('w', 'close-mode').manipulators([
  withMapper([ifVSCode, ifChrome])((app) =>
    withCondition(app)([
      map(_a).to('k', '⌘').to('w'), // close all
      map(_o).to('t', '⌘⌥'), // close others
    ]),
  ),
])

export const finderModeLayer = simlayer(_f, 'finder-mode').manipulators([
  map(_a).to$('open /Applications'),
  map(_d).to$('open ~/Downloads'),
  map(_h).to$('open ~'),
  map(_j).to$('~/.kit/kar fenced-js'),
  map(_b).to(typeSequence('```bash⏎⏎```↑')), // fenced bash
])

export const peekModeLayer = simlayer(_p, 'peek-mode').manipulators([
  map(_h).to('f12', '⌥'), // peek_definition
  map(_e).to('f12', '⌘⇧'), // peek_implementations
  map(_n).to('f19', '⌃'), // peek_references
  map(_i).to('f19', '⌘'), // peek_declaration
  map(_o).to('f19', '⇧'), // peek_type
])

export const goModeLayer = simlayer(_g, 'go-mode').manipulators([
  map(_r).to('f12', '⇧'), // go_to_references
  map(_w).to('o', '⌘⌥⇧'), // go_to_symbol_in_workspace
  map(_s).to('o', '⌘⇧'), // go_to_symbol
  map(_h).to('p', '⌘⌥'), // search_everywhere
  map(_i).to('f12', '⌘'), // go_to_implementations
  map(_n).to('o', '⌘⇧'), // go_to_symbol, g,d is impossible in colemak
  map(_o).to('f12'), // go_to_definition, g,d is impossible in colemak
  map(_l).to('g', '⌃'), // go_to_line, g,d is impossible in colemak
  map(_m).to('f8', '⇧'), // go_to_prev_problem, g,d is impossible in colemak
  map(',').to('f8'), // go_to_next_problem, g,d is impossible in colemak
])

export const fnModeLayer = simlayer('-', 'fn-mode')
  .condition(unlessMultitouch)
  .manipulators([
    withMapper({
      d: 'left_shift',
      ...homeRowArrows,
    } as const)((k, v) => map(k, undefined, 'any').to(v)),
  ])

export const optModeLayer = simlayer('a', 'opt-mode')
  .condition(unlessMultitouch)
  .manipulators([
    map(';').to(acejump),
    map(_b).to(acejump).to('['),
    map('␣').to(acejump),
    map('⎋').to(acejumpLine),
    map(_l).to(acejumpLine),
    map('⇥').to(acejumpLine).to(acejumpSelection),
    map(_u).to(acejumpLine).to(acejumpSelection),
    map(_s).to(acejumpSelection),
    map(_m).to(acejumpMulti),
    map('left_shift').to(acejumpSelection),

    withMapper(homeRowArrows)((k, v) => map(k, '', 'any').to(v, '⌥')),
  ])

export const shiftOptModeLayer = simlayer(_r, 'shift-opt-mode')
  .condition(unlessMultitouch)
  .manipulators([
    withMapper(homeRowArrows)((k, v) => map(k, '', 'any').to(v, '⌥⇧')),

    map('spacebar', '', 'any').toPointingButton('button1', '⌘'),
    map('left_shift', '', 'any').toPointingButton('button2'),
  ])

export const shiftModeLayer = simlayer(_s, 'shift-mode')
  .condition(unlessMultitouch)
  .manipulators([
    map('y', '', 'any').to('←', '⌘⇧'),
    map('o', '', 'any').to('→', '⌘⇧'),

    withMapper(homeRowArrows)((k, v) => map(k, '', 'any').to(v, '⌥⇧')),

    map('left_shift').to(shrinkSelection),
    map('⏎').to(insertLineAbove),

    map(';').to(expandSelection),
    map("'").to(shrinkSelection),

    map('m', '', 'any').to('page_down', '⇧'),
    map(',', '', 'any').to('page_up', '⇧'),
  ])

export const movementModeLayer = simlayer(_t, 'movement-mode')
  .condition(unlessMultitouch)
  .manipulators([
    map('y', '', 'any').to('←', '⌘'),
    map('o', '', 'any').to('→', '⌘'),
    withMapper(homeRowArrows)((k, v) => map(k, '', 'any').to(v)),
    map(';').to('␣', '⌃'),
    map('⏎').to(insertLineBelow),
    map('left_shift').to(expandSelection),
  ])

export const cursorModeLayer = simlayer(_d, 'cursor-mode')
  .condition(unlessMultitouch)
  .manipulators([
    map('h').to('d', '⌘'), // cursor find match
    map('j').to('↓', '⌘⌥'), // cursor below
    map('k').to('↑', '⌘⌥'), // cursor above
    map(_j).to(acejump),
    map(_l).to(acejumpLine),
    map(_m).to(acejumpMulti),
    map('left_shift').to('l', '⌘⇧'), // cursor select all
    map('l').to('i', '⌘⌥'), // developer tools
  ])

export const deleteModeLayer = simlayer(_n, 'delete-mode').manipulators([
  map('⎋').to('⌫', '⌘'),

  withCondition(ifVSCode)([
    map('⎋').to(deleteLine),
    map('-').to(deleteLine),
    map('⇪').to(deleteLine),
  ]),

  map('-').to('⌫', '⌘'),
  map('a').to('⌫', '⌥').toIfHeldDown(deleteLine),
  map('s').to('⌫'),
  map('d').to('⌦'),
  map('f').to('⌦', '⌥'),
  map('g').to('⌦', '⌘'),
])

export const editorModeLayer = simlayer(_e, 'editor-mode').manipulators([
  map('-').to('f16', '⌥'), // focus_next_editor_group
  map(_a).to('←', '⌘⌥'), // open_prev_editor
  map(_r).to('-', '⌃'), // go_back
  map(_s).to('-', '⌃⇧'), // go_forward
  map(_t).to('→', '⌘⌥'), // open_next_editor
  map(_d).to('f16', '⌥⇧'), // focus_prev_editor_group
])

export const openModeLayer = simlayer(_o, 'open-mode').manipulators([
  map('k').to$('~/.kit/kar update-karabiner-config'),
  map('w').to$('~/.kit/kar ~/.kit/cli/edit.js ~/.kenv/scripts/wiki-ten'),
])

export const snippetModeLayer = simlayer("'", 'snippet-mode').manipulators([
  map(_c).to(typeSequence('console.log()←')),
  map(_a).to(typeSequence('await␣')),
  map(_s).to(typeSequence('async␣')),
  map(_n).to(typeSequence('className=""←')),
  map(_e).to$(typeSecret$('BUSINESS_EMAIL')),
  map(_g).to$(typeSecret$('PERSONAL_EMAIL')),
  map(_x).to$(typeSecret$('SPAM_EMAIL')),
  map(_j).to$(typeSecret$('USERNAME')),
])

export const emojiModeLayer = simlayer('z', 'emoji-mode').manipulators([
  // emoji_picker
  withMapper(['e', 'n'])((k) => map(k).to('␣', '⌘⌃')),
  // emoji
  withMapper({
    [_b]: '😊', // blush
    [_c]: '👏', // clap
    [_d]: '🧐', // dignified
    [_f]: '🔥', // facepalm
    [_g]: '😬', // grimace
    [_h]: '😍', // heart-eyes
    [_i]: '👀', // I
    [_j]: '😂', // joking
    [_l]: '❤️', // love
    [_m]: '🤯', // mind blown
    [_o]: '💩', // pOop
    [_p]: '🎉', // party
    [_q]: '🤫', // quiet
    [_r]: '🏎', // racecar
    [_s]: '😢', // sad
    [_t]: '🤔', // thinking
    [_u]: '🤷‍♂️', // shrUg
    [_v]: '😎', // very cool
    [_w]: '😉', // wink:
    [_x]: '😵', // x-eyes
    [_y]: '😅', // sweatY
    left_command: '👍',
    left_option: '👎',
  })((k, v) => map(k).toPaste(v)),
])

export const commandModeLayer = simlayer('c', 'command-mode').manipulators([
  map(_n).to('↓', '⌘'),
  map(_e).to('↑', '⌘'),
])

export const mediaModeLayer = simlayer('m', 'media-mode').manipulators([
  map(_f).to('vk_consumer_next'),
  map(_p).to('vk_consumer_play'),
  map(_t).to$('~/.simple/bin/title-case'),
  map(_a).to('[').to('['),
])

export const codeModeLayer = simlayer(_semicolon, 'code-mode').manipulators([
  map(_r).to('f2'), // rename
])

export const kitModeLayer = simlayer(_k, 'kit-mode').manipulators([
  withMapper({
    [_q]: '~/.kit/kar kit-discussions',
    [_c]: '~/.kenv/bin/code-project ~/.kit',
    [_d]: '~/.kenv/bin/code-project ~/.kit-docs',
    [_e]: '~/.kenv/bin/code-project ~/.kenv',
    [_v]: '~/.kenv/bin/code-project ~/dev/kenv',
    [_t]: '~/.kenv/bin/code-project ~/dev/kit',
    [_g]: '~/.kenv/bin/code-project ~/dev/globals',
    [_b]: '~/.kenv/bin/code-project ~/dev/kit-bridge',
    [_a]: '~/.kenv/bin/code-project ~/dev/kitapp',
    [_s]: '~/.kenv/bin/code-project ~/dev/scriptkit.com',
    1: '~/.kenv/bin/focus-tab github.com/johnlindquist/kitapp/actions',
    2: '~/.kenv/bin/focus-tab github.com/johnlindquist/kitapp/releases',
    3: '~/.kenv/bin/focus-tab github.com/johnlindquist/kit/discussions',
  })((k, v) => map(k).to$(v)),
])

export const lModeLayer = simlayer(_l, 'l-mode').manipulators([
  map(1).to('backslash', '⌘'), // open_1password

  withMapper({
    [_c]: alfred$('code', 'com.vivaxy.workflow.open-in-vscode', ' '),
    [_d]: launch$('Discord'),
    [_f]: launch$('Finder'),
    [_g]: launch$('Google Chrome'),
    [_t]: launch$('iTerm'),
    [_k]: 'launchctl kickstart -k org.pqrs.karabiner.karabiner_console_user_server',
    [_y]: launch$('YouTube Music'),
    [_r]: launch$('Restream Chat'),
    [_s]: launch$('Slack'),
    [_c]: launch$('Google Chrome'),
    [_v]: launch$('VLC'),
    [_z]: launch$('Visual Studio Code'),
    [_x]: launch$('Messages'),
  })((k, v) => map(k).to$(v)),
])

export const escapeModeLayer = layer('⎋', escapeMode)
  .configKey((k) =>
    k.to(
      [
        'fn-mode',
        'opt-mode',
        'shift-opt-mode',
        'movement-mode',
        'cursor-mode',
        'delete-mode',
        'editor-mode',
        'snippet-mode',
      ].map((v) => toSetVar(v, 0)), // in case a mode gets stuck 😬
    ),
  )
  .manipulators([
    withMapper({
      [_t]: '~/.kit/kar todo-pad',
      [_a]: '~/.kit/kar ~/.kit/main/app-launcher.js',
      [_c]: '~/.kit/kar auto-center-app',
      [_n]: '~/.kit/kar journal',
      [_w]: '~/.kit/kar ~/.kit/cli/edit.js ~/.kenv/scripts/wiki-ten.js',
      [_b]: '~/.kit/kar bugs',
      [_i]: '~/.kit/kar script-ideas',
      [_r]: '~/.kit/kar rhyme-finder',
    })((k, v) => map(k).to$(v)),

    withMapper([1, 2, 3, 4, 5, 6, 7, 0])((k) => map(k).to(k, '⌘⌥')),
  ])

export const spacebarModeLayer = simlayer('␣', 'spacebar-mode').manipulators([
  // symbols [](){}<>
  map('a').to('['),
  map('s').to(']'),
  map('d').to(openParen),
  map('f').to(closeParen),
  map('⇥').to('[').to('['),
  map('j').to(openBrace),
  map('k').to(closeBrace),
  map('l').to(lessThan),
  map(';').to(greaterThan),

  // symbol sequences
  map('-').to(typeSequence(`\${}←`)),
  map('left_shift').to(typeSequence(' = ')),
  map('q').to(typeSequence('()=> ')),
  map('e').to(typeSequence('(()=> {})←←')),

  map('g').to(typeSequence(' => ')),
  map('h').to(typeSequence('={}←')),
  map('b').to(typeSequence('={}←')),
  map("'").to(typeSequence('=""←')),
])

export const semicolonModeLayer = simlayer([';', '.'], 'semicolon-mode')
  .description('special characters')
  .manipulators([
    withMapper({
      [_e]: 1, // ! exclaim
      [_a]: 2, // @ at
      [_h]: 3, // # hash
      [_d]: 4, // $ dollar
      [_p]: 5, // % percent
      [_c]: 6, // ^ caret
      [_s]: 7, // & amperSand
      [_b]: 8, // * bullet
    } as const)((k, v) => map(k).to(v, '⇧')),
  ])

export const periodModeLayer = simlayer('.', 'period-mode').manipulators([
  map(_k).to$(
    '~/.kenv/bin/code-project "~/.dotfiles/karabiner/karabiner.edn ~/.dotfiles/karabiner/"',
  ),
])

export const tabModeLayer = layer('⇥', 'tab-mode')
  .description('numbers')
  .manipulators([
    //          0123456789
    withMapper(';asdfghjkl'.split('') as FromKeyParam[])((k, i) =>
      map(k, '', 'any').to(i as NumberKeyValue),
    ),
  ])

export const slashModeLayer = simlayer('/', 'slash-mode')
  .description('open urls')
  .manipulators([
    withMapper({
      [_e]: 'egghead.io',
      [_g]: 'mail.google.com',
      [_j]: 'js.new',
      [_k]: 'github.com/search?q=extension%3A.edn+filename%3Akarabiner.edn&type=Code&ref=advsearch&l=&l=',
      [_l]: 'localhost:3000',
      [_m]: 'access.mymind.com/cards',
      [_n]: 'news.google.com',
      [_r]: 'roamresearch.com/#/app/egghead',
      [_s]: 'github.com/johnlindquist/simplescripts',
      [_t]: 'twitter.com',
      [_u]: 'egghead.io/lessons/new',
      [_x]: 'next.egghead.io',
      [_y]: 'youtube.com',
    })((k, v) => map(k).to$(`. ~/.kenv/bin/focus-tab ${v}`)),
  ])

export const capsLockModeLayer = layer('⇪', 'caps_lock-mode')
  .configKey((v) => v.toIfAlone('⎋'), true) // I don't use a caps_lock key on my keyboard
  .manipulators([
    map('⇪', '', 'any').to('⎋'),
    map('a').to('⇪'),
    map('␣').to(typeSequence('␣=␣')),
    map(_g).to(focusGit),
  ])
