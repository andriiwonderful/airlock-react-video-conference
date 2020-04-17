import React, { Fragment } from 'react'

const RandomSelection = () => {
  return (
    <div>
      <div className="sel-title text-center">
        <h2> Random </h2>
      </div>
      <div className="sel-desc">
        <p>
          No friends to join ? No worries, just join a random room of unknown
          people.
        </p>
      </div>
      <div className="sel-form text-center">
        <form className="form-group">
          <input type="submit" className="btn btn-primary" value="Random" />
        </form>
      </div>
    </div>
  )
}

export default RandomSelection
