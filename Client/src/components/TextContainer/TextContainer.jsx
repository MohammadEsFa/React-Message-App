import React from 'react';

import onlineIcon from '../../Icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div className='headerContainer'>
      <h3>Chat Court <span role="img" aria-label="emoji">💬</span><span role="img" aria-label="emoji">❤️</span></h3>
    </div>
    {
      users
        ? (
          <div className='userContainer'>
            <h4 style={{color:'black'}}>People currently chatting</h4>
            <div className="activeContainer">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;