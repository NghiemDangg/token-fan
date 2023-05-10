import WalletCard from '../../components/WalletCard/WalletCard';
import React, { useState } from 'react';
import { ethers, utils } from 'ethers';
import { toast } from 'react-toastify';
import { data } from '../../store';
import { VFC } from '../../config/contract';
import { Web3Provider } from '@ethersproject/providers';
import classes from './ClaimPage.module.css';

const ClaimPage = () => {
    const [claimCode, setClaimCode] = useState('');
    const [email, setEmail] = useState('');
    const [emailHash, setEmailHash] = useState('');

    function verifyEmail(email) {
        var re = /\S+@\S+\.\S+/;
        const suffix = '@vietis.com.vn';
        if (email.indexOf(suffix, email.length - suffix.length) === -1) {
            return false;
        }
        return re.test(email);
    }

    const emailHashHandler = () => {
        if (!data.address) {
            toast.error('You must connect to Metamask wallet to execute !', {
                position: toast.POSITION.TOP_RIGHT,
            });
        } else if (claimCode) {
            toast.error('You already have Claim Code !', {
                position: toast.POSITION.TOP_RIGHT,
            });
        } else if (!verifyEmail(email)) {
            toast.error('Email must have domain name "@vietis.com.vn" !', {
                position: toast.POSITION.TOP_RIGHT,
            });
        } else {
            const emailHash = ethers.utils.hashMessage(email);
            setEmailHash(emailHash);
            const claimCode = ethers.utils.keccak256(emailHash);
            setClaimCode(claimCode);
        }
    };

    const getClaimToken = async () => {
        if (email === '') {
            toast.error('Must have an email address !', {
                position: toast.POSITION.TOP_RIGHT,
            });
        } else {
            //get address account
            const provider = new Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const VFCWithSigner = VFC.connect(signer);
            // call function abi employeesClaim with emailsHash and signature
            const claim = await VFCWithSigner.employeesClaim(emailHash, claimCode)
                .then(() => {
                    toast.success('Claim successful !', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    setClaimCode('');
                })
                .catch((err) => {
                    const messageError = err.error.message;
                    toast.error(`${messageError} !`, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    setClaimCode('');
                });
        }
    };
    return (
        <div>
            <div className={classes.connect_wallet}>
                <h2 style={{ textAlign: 'center' }}>Connect Metamask Wallet</h2>
            </div>
            <section>
                {/* <WalletCard /> */}
                <div className={classes.block_input}>
                    <div className={classes.input_line}>
                        <input
                            type="text"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <button onClick={emailHashHandler}>Get Claim Code</button>
                    </div>

                    <div className={classes.input_line}>
                        <p className={classes.claim_code}>
                            Your Claim Code: {claimCode ? <i>{claimCode}</i> : <i>Verify email to get claim code</i>}
                        </p>
                        <input
                            type="text"
                            placeholder="Enter your claim code"
                            value={claimCode}
                            onChange={(e) => {
                                const claimCode = e.target.value;
                                setClaimCode(claimCode);
                            }}
                        />
                        <button onClick={getClaimToken} style={{ width: '26%' }}>
                            Claim
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ClaimPage;
