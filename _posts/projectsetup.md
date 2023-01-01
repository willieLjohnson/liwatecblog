---

title: 'Creating a Game using Vite, BabylonJS, and TypeScript Part One:  A Basic Scene with a Sphere, Light, and Camera'
coverImage: '/assets/blog/setup/squidgame.png'
date: '2022-12-31T17:55:07'
updated: '2022-12-31T23:25:00'
author:
  name: WL
  picture: '/assets/blog/authors/wLiwa-320.png'
ogImage: '/assets/blog/setup/squidgame.png'
tag: gamdev

---

## TypeScript, Vite, and BabylonJS


If you need a fast, reliable, and lightweight way to create 3D browser games you've landed on the right post. With BabylonJS, a powerful 3D engine; Vite, one of the latest fast and lightweight build tools; and TypeScript, arguably a better version of JavaScript, we can create decent-sized WebGL games with realistic graphics, physics, skeletal animation, and post-processing effects just to name a few of the features.

Let's get right into it!

## Creating a Vite Project

They've made it nice and simple to install Vite with a helpful CLI:

Run the following commands:

> Pick the options `Vanilla` and `TypeScript` for this project. Replace `devlon` with the name of your game.
```bash
npm create vite@latest devlon
cd devlon
npm install
```

Your generated project folder should look like this:

```bash
your-awesome-game-name/
├── index.html
├── node_modules
├── package-lock.json
├── package.json
├── public 
│   └── vite.svg
├── src
│   ├── counter.ts
│   ├── main.ts
│   ├── style.css
│   ├── typescript.svg
│   └── vite-env.d.ts
└── tsconfig.json
```

You can test it out right now by running:

```bash
npm run dev
```

We can continue on to our next step if this runs without any errors.

## Installing BabylonJS

Run the following command to install babylonjs-core

```bash
npm install --save babylon
```

We only need BabyonJS core for now, but we install the loaders and GUI package in another tutorial in this series.

## Configure Vite and TypeScript 

We need to configure Vite to use BabylonJS's max script so that it's easier to code and debug.

Create a file called `vite.config.js` in your project root and add the following:
> This simply tells vite to use the `babylon.max`, a human-readable readable script version.

```javascript
import { defineConfig } from 'vite';

export default defineConfig(({ command, mode }) => {
    return {
        resolve: {
            alias: {
                'babylonjs': mode === 'development' ?
                  'babylonjs/babylon.max' : 'babylonjs'
            }
        }
    };
});
```

## TS Config

Lastly, update `tsconfig.json` in root to include the vite config file.

```json
{
	...
  "include": [
    "src",
    "vite.config.js"
  ]
}
```

### Package Config

In `package.json` change the value of `scripts: dev` to `vite --open` to automatically open the page when we run the game:

```json
{
	...
  "scripts": {
    "dev": "vite --open",
    ...
	}
}
```

Awesome! We have our project set up with Vite, BabylonJS, and TypeScript. We can create decent games with only these three libraries. We'll get to that later. For now, let's create a basic scene.

## Creating the Scene

In BabyonJS every game object lives in the Scene. Think of it like the "game world". We'll start by updating the index.html to make it ready for rendering.

### index.html

The main and potentially only HTML file you'll need. It'll start off pretty basic. Most of our code will be in modular TypeScript files in the `src/` folder. We add a `canvas` element that Babylon uses to render the scene, change the title of our page, and add a style element that makes the canvas fill the screen.

```html
<!DOCTYPE html>
<html>
    <head>
		    <meta charset="UTF-8" />
		    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
		    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		    <title>Devlon!</title>
		    <style>
            html,
            body {
                overflow: hidden;
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
                text-align: center;
            }

            #game {
                width: 100%;
                height: 100%;
            }
        </style>
    </head>

    <body>
        <canvas id="game"></canvas>
        <script type="module" src="/src/main.ts"></script>
    </body>

</html>
```

So far so good.

### Scripts

The following additions and changes will happen in the `src/` folder.

### src/main.ts

This is the first script that is run as we saw in `index.html`. Change it to look like this:

> We will create the `Game.ts` file next, so don't worry about any import errors.

```javascript
import { Game } from './Game';

window.addEventListener('DOMContentLoaded', () => {
    let canvas: any = document.getElementById('game') as HTMLCanvasElement;
    let game: Game = new Game(canvas);
    game.run();
});
```

### src/game.ts

Create `src/game.ts`. replace `src/AppOne.js` if Vite created it in our first step.

> Finally, some BabylonJS!

***Import the modules using ES6 modules.***

```javascript
// Imports es6 style
import {
  Engine,
  Scene,
  Vector3,
  MeshBuilder,
  FreeCamera,
  HemisphericLight,
} from "babylonjs";
```

**Create the `Game` class.**

```javascript
// The game class used in `main.ts`
export default class Game {
  engine: Engine;
  scene: Scene;

  constructor(readonly canvas: HTMLCanvasElement) {
    this.engine = new Engine(canvas);
    // allows the engine to resize the scene when the browser window changes.
    window.addEventListener("resize", () => {
      this.engine.resize();
    });
    this.scene = createScene(this.engine, this.canvas);
  }
}
```

**Add the follow methods to the bottom of `class Game`.**

```javascript
// Turns on the Game Engine "level editor" toolbars. Awesome feature! Now you have a Game Engine on par with the likes of Unity, Godot, and Unreal!
  debug(debugOn: boolean = true) {
    if (debugOn) {
      this.scene.debugLayer.show({ overlay: true });
    } else {
      this.scene.debugLayer.hide();
    }
  }

  run() {
    this.debug(true);
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }
}
```

**Add `createScene` function to the the bottom of the file.
```javascript
// es6 imports <-----| collapsed for clarity
class Game{...} <----| don't change these in your code.

var createScene = function (engine: Engine, canvas: HTMLCanvasElement) {
  // The scene that holds our objects and camrea.
  var scene = new Scene(engine);

	// The camera we will control to look around.
  var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

  // Point the camera to origin of the scene.
  camera.setTarget(Vector3.Zero());

  // Attach that camera to the canvas.
  camera.attachControl(canvas, true);
  ...
```

**Create the light, sphere, and ground plane.**
```
  ... 
  // A light that poitns towards 0,1,0 - straight up.
  var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  // Default intensity is 1. This is dimmer.
  light.intensity = 0.7;

  // A sphere!
  var sphere = MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 2, segments: 32 },
    scene
  );
  // Move the sphere upward 1.
  sphere.position.y = 1;

  // A ground!
  var ground = MeshBuilder.CreateGround(
    "ground",
    { width: 6, height: 6 },
    scene
  );
  ground.position.y = -1;

  return scene;
};
```

Your project should now like this:

```bash
index.html
├── node_modules
├── package-lock.json
├── package.json <--- changed
├── public
│   └── vite.svg
├── src
│   ├── game.ts <--- new
│   ├── main.ts <--- changed
│   ├── style.css
│   ├── typescript.svg
│   └── vite-env.d.ts
└── tsconfig.json <--- changed
|__ vite.config.json <--- new
```

## Run the Game 

> Let's see what we've got. 

```bash
npm run dev
```

This should open your browser `https://localhost:5173`. You can open it manually if it did not.

## Done!

You should see this:

![basicscene.png: A picture of a ball and a sphere](https://www.willieliwa.com/assets/blog/setup/scene.png)
> A ball and a plane -.- ....

But a great start! You'll have to go to the next chapter for the flashy game features -----> [Building the Game World](/gameworld)
