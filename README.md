# DESAFIO UNO FULLSTACK

## PASOS PARA EJECUTAR EL PROYECTO

1. Clonar el repositorio desde la sigueinte URL (clonar la rama main):
```
git clone https://github.com/JoaquinAAS97/uno-test-full-stack.git 

```
2. Acceder a la ruta de la carpeta backend ```cd backend/``` y leer el READM.md y seguir todos los pasos:

3. Acceder a la ruta de la carpeta backend ```cd frontend/``` y leer el READM.md y seguir todos los pasos:

4. Una vez que todos los pasos están realizados, puede acceder a la ruta ```cd infra-docke/```

5. Consturir el docker-compose, ejecutar el siguiente comando:

```
docker compose --env-file ../backend/.env up -d --build
```

### SOBRE STACK TECNOLOGICO

## Backed:
  - Postgres SQL
  - Framework Nest.js + TypeORM
  - Typescript

## Frontend:
  - Next.js
  - React js.
  - Typescript

## Test:
  - jest + React Testing Library


# SOBRE EL DISEÑO DE LA BASE DE DATOS:
## Se diseño con 3 entidades:
  - Users
  - Game_session: sesiones de juego, recopilacion de estadisticas de cada partida
  - CARDS --> entidad que permite guardar las cartas (Se usa para ejecutar el SEDD de las imagenes dispuestas en esta ruta: GET https://challenge-uno.vercel.app/api/images)
  - DECK --> entidad sólo conceptual, es decir, el mazo se genera de forma virtual, no se guarda en base de datos, esto para seguir las practicas de juegos similares, la entida se genera por cada sesion de juego y deja como rasto su código, el cual es usado para el registro de la entidad Game_session para saber con qué mazo se jugó y cuando fue generado por el juego.

## DISEÑO:

 [ ![alt text](image.png)](https://drawsql.app/teams/kot-app/diagrams/desafio-uno/embed)


## Sobre funcionalidades:
  ### __El juego realiza:__
   - inicio sesion de usuario
   - registro de usuario
   - aceso a menu e historial de resultaso de juegos pasados
   - el juego genera un mazo aleatorio utilizando la entidad de cards
   - Para que el juego genere el mazo aleatorio, además, usa el algoritmo Fisher-yates
   - entrega el mazo y lo sirve para el juego respetando el ciclo de vida del mismo
   - cuando termina el juego, muestra un mensaje final al usuario (usuario x ganó, perdió o si se rindió)
   - Finalment el juego envia las estadisticas del juego al servidor.
