import {
  FromKeyParam,
  ifApp,
  ifDevice,
  ifVar,
  layer,
  map,
  mapPointingButton,
  mapSimultaneous,
  NumberKeyValue,
  rule,
  simlayer,
  toKey,
  ToKeyParam,
  toSetVar,
  withCondition,
  withMapper,
  writeToProfile,
} from 'karabiner.ts'

const ifChrome = ifApp('com.google.Chrome')
const ifVSCode = ifApp('com.microsoft.VSCode')

const ifMultitouchFingerCount = (n: number) =>
  ifVar('multitouch_extension_finger_count_total', n)
// I use my trackpad with these keys as well. The condition makes sure I'm not touching the trackpad
const unlessMultitouch = ifMultitouchFingerCount(0)

// colemak from (for easier mnemonics)
const _q = 'q'
const _w = 'w'
const _f = 'e'
const _p = 'r'
const _g = 't'
const _j = 'y'
const _l = 'u'
const _u = 'i'
const _y = 'o'
const _semicolon = 'p'

const _a = 'a'
const _r = 's'
const _s = 'd'
const _t = 'f'
const _d = 'g'
const _h = 'h'
const _n = 'j'
const _e = 'k'
const _i = 'l'
const _o = 'semicolon'

const _z = 'z'
const _x = 'x'
const _c = 'c'
const _v = 'v'
const _b = 'b'
const _k = 'n'
const _m = 'm'

const openAlfred = toKey('␣', '⌥')
const alfred$ = (s1: string, s2: string, s3: string) =>
  `osascript -e 'tell application "Alfred 4" to run trigger "${s1}" in workflow "${s2}" with argument "${s3}"'`
const launch$ = (s: string) =>
  `osascript -e 'tell application "${s}" to activate'`
const typeSecret$ = (s: string) => `osascript -e '
                           set out to do shell script "security find-generic-password -a $USER -s ${s} -w"
                           
                           tell application "System Events" to keystroke out
                           '`

const acejump = toKey('j', '⌘⌥⇧')
const acejumpLine = toKey('l', '⌘⌥⇧')
const acejumpSelection = toKey('s', '⌘⌥⇧')
const acejumpMulti = toKey('m', '⌘⌥⇧')

const expandSelection = toKey('→', '⌘⌃⇧')
const shrinkSelection = toKey('←', '⌘⌃⇧')

const insertLineBelow = toKey('⏎', '⌘')
const insertLineAbove = toKey('⏎', '⌘⇧')

const deleteLine = toKey('k', '⌘⇧')
const focusGit = toKey('g', '⌃⇧')
const focusExplorer = toKey('e', '⌘⇧')

const openParen = toKey(9, '⇧')
const closeParen = toKey(0, '⇧')
const openBrace = toKey('[', '⇧')
const closeBrace = toKey(']', '⇧')
const lessThan = toKey(',', '⇧')
const greaterThan = toKey('.', '⇧')
const typeSequence = (s: string) =>
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

const homeRowArrows = { h: '←', j: '↓', k: '↑', l: '→' } as const

const escapeMode = 'escape-mode'

