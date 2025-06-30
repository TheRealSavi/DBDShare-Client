# DBD Share

DBD Share is a web application for people to share and save their favorite builds for the game "Dead by Daylight"

Essentially this is a full-stack CRUD application that I intended to host a production version soon.

## ⚙ Tech Stack

**Client:** React, TailwindCSS, TypeScript, Vite

**Server:** Node, Express, Mongoose, Passport

## ✨ Features

- Sign in through Steam
- Sign in through Google
- Responsive design for desktop and mobile
- Users and posts stored in database
- RESTful API

## 🗺 Roadmap

- Light/Dark mode toggle

- Add additional tools for integrated in game calculators

- Implement frontend and backend cache

## ✏ Authors

- [@John Gibbons](https://www.github.com/TheRealSavi)

## 📷 Screenshots

![App Screenshot](https://github.com/TheRealSavi/DBDShare-Client/blob/master/public/ss1.png?raw=true)
![App Screenshot](https://github.com/TheRealSavi/DBDShare-Client/blob/master/public/ss2.png?raw=true)
![App Screenshot](https://github.com/TheRealSavi/DBDShare-Client/blob/master/public/ss3.png?raw=true)
![App Screenshot](https://github.com/TheRealSavi/DBDShare-Client/blob/master/public/ss4.png?raw=true)
![App Screenshot](https://github.com/TheRealSavi/DBDShare-Client/blob/master/public/ss5.png?raw=true)
![App Screenshot](https://github.com/TheRealSavi/DBDShare-Client/blob/master/public/ss6.png?raw=true)

## 💾 Run Locally

Clone the projects

```bash
  git clone https://github.com/TheRealSavi/DBDShare-Client
```

```bash
  git clone https://github.com/TheRealSavi/DBDShare-Server
```

Go to the project directories

```bash
  cd DBDShare-Client
```

```bash
  cd DBDShare-Server
```

Install dependencies (for each)

```bash
  npm install
```

Start the client

```bash
  npm run dev
```

Start the server

```bash
  npm run start
```

## 🔑 Environment Variables

To run this project, you will need to add the following environment variables to your .env file

Client:

`Api URL is defined in apiCongig.ts`
`Ensure that it has http:// and a leading /`
`http://localhost:5000/`

Server:

`GOOGLE_CLIENT_ID`
`GOOGLE_SECRET`
`STEAM_API_KEY`
`SESSION_SECRET`
`CLIENT_URL=http://localhost:5173`
`SERVER_URL=http://localhost:5000/`
`DEV_CLIENT_URL=http://localhost:5173`
`DEV_SERVER_URL=http://localhost:5000/`
`Note that the client takes no / and the server does`
`MONGODB_CONNECTION`


## ⚖ License

[MIT](https://choosealicense.com/licenses/mit/)
