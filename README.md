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
bundle exec middleman build
```

## Deploy

***DEPLOY TO DEV***
```bash
./shell/deploy-dev.sh
```

***DEPLOY TO PROD***
```bash
./shell/deploy-prod.sh
```

Give non-root user ownership ability to scp
```
sudo chown -R ozywuli /var/www/ozywuli.com
```