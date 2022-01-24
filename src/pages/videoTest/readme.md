
```js
  useEffect(()=>{

    setTimeout(()=>{
      const video:videoType = videoRef?.current as unknown as videoType
      console.log('视频时长0：',videoRef)
      console.log('视频时长1：',videoRef?.current)
      console.log('视频时长2：',video.duration)
      setVideoDuration(video.duration)
    },800) 

    const url = 'http://172.16.53.113:1788/02_招商港口.mp4'
    initVideo(url)

    return function cleanUp() { }
  },[])
```

```js
      controlBar: { // 设置控制条组件
        /* 设置控制条里面组件的相关属性及显示与否
        'currentTimeDisplay':true,
        'timeDivider':true,
        'durationDisplay':true,
        'remainingTimeDisplay':false,
        volumePanel: {
          inline: false,
        }
        */
        /* 使用children的形式可以控制每一个控件的位置，以及显示与否 */
        children: [
          // {name: 'playToggle'}, // 播放按钮
          // {name: 'currentTimeDisplay'}, // 当前已播放时间
          // {name: 'progressControl'}, // 播放进度条
          // {name: 'durationDisplay'}, // 总时间
          // 倍数播放
          // { name: 'playbackRateMenuButton', 'playbackRates': [0.5, 1, 1.5, 2, 2.5] },
          // 音量控制  // 不使用水平方式 
          // { name: 'volumePanel', inline: false,},
          // 全屏
          {name: 'FullscreenToggle'}
        ]
      },
```


```
.video-content{
  width: calc(100% - 80px);
  margin: 0 auto;
  background: black;
}

"video.js": "^7.4.1",
"video.js": "^7.17.0",
npm i --save @types/video.js
npm i --save video.js

yarn add @types/video.js
yarn add video.js

<!-- import videocomponent from './video-component' -->
import VideoComponent from './video-component'
      <VideoComponent>
      </VideoComponent>
```

```
    videojs("videoId", options, function onPlayerReady() {
      //@ts-ignore
      this.on("timeupdate", function() {
        /*
        let currentTime = this.currentTime();
        //计算实时时间:开始时间+已播放时间
        that.startTimeStamp = that.startTimeStamp_temp + currentTime * 1000;
        //计算播放百分比start
        that.barWidth = (currentTime / that.durations_all) * 100 + "%";
        that.durations_seconds = currentTime;
        */
      });
      //end
      this.on("loadedmetadata", function() {
        /*
        that.durations_all = this.duration();
        console.log("视频加载完毕,获取长度--->：", that.durations_all);
        //加载完先暂停
        this.pause();
        */
      });
      this.on("ended", function() {
        console.log("ended");
        // that.audioStatusType = 3;
      });
      //已经拿到视频流,可以播放
      this.on("seeked", function() {
        console.log("已经拿到视频流,可以播放");
      });
      this.on("seeking", function() {
        //正在去拿视频流的路上
        console.log("seeking");
      });
    });
```

```
  const onClickReq = async()=>{
    const url:string = `${traderApiUrl}/user/22`;
    console.log('请求',url)
    const res = await axios.get(url, {params: {id: 22}})
    console.log(res)
  }
```

```js

const barDiv = document.getElementById("barId");
// @ts-ignore      
barDiv.addEventListener("click", onBarClick2,true);


  const onBarClick2 = (e:any)=>{

    console.log('onBarClick---2:',e)
    console.log('e',e.offsetX)
    const barDiv = document.getElementById("barId");
    const barDom = e.target
    console.log('barDom.clientWidth0:',barDom)
    console.log('barDom.clientWidth1:',barDom.clientWidth)
    console.log('barDom.clientWidth2:',barDiv?.offsetWidth)
    const offsetWidth = barDiv?.offsetWidth as number
    // console.log('barDom.clientWidth2:',videoDuration)
    // console.log('barDom.clientWidth3:',myVideoObj)
    // console.log('barDom.clientWidth4:',videoDuration)
    // const duration:number = myVideoObj.duration()
    const video:videoType = videoRef?.current as unknown as videoType
    const currentTime:number= video.currentTime
    const duration:number = video.duration
    console.log('duration:',duration)
    const clickPotision = e.offsetX;
    // const computedTime = (clickPotision / barDom.clientWidth) * duration;
    const computedTime = (clickPotision / offsetWidth ) * duration;

    // myVideoObj.currentTime(computedTime)
    // myVideoObj.pause()
    // setVideoCurrent(computedTime)
    video.currentTime = computedTime

    // console.log('clickPotision1:',clickPotision)
    // console.log('barDom.clientWidth2:',barDom.clientWidth)
    console.log('设置时间----->：',computedTime)
    // console.log('1.暂停=====--->')
    // console.log('onBarClick:',e.target)
  }
```


