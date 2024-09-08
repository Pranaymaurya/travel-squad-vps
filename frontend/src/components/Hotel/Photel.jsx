import React from 'react'
import SearchItem from './searchItem'
import './Photel.css'
import Hotelview from './Hotelview'

const Photel = () => {
  return (
    <div className='flex flex-row'>
      <div className='search'></div>
      <div className='searchItems'>
        <SearchItem />
        <SearchItem />
        <SearchItem />
        <SearchItem />
        <Hotelview />
      </div>
    </div>
  )
}

export default Photel
