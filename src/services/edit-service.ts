import {ux} from '@oclif/core'
import {existsSync, readFileSync} from 'fs'
import {vars} from '../vars'
import {AbortService} from '../services/abort-service'
import {Editor} from '../editor'

interface EditServiceAttrs {
  cmd: any;
}

class EditService {
  public cmd;
  public abort;

  constructor(attrs: EditServiceAttrs = {} as EditServiceAttrs) {
    this.cmd = attrs.cmd
    this.abort = new AbortService({cmd: attrs.cmd})
  }

  async run(): Promise<void> {
    if (vars.missingIndexHtml) {
      this.abort.missingIndexHtml()
    }

    const editor = new Editor()
    editor.init()
  }
}

export {EditService}
