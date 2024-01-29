Movies App
--
A database site for movies. Similar to the site of IMDB, but a little bit simpler made with DRF and React.

The application allow users to browse through movies, reade movies details, reviews and to leave review.

Also, there are discussions about movies, where users can leave their comments.

Users can navigate to discussions from movie detail pages.

Structure & Set Up
--
Backend part located in 'movies_backend' folder and frontend part located in 'movies_frontend'
folder.

To start an application with docker just type 
```
docker-compose up --build
```

Default app urls:
Backend:
```
http://127.0.0.1:8000/api/v1/docs/
```
Admin panel:
```
http://127.0.0.1:8000/admin
```
Frontend:
```
http://localhost:8080/
```

Performance
--
Application provides JWT authentication and Swagger documentation for REST API.

Also, there is a responsive UI.

Stack
--
+ Backend: Python(Django, DRF)
+ Frontend: JS(React.js)
+ Database: PostgreSQL
+ Containerization: Docker, docker-compose