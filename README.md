# React-TS-Passport
Aplicación creada con React, Typescript, Express, Node, Passport, MongoDB.

## Variables de entorno necesarias
- PART1STRING:USER:PASSWORD:PART2STRING:DB:PART3STRING === URL para conectarse a mongo
- FRONTEND === URL del FrontEnd

## Argumentos
-p, --port especifica el puerto que va a ser usado para hostear el servidor, por default es 8080. Para especificar este argumento recomiendo modificar el script "start" en package.json

-m, --mode especifica el modo en el que va a ser ejecutado el servidor, fork o cluster. Por defualt es fork.
