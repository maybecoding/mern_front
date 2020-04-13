import React, { useState, useContext } from 'react'

import './PlaceItem.css'

import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button'
import Modal from '../../shared/components/UIElements/Modal'
import Map from '../../shared/components/UIElements/Map'
import { AuthContext } from '../../shared/context/auth'


const PlaceItem = props => {
  const { userId } = useContext(AuthContext)

  const [isMapOpen, setIsMapOpen] = useState(false)
  const showMapHandler = () => setIsMapOpen(true)
  const hideMapHandler = () => setIsMapOpen(false)

  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const showConfirmDelete = () => setIsConfirmOpen(true)
  const hideConfirmDelete = () => setIsConfirmOpen(false)

  const placeDeleteHandler = () => {
    hideConfirmDelete()
    props.placeDelete()
  }
  return (
    <React.Fragment>
      <Modal
        isOpen={isMapOpen}
        header={props.address}
        onCancel={hideMapHandler}
        contentClassName={'place-item__modal-content'}
        footerClassName={'place-item__modal-actions'}
        footer={<Button onClick={hideMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map location={props.location} zoom={16} />
        </div>
      </Modal>
      <Modal
        isOpen={isConfirmOpen}
        header="Are you shure?"
        footerClassName={'place-item__modal-actions'}
        onCancel={hideConfirmDelete}
        footer={<>
          <Button inverse onClick={hideConfirmDelete}>CANCEL</Button>
          <Button danger onClick={placeDeleteHandler}>DELETE</Button>
        </>}
      >
        <p>Do you want to proced and delete this place? Please note that it can't be undone thereafter.</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={showMapHandler}>VIEW ON MAP</Button>
            {userId === props.creator && <>
              <Button to={`/places/${props.id}`}>EDIT</Button>
              <Button danger onClick={showConfirmDelete}>DELETE</Button>
            </>}
          </div>
        </Card>
      </li>
    </React.Fragment >
  )

}

export default PlaceItem