import React from 'react';
import avatar from '../images/avatar.png';
import './profile.css';
import Donut from '../charts/PieChart';
const Profile = () => {
  return (
    <div className='profile'>
      <div className="left_profile">
        <ul>
            <li>Name</li>
            <li>Points</li>
            <li>Date Joined</li>
        </ul>
        <img src={avatar} alt="User Avatar" />
      </div>
      <div className="right_profile">
        <Donut/>
      </div>
    </div>
  )
}

export default Profile;