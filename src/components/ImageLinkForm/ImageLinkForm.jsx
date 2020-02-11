import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onSubmit}) => {
  return (
      <div>
        <p className ="f3">This App will detect faces in your picture</p>
        <div className = 'pa4 br3 shadow-5 form center'>
          <input type ="text" className = 'w-70 f4 pa2 center' onChange = {onInputChange}/>
          <button className ='w-30 grow ph3 pv2 dib white bg-light-purple' onClick= {onSubmit}> detect</button>
        </div>
      </div>
  );
}

export default ImageLinkForm;
