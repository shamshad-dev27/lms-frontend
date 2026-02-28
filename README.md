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
@import "tailwindcss";
@plugin  "daisyui";

```

### Required library 
```
npm install @reduxjs/toolkit react-redux react-router-dom react-icon react-chartjs-2 chart.js daisyui axios react-hot-toast
```
### eslint 

```
1. VS Code Extension install karo
        ↓
2. Package install karo (npm install)
        ↓
3. eslint.config.js configure karo
        ↓
4. settings.json configure karo
        ↓
5. Reload Window
        ↓
6. Done! 🚀

```