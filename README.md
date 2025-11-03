# React + Node Users App (Ready to Run)

## 1) Start backend
```bash
cd server
npm install
npm start
# -> http://localhost:4000
```

## 2) Start frontend
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
# -> http://localhost:5173
```


# Build image
docker build -t react-node-users-app .

# Run container
docker run -p 4000:4000 react-node-users-app

# If you ever want to confirm what files Docker actually includes in the build context, run:
docker build -t test . --no-cache --progress=plain
