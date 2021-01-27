
# The Frameworks

## React Native / Expo

React Native is a JavaScript framework originating with react, but focused on mobile app development. Expo is used to improve the development experience allowing for hot reloading of the app in a web container in the Expo app, creating downloadable builds and much more. React Native, like react itself, is a bare bones framework. Custom components and functionality can be added via libraries. We used React Native Elements to bring in the most common reusable components.

## AWS Amplify

“AWS Amplify is a set of tools and services that can be used together or on their own, to help front-end web and mobile developers build scalable full stack applications, powered by AWS. With Amplify, you can configure app back ends and connect your app in minutes, deploy static web apps in a few CLIcks, and easily manage app content outside the AWS console.” AWS Amplify has a CLI for setting up the different supported AWS services, like APIs, Authentication, Storage, Functions, et cetera. It also provides libraries for seamless integration with Ionic, React Native and Flutter, as well as direct iOS and Android development.

## Tutorials

- https://reactnative.dev/docs/getting-started - React Native can be tested directly in the browser using Expo, the documentation is full of examples to do so.
- https://docs.amplify.aws/start/q/integration/react-native - React Native + Amplify

## Useful links

https://reactnative.dev
https://expo.io
https://reactnativeelements.com
https://docs.amplify.aws/cli - amplify CLI

# The Setup

Install Expo CLI

```zsh
npm install -g expo-cli
```

Install dependencies

```zsh
npm install
```

Initialize Amplify

```zsh
amplify init
```

- ? Do you want to use an existing environment? **No**
- ? Enter a name for the environment **envname**
- ? Choose your default editor: **Visual Studio Code**
- Using default provider  awscloudformation
- ? Do you want to use an AWS profile? **Yes**
- ? Please choose the profile you want to use **default**

Push the backend

```zsh
amplify push  

| Category | Resource name            | Operation | Provider plugin   |
| -------- | ------------------------ | --------- | ----------------- |
| Auth     | myamplifyproject846efcd9 | Create    | awscloudformation |
| Api      | myamplifyproject         | Create    | awscloudformation |
```

- ? Are you sure you want to continue? **Yes**
- ? Do you want to update code for your updated GraphQL API **No**

Start Expo

```zsh
expo start
```
