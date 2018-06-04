#!/bin/bash
git push origin development;
bundle exec middleman b;
scp -r build/* ozywuli@198.199.106.56:/var/www/dev.ozywuli.com/build