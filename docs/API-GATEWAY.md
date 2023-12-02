```
handler: src/functions/handler.main
memorySize: 1024
events:
  - http:
      path: 'webhook/endpoint'
      method: post
      cors: true
      private: true

      request:
        parameters:
          headers:
            mustHeader: true # mark header as required
            optionHeader: false # mark header as required
          querystrings:
            require: true # mark query string
            test: false # mark query string
```
