import React, { useRef, useEffect } from 'react'

import './Map.css'

export default props => {
  const mapRef = useRef()


  // Params
  const center = [props.location.lat, props.location.lng]
    ,zoom = props.zoom

  useEffect(() => {
    // const map = 
    console.log(mapRef)
    const map = new window.ymaps.Map(mapRef.current, { center, zoom }, {
      searchControlProvider: 'yandex#search'
    })
    map.geoObjects.add(new window.ymaps.Placemark(center, {
      balloonContent: '<strong>greyish-brownish-maroon</strong> color'
    }, {
      preset: 'islands#dotIcon',
      iconColor: '#735184'
    }))

  },[center, zoom])
  
  return (
    <div
      className={`map ${props.className}`}
      style={props.style}
      ref={mapRef}
    >
    </div>
  )
}

