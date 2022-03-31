# Todolist App

Simple Todo App build with **[React.js](https://reactjs.org/)**, **[Adonis.js](https://adonisjs.com/)** 
and **[Mantine](https://mantine.dev/)** for the components library.

## QuickStart

```bash 
git clone https://github.com/firling/todo.git
```

### Server side

- Install the dependancies:
```bash
cd ./serveur
npm install
```
- Then make a copy of the `.env.enxample` file as `.env`
- Make sure to change your database information inside it
- Then run the migration:
```bash
node ace migration:run
```
- Start the server:
```
node ace serve --watch
```

### Client side

- Make a copy of the `.env.enxample` file as `.env`
- Install the dependancies and start the app:
```bash
cd ./client
npm install
npm start
```
- Open [http://localhost:3000/](http://localhost:3000/)