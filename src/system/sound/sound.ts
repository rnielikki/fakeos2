import SoundManager from './sound-manager'

export default class Sound{
    private context:AudioContext = new AudioContext()
    private _soundPromise:Promise<unknown>;
    private _audioSource:AudioBufferSourceNode;
    private _paused:boolean = false;
    private _volume:number = 1;
    private _gainNode:GainNode | null = null;
    public get volume(){ return this._volume; }
    constructor(path:string, autoPlay:boolean = true, defaultVolume:number = 1){
        this._audioSource = this.context.createBufferSource();
        this._soundPromise = fetch(path).then(res=>res.arrayBuffer()).then(buffer=>{
            console.log("___")
            this.context.decodeAudioData(buffer, (buff)=>{
                if(buff){
                    this._audioSource.buffer = buff;
                    this._audioSource.connect(this.context.destination)
                    this._audioSource.addEventListener("ended", this.dispose)
                }
            })
        })
        .catch((err)=>{
            console.warn("ERROR while loading and initializing the sound.")
            console.warn(err);
            this.dispose();
        });
        this._soundPromise.then(()=>{
            this.setVolume(defaultVolume);
            SoundManager.MasterChangeListener.Add(this.updateVolume);
            if(autoPlay) {
                this.play();
            }
        });
    }
    async start(point:number=0){
        await this._soundPromise;
        this._audioSource.start(point);
    }
    async play(){
        if(this._paused) {
            this.context.resume();
            this._paused = false;
        }
        else {
            await this.start(0);
        }
    }
    async pause(){
        if(this._paused) return;
        await this._soundPromise;
        this.context.suspend();
        this._paused = true;
    }
    async stop(){
        await this._soundPromise;
        this._audioSource.stop();
    }
    //volume range is 0-1
    //the actual gain will be -1(mute) - 0 (full)
    async setVolume(volume:number){
        await this._soundPromise;
        if(volume < 0 || volume > 1) {
            console.warn("Warning: the volume range is not correct (should be 0-1). The sound setting will be ignored.\nThe input volume: "+volume);
            return;
        }
        this._volume = volume;
        let actualSound = (volume*SoundManager.masterSound-1)
        if(this._gainNode !== null){
            this._audioSource.disconnect(this._gainNode);
        }
        this._gainNode = this.context.createGain();
        this._gainNode.gain.value = actualSound;
        this._gainNode.connect(this.context.destination)
        this._audioSource.connect(this._gainNode)
    }
    updateVolume = ()=>{
        this.setVolume(this._volume)
    }
    private dispose(){
        this._audioSource?.stop(0); //destroy buffer
        this.context.close();
        SoundManager.MasterChangeListener.Remove(this.updateVolume);
    }
}