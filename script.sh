#!/bin/bash
node index.js
curl http://icchilisrv3.epfl.ch:5400/logs -X POST \
     -H "Content-Type: application/json" \
     -d '{"host": "1", "msg": "test" }'
