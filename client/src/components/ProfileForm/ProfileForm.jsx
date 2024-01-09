import React from 'react';
import './ProfileUpdate.scss';

const ProfileForm = ({ user, handleChange, updateUser, setFile }) => {
  return (
    <div className="profile-form">
      <form onSubmit={updateUser}>
        <div className="input-group">
          <label>Phone Number</label>
          <input 
            type="text" 
            name="phone"
            value={user.phone || ''} 
            onChange={handleChange} 
            placeholder="Phone Number" 
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input 
            type="email"
            name="email"
            value={user.email || ''} 
            onChange={handleChange} 
            placeholder="Email" 
          />
        </div>
        <div className="input-group">
          <label>Description</label>
          <textarea 
            name="desc"
            value={user.desc || ''}
            onChange={handleChange}
            placeholder="Description"
          ></textarea>
        </div>
        <div className="input-group">
          <label>Country</label>
          <input 
            type="text" 
            name="country"
            value={user.country || ''} 
            onChange={handleChange} 
            placeholder="Country" 
          />
        </div>
        <div className="input-group">
          <label>Profile Picture</label>
          <input 
            type="file" 
            onChange={(e) => setFile(e.target.files[0])} 
          />
          {user.img && <img src={user.img} className="profileImage" alt="profile image" />}
        </div>
        <div className="button-group">
          <button className="update-btn" type="submit">Update Profile</button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;
