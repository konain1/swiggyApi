import React from 'react'
import { CDN_URL } from './utils/utils'
function Cards({restaurant}) {
  return (
    <>

 
    <h1>Api swiggy</h1>
    <div className='card'>
      {
        restaurant?.map((res)=>(
          <div key={res.info.id} className='cards'>
            <div className='top'>
            <img src={CDN_URL+res.info.cloudinaryImageId} alt='restaurantImage'></img>

            </div>
            <div className='dw'>
                <h1>{res.info.name}</h1>
                <h3>{res.info.cuisines.join(",")}</h3>
            </div>
          </div>
        ))
      }
    </div>
    </>
  )
}

export default Cards