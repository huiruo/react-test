import { useEffect, useState,useRef } from 'react';
import axios from 'axios'
import videojs from 'video.js';
import { traderApiUrl } from '../../services/config'
import pauseVideo from '../../assets/pause_video.png'
import playVideo from '../../assets/play_video.png'
import 'video.js/dist/video-js.css';
import './videoTest.css';

interface videoType{
  currentTime:number
  duration:number
  play: () => void;
  pause: () => void;
}

let progressFlag:number = 0

function App() {

  const [isControls,setIsControls] = useState(true)
  const [isAutoply,setIsAutoply] = useState(true)
  const [isLoop,setIsLoop] = useState(true)

  const [videoDuration,setVideoDuration] = useState(0)
  const [barWidth,setBarWidth] = useState("")
  const [videoCurrent,setVideoCurrent] = useState(0)
  const [playStatus,setPlayStatus] = useState(isAutoply)

  const [myVideoObj,setMyVideoObj] = useState<any>()

  const videoRef = useRef(null)

  const calculateBarWidth =()=>{
    // console.log('myVideoObj',myVideoObj) 
    let barWidth = '0px'
    if(myVideoObj){
      const currentTime:number= myVideoObj.currentTime()
      const duration:number = myVideoObj.duration()
      barWidth = (currentTime / duration) * 100 + "%"; 
      // console.log('barWidth',barWidth,'duration:',duration,'currentTime:',currentTime)
    }
    return barWidth
  }

  const onPause = ()=>{
    console.log('onPause-->',progressFlag)
    const video:videoType = videoRef?.current as unknown as videoType
    video.pause()
    setPlayStatus(false)
  }

  const onPlay = ()=>{
    console.log('onPlay-->',progressFlag)
    const video:videoType = videoRef?.current as unknown as videoType
    setPlayStatus(true)
    video.play()
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
    // myVideoObj.pause()
  }


  useEffect(()=>{
    setTimeout(()=>{
      const video:videoType = videoRef?.current as unknown as videoType
      console.log('视频时长0：',videoRef)
      console.log('视频时长1：',videoRef?.current)
      console.log('视频时长2：',video.duration)
      setTimeout(()=>{
        console.log('自动播放===============>')
        video.play()
      },1800)
      setVideoDuration(video.duration)
      // progressFlag = window.setInterval(getVideoProgress, 1000);
    },800) 

    const url = 'http://192.168.31.77:1788/02_招商港口.mp4'
    initVideo(url)

    return function cleanUp() { }
  },[])

 const initVideo=(videoUrl:string)=>{
    console.log("初始化url", videoUrl);

    const myVideo =videojs('videoId',{
      // 是否显示控制条
      controls: false,
      preload: 'auto',
      autoplay: true,
      fluid: false, // 自适应宽高
      language: 'zh-CN', // 设置语言
      muted: false, // 是否静音
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
          // {name: 'FullscreenToggle'}
        ]
      },
      // sources:[
      //   {
      //       src: 'http://192.168.31.77:1788/02_招商港口.mp4',
      //       type: 'video/mp4',
      //   }
      // ]
    },function onPlayerReady() {

      setMyVideoObj(this)

      let that =this

      this.on("timeupdate", function() {
        const currentTime:number= that.currentTime()
        setVideoCurrent(currentTime)
      });

      this.on("ended", function() {
        // console.log("ended");
      });

      this.on("seeked", function() {
        // console.log("已经拿到视频流,可以播放");
      });
      this.on("seeking", function() {
        //正在去拿视频流的路上
        // console.log("seeking");
      });
    });

    // myVideo.ready(function(){
    //     console.log('myVideo.ready---->',this)
    //     console.log('myVideo.ready---->',this.play)
    //     var myvideo= this;
    //     myvideo.play();
    //     const video:videoType = videoRef?.current as unknown as videoType
    //     console.log("播放1--->",videoRef)
    //     console.log("播放2--->",video.play)
    //     video.play()
    // });

  }

  return (
    <div className="video-container" style={{width:'100%'}}>
      <div>
        <video 
        id='videoId'
        ref={videoRef}
        style={{height:'100%',width:'100%'}}
        muted={true}
        controls
        loop={isLoop}
        autoPlay
        // ={isAutoply ? 'autoplay' : 'autoplay'}
        >
          <source src="http://192.168.31.77:1788/02_招商港口.mp4" type='video/mp4' /> 
        </video>
        {isControls?<div className='video-board-container'>
          <div className='video-board-content'>
              <div className='handle-content'>
                <div>
                  { playStatus?<img onClick={onPause} className='handle-img' src={pauseVideo}/>:
                    <img onClick={onPlay} className='handle-img' src={playVideo}/>
                  }
                </div>
                <div className='time-flag'>{displayTimeFomat(videoCurrent)}/{displayTimeFomat(videoDuration)}</div>
              </div>
              <div id='barId' onClick={onBarClick} className="barbg">
              {/* <div id='barId' className="barbg"> */}
                {/* <div className="cur" style={{ width: barWidth }}> */}
                <div className="cur" style={{ width: calculateBarWidth() }}>
                  {/* <span className="barflag"></span> */}
                </div>
              </div>
          </div>
        </div>:null }
      </div>
    </div>
  );
}

export default App;