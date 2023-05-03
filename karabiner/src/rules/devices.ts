import { ifDevice, map, rule, withCondition } from 'karabiner.ts'
import { ifMultitouchFingerCount } from '../condition'
import { _r, _s, _t, deleteLine } from '../from-to'

const ifAppleDevice = ifDevice({ product_id: 832, vendor_id: 1452 })
export const appleDevice = rule('apple', ifAppleDevice).manipulators([
  map('/').to('left_command').toIfAlone('/'),
  map('.').to('left_option').toIfAlone('.'),
  map('left_shift').to('left_shift').toIfAlone('⌫'),
  map('right_shift').to('right_shift').toIfAlone('⌦'),
])

export const trackpadDevice = rule('trackpad').manipulators([
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
])
