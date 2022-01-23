import { useEffect, useState,useRef } from 'react';
import axios from 'axios'
import { traderApiUrl } from '../../services/config'
import pauseVideo from '../../assets/pause_video.png'
import playVideo from '../../assets/play_video.png'
import './videoTest.css';
/*
192.168.31.77

target:"http://192.168.31.77:1788",

http://192.168.31.77:1788/user/22
*/

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

  const videoRef = useRef(null)


  const getVideoProgress =(current:number)=>{
    const video:videoType = videoRef?.current as unknown as videoType
    const currentTime:number= video.currentTime
    const duration:number = video.duration
    // if(isInit){
    //   setVideoDuration(duration)
    //   setVideoCurrent(currentTime)
    //   const barWidth = (currentTime / duration) * 100 + "%";
    //   setBarWidth(barWidth)
    // }
    if(currentTime>=duration){
      console.log('播放完毕====>') 
    }

    onPlayUtil()

    setVideoDuration(duration)
    setVideoCurrent(currentTime)
    const barWidth = (currentTime / duration) * 100 + "%";
    setBarWidth(barWidth)
    console.log('getVideoProgress=======>','currentTime:',currentTime,'duration:',duration)
    // if(true){
    // console.log("currentTime:",currentTime,'duration:',duration)
    // }else{
    //   console.log('播放完毕----->')
    // }
  }

  const onClickReq = async()=>{
    const url:string = `${traderApiUrl}/user/22`;
    console.log('请求',url)
    const res = await axios.get(url, {params: {id: 22}})
    console.log(res)
  }

  const onPause = ()=>{
    console.log('onPause-->',progressFlag)
    const video:videoType = videoRef?.current as unknown as videoType
    video.pause()
    setPlayStatus(false)
    clearInterval(progressFlag)
  }

  const onPlay = ()=>{
    console.log('onPlay-->',progressFlag)
    const video:videoType = videoRef?.current as unknown as videoType
    video.play()
    setPlayStatus(true)
    progressFlag = window.setInterval(getVideoProgress, 1000);
  }

  const onPlayUtil = ()=>{
    console.log('onPlay-onPlayUtil->',progressFlag)
    const video:videoType = videoRef?.current as unknown as videoType
    video.play()
    setPlayStatus(true)
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

    if(progressFlag){
      console.log('---->关闭',progressFlag)
      clearInterval(progressFlag)
    }

    // 关闭
    onPause()

    const barDom = e.target
    const clickPotision = e.nativeEvent.offsetX;
    const computedTime = (clickPotision / barDom.clientWidth) * videoDuration;

    // console.log('onBarClick:',e)
    // console.log('clickPotision1:',clickPotision)
    // console.log('computedTime:',computedTime)

    // const video = videoRef?.current
    const video:videoType = videoRef?.current as unknown as videoType
    video.currentTime = computedTime
    setVideoCurrent(computedTime)
    setBarWidth(clickPotision + "px")

    window.setTimeout(()=>{
      progressFlag = window.setInterval(getVideoProgress, 1000);
    },800)
  }

  useEffect(()=>{
    setTimeout(()=>{
      const video:videoType = videoRef?.current as unknown as videoType
      console.log('视频时长0：',videoRef)
      console.log('视频时长1：',videoRef?.current)
      console.log('视频时长2：',video.duration)
      setVideoDuration(video.duration)

      if(progressFlag){
        clearInterval(progressFlag)
      }

      progressFlag = window.setInterval(getVideoProgress, 1000);
    },800) 

    return function cleanUp() {
      if(progressFlag){
        clearInterval(progressFlag)
      }
    }
  },[])

  return (
    <div className="video-container" style={{width:'100%'}}>
      <div>
        <video 
        ref={videoRef}
        style={{height:'100%',width:'100%'}}
        src='http://192.168.31.77:1788/02_招商港口.mp4'
        muted={true}
        controls
        loop={isLoop}
        autoPlay
        // ={isAutoply ? 'autoplay' : 'autoplay'}
        />
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
              <div onClick={onBarClick} className="barbg">
                <div className="cur" style={{ width: barWidth }}>
                  <span className="barflag"></span>
                </div>
              </div>
          </div>
        </div>:null }
      </div>
    </div>
  );
}

export default App;