## Requirements
`ruby -v`
Ruby Version: 2.3.1
`bundle exec middleman version`
Middleman Versiion: 4.0.0

## Develop

***TO RUN***

```bash
bundle exec middleman s
```

## Build

***TO BUILD***
```bash
npm run build
```

## Deploy

***DEPLOY TO DEV***
```bash
npm run deploy:dev
```

***DEPLOY TO PROD***
```bash
npm run deploy:prod
```

Give non-root user ownership ability to scp
```
sudo chown -R ozywuli /var/www/ozywuli.com
```