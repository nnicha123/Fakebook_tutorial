import React, { Component } from 'react'
import './MyProfile.css'
import { ShoppingFilled, HeartFilled, UserOutlined, HomeFilled, MessageFilled, PlusOutlined, BellFilled, DropboxOutlined } from '@ant-design/icons';
import axios from 'axios'

class MyProfile extends Component {
    componentDidMount = () => {
        axios.get('http://localhost:8000/users/profile/1').then(res => console.log(res.data))
    }
    render() {
        return (
            <div className="profileWrapper">
                <nav>
                    <div className="logoSearch">
                        <div className="logoBackground">f</div>
                        <input type="text" />
                    </div>
                    <div className="centerIcons">
                        <HeartFilled />
                        <ShoppingFilled />
                        <UserOutlined />
                        <HomeFilled />
                    </div>
                    <div className="rightBar">
                        <div className="userInfo">
                            <img src="https://scontent.fbkk22-1.fna.fbcdn.net/v/t1.0-1/s320x320/84512591_791450424693484_2619608263020249088_o.jpg?_nc_cat=101&_nc_sid=7206a8&_nc_eui2=AeFYCOS-OnwlE9IDmMDG88FhHQlallIk39gdCVqWUiTf2Pa6p1qIzQnO8oU3_7eI-JtOBzrLafWYDPx3sLsQBpL8&_nc_ohc=9VfiMFPuMZQAX_rVL7_&_nc_ht=scontent.fbkk22-1.fna&_nc_tp=7&oh=44682cf53ad88810a1abc28aa9bf4e9b&oe=5F33C886"className="userlogo"/>
                            <div>Nicha</div>
                        </div>
                        <div className="rightIcons">
                            <div><PlusOutlined /></div>
                            <div><MessageFilled /></div>
                            <div><BellFilled /></div>
                            <div><DropboxOutlined /></div>
                        </div>
                    </div>
                </nav>
                <header>
                    <img src="https://scontent.fbkk22-3.fna.fbcdn.net/v/t31.0-8/25073369_307156499789548_93013602396597598_o.jpg?_nc_cat=103&_nc_sid=e3f864&_nc_eui2=AeGX7IytXkqjfiLzvoF1SYbBAVjB3KI_gykBWMHcoj-DKTRI5qTAwCuEFDaxXVj7s9GdHLCqr-85jJqfiMCNG1El&_nc_ohc=xq5Uvds5l0YAX9ffvy4&_nc_ht=scontent.fbkk22-3.fna&oh=28a5e53734eb5227b1946c435630bdb2&oe=5F32D8C0" className="coverImage" />

                </header>
                <img src="https://scontent.fbkk22-1.fna.fbcdn.net/v/t1.0-1/s320x320/84512591_791450424693484_2619608263020249088_o.jpg?_nc_cat=101&_nc_sid=7206a8&_nc_eui2=AeFYCOS-OnwlE9IDmMDG88FhHQlallIk39gdCVqWUiTf2Pa6p1qIzQnO8oU3_7eI-JtOBzrLafWYDPx3sLsQBpL8&_nc_ohc=9VfiMFPuMZQAX_rVL7_&_nc_ht=scontent.fbkk22-1.fna&_nc_tp=7&oh=44682cf53ad88810a1abc28aa9bf4e9b&oe=5F33C886" className="profileImage" />
                <div className="content">
                    <h1>Nicha Ngamtweerat</h1>
                    <div className="contentPage"></div>
                </div>
            </div>
        )
    }
}

export default MyProfile
