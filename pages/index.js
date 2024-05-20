import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/ColorMarket.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  // const [balance, setBalance] = useState(undefined);
  const [cart, setCart] = useState([]);
  const [creditLimit, setCreditLimit] = useState(undefined);
  const [availableColors, setAvailableColors] = useState([]);
 const colour=["","Red","Green","Blue","Green","Purple"];
 const price=[0,0.001,0.002,0.003,0.004,0.005];
  const contractAddress = "0x01333D18c647493B99a00AC28aa971a44Aae875e";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      getATMContract(accounts[0]);
    } else {
      setAccount(undefined);
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);
  };

  const getATMContract = (account) => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
    // getBalance(atmContract);
    // getCreditLimit(atmContract, account);
    // fetchAvailableColors(atmContract);
  };

  // const getBalance = async (atmContract) => {
  //   if (atmContract) {
  //     setBalance((await atmContract.getTotal()).toNumber());
  //   }
  // };

  // const getCreditLimit = async (atmContract, account) => {
  //   if (atmContract && account) {
  //     try {
  //       console.log("Fetching credit limit for account:", account);
  //       const limit = await atmContract.methods.colorCredit(account).call();
  //       console.log("Credit limit fetched:", limit.toString());
  //       setCreditLimit(limit.toString());
  //     } catch (error) {
  //       console.error("Error fetching credit limit:", error);
  //       alert(`Error fetching credit limit: ${error.message}`);
  //     }
  //   } else {
  //     console.error("ATM contract or account is undefined");
  //   }
  // };

  const creditlimit = async () => {
    if (atm) {
      let limit = prompt("Enter the credit limit");
      const tx = await atm.setCreditLimit(limit);
      await tx.wait();
      setCreditLimit(limit);
    }
  };

  // const fetchAvailableColors = async (atmContract) => {
  //   try {
  //     console.log("Fetching available colors...");
  //     const colors = await atmContract.listAvailableColors();
  //     console.log("Colors fetched:", colors);
  //     setAvailableColors(colors);
  //   } catch (error) {
  //     console.error("Error fetching colors:", error);
  //   }
  // };

  const buyColor = async () => {
    try {
      if (!atm || !account) return;
  
      let colorIndex = prompt("Enter the color index");
      colorIndex = parseInt(colorIndex); 
      let ethprice=price[colorIndex].toString();
      
      const tx = await atm.buyColor(colorIndex, { value: ethers.utils.parseEther(ethprice) });
      await tx.wait();
      
      // Get the color bought
      const color = colour[colorIndex];
      console.log(color);
      
      const newCart = [...cart, color];
      setCart(newCart);
  
      
      alert(`Successfully bought ${color}`);
      setCreditLimit(creditLimit-(price[colorIndex]*10000));
      
      
      
    } catch (error) {
      console.error("Error buying color:", error);
      alert("Error buying color. Please check the console for details.");
    }
  };

  const withdrawFunds = async () => {
    if (atm) {
      try {
        
        const tx = await atm.withdraw();
        await tx.wait(); 
        alert('Withdrawn Successfully!');
    
      } catch (error) {
        console.error("Error withdrawing funds:", error);
       
      }
    }
  };
  
  

  // const handleColorClick = async (colorIndex) => {
  //   await buyColor(colorIndex);
  // };

  // const renderColorButtons = () => {
  //   if (!availableColors.length) return null;

  //   return availableColors.map((color, index) => (
  //     <button key={index} onClick={() => handleColorClick(index)}>
  //       {ethers.utils.parseBytes32String(color)}
  //     </button>
  //   ));
  // };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask in order to use this.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Please connect your MetaMask wallet</button>;
    }

    return (
      <div>
        <p>User's Account: {account}</p>
        {/* <p>Total: </p> */}
        <p>Credit Limit: {creditLimit}</p>
        <h2>The Available Colors are:</h2>
        <h3>1.Red , 2.Green, 3.Blue, 4.Yellow, 5.Purple</h3>
        <h4 style={{color:'red'}}>The Credits required for Red(10),Green(20),Blue(30),Green(40),Purple(50)</h4>
        <button onClick={creditlimit}>Set Credit Limit</button>
        <button onClick={buyColor}>Buy Color</button>
        <button onClick={withdrawFunds}>Withdraw</button>
        <div>
          <h2>Cart</h2>
          <ul>
            {cart.map((color, index) => (
              <li key={index}>{color}</li>
            ))}
          </ul>
        </div>
          
        {/* <div>
          <h2>Available Colors</h2>
          {renderColorButtons()}
        </div> */}
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Color Market</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
          background-color: pink;
          border: 8px solid yellow;
        }
        
      `}</style>
    </main>
  );
}
