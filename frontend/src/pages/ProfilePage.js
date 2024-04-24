import React from 'react';
import { FaUser, FaCog, FaBell, FaLock, FaQuestionCircle } from 'react-icons/fa';
export default function ProfilePage() {
    return (
        <div class = "user-profile">
            <div className="profile-container">
                <div className="setting-bar">
                    <div className="setting-item"><FaCog /> Edit Profile</div>
                    <div className="setting-item"><FaBell /> Notifications</div>
                    <div className="setting-item"><FaLock /> Security</div>
                    <div className="setting-item"><FaQuestionCircle /> Help</div>
                </div>
                <div className="user-info">
                    <div className="username"><FaUser /> Ngoc123</div>
                    <div className="user-level">Level 5</div>
                </div>
            </div>
        </div>
    )

}
