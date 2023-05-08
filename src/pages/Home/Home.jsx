import { BiShareAlt } from 'react-icons/bi';
import Header from '../../components/Header/Header';
import './Home.css';
import WalletCard from '../../components/WalletCard/WalletCard';
import Footer from '../../components/Footer/Footer';
import { VFC } from '../../config/contract';
import React, { useState } from 'react';
import { ethers, utils } from 'ethers';
import { toast } from 'react-toastify';
import { data } from '../../store';
import { Web3Provider } from '@ethersproject/providers';
import images from '../../assets/images';
import Banner from '../../components/Banner/Banner';

function Home() {
    const fakeDataLarge = [
        {
            url: 'https://static.republika.co.id/uploads/images/inpicture_slide/cristiano-ronaldo-dari-manchester-united-bereaksi-selama-pertandingan-sepak_220226235058-675.jpg',
            title: 'YOUR COMPLETE GUIDE TO INTERNATIONALS',
            des: 'Sunday’s Emirates FA Cup victory over Fulham was Manchester United’s final match for a fortnight, as we resume our season by travelling to St James’ Park to take on Newcastle United on Sunday 2 April.',
            time: '1d',
            state: 'news',
        },
        {
            url: 'https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt3c6f8e2bc075310c/631568755e5b9c4297066982/Antony.jpg',
            title: 'STATS SHOW BRUNO’S AMAZING ENDURANCE',
            des: 'Throughout 2022/23, Bruno Fernandes has maintained his phenomenal record when it comes to putting in the miles for Manchester United.',
            time: '12h',
            state: 'features',
        },
    ];

    const fakeDataMedium = [
        {
            url: 'https://sohanews.sohacdn.com/thumb_w/1000/160588918557773824/2022/10/4/photo-5-16648686948211438733633.jpg',
            title: 'GARNACHO NAMED AMONG WORLD’S TOP TEENAGERS',
            des: 'Manchester United forward Alejandro Garnacho has been included as one of nine winners on Goal’s 2023 NXGN list, which celebrates the 50 best young talents in men’s professional football.',
            time: '19h',
            state: 'news',
        },
        {
            url: 'https://photo-cms-plo.epicdn.me/w850/Uploaded/2023/yqjvzdjwp/2022_06_04/ronaldo-manchester-united-7776.jpeg',
            title: 'OPINION: COOL SANCHO CAN BE KEY IN FINAL MONTHS',
            des: 'It’s been a challenging sophomore season at United for Jadon Sancho, with the forward absent from October to the start of February due to fitness struggles.',
            time: '15h',
            state: 'opinion',
        },
        {
            url: 'https://vtv1.mediacdn.vn/thumb_w/650/2023/1/31/photo-1-16751361047351028947527-crop-16751361186001688995387.jpg',
            title: 'AMAZING STAT SHOWS UNITED’S POTENCY AT STRETFORD END',
            des: 'Research has revealed that 43 of the 57 goals Manchester United have scored at Old Trafford during 2022/23 have come at the Stretford End.',
            time: '21h',
            state: 'features',
        },
        {
            url: 'https://media.baobinhphuoc.com.vn/upload/news/2_2023/bd5666cdd8ec47bd2c8082be7594e6ca.jpg',
            title: 'SEVILLA PART COMPANY WITH SAMPAOLI',
            des: 'Manchester United’s upcoming Europa League opponents Sevilla have parted company with head coach Jorge Sampaoli.',
            time: '20h',
            state: 'news',
        },
    ];

    const fakeShirt = [
        {
            url: 'https://images.footballfanatics.com/manchester-united/manchester-united-icon-jersey-black_ss4_p-13354971+u-1bjgzo57vbnf3cpdszuj+v-c8c192f05ca84b0b895f193856c05c21.jpg?_hv=1&w=900',
            des: 'Manchester United Icon Goalkeeper Jersey - Black',
        },
        {
            url: 'https://images.footballfanatics.com/manchester-united/manchester-united-away-shirt-2022-23-with-rashford-10-printing_ss4_p-13324343+u-dc937xkdurtrx1tghro2+v-d2e7700f52834e608b5e0d89f5680dc8.jpg?_hv=1&w=900',
            des: 'Manchester United Icon Jersey - Black',
        },
        {
            url: 'https://images.footballfanatics.com/manchester-united/manchester-united-third-shirt-2022-23_ss4_p-13313262+u-8nhsa3vcjk95kdq67480+v-8dffa5ded49242148d8790219b2f62ba.jpg?_hv=1&w=900',
            des: 'Manchester United Third Shirt 2022-23',
        },
        {
            url: 'https://images.footballfanatics.com/manchester-united/manchester-united-home-shirt-2022-23-kids_ss4_p-13307688+u-ezvzd4rz8bxh95cfkptl+v-5f5c5161f87f49c78bf48a3c9a20cc95.jpg?_hv=1&w=900',
            des: 'Manchester United Home Shirt 2022-23 - Kids',
        },
    ];

    const imagesArr = [
        {
            url: 'https://tuyendung.vietis.com.vn/wp-content/uploads/2019/07/BK.png',
        },
        {
            url: 'https://tuyendung.vietis.com.vn/wp-content/uploads/2019/07/Logo-dai-hoc-cong-nghe.png',
        },
        {
            url: 'https://tuyendung.vietis.com.vn/wp-content/uploads/2019/07/FPT.png',
        },
        {
            url: 'https://tuyendung.vietis.com.vn/wp-content/uploads/2019/07/logo-thong-bao.jpg',
        },
    ];

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
        <div className="home">
            <Header />
            <Banner />
            <div className="connect-wallet">
                <h2>Connect Metamask Wallet</h2>
            </div>
            <section>
                <WalletCard />
                <div className="block-input">
                    <div className="input-line">
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

                    <div className="input-line">
                        <p className="claim-code">
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
                        <button onClick={getClaimToken}>Claim</button>
                    </div>
                </div>
            </section>
            <div className="wrap" id="news">
                <div className="news-title">
                    <h2>News</h2>
                </div>
                <div className="home-container">
                    {/* 2 column */}
                    <div className="home-row-2-col">
                        {fakeDataLarge.map((data, index) => {
                            return (
                                <div className="home-item--large" key={index}>
                                    <div className="item-image">
                                        <div className="img" style={{ backgroundImage: `url(${data.url})` }}></div>
                                    </div>
                                    <div className="item-content">
                                        <p className="item-content-title">{data.title}</p>
                                        <p className="item-content-des">{data.des}</p>
                                        <div className="item-content-footer">
                                            <div className="item-content-footer--left">
                                                {data.time} <span>|</span> {data.state}
                                            </div>
                                            <BiShareAlt />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {/* 4 column */}
                    <div className="home-row-4-col">
                        {fakeDataMedium.map((data, index) => {
                            return (
                                <div className="home-item--medium" key={index}>
                                    <div className="item-m-image">
                                        <div className="img" style={{ backgroundImage: `url(${data.url})` }}></div>
                                    </div>
                                    <div className="item-m-content">
                                        <p className="item-m-content-title">{data.title}</p>
                                        <p className="item-m-content-des">{data.des}</p>
                                        <div className="item-m-content-footer">
                                            <div className="item-m-content-footer--left">
                                                {data.time} <span>|</span> {data.state}
                                            </div>
                                            <BiShareAlt />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* banner */}
            <div
                className="banner"
                style={{
                    backgroundImage: `url('https://i.pinimg.com/originals/d4/80/21/d48021df42478eb620af11cdb44cc249.jpg')`,
                }}
            ></div>

            {/* voting */}
            <div
                id="vote"
                className="voting"
                style={{
                    backgroundImage: `url('https://d2x51gyc4ptf2q.cloudfront.net/content/uploads/2022/03/15092449/ot1.jpg')`,
                }}
            >
                <div className="voting-container">
                    <div className="wrap">
                        <h3 className="voting-content-title">TRENDING NOW</h3>
                        <div className="voting-content">
                            {fakeShirt.map((data, index) => {
                                return (
                                    <div key={index} className="voting-card-container">
                                        <div className="card-shirt">
                                            <div
                                                className="card-shirt-img"
                                                style={{ backgroundImage: `url(${data.url})` }}
                                            ></div>
                                            <p className="card-shirt-des">{data.des}</p>
                                            <div className="button-vote">VOTE NOW</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Đối tác */}
            <div className="partner">
                <p className="partner-title">ĐỐI TÁC CHÍNH</p>
                <div className="partner-line"></div>
                <div className="partner-logo">
                    {imagesArr.map((img, index) => {
                        return (
                            <div
                                key={index}
                                className="partner-logo-item"
                                style={{ backgroundImage: `url(${img.url})` }}
                            ></div>
                        );
                    })}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
