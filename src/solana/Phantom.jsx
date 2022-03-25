import React, { useState } from 'react'

const Phantom = () => {
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState('')

  const connectWallet = async () => {
    if (window.solana) {
      try {
        const res = await window.solana.connect()
        setAddress(res.publicKey.toString())
        setConnected(true)
      } catch (err) {
        console.error(`Error connecting wallet: ${err}`)
      }
    } else {
      alert('Please install Phantom wallet first!')
    }
  }

  const logout = async () => {
    if (window.solana) {
      try {
        await window.solana.disconnect()
        setAddress('')
        setConnected(false)
      } catch (err) {
        console.error(`Error disconnecting wallet: ${err}`)
      }
    } else {
      alert('Please install Phantom wallet first!')
    }
  }

  return (
    <div className="App">
      <h1>Connect Phantom Wallet</h1>
      <p>
        <strong>Status:</strong> {connected ? 'Connected' : 'Not connected'}
      </p>
      {connected && (
        <p>
          <strong>Your Address:</strong> {address}
        </p>
      )}
      {!connected ? (
        <button type="button" onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <button type="button" onClick={logout}>
          Log Out
        </button>
      )}
    </div>
  )
}

export default Phantom
