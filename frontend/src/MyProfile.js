import React, { Component } from 'react'
import './MyProfile.css'
import { ShoppingFilled, HeartFilled, UserOutlined, HomeFilled, MessageFilled, PlusOutlined, BellFilled, DropboxOutlined } from '@ant-design/icons';
import axios from './config/axios'
import LocalStorageService from './services/localStorageService'

class MyProfile extends Component {
    state = {
        profile_pic: '',
        cover_pic: '',
        first_name: '',
        last_name: '',
        searchFriends:''
    }
    componentDidMount = () => {
        let username = LocalStorageService.getUsername()
        axios.get('http://localhost:8000/users/profile/' + username).then(res => {
            const { profile_pic, cover_pic, first_name, last_name } = res.data
            this.setState({ profile_pic, cover_pic, first_name, last_name })
        })
    }
    logout = () => {
        LocalStorageService.removeToken()
        LocalStorageService.removeUsername()
        window.location.replace('/')
    }
    findProfile = () => {
        window.location.replace('user/' + this.state.searchFriends)
    }
    render() {
        return (
            <div className="profileWrapper">
                <nav>
                    <div className="logoSearch">
                        <div className="logoBackground">f</div>
                        <input type="text" placeholder="Search Friends" onChange={(e) => this.setState({searchFriends:e.target.value})} />
                        <button style={{border:'none',padding:'10px'}} onClick={this.findProfile}>Ok</button>
                    </div>
                    <div className="centerIcons">
                        <HeartFilled />
                        <ShoppingFilled />
                        <UserOutlined />
                        <HomeFilled />
                    </div>
                    <div className="rightBar">
                        <div className="userInfo">
                            <img src={this.state.profile_pic} className="userlogo" />
                            <div>{this.state.first_name}</div>
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
                    <img src={this.state.cover_pic} className="coverImage" />

                </header>
                <img src={this.state.profile_pic} className="profileImage" />
                <div className="content">
                    <h1>{this.state.first_name} {this.state.last_name}</h1>
                    <div className="contentPage">
                        <button onClick={this.logout}>Logout</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyProfile
