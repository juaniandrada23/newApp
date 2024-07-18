import React from 'react'

const Shop = () => {
  const client = localStorage.getItem('user');
  console.log(client)
  
  return (
    <div>HI WELCOME TO SHOP</div>
  )
}

export default Shop