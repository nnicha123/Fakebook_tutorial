import React, { Component } from 'react'
import axios from './config/axios'
import './MyProfile.css'
import { ShoppingFilled, HeartFilled, UserOutlined, HomeFilled, MessageFilled, PlusOutlined, BellFilled, DropboxOutlined } from '@ant-design/icons';
import LocalStorageService from './services/localStorageService'

class User extends Component {
    state = {
        profile_pic: '',
        cover_pic: '',
        first_name: '',
        last_name: '',
        my_profile_pic:'',
        my_first_name:'',
        friendSearch:''
    }
    findProfile = () => {
        window.location.replace('/user/' + this.state.searchFriends)
    }
    componentDidMount = () => {
        axios.get('http://localhost:8000/users/allusers/' + this.props.username).then(res => {
            const { profile_pic, cover_pic, first_name, last_name } = res.data
            this.setState({ profile_pic, cover_pic, first_name, last_name })
        })
        let myUsername = LocalStorageService.getUsername()
        axios.get('http://localhost:8000/users/profile/' + myUsername).then(res => {
            console.log(res.data)
            const { profile_pic,first_name } = res.data
            this.setState({ my_profile_pic:profile_pic, my_first_name:first_name })
        })
    }
    addFriend = () => {

    }
    toProfile = () => {
        window.location.replace('/myprofile')
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
                        <div className="userInfo" onClick={this.toProfile}>
                            <img src={this.state.my_profile_pic} className="userlogo" />
                            <div>{this.state.my_first_name}</div>
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
                        <button onClick={this.addFriend}>Add Friend</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default User
