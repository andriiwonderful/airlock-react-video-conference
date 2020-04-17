import React, { Fragment } from 'react'

const JoinSelection = () => {
  return (
    <div>
      <div className="sel-title text-center">
        <h2> Join </h2>
      </div>
      <div className="sel-desc">
        <p>
          Have your friends already created a room ? Enter the name of the room
          to join it.
        </p>
      </div>
      <div className="sel-form text-center">
        <form className="form-group">
          <input placeholder="Enter room's name" className="form-control" />
          <input type="submit" className="btn btn-primary" value="Join"/>
        </form>
      </div>
    </div>
  )
}

export default JoinSelection
