import React from 'react';
import './Footer.css';
import { FiLinkedin, FiFacebook } from 'react-icons/fi';

function Footer() {
    return (
        <div className="footer" id="contact">
            <div className="wrap container">
                <div className="footer-container">
                    <div className="footer-content">
                        <div className="footer-content-left">
                            <div className="footer-content-left-item">
                                <p className="footer-content-left-item-title">LIÊN HỆ</p>
                                <div className="footer-content-left-item-1">
                                    <p>CHI NHÁNH HÀ NỘI</p>
                                    <ul className="footer-content-left-item-list">
                                        <li className="footer-content-left-item-list-link">
                                            Số điện thoại: +84–246 293 9036
                                        </li>
                                        <li className="footer-content-left-item-list-link">
                                            Email: recruit@vietis.com.vn
                                        </li>
                                        <li className="footer-content-left-item-list-link">
                                            Địa chỉ: 3F & 5F, 3A Building, Lane 82 Duy Tan
                                        </li>
                                        <li className="footer-content-left-item-list-link">Str., Hanoi, Vietnam</li>
                                    </ul>
                                </div>
                                <div className="footer-content-left-item-1">
                                    <p> CHI NHÁNH NHẬT BẢN</p>
                                    <ul className="footer-content-left-item-list">
                                        <li className="footer-content-left-item-list-link">
                                            Số điện thoại: 03-6261-5638
                                        </li>
                                        <li className="footer-content-left-item-list-link">
                                            Email: recruit@vietis.com.vn
                                        </li>
                                        <li className="footer-content-left-item-list-link">
                                            Địa chỉ: Nihonbashi TEC Building 7F, 3-3-10
                                        </li>
                                        <li className="footer-content-left-item-list-link">
                                            Nihonbashi, Ningyocho, Chuo-ku, Tokyo 103-0013, Japan
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="footer-content-left-item">
                                <p className="footer-content-left-item-title">THEO DÕI</p>
                                <div className="footer-content-left-item-social">
                                    <div className="facebook">
                                        <FiFacebook />
                                    </div>
                                    <div className="linkedin">
                                        <FiLinkedin />
                                    </div>
                                </div>
                            </div>
                            <div className="footer-content-left-item">
                                <p className="footer-content-left-item-title">CÔNG TY</p>
                                <ul className="footer-content-left-item-list">
                                    <li className="footer-content-left-item-list-link">Trang Chủ</li>
                                    <li className="footer-content-left-item-list-link">Liên hệ</li>
                                    <li className="footer-content-left-item-list-link">Hỏi đáp</li>
                                    <li className="footer-content-left-item-list-link">Tin tức</li>
                                    <li className="footer-content-left-item-list-link">VIỆC LÀM</li>
                                </ul>
                            </div>
                        </div>
                        <div
                            className="footer-content-right"
                            style={{
                                backgroundImage:
                                    "url('https://tuyendung.vietis.com.vn/wp-content/themes/theme-tuyen-dung-vietis/img/logo.png')",
                            }}
                        ></div>
                    </div>
                    <div className="license">
                        <p>
                            Bản quyền © 2019 VIETIS - Được thiết kế bởi <span>tuyendung.vietis.com.vn</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
