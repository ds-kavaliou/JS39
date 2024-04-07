# JS39; HomeWork 1;

## 1. Метод запроса OPTIONS - когда вызывается, где используется, что передает и принимает.

HTTP Метод **OPTIONS** - это метод, который используется для запроса информации о действиях, доступных для взаимодействия с целевым ресурсом.

**OPTIONS** используется для определения возможностей сервера или того, какое взаимодействие разрешено с определенным ресурсом, без необходимости совершать конкретные действия.

Request:

```bash
  OPTIONS /index.html HTTP/1.1
  Host: www.example.com
```

Response:

```bash
  HTTP/1.1 200 OK
  Date: Mon, 10 April 2023 10:00:00 GMT
  Server: Apache/2.4.1 (Unix)
  Allow: GET, HEAD, POST, OPTIONS
  Content-Length: 0
  Content-Type: text/html
```

В контексте **CORS**, метод **OPTIONS** играет роль предварительного запроса (preflight request), который отправляется браузером автоматически перед основным запросом к серверу для проверки, разрешено ли выполнение запроса с учетом политики CORS.

Request:

```bash
  OPTIONS /resource POST HTTP/1.1
  Host: api.example.com
  Origin: https://web.example.com
  Access-Control-Request-Method: POST
  Access-Control-Request-Headers: Content-Type
```

Response:

```bash
  HTTP/1.1 200 OK
  Access-Control-Allow-Origin: https://web.example.com
  Access-Control-Allow-Methods: POST, GET
  Access-Control-Allow-Headers: Content-Type
  Access-Control-Max-Age: 86400
```
