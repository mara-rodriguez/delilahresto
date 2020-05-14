<h1>Delilah Restó</h1>

<p> Sistema de gestión de pedidos. <br> 
Podrás crear, modificar, eliminar y listar todos los productos del restaurant; acceder a la base de datos y cambiar el estado de los productos. <br>
Los clientes contaran con un sistema de registro y login para realizar sus pedidos. </p>

<h3>Tecnologías utilizadas y requeridas</h3>
<ul>
  <li>Editor de código. (Te recomiendo Visual Studio Code) </li>
  <li>Postman</li>
  <li>Nodejs</li>
  <li>MySql: https://dev.mysql.com/downloads/installer/  (versión: mysql-installer-web-community-8.0.20.0.msi)</li>
</ul>

<h3>Instalación e inicialización</h3> 
<ol>
  <li> Clonar repositorio: <br>https://github.com/mara-rodriguez/delilahresto.git</li>
  <li>Instalar tu editor de código y Nodejs.</li>
  <li>Una vez en la consola, las dependencias a instalar son las siguientes:<br>
  <code> npm i express jsonwebtoken body-parser mysql2 sequelize </code></li>
  <li>Conección a la base de datos:</li> 
      <ul>
        <li>Descargar e instalar MySql</li>
       <li>Crear una nueva base de datos con el contenido del archivo “database-init”.</li>
       <li>Para conectarte con la base de datos:</li>
       <li>Reemplazá los valores asignados por los de tu base de datos. (También podes usar los perdeterminados). Los mismos se encuentran en:<br><code>/configuration/configuration.js</code></li>
      </ul>
  <li>Los roles se asignan al momento de la creación. Si no fuesen asignados, por defecto se generará "noadmin"</li>
  <li>Por último, para utilizar la app, iniciá: <br><code>nodemon index.js</code></li>
</ol>


<h5>Recordá descargar el directorio de Postman para utilizar la app.</h5>
https://www.postman.com/collections/0be9329d2b64f48ef2b6 <br>
¡TODO LISTO! YA PODES COMENZAR
<p>
  <br>
  <br>
  <br>
  <br>
  Mara Rodriguez - Delilah Restó - Acamica - Proyecto III
</p>