```js
import pauseVideo from '@/images/video-img/pause_video.png'
import playVideo from '@/images/video-img/play_video.png'
import enlargeVideo from '@/images/video-img/enlarge_video.png'
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'video.js/dist/video-js.css';
import './video-component.less'

  const [videoDuration,setVideoDuration] = useState(0)
  const [videoCurrent,setVideoCurrent] = useState(0)
  const [myVideoObj,setMyVideoObj] = useState<any>()
  const [playStatus,setPlayStatus] = useState(true)
  const [hideBoard, setHideBoard] = useState<boolean>(false)

  // video 方法 start
  // video 方法 start
  const calculateBarWidth =()=>{
    let barWidth = '0px'
    if(myVideoObj){
      const currentTime:number= myVideoObj.currentTime()
      const duration:number = myVideoObj.duration()
      barWidth = (currentTime / duration) * 100 + "%"; 
    }
    return barWidth
  }

  const onPause = ()=>{
    // console.log('onPause-->',progressFlag)
    // const video:videoType = videoRef?.current as unknown as videoType
    // video.pause()
    // setPlayStatus(false)
  }

  const onPlay = ()=>{
    // console.log('onPlay-->',progressFlag)
    // const video:videoType = videoRef?.current as unknown as videoType
    // setPlayStatus(true)
    // video.play()
  }

  const onEnlarge = ()=>{
    myVideoObj.play()
    myVideoObj.requestFullscreen()
  }

  const displayTimeFomat = (val:any)=>{
    let time = parseInt(val);
    // let time = 61;
    // let time = 60;
    let minute:number = time / 60;

    let minutes = minute.toFixed(0).toString();
    if(minute<1){
      minutes = "0";
    }

    let second = time % 60;
    let seconds = Math.round(second).toString();
    if (second < 10) {
      seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
  }


  const onBarClick = (e:any)=>{
    const barDiv = document.getElementById("barId");
    const offsetWidth = barDiv?.offsetWidth as number
    const clickPotision = e.nativeEvent.offsetX;
    const computedTime = (clickPotision / offsetWidth) * videoDuration;

    myVideoObj.currentTime(computedTime)
    setVideoCurrent(computedTime)
  }
  // 隐藏div 的划入事件
  const onMouseEnterBoardHide = () => {
    console.log('2.隐藏div 的划入事件')

    setHideBoard(true)
  }

  // 隐藏div 的划出事件
  const onMouseLeaveBoardHide = () => {
    console.log('3.隐藏div 的划出事件')
    setHideBoard(false)
  }

 const initVideo=(videoUrl:string)=>{
    const myVideo =videojs('videoId',{
      // 是否显示控制条
      controls: false,
      preload: 'auto',
      autoplay: true,
      fluid: false, // 自适应宽高
      language: 'zh-CN', // 设置语言
      muted: true, // 是否静音
      sources:[
        {
            src: videoUrl,
            type: 'video/mp4',
        }
      ]
    },function onPlayerReady() {

      setMyVideoObj(this)

      let that =this

      this.on('loadeddata',function(){
        const duration:number= that.duration()
        setVideoDuration(duration)
      })

      this.on("timeupdate", function() {
        const currentTime:number= that.currentTime()
        setVideoCurrent(currentTime)
      });

      this.on("ended", function() {
        // console.log("ended");
      });

      this.on("seeked", function() {
        // console.log("已经拿到视频流");
      });
      this.on("seeking", function() {
        //正在去拿视频流的路上
        // console.log("seeking");
      });
    });
  }
  // video 方法 end
  // video 方法 end
```