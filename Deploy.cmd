cmd /c StartMinikube
kubectl rollout restart deployment/fe-app
kubectl apply -f ../cluster-config/fe-deployment.yaml
REM kubectl apply -f ../cluster-config/fe-service.yaml
cmd /c Start.cmd