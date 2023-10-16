import {readFileSync, writeFileSync} from 'fs'

const terminalKit = require('terminal-kit')
const file = 'index.html'

class Editor {
  public term;
  public screenBuffer;
  public textBuffer;

  constructor() {
    this.term = terminalKit.terminal

    this.screenBuffer = new terminalKit.ScreenBuffer({
      dst: this.term,
      height: this.term.height - 2,
      y: 2
    })
    this.textBuffer = new terminalKit.TextBuffer({
      dst: this.screenBuffer
    })
    this.textBuffer.setText('')
  }

  init(): Promise<void> {
    // onKey
    this.term.on('key', this.onKey.bind(this))

    // setup
    this.term.fullscreen(true)
    this.textBuffer.moveTo(0, 0)
    this.screenBuffer.moveTo(0, 0)
    this.term.grabInput({ mouse: false })

    // load
    let content = readFileSync(file, 'utf8')
    this.textBuffer.setText('')
    this.textBuffer.insert(content)
    this.textBuffer.moveTo(0, 0)

    // draw
    this.draw()
    this.drawTitleBar()
  }

  drawTitleBar(): Promise<void> {
    this.drawBar({ x: 1, y: 1 }, 'index.html')
    this.term.windowTitle('index.html')
  }

  drawBar(pos, message): Promise<void> {
    this.term.moveTo(pos.x, pos.y).styleReset.bgWhite.black.bold.eraseLine(message);
  }

  exit(): Promise<void> {
    setTimeout(() => {
      this.save()

      this.term.grabInput(false)
      this.term.fullscreen(false)

      setTimeout(() => process.exit(0), 100)
    })
  }

  draw(): Promise<void> {
    this.textBuffer.draw()
    this.screenBuffer.draw({ delta: true })
    this.drawCursor()
  }

  drawCursor(): Promise<void> {
    let new_buffer_x = this.textBuffer.x
    let new_buffer_y = this.textBuffer.y

    if (this.textBuffer.x < -this.textBuffer.cx) {
      new_buffer_x = Math.min(0, -this.textBuffer.cx + Math.floor(this.screenBuffer.width / 2))
    } else if (this.textBuffer.x > -this.textBuffer.cx + this.screenBuffer.width - 1) {
      new_buffer_x = (this.screenBuffer.width / 2) - this.textBuffer.cx
    }

    if (this.textBuffer.y < -this.textBuffer.cy) {
      new_buffer_y = Math.min(0, -this.textBuffer.cy + Math.floor(this.screenBuffer.height / 2))
    } else if (this.textBuffer.y > -this.textBuffer.cy + this.screenBuffer.height - 1) {
      new_buffer_y = (this.screenBuffer.height / 2) - this.textBuffer.cy
    }

    if (new_buffer_y != this.textBuffer.y || new_buffer_x != this.textBuffer.x) {
      this.textBuffer.x = new_buffer_x
      this.textBuffer.y = new_buffer_y
      this.textBuffer.draw()
      this.screenBuffer.draw({ delta: true })
    }

    this.textBuffer.drawCursor()
    this.screenBuffer.drawCursor()
  }

  onKey(key, matches, data): Promise<void> {
    switch (key) {
      case 'CTRL_C':
        this.exit()
        break
      case 'ESCAPE':
        this.exit()
        break
      case 'BACKSPACE':
        this.backspace()
        break
      case 'ENTER':
        this.newLine()
        break
      case 'UP':
        this.up()
        break
      case 'DOWN':
        this.down()
        break
      case 'LEFT':
        this.left()
        break
      case 'RIGHT':
        this.right()
        break
      default:
        // user inputted keys
        if (data.isCharacter) {
          this.textBuffer.insert(key)
          this.draw()
        }
    }
  }

  backspace(): Promise<void> {
    this.textBuffer.backDelete(1)
    this.draw()
  }

  newLine(): Promise<void> {
    this.textBuffer.newLine()
    this.draw()
  }

  up(): Promise<void> {
    this.textBuffer.moveUp()

    if (this.textBuffer.cx > this.textBuffer.buffer[this.textBuffer.cy].length - 1) {
      this.textBuffer.moveToEndOfLine()
    }

    this.drawCursor()
  }

  down(): Promise<void> {
    if (this.textBuffer.getContentSize().height - 1 > this.textBuffer.cy) {
      this.textBuffer.moveDown()

      if (this.textBuffer.cx > this.textBuffer.buffer[this.textBuffer.cy].length - 1) {
        this.textBuffer.moveToEndOfLine()
      }

      this.drawCursor()
    }
  }

  left(): Promise<void> {
    this.textBuffer.moveBackward()
    this.drawCursor()
  }

  right(): Promise<void> {
    if (this.textBuffer.cx < this.getLine().length) {
      this.textBuffer.moveRight()
    } else if (this.textBuffer.getContentSize().height - 1 > this.textBuffer.cy) {
      this.textBuffer.moveTo(0, this.textBuffer.cy + 1)
    }

    this.drawCursor()
  }

  getLine(): string {
    return this.textBuffer.buffer[this.textBuffer.cy].reduce((acc, curr) => {
      acc += curr.char.trim()
      return acc
    }, '')
  }

  save(): Promise<void> {
    writeFileSync(file, this.textBuffer.getText())
    // this.drawStatusBar('Saved!', 2000);
  }
}

export {Editor}
