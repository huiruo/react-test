import { useEffect, useState,useRef } from 'react';
// import axios from 'axios'
// import { traderApiUrl } from '../../services/config'
import pauseVideo from '../../assets/pause_video.png'
import playVideo from '../../assets/play_video.png'
import enlargeVideo from '../../assets/enlarge_video.png'
import videojs from 'video.js';
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

  const [barWidth,setBarWidth] = useState("")

  const [videoDuration,setVideoDuration] = useState(0)
  const [videoCurrent,setVideoCurrent] = useState(0)
  const [playStatus,setPlayStatus] = useState(isAutoply)
  const [myVideoObj,setMyVideoObj] = useState<any>()
  // 操作板，默认关闭
  const [hideBoard, setHideBoard] = useState<boolean>(false)
  const [isEnlarge, setIsEnlarge] = useState<boolean>(false)

  const videoRef = useRef(null)

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

  const onEnlarge = ()=>{
    console.log('全屏')

    myVideoObj.play()
    myVideoObj.requestFullscreen()
    /*
    if(!isEnlarge){
      setIsEnlarge(true)
      const el = document.documentElement;

      // @ts-ignore
      const rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;      
          if(typeof rfs != "undefined" && rfs) {
              rfs.call(el);
      };
      return;
    }else{
      setIsEnlarge(false)
      if (document.exitFullscreen) {  
        document.exitFullscreen();  
        // @ts-ignore
      }else if (document.mozCancelFullScreen) {  
              // @ts-ignore
          document.mozCancelFullScreen();  
                // @ts-ignore
      }else if (document.webkitCancelFullScreen) {  
              // @ts-ignore
          document.webkitCancelFullScreen();  
                // @ts-ignore
      }else if (document.msExitFullscreen) {  
              // @ts-ignore
          document.msExitFullscreen();  
      } 
      // @ts-ignore
      if(typeof cfs !== "undefined" && cfs) {
        // @ts-ignore
          cfs.call(el);
      }
    }
    */
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


  useEffect(()=>{

    const url = 'http://172.16.53.113:1788/02_招商港口.mp4'
    initVideo(url)

    return function cleanUp() { }
  },[])

  return (
    // <div className="video-container" style={{width:'100vw',height:'100vh'}}>
    <div className="video-container">
      {/* <div style={{width:'100%',height:'100%'}}> */}
      <div>
        <video 
        id='videoId'
        ref={videoRef}
        style={{height:'100%',width:'100%'}}
        muted
        controls
        loop={isLoop}
        autoPlay
        // ={isAutoply ? 'autoplay' : 'autoplay'}
        >
          {/* <source src="" type='video/mp4' />  */}
        </video>
        {isControls?
        <div 
          onMouseEnter={() => onMouseEnterBoardHide()}
          onMouseLeave={() => onMouseLeaveBoardHide()}
          className='video-board-container'>
          {hideBoard?
            <div className='video-board-content'>
                <div className='handle-container'>
                  <div className='handle-content'>
                    <div>
                      { playStatus?<img onClick={onPause} className='handle-img' src={pauseVideo}/>:
                        <img onClick={onPlay} className='handle-img' src={playVideo}/>
                      }
                    </div>
                    <div className='time-flag'>{displayTimeFomat(videoCurrent)}/{displayTimeFomat(videoDuration)}</div>
                  </div>
                  <div><img onClick={onEnlarge} className='handle-img' src={enlargeVideo}/></div>
                </div>
                <div id='barId' onClick={onBarClick} className="barbg">
                  <div className="cur" style={{ width: calculateBarWidth() }}>
                    {/* <span className="barflag"></span> */}
                  </div>
                </div>
            </div>:
          <div className='video-float-layer-hide'></div>}
        </div>:null }
      </div>
    </div>
  );
}

export default App;