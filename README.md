# Issues in Dockerizing App 
   App not running into browser
## Solution : 

Add this into vite.config.ts

```bash
  server: {
      host: true,
      // port:8000,
      strictPort: true,
    },
```