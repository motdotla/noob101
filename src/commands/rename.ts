import {Args, Command} from '@oclif/core'

import {RenameService} from '../services/rename-service'

export default class Rename extends Command {
  static description = 'Change subdomain'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static args = {
    subdomain: Args.string(
      {
        name: 'subdomain',
        required: true,
        description: 'Set subdomain',
        hidden: false,
      }
    )
  }

  public async run(): Promise<void> {
    const {args} = await this.parse(Rename)
    const subdomain = args.subdomain

    await new RenameService({cmd: this, newSubdomain: subdomain}).run()
  }
}
