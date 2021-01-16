import SoundManager from './sound-manager'

export default class Sound{
    private context:AudioContext = new AudioContext()
    private _soundPromise:Promise<unknown> | null;
    private _audioSource:AudioBufferSourceNode | null;
    private _paused:boolean = false;
    private _volume:number = 1;
    private _gainNode:GainNode | null = null;
    private _isStarted = false;
    public get volume(){ return this._volume; }
    public get current(){
        return this.context.currentTime
    }
    private _buffer:Uint8Array| undefined = undefined;
    public get time(){
        return this._audioSource?.buffer?.duration;
    }
    constructor(path:string, autoPlay:boolean = true, repeat:boolean = false, defaultVolume:number = 1){
        if(!path){
            this._audioSource = null;
            this._soundPromise = null;
            return;
        }
        this._audioSource = this.context.createBufferSource();
        this._soundPromise = fetch(path).then(res=>res.arrayBuffer()).then(buffer=>{
            this._buffer = new Uint8Array(buffer).slice(0);
            this.decode(buffer, repeat)
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
                this.start();
            }
        });
    }
    decode(buffer:ArrayBuffer, repeat:boolean){
        this.context.decodeAudioData(buffer, (buff)=>{
            if(buff){
                this._audioSource!.buffer = buff;
                this._audioSource!.connect(this.context.destination)
                this.loop(repeat);
                if(!repeat){
                    this._audioSource!.addEventListener("ended", ()=>this.stop(false))
                }
            }
        })
    }
    async start(){
        if(this._isStarted) return;
        await this._soundPromise;
        this._audioSource!.start(0);
        this._isStarted = true;
    }
    async play(){
        await this._soundPromise;
        if(!this._isStarted){
            this.start();
        }
        else{
            this.context.resume();
        }
        this._paused = false;
    }
    async pause(){
        if(this._paused) return;
        await this._soundPromise;
        this.context.suspend();
        this._paused = true;
    }
    async stop(end:boolean = true){
        await this._soundPromise;
        if(this._isStarted){
            this._audioSource!.stop(0);
        }
        if(!end){
            this._audioSource = this.context.createBufferSource();
            this._isStarted = false;
            this.decode(this._buffer!.slice(0).buffer, false);
        }
        else{
            this.dispose();
        }
    }
    loop(setLoop:boolean){
        this._audioSource!.loop = setLoop
    }
    //volume range is 0-1
    //the actual gain will be -1(mute) - 0 (full)
    setVolume = async (volume:number)=>{
        await this._soundPromise;
        if(volume < 0 || volume > 1) {
            console.warn("Warning: the volume range is not correct (should be 0-1). The sound setting will be ignored.\nThe input volume: "+volume);
            return;
        }
        this._volume = volume;
        const actualSound = (volume*SoundManager.masterSound-1)
        if(this._gainNode !== null){
            this._audioSource!.disconnect(this._gainNode);
        }
        this._gainNode = this.context.createGain();
        this._gainNode.gain.value = actualSound;
        this._gainNode.connect(this.context.destination)
        this._audioSource!.connect(this._gainNode)
    }
    updateVolume = ()=>{
        this.setVolume(this._volume)
    }
    private dispose=()=>{
        SoundManager.MasterChangeListener.Remove(this.updateVolume);
        this._audioSource?.stop(0); //destroy buffer
        this.context.close();
    }
}