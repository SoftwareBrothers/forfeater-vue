# forfeater-vue

# Yarn (without docker)

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve -w
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```

# Docker
```
docker build -t forfeater-vue .
docker run -itd -p 80:80 --rm --name forfeater-vue forfeater-vue
```