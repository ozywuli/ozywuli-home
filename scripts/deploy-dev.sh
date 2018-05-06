#!/bin/bash
bundle exec middleman b;
scp -r build/* root@198.199.106.56:/var/www/dev.ozywuli.com/build