//LinkedIn - User Profile Details
//Twitter Follow Check Finquarium

import { useState } from 'react';
import QRCode from 'react-qr-code';
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk';
 
function ReclaimDemo() {

  // State to store the verification request URL
  const [requestUrl, setRequestUrl] = useState('');
  const [proofs, setProofs] = useState([]);
 
  const getVerificationReq = async () => {

    // Your credentials from the Reclaim Developer Portal
    // Replace these with your actual credentials

    const APP_ID = '0x33B39eC61A9D576D6ee1Aa8CF772128EdeB30065';
    const APP_SECRET = '0x75c6c10219444271b0fe027afb8671ddc812f2b22b663c7bc00cef08ba7a068f';
    const PROVIDER_ID = '71901e6a-0548-414f-affb-c60d66e9648g';
 
    // Initialize the Reclaim SDK with your credentials
    const reclaimProofRequest = await ReclaimProofRequest.init(APP_ID, APP_SECRET, PROVIDER_ID);
 
    // Generate the verification request URL
    const requestUrl = await reclaimProofRequest.getRequestUrl();

    console.log('Request URL:', requestUrl);

    setRequestUrl(requestUrl);
 
    // Start listening for proof submissions
    await reclaimProofRequest.startSession({

      // Called when the user successfully completes the verification
      onSuccess: (proofs) => {

        console.log('Verification success', proofs);
        setProofs(proofs);

        // Add your success logic here, such as:
        // - Updating UI to show verification success
        // - Storing verification status
        // - Redirecting to another page
      },
      // Called if there's an error during verification
      onError: (error) => {

        console.error('Verification failed', error);
 
        // Add your error handling logic here, such as:
        // - Showing error message to user
        // - Resetting verification state
        // - Offering retry options
      },
    });
  };
 
  return (
    <>
      <button onClick={getVerificationReq}>Check Twitter Follower</button>

      {/* Display QR code when URL is available */}

      {requestUrl && (
        <div style={{ margin: '20px 20px' }}>
          <QRCode value={requestUrl} />
        </div>
      )}

      {proofs && (
        <div>
          <h2>Verification Successful!</h2>
          <pre>{JSON.stringify(proofs, null, 2)}</pre>
        </div>
      )}
    </>
  );
}
 
export default ReclaimDemo;
