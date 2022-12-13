
export const environment = {
  production: true,
  // @ts-ignore https://pumpingco.de/blog/environment-variables-angular-docker/
  backendApiHost: window["env"]["backendApiHost"] || "http://host.docker.internal:8080",
  // @ts-ignore
  debug: window["env"]["debug"] || false
};
