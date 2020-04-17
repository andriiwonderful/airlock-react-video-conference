import React from 'react'
import './loginroom.scss'
const LoginRoom = () => {
  return (
    <div className="container text-center">
      <div className="logo">
        <img src="./assets/login-logo.png" />
        <h4 className="text"> SQUAREPARTY</h4>
      </div>
      <div className="mt-5">
        <form className="form">
          <div className="form-group login-form">
            <input name="access_code" id="access-code" className="form-control" placeholder="Access Code"/>
            <input type="submit" className="btn btn-primary" value="LOGIN"/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginRoom
