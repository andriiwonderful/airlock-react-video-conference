import React, { Fragment } from 'react'

const CreateSelection = () => {
  return (
    <div>
      <div className="sel-title text-center">
        <h2> Create </h2>
      </div>
      <div className="sel-desc">
        <p>
          Do you already have a team in mind ? Choose a name and decide to go
          public or private.
        </p>
      </div>
      <div className="sel-form text-center">
          <form className="form-group">
              <input placeholder="Choose a name" className="form-control"/>
              <select className="form-control">
                <option value="1"> Public </option>
                <option value="0"> Private </option>
              </select>
              <input type="submit" className="btn btn-primary" value="Create"/>
          </form>
      </div>
    </div>
  )
}

export default CreateSelection
