(function (window) {
  window.env = window.env || {};

  // Environment variables
  window["env"]["backendApiHost"] = "${BACKEND_API_HOST}";
  window["env"]["debug"] = "${DEBUG}";
})(this);

// https://pumpingco.de/blog/environment-variables-angular-docker/
