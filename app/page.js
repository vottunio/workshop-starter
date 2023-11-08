'use client';

import Head from 'next/head';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [inputWallet, setInputWallet] = useState('');
  const [metadata, setMetadata] = useState(null);

  const handleClaimPoap = async () => {   
    await claimPoapFromApi();
  }

  const handleGetPoapDetails = async () => {  
    const uri = await getTokenUriFromApi();
    await getMetadata(uri);
  }

  const claimPoapFromApi = async () => {
    const response = await fetch('/api/claim', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({inputWallet})
    });
    return response.json();
  }

  const getTokenUriFromApi = async () => {
    const response = await fetch('/api/details', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const {uri} = await response.json();
    return uri;
  }

  const getMetadata = async (uri) => {
    var config = {
      method: 'get',
      url: uri,
      headers: {
        'Content-Type': 'application/json'
      },
    };
    const response = await axios(config);

    setMetadata(response.data);
  }

  const handleInputChange = (event) => {
    setInputWallet(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>Vottun Workshop</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Welcome to the Vottun workshop</h1>
          </div>
          <div className="header-subtitle">
            <h2>Claim your poap in order to showcase what you learned today!</h2>
          </div>
        </div>
        <button className="claim-button" onClick={handleGetPoapDetails}>
            View metadata
          </button>
          {metadata &&
            <div className='view-metadata'>
              <div className='metadata'>
                <div className='metadata-text'>
                  <p style={{fontWeight: 'bold'}}>Name:</p>
                  <p>{metadata.name}</p>
                  <p style={{fontWeight: 'bold'}}>Description:</p>
                  <p>{metadata.description}</p>
                </div>
                <img src={metadata.image} width={'180px'}/>
              </div>
              <div className='form'>
                <input
                  className='input'
                  type="text"
                  value={inputWallet}
                  onChange={handleInputChange}
                  placeholder="Enter your wallet address..."
                />
                <button className="claim-button" onClick={handleClaimPoap}>
                  Claim
                </button>
              </div>
            </div>
          }
      </div>
    </div>
  );
}
