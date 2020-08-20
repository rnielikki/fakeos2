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
  * **CSS renaming**: If css is not scoped, it should have prefix. We decided it to `f_`. Small fix, big help!
* **Features**: the features below will be added
  * Not yet started
    * File hierarchy
    * Default apps
  * Currently doing:
    * Background icon set
  * Done
    * Default clock observer
    * Popup (for example, status bar icons - menu uses popup too)
    * Double click to maximize / Click on the status bar to minimize
    * Status bar click window (e.g. sound / calendar)
* **Bugs**: (Can be added:)
  * Currently a bug was found that callback doesn't update the binded component - even the watcher works, but force update doesn't work (You can see more about this on `softwares/hello-world/hello-world.vue`) and `src/components/window/components/dialog-template.vue`
    * So, some of Vue watching/updating works, but forceUpdate/updating DOM currently not working! (When use callback) For example, `components/statusbar/clcok-date-popup.vue`
* **Design / Resources**: FakeOS logo, Start Menu and program Icon, Folder, File icon and Background etc.
  * CSS beautify
  * Icons: (transparent) PNG. And thank you if you use SVG tool to produce PNG icons, because it looks beautiful and reusable! We didn't decide the icon size.
  * Background: If the image is not for pattern background: JPG, at least 1920x1080, compression quality 60-90%. If it's pattern image, you can use JPG/PNG, but make sure that it's not oversized.
  * Sound: `*.wav` is allowed for &lt;5 seconds sound effects, otherwise use `*.mp3` or `*.ogg`, Max. 256Mbps, not good quality needed
  * Video: I don't know video standards ¯\\_(ツ)_/¯ Help me
  * You should make your resources (all images and sounds) yourself or at least make sure it doesn't violence the license by using our project. We strongly recommend to make by yourself if there are no strong reason.
  * Any animated gif/png is not allowed for the system (except it's sample image or inside app)
* **Tests**
* **Documentations**

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