writeToProfile(
  '--dry-run', // Change to Karabiner-Elements Profile name when ready
  [
    rule('windows', ifApp('com.microsoft.rdc.macos')).manipulators([
      map('left_command').to('left_control'),
      map('left_control').to('left_command'),
    ]),

    rule('apple', ifDevice({ product_id: 832, vendor_id: 1452 })).manipulators([
      map('/').to('left_command').toIfAlone('/'),
      map('.').to('left_option').toIfAlone('.'),
      map('left_shift').to('left_shift').toIfAlone('⌫'),
      map('right_shift').to('right_shift').toIfAlone('⌦'),
    ]),

    rule('alfred').manipulators([
      map('home').to('home').toIfAlone(openAlfred),
      map('page_up').to('page_up').toIfAlone(openAlfred),
    ]),

    simlayer('q', 'quick-mode').manipulators([
      map(_n).to$('~/.kit/kar quick-thoughts-editor'),
      map(_g).to$('~/.kit/kar gratitude-page'),
    ]),

    // Displays | display_layout_k
    simlayer(0, 'zero-mode').manipulators([
      withMapper([1, 2, 3, 4])((k) => map(k).to(k, 'Hyper')),
    ]),

    simlayer('w', 'close-mode').manipulators([
      withMapper([ifVSCode, ifChrome])((app) =>
        withCondition(app)([
          map(_a).to('k', '⌘').to('w'), // close all
          map(_o).to('t', '⌘⌥'), // close others
        ]),
      ),
    ]),

    simlayer(_f, 'finder-mode').manipulators([
      map(_a).to$('open /Applications'),
      map(_d).to$('open ~/Downloads'),
      map(_h).to$('open ~'),
      map(_j).to$('~/.kit/kar fenced-js'),
      map(_b).to(typeSequence('```bash⏎⏎```↑')), // fenced bash
    ]),

    simlayer(_p, 'peek-mode').manipulators([
      map(_h).to('f12', '⌥'), // peek_definition
      map(_e).to('f12', '⌘⇧'), // peek_implementations
      map(_n).to('f19', '⌃'), // peek_references
      map(_i).to('f19', '⌘'), // peek_declaration
      map(_o).to('f19', '⇧'), // peek_type
    ]),

    simlayer(_g, 'go-mode').manipulators([
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
    ]),

    // control
    simlayer('-', 'fn-mode')
      .condition(unlessMultitouch)
      .manipulators([
        withMapper({
          d: 'left_shift',
          ...homeRowArrows,
        } as const)((k, v) => map(k, undefined, 'any').to(v)),
      ]),

    simlayer('a', 'opt-mode')
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
      ]),

    simlayer(_r, 'shift-opt-mode')
      .condition(unlessMultitouch)
      .manipulators([
        withMapper(homeRowArrows)((k, v) => map(k, '', 'any').to(v, '⌥⇧')),

        map('spacebar', '', 'any').toPointingButton('button1', '⌘'),
        map('left_shift', '', 'any').toPointingButton('button2'),
      ]),

    simlayer(_s, 'shift-mode')
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
      ]),

    simlayer(_t, 'movement-mode')
      .condition(unlessMultitouch)
      .manipulators([
        map('y', '', 'any').to('←', '⌘'),
        map('o', '', 'any').to('→', '⌘'),
        withMapper(homeRowArrows)((k, v) => map(k, '', 'any').to(v)),
        map(';').to('␣', '⌃'),
        map('⏎').to(insertLineBelow),
        map('left_shift').to(expandSelection),
      ]),

    simlayer(_d, 'cursor-mode')
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
      ]),

    simlayer(_n, 'delete-mode').manipulators([
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
    ]),

    simlayer(_e, 'editor-mode').manipulators([
      map('-').to('f16', '⌥'), // focus_next_editor_group
      map(_a).to('←', '⌘⌥'), // open_prev_editor
      map(_r).to('-', '⌃'), // go_back
      map(_s).to('-', '⌃⇧'), // go_forward
      map(_t).to('→', '⌘⌥'), // open_next_editor
      map(_d).to('f16', '⌥⇧'), // focus_prev_editor_group
    ]),

    simlayer(_o, 'open-mode').manipulators([
      map('k').to$('~/.kit/kar update-karabiner-config'),
      map('w').to$('~/.kit/kar ~/.kit/cli/edit.js ~/.kenv/scripts/wiki-ten'),
    ]),

    rule('password').manipulators([
      mapSimultaneous(['quote', 1]).to$(typeSecret$('OTHER_PASSWORD')),
      mapSimultaneous(['quote', 2]).to$(typeSecret$('MAC_PASSWORD')),
      mapSimultaneous(['quote', 5]).to$(typeSecret$('ADDRESS_1')),
    ]),

    simlayer("'", 'snippet-mode').manipulators([
      map(_c).to(typeSequence('console.log()←')),
      map(_a).to(typeSequence('await␣')),
      map(_s).to(typeSequence('async␣')),
      map(_n).to(typeSequence('className=""←')),
      map(_e).to$(typeSecret$('BUSINESS_EMAIL')),
      map(_g).to$(typeSecret$('PERSONAL_EMAIL')),
      map(_x).to$(typeSecret$('SPAM_EMAIL')),
      map(_j).to$(typeSecret$('USERNAME')),
    ]),

    simlayer('z', 'emoji-mode').manipulators([
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
    ]),

    simlayer('c', 'command-mode').manipulators([
      map(_n).to('↓', '⌘'),
      map(_e).to('↑', '⌘'),
    ]),

    simlayer('m', 'media-mode').manipulators([
      map(_f).to('vk_consumer_next'),
      map(_p).to('vk_consumer_play'),
      map(_t).to$('~/.simple/bin/title-case'),
      map(_a).to('[').to('['),
    ]),

    simlayer(_semicolon, 'code-mode').manipulators([
      map(_r).to('f2'), // rename
    ]),

    simlayer(_k, 'kit-mode').manipulators([
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
    ]),

    simlayer(_l, 'l-mode').manipulators([
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
    ]),

    layer('⎋', escapeMode)
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
      ]),

    simlayer('␣', 'spacebar-mode').manipulators([
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
    ]),

    // special characters
    simlayer([';', '.'], 'semicolon-mode').manipulators([
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
    ]),

    simlayer('.', 'period-mode').manipulators([
      map(_k).to$(
        '~/.kenv/bin/code-project "~/.dotfiles/karabiner/karabiner.edn ~/.dotfiles/karabiner/"',
      ),
    ]),

    // numbers
    layer('⇥', 'tab-mode').manipulators([
      //          0123456789
      withMapper(';asdfghjkl'.split('') as FromKeyParam[])((k, i) =>
        map(k, '', 'any').to(i as NumberKeyValue),
      ),
    ]),

    // open urls
    simlayer('/', 'slash-mode').manipulators([
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
    ]),

    rule('ableton', ifApp('com.ableton.live')).manipulators([
      withCondition(ifMultitouchFingerCount(0))([
        map('`').to('b', '⌘⌥'),
        mapSimultaneous(['␣', 's']).to('f9'),
        mapSimultaneous(['␣', 'a']).to('[').to('['),
      ]),

      withCondition(ifMultitouchFingerCount(1))([
        map('⇥').to('⇥', '⇧'),
        map('left_option').to('e', '⌘').to('j', '⌘'),
        map(_b).toPointingButton('button1', '⇧').to('m', '⌘⇧'), // add_midi_clip
        map(_q).to('q').to('q'),
        map(_w).to('l', '⌘⌥'),
        map(_d).toPointingButton('button1').toPointingButton('button1'),

        map(_g).to(4, '⌘'),
        map('-').to(1, '⌘'),
        map('=').to(2, '⌘'),

        map(_f).to('⇥', '⇧'),
        map(_p).to('p', '⌘⌥'),

        map('left_shift').toPointingButton('button1').to('⌫'),
        map('⌫').toPointingButton('button1').to('⌫'),

        map(1).to(1, '⌘'), // narrow_grid
        map(2).to(2, '⌘'), // widen_grid
        map(_g).to(4, '⌘'), // snap_to_grid
      ]),

      withCondition(ifMultitouchFingerCount(2))([
        map(_a).to('b', '⌘⌥'),
        map(_r).to('l', '⌘'), // loop_selection
        map(_s).to('e', '⌘'), // split_clip
        map(_t).to('l', '⌘'), // loop_selection
      ]),

      withCondition(ifMultitouchFingerCount(3))([
        map(_t).to('t', '⌘⌥'), // add_midi_track
      ]),
    ]),

    rule('chrome', ifChrome).manipulators([
      map('left_command').to('left_command').toIfAlone('t', '⌘'),

      withCondition(ifMultitouchFingerCount(2))([
        map(_d).to('i', '⌘⌥'), // open dev tools
        map(_a).to('←', '⌘⌥'),
        map(_t).to('→', '⌘⌥'),
      ]),

      withCondition(ifVar(escapeMode))([
        map(_f).to('f', '⌘⌃'), // chrome_full_screen
      ]),
    ]),

    rule('code', ifVSCode).manipulators([
      map('left_command').to('left_command').toIfAlone('p', '⌘'), // go_to_file
      map('left_control').to('left_control').toIfAlone('p', '⌘⇧'), // command_palette
      map('right_control').to('right_control').toIfAlone('p', '⌘⇧'), // command_palette
      map('s', '⌘').to('f', '⌘⌥'), // replace

      map('home').to('f5'), // start_debugger
      map('end').to('f5', '⌘⌥'), // restart_debugger

      // view
      // note - I try to keep these on my left hand so I can keep my right on the mouse
      withCondition(ifVar(escapeMode))([
        map(_g).to(focusGit),
        map(_e).to(focusExplorer),
        map(_x).to(focusExplorer),
        map(_s).to('s', 'Hyper'), // Status Bar
        map(_f).to('f', '⌘⇧'), // find_in_project
        map(_z).to('k', '⌘').to('z'), // zen mode
        map(_v).to('v', 'Hyper'),
        map(_x).to('x', 'Hyper'),
        map(_p).to('r', 'Hyper'), // toggle panel
        map(';').to(';', 'Hyper'),
      ]),

      // trackpad
      withCondition(ifMultitouchFingerCount(1))([
        map('left_command').to('left_command').toIfAlone('f5'), // :start_debugger
      ]),

      // trackpad 2
      withCondition(ifMultitouchFingerCount(2))([
        map('t').toPointingButton('button1').to('f2'),
      ]),
    ]),

    rule('final cut pro', ifApp('com.apple.FinalCut')).manipulators([
      mapPointingButton('button3')
        .to('h')
        .toPointingButton('button1')
        .toAfterKeyUp('a'),

      withCondition(ifMultitouchFingerCount(1))([
        map('⌫').toPointingButton('button1').to('⌫'),
      ]),
    ]),

    rule('miro', ifApp('com.electron.realtimeboard')).manipulators([
      withCondition(ifMultitouchFingerCount(1))([
        map('⌫').to('⎋').toPointingButton('button1').to('⌫'),
        map('a').to('⎋').to('n').toPointingButton('button1'),
      ]),
      withCondition(ifMultitouchFingerCount(2))([
        map('f').to('⎋').to('n').toPointingButton('button1'),
        map('c').to('c', '⌘').toPointingButton('button1').to('v', '⌘'),
      ]),
    ]),

    rule('screenflow', ifApp('net.telestream.screenflow10')).manipulators([
      // mouse
      mapPointingButton('button3')
        .to('h')
        .toPointingButton('button1')
        .toAfterKeyUp('a'),
      mapPointingButton('button2')
        .toPointingButton('button1', 'left_shift')
        .to('⌫', '⌘'),

      // trackpad
      withCondition(ifMultitouchFingerCount(1))([
        map('␣').to('␣'),
        map('d').toPointingButton('button1', 'left_shift').to('⌫', '⌘'),
        map('a').to(';', '⌘⌥'),
      ]),
    ]),

    rule('slack', ifApp('com.tinyspeck.slackmacgap')).manipulators([
      map('left_command').to('left_command').toIfAlone('t', '⌘'),
    ]),

    rule('trackpad').manipulators([
      withCondition(ifMultitouchFingerCount(1))([
        map(_t).toPointingButton('button1'),

        map('w').to('w', '⌘'),
        map('e').to('t', '⌘'),
        map('r').to('l', '⌘'),

        map('a').toPointingButton('button1', 'left_option'),
        map('s').toPointingButton('button2'),

        map('d').toPointingButton('button1', 'left_shift'),
        map('g').toPointingButton('button1', 'left_command'),

        map('z').to('z', '⌘'),
        map('x').to('x', '⌘'),
        map('c').to('c', '⌘'),
        map('v').to('v', '⌘'),

        map('⌫').toPointingButton('button1').to('⌫'),
        map('-').toPointingButton('button1').to(deleteLine),
      ]),

      withCondition(ifMultitouchFingerCount(2))([
        map('x').toPointingButton('button1', '⇧').to('x', '⌘'),
        map('c').toPointingButton('button1').to('c', '⌘'),
        map('v').toPointingButton('button1').to('v', '⌘'),
        map('left_command').to('⏎'),
        map('⌫').toPointingButton('button1', '⇧').to('⌫'),
      ]),

      withCondition(ifMultitouchFingerCount(3))([
        map(_s).to(4, '⌘⇧'), // capture_screenshot
        map(_r).to(6, '⌘⇧'), // record_screen
      ]),

      withCondition(ifMultitouchFingerCount(4))([
        map('f', '', 'any').to('⏎'), //
      ]),
    ]),

    layer('⇪', 'caps_lock-mode')
      .configKey((v) => v.toIfAlone('⎋'), true) // I don't use a caps_lock key on my keyboard
      .manipulators([
        map('⇪', '', 'any').to('⎋'),
        map('a').to('⇪'),
        map('␣').to(typeSequence('␣=␣')),
        map(_g).to(focusGit),
      ]),

    rule('colemak').manipulators([
      withMapper({
        e: 'f',
        r: 'p',
        t: 'g',
        y: 'j',
        u: 'l',
        i: 'u',
        o: 'y',
        p: ';',
        s: 'r',
        d: 's',
        f: 't',
        g: 'd',
        j: 'n',
        k: 'e',
        l: 'i',
        ';': 'o',
        n: 'k',
      } as const)((k, v) => map(k, '', 'any').to(v)),

      map(']').to('a'),
    ]),
  ],
  {
    'basic.to_if_alone_timeout_milliseconds': 500,
    'basic.to_delayed_action_delay_milliseconds': 200,
  },
)
