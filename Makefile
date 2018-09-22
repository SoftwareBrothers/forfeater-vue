docker-build:
	docker build -t forfeater-vue .

docker-run:
	docker run -itd -p 80:80 --rm --name forfeater-vue forfeater-vue
