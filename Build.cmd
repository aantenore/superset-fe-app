cmd /c npm run build
cmd /c StartMinikube
FOR /f "tokens=*" %%i IN ('minikube -p minikube docker-env') DO %%i
docker build -t obiettivo:fe-app .
