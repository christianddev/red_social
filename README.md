## Red Social

Proyecto fin de curso

### Tecnologías

NodeJS, Express, MongoDB.

### Base de datos 
Se utiliza el servicio mLab (config/config.js)

### Repositorio
código del proyecto disponible en https://github.com/david9015/red_social ,

acceso desde heroku: https://christian-red-social-rest-api.herokuapp.com/

## Rutas

las rutas de acceso a la api, se agrupan en:

- /api/user
- /api/wall
- /api/post
- /api/comment

en cada método de las rutas disponibles, se retorna un json con una estructura  similar a :

```json
{ "ok":true, "msg":"msg", result}
```

```json
{ "ok":false, "msg":"msg", error}
```




### /api/user (colección users)

- get:		
    /api/user/	 		
    userController.index

- post:	
    /api/user/create		
    userController.create

- post:	
    /api/user/update		
    userController.update

- delete:	
    /api/user/delete		
    userController.delete 


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


### /api/post: (colección post y wall)

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

### /api/comment (colección comment y wall)

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

A fecha 18/12/2018 queda pendiente:

- [ ] Generación automática de los wall (un documento(wall) para el mes en curso)
- [ ] Tratar el userId (presente en todas las colecciones ) como ObjectId