
## About Project

WEB application that offers electronic scooter management services in Lyon with diversified offers, able to meet all kinds of requests!

## Retrieve the project

```javascript
  git clone <project>
```

```javascript
  cd <projectname>
```

#### Install the project dependencies from composer

```javascript
  composer install
```

#### Install NPM dependencies

```javascript
  npm i
```

#### Create a copy of your .env file

REQUIRED : Stripe KEY : STRIPE_PRIVATE

REQUIRED : Config localhost database

```javascript
  cp .env.example .env
```

#### Generate your encryption key

```javascript
  php artisan key:generate
```

#### Some clear

```javascript
php artisan optimize
```

#### Add the tables and contents of your database with migrations or in SQL

Config .env with access of your database. Then
```javascript
php artisan migrate:fresh --seed
```

#### Start the project, open 2 terminals

```sh
php artisan serve
npm run watch
```
