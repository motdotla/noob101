import {vars} from '../vars'
import {writeFileSync} from 'fs'

interface EnvServiceAttrs {
  owner_key: string;
  subdomain: string;
}

class EnvService {
  public ownerKey;
  public subdomain;

  constructor(attrs: EnvServiceAttrs = {} as EnvServiceAttrs) {
    this.ownerKey = attrs.ownerKey
    this.subdomain = attrs.subdomain
  }

  write(): void {
    writeFileSync(vars.envFilename, this.envContent())
  }

  envContent(): string {
    const s = `# noob101 settings
SUBDOMAIN=${this.subdomain}
OWNER_KEY=${this.ownerKey}`

    return s
  }
}

export {EnvService}
