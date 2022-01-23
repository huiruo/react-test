import React, { useRef, useImperativeHandle } from 'react';
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

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
							<img ref={zoomImgRef} src="https://img1.baidu.com/it/u=4175009403,3693132117&fm=26&fmt=auto" alt="test" />
						</TransformComponent>
					</React.Fragment>
				)}
			</TransformWrapper>
			*/}

			图片放大代码已注释
		</>
	);
})
export default ZoomImg;