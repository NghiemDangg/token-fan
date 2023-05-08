import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiWallet, BiCoinStack } from 'react-icons/bi';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { data } from '../../store';
import './WalletCard.css';
import {VFC} from '../../config/contract';

function WalletCard({ vfcToken }) {
    const auth = JSON.parse(localStorage.getItem('auth'));
    const [userAccount, setUSerAccount] = useState('');
    const [userBalance, setUserBalance] = useState('0');
    const [errorMessage, setErrorMessage] = useState(null);
    const [balanceToken, setBalanceToken] = useState(null);

    const navigate = useNavigate();

    const accountChangedHandler = (newAccount) => {
        setUSerAccount(newAccount);
        data.address = newAccount;
        getUserBalance(newAccount.toString());
        getBalanceToken(newAccount.toString());
    };

    const getUserBalance = (address) => {
        window.ethereum.request({ method: 'eth_getBalance', params: [address, 'latest'] }).then((balance) => {
            setUserBalance(ethers.utils.formatEther(balance));
        });
    };

    const getBalanceToken = (address) => {
        VFC.balanceOf(address).then((balance) => {
            setBalanceToken(ethers.utils.formatEther(balance));
        });
    };

    const onClickHandler = () => {
        if (auth && auth.user) {
            if (window.ethereum) {
                window.ethereum.request({ method: 'eth_requestAccounts' }).then((result) => {
                    accountChangedHandler(result[0]);
                    toast.success('Successful connect to wallet !', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                });
            } else {
                setErrorMessage('Install Metamask');
                alert(errorMessage);
            }
        } else {
            if (window.confirm('You must login if you want to continue')) navigate('/login');
            else return;
        }
    };

    const chainChangedHandler = () => {
        window.location.reload();
    };

    window.ethereum.on('accountChanged', accountChangedHandler);

    window.ethereum.on('chaiChanged', chainChangedHandler);

    return (
        <div className="wallet-card">
            <div className="wallet-card-header">
                <h3 className="wallet-card-title">Your e-wallet</h3>
                <div className="wallet-card-button" onClick={onClickHandler}>
                    <BiWallet />
                </div>
            </div>
            <div className="wallet-card-body">
                <div className="wallet-card-address">
                    <h4>Address: {userAccount}</h4>
                </div>
                <div className="wallet-card-balance">
                    <h4>
                        Balance ETH: {userBalance} <BiCoinStack />
                    </h4>
                </div>
                <div className="wallet-card-balance">
                    <h4>
                        Balance VFC Token: {balanceToken} <BiCoinStack />
                    </h4>
                </div>
                <img src="https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png" alt="" />
            </div>
        </div>
    );
}

export default WalletCard;
