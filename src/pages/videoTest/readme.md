
```
.video-content{
  width: calc(100% - 80px);
  margin: 0 auto;
  background: black;
}

"video.js": "^7.4.1",
"video.js": "^7.17.0",
npm i --save-dev @types/video.js

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