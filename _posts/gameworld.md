---

title: 'How to Create Games using TypeScript, Vite, and BabylonJS - The Game World, Player Input, and UniversalCamera'
coverImage: '/assets/blog/gameworld/movement.gif'
date: '2023-01-04T16:28:07'
updated: '2023-01-05T02:05:07'
author:
  name: WL
  picture: '/assets/blog/authors/wLiwa-320.png'
ogImage: '/assets/blog/gameworld/movement.gif'
tag: gamedev
series:
  name: vbt
  id: 1
  next: monsters
  prev: projectsetup

---

# The Core Element of Every Game

The core element of every game is the player's character and how it feels to control. Having a clunky character can make a game feel more difficult than it needs to be, although this can also be a design choice. We'll start here and make a player that can move around using a basic Entity class and a World class to manage everything. Next, we'll add monsters to create a basic arcade game.

## 1. Creating the Classes

This is Part Two of the series. You can start from part one or grab the *code available on [github](https://github.com/willieLjohnson/vitetsbabylon-guide)**

We'll keep everything in modular code files located in `./src/world/`.
This will have the `Entity`, `World`, and `Player` classes to make clear up some code in Game.ts.

**Here's how the structure of your project will look like:**

```properties
tree
devlon
|...
├── src
│   ├── game.ts
│   ├── main.ts
│   ├── style.css
│   ├── typescript.svg
│   ├── vite-env.d.ts
│   └── world <---------- we'll create these.
│       ├── entity.ts  <--| basic entity class.
│       ├── player.ts  <--| player with w,a,s,d movement.
│       └── world.ts   <--| manages entities and player.
|...
```


> The following will all happen inside the `./src/world/` folder. Create it now if you don't have it already. Check out the [github repo](https://github.com/willieLjohnson/vitetsbabylon-guide/tree/main/two-worldandplayer/devlon) to see the project structure.

### Create the `class Entity` inside `/world/entity.ts`

The Entity class defines common properties and methods that we want to be shared between all our entities.

```tsx
// entity.ts

import { Mesh, MeshBuilder, Scene, Vector3 } from "babylonjs";

export default class Entity {
  mesh: Mesh;
  moveDirection: Vector3 = new Vector3();
  constructor(
    public id: string,
    public position: Vector3 = new Vector3(),
    public diameter: number = 2,
    public moveSpeed: number = 0.2,
    public scene?: Scene
  ) {
    this.mesh = MeshBuilder.CreateSphere(
      this.id,
      { diameter: diameter },
      scene
    );
  }

  move(direction: Vector3) {
    this.position.addInPlace(direction.scale(this.moveSpeed));
  }
  update() {
    this.mesh.moveWithCollisions(this.moveDirection.scale(this.moveSpeed));
  }
}
```

### Create the `class World` inside `/world/world.ts`

The World class manages a list of all the entities in the game including the player. 

```tsx
// world.ts

import { Scene } from "babylonjs";
import Entity from "./entity";
import Player from "./player";

export default class World {
  player: Player;
  constructor(scene: Scene, public entities: Entity[] = []) {
    this.player = new Player(scene);
  }

  addEntity(entity: Entity) {
    this.entities.push(entity);
  }

  removeEntity(entity: Entity) {
    const index = this.entities.indexOf(entity);
    if (index !== -1) {
      this.entities.splice(index, 1);
    }
  }
  update() {
    this.player.update();
    this.entities.forEach((e) => e.update());
  }
}
```

### Create the `class Player` inside `/world/player.ts`

The Player class inherits from the Entity class and handles specific player-related functionality, such as movement controlled by the keyboard. We'll add the keyboard controls later in the tutorial.

Since we defined everything in Entity it starts off pretty simple. We'll add the keyboard movement next chapter.

```tsx
// player.ts

import { Scene, Vector3 } from "babylonjs";
import Entity from "./entity";

export default class Player extends Entity {
  constructor(public scene: Scene) {
    super("player", new Vector3(), 0.2); 
    // Change the color to green.
    var playerMat = new StandardMaterial("player", scene);
    playerMat.diffuseColor = new Color3(0.5, 1, 0.5);
    this.mesh.material = material;
  }
}
```

### Adding everything to the game

The Game class will have a World instanced. This way we can update the state of each entity in the game world in the game loop.

**In `./src/game.ts`**

> 108 Lines of code! When you see this `// ..` it means some of the code is cut for clarity. You don't need to copy it. 
>
> It takes on [~10,000 lines of code](https://www.informationisbeautiful.net/visualizations/million-lines-of-code/) to make a simple iPhone game.

```tsx
// game.ts

import {
  Engine,
  Scene,
  Vector3,
  MeshBuilder,
  FreeCamera,
  HemisphericLight,
} from "babylonjs";

import World from "./world/world";  // <--- import world

export default class Game {
  engine: Engine;
  scene: Scene;
  world: World;

  constructor(readonly canvas: HTMLCanvasElement) {
    this.engine = new Engine(canvas);
    window.addEventListener("resize", () => {
      this.engine.resize();
    });
    this.scene = createScene(this.engine, this.canvas);
    this.world = new World(this.scene); // <--- init world.
  }

  // ... <--- collapsed debug() {...}

  run() {
    this.debug(true);
    this.engine.runRenderLoop(() => {
      this.scene.render();
      this.world.update(); // <--- add update method to loop.
    });
  }
}

// ...
```

Nice! We can now remove all the CreateSphere code inside the `createScene` function.

We can also change the color's of the game world to make the entities stand out more.

```tsx
// ... game.ts

var createScene = function (engine: Engine, canvas: HTMLCanvasElement) {
  var scene = new Scene(engine);
  scene.clearColor = new Color4(0.9, 1, 1, 1); // <--- Change color of sky.

  var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

  camera.setTarget(Vector3.Zero());
  camera.attachControl(canvas, true);

  var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  light.intensity = 0.7;

  // + add new ambient light to make colors pop.
  var ambient = new HemisphericLight("ambient", new Vector3(1, 1, 0), scene);
  ambient.groundColor = new Color3(0.9, 1, 1);
  ambient.intensity = 0.2;

  /// - Remove `CreateSphere` code 

  /// + Make the ground object much bigger.
  var ground = MeshBuilder.CreateGround(
    "ground",
    { width: 25, height: 25 },
    scene
  );
  ground.position.y = -1;

  return scene;
};
```

## 2. Player Movement

Player movement uses the keyboard key-down and key-up events to update the `movementDirection` property we defined in the Entity class. It's very basic and doesn't have any physics involved but it'll work for demonstrating `KeyboardEventTypes`


### `KeyboardEventTypes`

**Go back to `./src/world/player.ts` and add the following below the `constructor`**

```tsx
// ... player.ts
  
import { KeyboardEventTypes, Scene, Vector3 } from "babylonjs"; // <--+ Imports
import Entity from "./entity";

export default class Player extends Entity {
  constructor(public scene: Scene) {
    super("player", new Vector3(), 0.2);
    var material = new StandardMaterial("material", scene);
    material.diffuseColor = new Color3(0.5, 1, 0.5);
    this.mesh.material = material;
    // Register event handlers.
    scene.onKeyboardObservable.add((kbInfo) => {
      switch (kbInfo.type) {
        case KeyboardEventTypes.KEYDOWN:
          this.onKeyDown(kbInfo.event.keyCode);
          break;
        case KeyboardEventTypes.KEYUP:
          this.onKeyUp(kbInfo.event.keyCode);
          break;
      }
    });
  }
  
  // When a key is pressed and held.
  onKeyDown(keyCode: any) {
    // Set direction based on the key pressed.
    switch (keyCode) {
      case 87: // W key
        this.moveDirection.z = 1;
        break;
      case 65: // A key
        this.moveDirection.x = -1;
        break;
      case 83: // S key
        this.moveDirection.z = -1;
        break;
      case 68: // D key
        this.moveDirection.x = 1;
        break;
    }
  }

  // When a key is released.
  onKeyUp(keyCode: any) {
    // Reset the direction based on the key released
    switch (keyCode) {
      case 87: // W key
        this.moveDirection.z = 0;
        break;
      case 65: // A key
        this.moveDirection.x = 0;
        break;
      case 83: // S key
        this.moveDirection.z = 0;
        break;
      case 68: // D key
        this.moveDirection.x = 0;
        break;
    }
  }
}

// ...
```

> Can we move yet?


Yes! Run the code and try to move the player with `W, A, S, D`. 
You can move the camera with your keyboard's arrow keys, but we will disable
this is when we implement the camera following logic in the next chapter.

Check the [GitHub](https://github.com/willieLjohnson/vitetsbabylon-guide) repo to see if your progress matches so far.

## 3. Making the Camera Follow the Player 

The camera following logic simply updates the position to match the player's position. BabylonJS has a built-in `FollowCamera` class but we won't be using that that way we have more control over the behavior. We'll use the [UniversalCamera](https://doc.babylonjs.com/typedoc/classes/BABYLON.UniversalCamera) which is best for most games as it works with a keyboard, mouse, touchscreen, and gamepad.

### Refactor camera code and create a `UniversalCamera`

```tsx
// ... game.ts

export default class Game {
  engine: Engine;
  scene: Scene;
  world: World;
  camera: UniversalCamera; // <--+ Game now has camera instance.
  camRoot: TransformNode; //  <--+ Used to track camera position.

  constructor(readonly canvas: HTMLCanvasElement) {
    // ...
    this.camera = new UniversalCamera(
      "cam",
      new Vector3(0, 10, -10), <--- Top down view.
      this.scene
    );
    this.camRoot = new TransformNode("root");
    this.setupCamera(); //  <----------------| We will make these next.
    this.camera = this.registerCamera(); <---|
  }
}

// ... debug() {...}

// Remove `canvas: HTMLCanvasElement`     |
// it's not needed inside this function.  v
var createScene = function (engine: Engine) {
  var scene = new Scene(engine);

  //   ^           ^           ^
  //   |           |           | 
  /// Move all camera code to `constructor()`.

  var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  light.intensity = 0.7;

  // ...
```

This way we have access to the camera through the Game class. We'll use the update method next to match its position with the player.

### Follow the Player

Using the `camRoot` we'll move the camera to match the player's position before we render the scene. 
We create 4 methods in the Game class to help us do this: 

```tsx
// ... game.ts/Game

// Registers `beforeRenderUpdate` and `updateCamera` on the scene
// to run before the main game loop.
public registerCamera(): UniversalCamera {}

// Runs code that must happen before the main loop.
private beforeRenderUpdate(): void {}

// Creates the camera.
private setupCamera(): UniversalCamera {}

// Camera follow logic.
private updateCamera(): void {}

// ...
```

### Camera Update Loop.

Add these methods to your `class Game` right below the debug method. 

```tsx 
// ... game.ts/Game

// debug() {...}

public registerCamera(): UniversalCamera {
  this.scene.registerBeforeRender(() => {
    this.beforeRenderUpdate();
    this.updateCamera();
  });
  return this.camera;
}

private beforeRenderUpdate(): void {
  this.world.update();
}

private setupCamera(): UniversalCamera {
  // Root camera parent that follows the player.
  this.camRoot = new TransformNode("root");
  this.camRoot.position = new Vector3(0, 0, 0);
  this.camRoot.rotation = new Vector3(0, 0, 0);

  // Rotations along the x-axis (up/down tilting)
  let yTilt = new TransformNode("ytilt");
  yTilt.parent = this.camRoot;

  // The camera points to the root's position.
  this.camera.lockedTarget = this.camRoot.position;
  this.camera.fov = 1.1; // <--- zoom out a bit, default is 0.8 
  this.camera.parent = yTilt;

  this.scene.activeCamera = this.camera;
  return this.camera;
}

private updateCamera(): void {
  let player = this.world.player;
  // Smooth movement towards the player's position.
  this.camRoot.position = Vector3.Lerp(
    this.camRoot.position,
    player.mesh.position,
    0.4
  );
}

run() {
  this.debug(true);
  this.engine.runRenderLoop(() => {
    this.scene.render();
    // ^^^ Move `this.world.update` to `beforeRenderUpdate()`
  });
}

```

## 4. Run the Game

You should see a more zoomed-out version of what we started with. You can move around with the `W, A, S, D` keys:
![Player moving around](/assets/blog/gameworld/movement.gif)

> Cool! Let's fight some monsters --> [Part Three: Randomly Spawning Monsters](/posts/monsters)
