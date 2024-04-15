# Krikey Coding Challenge

## 1: SQL Queries

- ### How to run queries:

  1.  Install sqlite to run queries. Run command `brew install sqlite` to install it.
  2.  To open sqlite terminal run `sqlite3 absolute_path`. Reference comnand below.
      sqlite3 /Users/preethibhashetty/Krikey/my-react-app/mydatabase.db
  3.  Run queries from `SQL` file located in the root of project.

## 2: Build & Deploy Webpage

1.  Pull the project to your local from https://github.com/bhashettypreethi/Author-Page
2.  Install dependencies. Run command `npm install`
3.  This code uses two ports for client side rendering(defaulted to 3000) and Server side rendering(configured to 4000)
4.  Make sure there are no other processes running on port `3000` and `4000`.

    - If you encounter an error saying some process is already running on the above ports run

          lsof -ti:4000 | xargs kill

      to kill any processes running on port 4000 and run

          lsof -ti:3000 | xargs kill to kill any processes running on port 3000.

5.  Run the command `npm run build` to build the project and create a build folder containing the optimized production build.
6.  Run the command `npm run dev` to start both the client and server scripts. The client-side will be rendered on port 3000 by default, while the server-side will be rendered on port 4000.

    Access the application at http://localhost:3000 to view the list of top 10 performing authors.

---

### React page with Top 10 performing authors -> my-react-app/public/Top10PerformingAuthors.png

![Sample Image of Rendered Web page](/my-react-app/public/Top10PerformingAuthors.png)

---

## Troubleshooting

1. I have mostly encountered the below error while deploying. If you encounter the `EADDRINUSE` error code, it means that the port specified (e.g., 4000) is already in use by another process.

```
   [0]
   [1] node:events:491
   [1] throw er; // Unhandled 'error' event
   [1] ^
   [1]
   [1] Error: listen EADDRINUSE: address already in use :::4000
   [1] at Server.setupListenHandle [as _listen2] (node:net:1463:16)
   [1] \* \* \* \*
   [1] Emitted 'error' event on Server instance at:
   [1] at emitErrorNT (node:net:1490:8)
   [1] at processTicksAndRejections {
   [1] code: 'EADDRINUSE',
   [1] errno: -48,
   [1] syscall: 'listen',
   [1] address: '::',
   [1] port: 4000
   [1] }
   [1] npm run server exited with code 1
   [0] Something is already running on port 3000.
   [0] npm start exited with code 0
```

### Instructions to fix the above error:

1.  #### Check for Existing Processes:

    `lsof -ti:4000 | xargs kill` to kill any processes running on port 4000 and run

    `lsof -ti:4000 | xargs kill` to kill any processes running on port 3000.

2.  #### Restart the server
    Once you've terminated the conflicting processes, restart the development server by running `npm run dev`

If you encounter any other issues, feel free to reach out for further assistance.
