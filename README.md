# fakeos2

> Note: this version is **BROKEN**. This is archived for future Vue 3 update - maybe useful in future.

FakeOS2 ❤ **Vue 3 Beta**

Hello, it's me, [fakeos](https://github.com/rnielikki/fakeos) with **Vue 3** and **TypeScript**! The code is almost rewritten, but some logic is from older version.

## Why Vue

Not only Vue, the component-based framework is cleaner way to build the program. Besides, it defines behaviours when the component is created, updated and removed etc.

Vue is also known as lighter framework than Angular or React.

## Contribution

### NOTE for Vue 3

Help us to fix this app by fixing these problems:

* We cannot **slot** with `createApp()`.
* Parent element is erased when appending with `createApp(...).mount(parentElement)`.

Since Vue 3 is currently on beta, features can be removed / added / changed / fixed (or broken?). Please keep on eye of them while you're contributing in this branch.

### Benefits of contributing FakeOS2

* FakeOS 2 problem requires **many cases**, including unusual(edge) cases. So if you started Vue, you can learn many things from here. Maybe, hopefully.

Oh, sorry, you cannot learn routing with FakeOS 2.

### How to contribute

**Note: Currently we don't accept any feature request. Leave issues later, now please focus on building and fixing by pull request!**

Currently you can contribute by:

* **Small fix / Refactoring**: Currently the program building is going forward, so we may not see the back - the better solution. Cleaning up the code surely helps us. Even small ones.
  * **CSS renaming**: If css is not scoped, it should have prefix. We decided it to `f_`. Small fix, big help!
* **Features**: Currently we don't accept any feature requirement, for focusing on bug fixing / migrating
* **Bugs**: (Can be added:)
  * Currently a bug was found that callback doesn't update the binded component - even the watcher works, but force update doesn't work (You can see more about this on `softwares/hello-world/hello-world.vue`) and `src/components/window/components/dialog-template.vue`
    * So, some of Vue watching/updating works, but forceUpdate/updating DOM currently not working! (When use callback) For example, `components/statusbar/clcok-date-popup.vue`
    * When exist file is saved, it overwrites existing file AND creates new file. Expected behaviour is
      * If saved as **new name**, it **doesn't overwrite** existing file
      * If saved as **existing name**, it overwrites existing file and **doesn't create** new file
* **Design / Resources**: FakeOS logo, Start Menu and program Icon, Folder, File icon and Background etc.
  * CSS beautify
  * Icons: (transparent) PNG. And thank you if you use SVG tool to produce PNG icons, because it looks beautiful and reusable! We didn't decide the icon size.
  * Background: If the image is not for pattern background: JPG, at least 1920x1080, compression quality 60-90%. If it's pattern image, you can use JPG/PNG, but make sure that it's not oversized.
  * Sound: `*.wav` is allowed for &lt;5 seconds sound effects, otherwise use `*.mp3` or `*.ogg`, Max. 256Mbps, not good quality needed
  * You should make your resources (all images and sounds) yourself or at least make sure it doesn't violence the license by using our project. We strongly recommend to make by yourself if there are no strong reason.
  * Any animated gif/png is not allowed for the system (except it's sample image or inside app)
* **Tests**
* **Documentations**

### Attitudes

Be nice to each other, even for newbies and bad habits - nobody is perfect, especially from very first.

Forget about every background, just focus on the code.
