import React from 'react'
import { decodeToken } from "react-jwt";


export default function Profile() {

  const token = localStorage.getItem("token")
  const user = decodeToken(token);
  console.log(user);

  return (
    <div>
        hello {user.username}
    </div>
  )
}
