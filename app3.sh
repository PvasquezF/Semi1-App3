#!/bin/bash
docker build -t app3 .
docker tag app3 demo.goharbor.io/seminario1/app3
docker push demo.goharbor.io/seminario1/app3