## Red Social

Proyecto fin de curso

### Tecnologías

NodeJS, Express, MongoDB.

### Base de datos 
Se utiliza el servicio mLab (config/config.js)

### Repositorio
código fuente disponible en https://github.com/david9015/red_social ,

disponible online desde heroku: https://christian-red-social-rest-api.herokuapp.com/

## Rutas
rutas de acceso a la api:

- /api/user
- /api/wall
- /api/post
- /api/comment

en la mayoria de los metodos disponibles, se retorna un json con una estructura  similar a :

```json
{ "ok":true, "msg":"msg", result}
```

```json
{ "ok":false, "msg":"msg", error}
```


###EN DESARROLLO...

### /api/user (colección users)

- post:	
    /api/user/signUp
    userController.signUp
- post:	
    /api/user/logIn
    userController.logIn
- put:	
    /api/user/update		
    userController.update


### /api/wall: (colección wall y post)

- get: 	
    /api/wall/  			
    wallController.showWallUser

- post: 	
    /api/wall/create 		
    wallController.createWallUser

- put:		
    /api/wall/postupdate	 
    wallController.updatePost

- delete:	
    /api/wall/postDetele	
    wallController.removePost	


### /api/post: (colección post y wall)*

- get:		
	/api/post/			
postController.showAll 

- create:  	
    /api/post/create		
    postController.create

- update: 	
    /api/post/update		
    postController.update

- delete: 	
    /api/post/delete		
    postController.delete

### /api/comment (colección comment y wall)*

- get:		
    /api/comment/	 	
    commentController.ShowAll

- post:	
    /api/comment/create	
    commentController.create

- delete:	
    /api/comment/delete	
    commentController.delete


### Pendiente

- [ ] Generación del wall , automática / manual para el mes en curso.
- [ ] Usar el userId (ObjectId).
- [ ] Bloqueo de usuarios.
- [ ] uso de los grupos 
