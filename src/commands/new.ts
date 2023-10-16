import {Command} from '@oclif/core'

import {NewService} from '../services/new-service'

export default class New extends Command {
  static description = 'New index.html'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  public async run(): Promise<void> {
    await new NewService({cmd: this}).run()
  }
}
