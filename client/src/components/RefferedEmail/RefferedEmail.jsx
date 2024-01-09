import React, { useState } from 'react';
import './RefferedEmail.scss';

const ReferredEmailForm = ({ userId, existingReferredEmail,referEmail, updateReferredEmail }) => {
    const [referredEmail, setReferredEmail] = useState(existingReferredEmail || '');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const responseMessage = await updateReferredEmail(userId, referredEmail);
        setMessage(responseMessage);
        
    };

    return (
        <div className="referred-email-form">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Referred Email</label>
                    <input 
                        type="email" 
                        value={referEmail?referEmail:referredEmail} 
                        onChange={(e) => setReferredEmail(e.target.value)} 
                        placeholder={referEmail?referEmail:referredEmail} 
                        disabled={!!existingReferredEmail}  // Disable if existingReferredEmail has a value
                    />
                </div>
                <button type="submit" disabled={!!existingReferredEmail}>Add Referred Email</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ReferredEmailForm;
