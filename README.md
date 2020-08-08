# fakeos2

FakeOS2 ❤ Vue2

Hello, tt's me, [fakeos](https://github.com/rnielikki/fakeos) with **Vue 2** and **TypeScript**! The code is almost rewritten, but some logic is from older version.

## Why Vue

Not only Vue, the component-based framework is cleaner way to build the program. Besides, it defines behaviours when the component is created, updated and removed etc.

## Contribution

### Benefits of contributing FakeOS2

* FakeOS 2 problem requires **many cases**, including unusual(edge) cases. So if you started Vue, you can learn many things from here. Maybe, hopefully.
* It's fun!

Oh, sorry, you cannot learn routing with FakeOS 2.

### How to contribute

**Note: Currently we don't accept any feature request. Leave issues later, now please focus on building and fixing by pull request!**

Currently you can contribute by:

* **Small fix / Refactoring**: Currently the program building is going forward, so we may not see the back - the better solution. Cleaning up the code surely helps us. Even small ones.
* **Features**: the features below will be added
  * Window selection control (on `system/window-manager.ts`)
    * hint: `created()`, `destroyed()` on the component
  * Make dialog template ready - OK / OkCancel / user defined.
  * Icon set
  * File hierarchy
  * Default apps
  * Status bar click window (e.g. sound)
  * Clock managing (low priority)
* **Bugs**: (Can be added:)
  * Currently a bug was found that callback doesn't update the binded component - even the watcher works, but force update doesn't work (You can see more about this on `softwares/hello-world/hello-world.vue`) and `src/components/window/components/dialog-template.vue`
* **Tests**

### Attitudes

Be nice to each other, even for newbies and bad habits - nobody is perfect, especially from very first.

Forget about every background, just focus on the code.

<!--

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
-->
