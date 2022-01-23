import React, { useRef, useImperativeHandle } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const ZoomImg = React.forwardRef((props, ref) => {
	const zoomImgRef = useRef<any>('');
	const transformZoomRef = useRef<any>('');
	useImperativeHandle(ref, () => ({
		getZoomImg: () => {
			console.log("getZoomImg-->", props,zoomImgRef.current)
			console.log("transformZoomRef-->", transformZoomRef)
			return zoomImgRef.current
		},
		getTransformZoom: () => {
			return transformZoomRef.current
		}
	}));
	return (
		<>
			{/*  
			<TransformWrapper
				onZoom={function noRefCheck() {
					console.log("ref:", zoomImgRef.current)
				}}
				// onZoomStart={function noRefCheck() { }}
				// onZoomStop={function noRefCheck() { }}
				// onInit={function noRefCheck() { }}
				// onPanning={function noRefCheck() { }}
				// onPanningStart={function noRefCheck() { }}
				// onPanningStop={function noRefCheck() { }}
				// onPinching={function noRefCheck() { }}
				// onPinchingStart={function noRefCheck() { }}
				// onPinchingStop={function noRefCheck() { }}
				// onWheel={function noRefCheck() { }}
				// onWheelStart={function noRefCheck() { }}
				// onWheelStop={function noRefCheck() { }}
				//
				initialScale={0.5}
				centerOnInit={true}
				maxScale={2}
				minScale={0.5}
				doubleClick={{ step: 0.7, disabled: false, excluded: [], }}
				panning={{ disabled: false, excluded: [] }}
				wheel={{ disabled: false, step: 0.2, activationKeys: [], excluded: [], touchPadDisabled: false, }}
			>
				<TransformComponent wrapperStyle={{ background: "rgba(0, 0, 0, 0.3)", maxWidth: '80vw', maxHeight: '80vh' }}>
					<img ref={zoomImgRef} src="https://prc5.github.io/react-zoom-pan-pinch/static/media/medium-image.12ec4e94.jpg" alt="test" />
				</TransformComponent>
			</TransformWrapper>
			*/}
			<TransformWrapper
				ref={transformZoomRef}
				initialScale={0.4}
				centerOnInit={true}
				maxScale={2}
				minScale={0.5}
				doubleClick={{ step: 0.7, disabled: false, excluded: [], }}
				panning={{ disabled: false, excluded: [] }}
				wheel={{ disabled: false, step: 0.2, activationKeys: [], excluded: [], touchPadDisabled: false, }}
			>
				{({ zoomIn, zoomOut, resetTransform, ...rest }) => (
					<React.Fragment>
						<div className="tools">
							<button onClick={() => zoomIn()}>+</button>
							<button onClick={() => zoomOut()}>-</button>
							<button onClick={() => resetTransform()}>x</button>
						</div>
						<TransformComponent wrapperStyle={{ background: "rgba(0, 0, 0, 0.3)", maxWidth: '80vw', maxHeight: '80vh' }}>
							{/* <img ref={zoomImgRef} src="https://prc5.github.io/react-zoom-pan-pinch/static/media/medium-image.12ec4e94.jpg" alt="test" /> */}
							{/* <img ref={zoomImgRef} src="https://cn.bing.com/th?id=OHR.ProseccoHills_ZH-CN3931715664_1920x1200.jpg&rf=LaDigue_1920x1200.jpg" alt="test" /> */}
							<img ref={zoomImgRef} src="https://img1.baidu.com/it/u=4175009403,3693132117&fm=26&fmt=auto" alt="test" />
						</TransformComponent>
					</React.Fragment>
				)}
			</TransformWrapper>
		</>
	);
})
export default ZoomImg;