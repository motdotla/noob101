import {Command} from '@oclif/core'

import {DeployService} from '../services/deploy-service'

export default class Deploy extends Command {
  static description = 'Deploy index.html'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  public async run(): Promise<void> {
    await new DeployService({cmd: this}).run()
  }
}
