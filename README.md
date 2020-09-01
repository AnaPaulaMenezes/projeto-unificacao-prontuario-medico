
<h2>Como instalar a aplicação</h2>

<h3>Pré-Requisitos</h3>
<ul>
  <li>node.js;</li>
  <li>yarn;</li>
  <li>postgreSQL;</li>
  <li>SDK android.</li>
</ul>

<h3>Passo a passo</h3>
<ul>
  <li>
    Clone este repositório;
  </li>
  
  <li>
    Dentro das pasta backend e mobile rode o seguinte comando para instalar as depêndencias:
   
   ```bash
   yarn 
   ```
   
  </li>
  <li>Crie o banco de dados Postgre com o nome "tcc";</li>
  <li>Com o banco de dados iniciado, dentro da pasta backend execute as migrations com o seguinte comando:
  
  ```bash
  yarn typeorm migration:run 
  ```
  </li>
  <li>
    Inicie o backend da aplicação rodando o seguinte comado dentro da pasta backend:
   
   ```bash
   yarn dev:server
   ```
   </li>
 
   <li>
    Inicie a aplicação mobile rodando o seguinte comado dentro da pasta mobile:
   
   ```bash
   yarn android
   ```
  </li>
  
</ul>

