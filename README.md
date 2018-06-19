`ruby -v`
Ruby Version: 2.3.1
`bundle exec middleman version`
Middleman Versiion: 4.0.0



***TO RUN***

```bash
bundle exec middleman s
```


***TO BUILD***
```bash
bundle exec middleman build
```

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