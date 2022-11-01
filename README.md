## What is it?

A sample portfolio example using a minimal animation that is based on rects rising from the bottom.

<p align="center">
  <kbd>
    <img src="https://user-images.githubusercontent.com/51419598/198080570-97d11099-1e10-471b-b98e-4081d622c4ac.gif" height="300">
  </kbd>
</p>

## Backstory

Back the old days I did this animation for testing purposes, but since I liked that animation I didn't delete it. And someone opened an issue [alexrintt/alexrintt.github.io/issues/4](https://github.com/alexrintt/alexrintt.github.io/issues/4) asking about this particular animation, so here we are.

I'm also working on this discussion that will explain the logic step-by-step so you can reproduce in any other platform.

I also created a p5.js sketch, so you can edit the code + see the effects, it's available at [p5js.org/alexrintt/rising](https://editor.p5js.org/alexrintt/full/JMamwM8a_).

The animation itself is pretty simple, it uses  plain geometry, that one you learn from elementary school.

## Running locally

Runtime environment:

```shell
NodeJS v16.16.0
```

Install dependencies:

```shell
npm install
# or
yarn install
```

Start development server:

```shell
npm run dev
# or
yarn dev
```

Generate production build:

> **Warning** update the public url in the `package.json` build script before generating your build.
> The website of this repository was deployed under alexrintt.io/rising, if you want to deploy to yourdomain.com you need to set the public path url to "/".

```shell
npm run build
# or
yarn build
```

Video following these steps:

https://user-images.githubusercontent.com/51419598/199149013-c3126cba-f741-4b45-9028-fc0cac9c6d0f.mp4

<br>

<samp>

<h2 align="center">
  Open Source
</h2>
<p align="center">
  <sub>Copyright © 2020-present, Alex Rintt.</sub>
</p>
<p align="center">This portfolio <a href="./LICENSE">is MIT licensed 💖</a></p>
<p align="center">
  <img src="./src/assets/images/logo.png" width="35" />
</p>

</samp>
