import React, { useEffect, useState } from 'react'
import { Connection, Transaction, clusterApiUrl } from '@solana/web3.js'

const Phantom = () => {
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState('')
  const [message, setMessage] = useState('')
  const [messageSignature, setMessageSignature] = useState('')
  const [sendAmount, setSendAmount] = useState(0)
  const [txHash, setTxHash] = useState('')

  // @TODO:
  // 0.) Read user's SOL balance & display it on the screen
  // 1.) Add input for the send amount
  // 2.) Send SOL programmatically via Phantom wallet
  // 3.) Link to tx hash on solscan after tx is confirmed
  // 4.) BONUS: Any random smart contract interaction
  //  --> examples: mint NFT, approve & send USDC, swap SOL for USDC (advanced examples: stake SOL, deposit SOL as collateral, borrow USDC against SOL, etc.)

  // Define Global Variables
  const network = clusterApiUrl('testnet')
  const connection = new Connection(network)
  const toAddress = 'F6dxmXKz5kRC1MdsqcFNbnEFEP9wRcMJmD3fqgszfhux'

  // 1.) Detecting the Provider
  const getProvider = () => {
    if (window.solana) {
      const provider = window.solana

      if (provider.isPhantom) {
        console.log({ provider })
        return provider
      }
    } else {
      window.open('https://phantom.app', '_blank')
    }
  }

  // 2.) Establishing a Connection
  const connect = async () => {
    try {
      const res = await window.solana.connect()
      const currentAddress = res.publicKey.toString()

      setAddress(currentAddress)
      setConnected(true)
    } catch (error) {
      console.error(error)
    }
  }

  const disconnect = async () => {
    try {
      await window.solana.disconnect()
    } catch (error) {
      console.error(error)
    }
  }

  // 3.) Sending a Transaction
  const sendTransaction = async () => {
    try {
      const transaction = new Transaction()
      const { signature } = await window.solana.signAndSendTransaction(
        transaction,
      )
      await connection.confirmTransaction(signature)
    } catch (error) {
      console.error(error)
    }
  }

  // 4.) Signing a Message
  const signMessage = async () => {
    try {
      const encodedMessage = new TextEncoder().encode(message)
      const signedMessage = await window.solana.signMessage(
        encodedMessage,
        'utf8',
      )
      setMessageSignature(signedMessage.signature.toString())
      setMessage('')
    } catch (error) {
      console.error(error)
    }
  }

  // 5.) Displaying Tokens & NFTs
  // SPL Tokens: address, symbol (on-chain), name (on-chain), logoUri, extensions.coingeckoId
  // NFTs: name (on-chain), symbol (on-chain), uri (on-chain), creators (on-chain), other metadata (compatible with the OpenSea NFT metadata standard)

  // 6.) Displaying Your App
  // Phantom finds this info automatically:
  // Title = innerHTML of the title tag (<title>My App</title>)
  // Favicon = <link rel="icon" href="./favicon.ico" />

  useEffect(() => {
    connected &&
      window.solana
        .connect({ onlyIfTrusted: true })
        .then((data) => {
          console.log('Eagerly connecting', { data })
        })
        .catch((error) => console.error(error))
  }, [connected])

  return (
    <div
      style={{
        marginTop: '40px',
        textAlign: 'center',
      }}
    >
      <h1>Phantom Wallet Docs</h1>
      <button type="button" onClick={getProvider}>
        Get Provider
      </button>
      <br /> <br />
      {connected ? (
        <button type="button" onClick={disconnect}>
          Log Out
        </button>
      ) : (
        <button type="button" onClick={connect}>
          Connect Wallet
        </button>
      )}
      {connected ? (
        <p>
          <strong>Your Address: </strong>
          {address}
        </p>
      ) : (
        <>
          <br />
          <br />
        </>
      )}
      <input
        type="text"
        autoComplete="off"
        placeholder="Message"
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <button type="button" onClick={signMessage}>
        Sign Message
      </button>
      {messageSignature !== '' ? (
        <p>
          <strong>Message Signature: </strong> {messageSignature}
        </p>
      ) : (
        <>
          <br />
          <br />
        </>
      )}
      <button type="button" onClick={sendTransaction}>
        Send Transaction
      </button>
    </div>
  )
}

export default Phantom
