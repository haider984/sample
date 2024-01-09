import React from 'react'
import './ConsultantProfile.scss';
import  ordericon from "../../../public/profileicons/No of orders.png";
import earningicon from "../../../public/profileicons/Total earnings.png";
import referalicon from "./../../../public/profileicons/Referral.png";
import orderComplete from "../../../public/profileicons/order.png";
function ProfileCard({user,orderCompleteValue,earnings,refercount,ordercount}) {
    const cards = [
        { title: 'No. of Order', value: ordercount, icon: orderComplete },
        { title: 'Total earnings', value: user.payment, icon: earningicon },
        { title: 'No of referral', value: refercount, icon: referalicon },
        { title: 'Orders Completed', value: orderCompleteValue, icon: ordericon }
      ];
  return (
  
      <div className="consultant-profile">
      <header>
        {user.img?<img src={user?.img} className="logo"/>
        :null}
        <h1>Profile of {user?.username}<br/><sub>Edit Personal Information</sub></h1>
        <div></div>
        
      </header>
      <div className="cards">
        {cards.map(card => (
          <div className="card" key={card.title}>
            
            <img src={card.icon} alt={card.title} width="60px" className='icon'/>
            <h2>{card.title}</h2>
            <p>{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfileCard
