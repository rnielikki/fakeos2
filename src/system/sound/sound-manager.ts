import Sound from './sound'

//mastersound range is 0-1.
let master:number = 1;
let nowPlaying = new Array<Sound>();
export default {
    get masterSound(){
        return master;
    },
    set masterSound(value:number){
        if(value < 0 || value > 1){
            console.warn("Warning: the master volume range is not correct (should be 0-1). The input volume: "+value)
            return;
        }
        master = value;
        nowPlaying.forEach(sound=>{
            sound.setVolume(sound.volume)
        })
    },
    SoundList:{
        Add(sound:Sound){
            nowPlaying.push(sound)
        },
        Remove(sound:Sound){
            nowPlaying = nowPlaying.filter(s=>s!==sound);
        }
    }
}