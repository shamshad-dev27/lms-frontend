#  LMS Frontend 

### Setup instruction

1.Clone the project
```
git clone https://github.com/shamshad-dev27/lms-frontend.git
```

2.Move into the directory
 ``` 
 cd lms-forntend
 ```
 3.install dependencies
 ```
 npm i
 ```
 4.run the server 
 ```
 npm run dev
 ```

 ### setup instruction for tailwind
 [Tailwind offical website doc](https://tailwindcss.com/docs/installation/using-vite)

 1.install tailwindcss
 ```
 npm install tailwindcss @tailwindcss/vite
 ```
 2.config the vite pluge
 ```
 import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```
3.import the tailwindcss in index.css that is import in your main.jsx 
```
@import "tailwindcss";

```