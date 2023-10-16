import {Command} from '@oclif/core'

import {EditService} from '../services/edit-service'

export default class Edit extends Command {
  static description = 'Edit index.html'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  public async run(): Promise<void> {
    await new EditService({cmd: this}).run()
  }
}
