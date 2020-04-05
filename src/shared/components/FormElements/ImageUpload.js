import React, { useRef, useState } from 'react'

import Button from './Button'
import './ImageUpload.css'

const ImageUpload = ({ id, center, onInput }) => {

  const filePickerRef = useRef()
  const [imageUrl, setImageUrl] = useState()

  const pickImageHandler = () => {
    filePickerRef.current.click()
  }
  const pickedHandler = event => {
    // console.log(event.target.value)
    // console.log(event.target.files[0])
    if (event.target.files && event.target.files.length === 1) {
      const file = event.target.files[0]
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        setImageUrl(fileReader.result)
        onInput(id, file, true)
      })
      fileReader.readAsDataURL(file)
    }

  }

  return (
    <div className="form-control">
      <input
        type="file"
        style={{display:'none'}}
        id={id}
        accept=".jpg,.jpeg,.png"
        ref={filePickerRef}
        onChange={pickedHandler}
      />
      <div className={`image-upload ${center && 'center'}`}>
        {imageUrl && <div className="image-upload__preview">
          <img src={imageUrl} alt="Preview"/>
        </div>}
        <Button type="button" onClick={pickImageHandler}>PICK IMAGE</Button>
      </div>
    </div>
  )
}
export default ImageUpload