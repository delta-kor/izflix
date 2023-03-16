![Header](https://user-images.githubusercontent.com/48397257/225324412-3c8354e7-b091-4179-be6f-f03adcdc49d2.png)

## IZ*ONE Interactive Web Video Streaming Player
The repository for website of IZFLIX.

[izflix.net](https://izflix.net)

![IZFLIX Production](https://img.shields.io/github/deployments/delta-kor/izflix/production)
![IZFLIX WEB](https://cronitor.io/badges/xdQGle/production/qPaMi7L7IsLnTzdtTC_4IKuzD9c.svg)
![IZFLIX API](https://cronitor.io/badges/2neIZu/production/ZBeTwU8UVATCjhr_6jb9wAn3sgw.svg)

The project uses [React](https://reactjs.org/) and deploys via [Vercel](https://vercel.com).  
To develop it locally, clone this repository and run the following command to start the local dev server:

```bash
yarn install
yarn start
```

Backend server repository is on [delta-kor/video-server](https://github.com/delta-kor/video-server)
## Project Image
![Image](https://user-images.githubusercontent.com/48397257/182997875-6387054c-9f71-4a77-8069-5ae0ee6e5052.png)

## Project Structure
```bash
📁 public
📁 run
├─ 📄 build.js    # Post-build script
├─ 📁 templates   # Post-build template pug files
📁 src
├─ 📁 components  # React components
├─ 📁 contexts
├─ 📁 exceptions
├─ 📁 filters
├─ 📁 hooks
├─ 📁 icons       # UI Icons
├─ 📁 locales     # Language files
├─ 📁 pages       # React pages
├─ 📁 providers
├─ 📁 services    # Client services
├─ 📁 stores
├─ 📁 types
├─ 📄 App.tsx
├─ 📄 GlobalStyle.tsx
├─ 📄 index.ts
├─ 📄 styles.ts
```

## Stacks
#### Development
- [Typescript](https://www.npmjs.com/package/typescript)
#### User Interface
- [React](https://www.npmjs.com/package/react)
- [Styled-Components](https://www.npmjs.com/package/styled-components)
- [Framer-Motion](https://www.npmjs.com/package/framer-motion)
- [React-Responsive](https://www.npmjs.com/package/react-responsive)
#### Internationalization
- [i18next](https://www.npmjs.com/package/i18next)
#### Analytics
- [Google Analytics 4](https://analytics.google.com/analytics/web/)
