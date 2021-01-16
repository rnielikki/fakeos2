//we made it for vue3 compability.
import { ComponentPublicInstance, defineComponent } from 'vue'
import Win64 from '@/components/window/components/win64.vue'
export type Component = ReturnType<typeof defineComponent>;
//export type Win64Type = typeof Win64;
export type Win64Type = ComponentPublicInstance; //until fixed.