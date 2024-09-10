# Laravel and React Project

## Note
Because of issues with using Docker on windows, the docker configuration files were uploaded but not run.
So please follow the steps to run the projects

## Overview 
This project combines a Laravel backend with a React frontend. Follow the instructions below to set up and run the project locally.

## Prerequisites
- PHP (>= 7.3)
- Composer
- Node.js (>= 14.x)
- npm
- A running MySQL database

## Installation

### 1. Clone the Repository
```
git clone https://github.com/Hamsa1991/news-project.git
```

### Backend Setup (Laravel)

#### Step 1: Install Composer Dependencies
Navigate to the Laravel project directory and install the necessary packages using Composer:
```
cd path/to/laravel/project
composer install
```


#### Setup the Environment
Copy the .env.example file to .env:
```
cp .env.example .env
```


#### Update the .env file with your database credentials.

```
php artisan key:generate
```

import mysql database

Start the Laravel Server
```
php artisan serve
```

Frontend Setup (React)
Navigate to React Project inside the laravel project

```
cd news-react
```

Install Node Modules
```
npm install
npm run dev
```

The React app will run on http://localhost:3000
Make sure the Laravel server is running before trying to access any backend functionality from the React app.


