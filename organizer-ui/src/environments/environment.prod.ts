
export const environment = {
  production: true,
  // @ts-ignore
  backendApiHost: window["env"]["backendApiHost"] || "http://host.docker.internal:8080",
  // @ts-ignore
  debug: window["env"]["debug"] || false
};
