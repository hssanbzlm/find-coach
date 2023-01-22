![image](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)

![image](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

![image](https://img.shields.io/badge/Vuetify-1867C0?style=for-the-badge&logo=vuetify&logoColor=white)

![image](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)

![image](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

# Find your coach

Welcome to our new coaching app! Our app is designed to help you connect with experienced coaches who can help you achieve your goals. With our app, you can easily browse through a wide range of coaches and find the one that best suits your needs. Our powerful filtering system allows you to search for coaches by area of expertise. Once you find a coach you're interested in, you can view their detailed profile.

Our app also allows you to easily get in touch with the coaches you're interested in. You can simply send an email directly from the coach's profile page and start a conversation.

We are confident that our app will provide you with the best coaching experience possible and help you achieve your goals. Thank you for choosing our app, and happy coaching.

## Features

- Google sign-in
- Filter coaches by area of expertise
- Send email to specific coach
- Get an history of your sent emails

## Technologies

### Frontend

- Vuejs
- Vuetify
- vue-router
- Pinia
- Emailjs
- Typescript

### Backend

- Firebase (Realtime database, Google auth)

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

# Local test

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
