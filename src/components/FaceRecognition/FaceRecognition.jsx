import React from 'react';
import './FaceRecognition.css';
const FaceRecognition = ({url, boxes}) =>{
 
    return(
        <div className="center ma">
            <div className =" absolute mt2">
            <img id='inputimage' alt='' src={url} width='500px' heigh='auto'/>
             {boxes.map(box => <div key = {box.topRow} className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div> )}
             
             {/* <div className="bounding-box" style={{top: boxes[0].topRow, right: boxes[0].rightCol, bottom: boxes[0].bottomRow, left: boxes[0].leftCol}}></div> */}
            </div>
        </div>
    )
}
export default FaceRecognition;
// {/* <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div> */}