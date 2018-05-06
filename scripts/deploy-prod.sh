#!/bin/bash
git push origin master;
bundle exec middleman b;
scp -r build/* root@198.199.106.56:/var/www/ozywuli.com/build