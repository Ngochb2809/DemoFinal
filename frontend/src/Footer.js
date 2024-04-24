import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FaFacebook, FaInstagramSquare, FaTiktok, FaYoutubeSquare,FaEnvelopeSquare } from "react-icons/fa";

library.add(fab);

export default function Footer() {
    return (
        <footer>
            <div className="company-info">
                <h4>Your Company Name</h4>
                <p>Company Address</p>
                <p>Tax ID: Your Tax ID</p>
                <p>Email: your@email.com</p>
                <p>Hotline: Your Hotline</p>
                <p>Address: Your Address</p>
                <p>Transaction Office: Your Transaction Office</p>
            </div>
            <div className="links">
                <ul>
                    <li><a href="#">Portfolio</a></li>
                    <li><a href="#">Hidden Map</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Contact</a></li>
                    <div className="social-media">
                        <h4>Social Media</h4>
                        <ul>
                            <li><a href=""><FaFacebook /></a></li>
                            <li><a href=""><FaInstagramSquare /></a></li>
                            <li><a href=""><FaTiktok /></a></li>
                            <li><a href=""><FaYoutubeSquare /></a></li>
                            <li><a href="#"><FaEnvelopeSquare /></a></li>
                        </ul>
                    </div>
                </ul>
            </div>
        </footer>
    );
}
