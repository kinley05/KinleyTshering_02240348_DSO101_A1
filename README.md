# KinleyTshering_02240348_DSO101_A1
git@github.com:kinley05/KinleyTshering_02240348_DSO101_A1.git

## Todo List Web Application 

A full-stack Todo List application built with Node.js/Express backend, 
SQLite database, and HTML/CSS/JS frontend. Deployed on Render.com using Docker.

## Project Structure
KinleyTshering_02240348_DSO101_A1
 -----.github
      ----workflows
          ----docker.yml
 -----backend
      ----src
          ----app.js
      ----tests
          ----todo.test.js
      ----package.json
      ----Dockerfile
      ----.env.production
 ------frontend/
       ----index.html
       ----Dockerfile
       ----.env.production
 ------.gitignore
 ------Jenkinsfile
 ------render.yaml
 ------README.md

## Featutres
- Add new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed
- Data persisted with SQLite database
- REST API with GET, POST, PUT, DELETE endpoints
- Dockerized frontend and backend
- Auto-deployed on Render via GitHub

## Tech Stack
Layer              Technology
Frontend           HTML, CSS, JavaScript 
Backend            Node.js, Express.js 
Database           SQLite 
Containerization   Docker 
Deployment         Render.com 
Version Control    GitHub 
CI/CD              GitHub Actions 

## API Endpoints
Method    Endpoint    Description 
GET       /todos      Get all todos 
POST      /todos      Add a new todo 
PUT       /todos/:id  Edit or complete a todo 
DELETE    /todos/:id  Delete a todo 
GET       /health     Health check 

## Environment Variables

### Backend (.env.production)
variable    value
PORT        3000

### Frontend (.env.production)
Variables            Value 
REACT_APP_API_URL    https://be-todo-eyth.onrender.com

## Step 1: Local Setup