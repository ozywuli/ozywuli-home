## Requirements
`ruby -v`
Ruby Version: 2.3.1
`gem install middleman@4.0.0`
`bundle exec middleman version`
Middleman Version: 4.0.0

## Develop

```bash
bundle install
```

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