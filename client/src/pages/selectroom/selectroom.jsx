import React from 'react'
import CreateSelection from '../../components/createselection'
import JoinSelection from '../../components/joinselection'
import RandomSelection from '../../components/randomselection'
import 'bootstrap/dist/css/bootstrap.css'

const SelectRoom = () => {
  return (
    <div id="select-room" className="page container">
      <div className="row section-brand text-center">
        <div className="container">
          <div className="brand">
            <span className="brand-img">
              <img src="./assets/brand-logo.png" />
            </span>
            <span className="brand-text"> Airlock</span>
          </div>
          <div className="description">
            <p>
              You are now in the air-lock. Choose a way to enter a room and
              access to the virtual party.
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <CreateSelection />
        </div>
        <div className="col-4">
          <JoinSelection />
        </div>
        <div className="col-4">
          <RandomSelection />
        </div>
      </div>
      <div className="row float-right">
        <button className="btn btn-danger">
          I just want to watch the live
        </button>
      </div>
    </div>
  )
}

export default SelectRoom
