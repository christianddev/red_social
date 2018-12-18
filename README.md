## Red Social

Proyecto fin de curso

## Tecnologías

NodeJS, Express, MongoDB.

### Base de datos 
Se utiliza el servicio mLab (config/config.js)

### Repositorio
codigo del proyecto disponible en https://github.com/david9015/red_social 

## Rutas

las rutas de acceso a la api, se agrupan en:

- /api/user

- /api/wall

- /api/post

- /api/comment


### /api/user (colección users)

- ​	get:		
    /api/user/	 		
    userController.index

- ​	post:	
    /api/user/create		
    userController.create

- ​	post:	
    /api/user/update		
    userController.update

- ​	delete:	
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

- ​	get:		
/api/post/			
postController.showAll 

- ​	create:  	
    /api/post/create		
    postController.create

- ​	update: 	
    /api/post/update		
    postController.update

- ​	delete: 	
    /api/post/delete		
    postController.delete

### /api/comment (colección comment y wall)

- ​	get:		
    /api/comment/	 	
    commentController.ShowAll

- ​	post:	
    /api/comment/create	
    commentController.create

- ​	delete:	
    /api/comment/delete	
    commentController.delete