import React from 'react';
import './TermsAndConditions.scss';

function PrivacyPolicy() {
    return (
        <div className="terms-container">
            <div className="header">
                <h2>Terms and Conditions</h2>
            </div>
            <div className="content">
                <section className="introduction">
                    <h3>Introduction</h3>
                    <p>Welcome to StuAdvisors, the academic freelancing platform by ReebCode. Please read these terms and conditions carefully before using our services. By using StuAdvisors, you agree to abide by these terms and conditions. If you do not agree with any part of these terms, please refrain from using our platform.</p>
                </section>
                <section className="user-responsibilities">
                    <h3>User Responsibilities</h3>
                    <ul>
                        <li>You must be at least 18 years old to use our platform.</li>
                        <li>Users are responsible for the accuracy of the information they provide.</li>
                        <li>Users agree not to engage in any illegal or harmful activities on the platform.</li>
                        <li>Respect intellectual property rights and adhere to our community guidelines</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
