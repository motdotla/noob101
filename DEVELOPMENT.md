# Development README

Fork and clone the repo. Use `./bin/dev` to run local development commands.

```
./bin/dev new
./bin/dev push
./bin/dev pull
# etc
```

If you need to send the request to a different vault url, modify your command(s) to the following.

```
NODE_TLS_REJECT_UNAUTHORIZED=0 NOOB123_API_URL=https://api.noob123.development ./bin/dev
```

Note that noob123 uses [oclif](https://oclif.io/).

## Testing

```
npm test
```

## Tarballs

```
npx oclif@3.0.1 pack tarballs
bash
env $(cat .env | xargs) npx oclif@3.0.1 upload tarballs
env $(cat .env | xargs) npx oclif@3.0.1 promote --version VERSION --sha SHA
```

## Win

```
./node_modules/.bin/oclif pack:win
bash
env $(cat .env | xargs) ./node_modules/.bin/oclif upload win
env $(cat .env | xargs) ./node_modules/.bin/oclif promote --win --version VERSION --sha SHA
```

## Publishing

Only for those with permission.

```
npm version patch
npm publish
```
