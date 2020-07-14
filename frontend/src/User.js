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
        my_id: '',
        my_profile_pic: '',
        my_first_name: '',
        friendSearch: '',
        status: 'Add Friend',
        friendId: 0,
        request_from: 0,
        request_to: 0,
        friendNumber: 0
    }
    findProfile = () => {
        window.location.replace('/user/' + this.state.searchFriends)
    }
    componentDidMount = () => {
        let myUsername = LocalStorageService.getUsername()
        axios.get('http://localhost:8000/users/profile/' + myUsername).then(res => {
            const { profile_pic, first_name, id } = res.data
            this.setState({ my_profile_pic: profile_pic, my_first_name: first_name, my_id: id })
        })
        axios.get('http://localhost:8000/users/allusers/' + this.props.username).then(res => {
            const { profile_pic, cover_pic, first_name, last_name, id } = res.data
            this.setState({ profile_pic, cover_pic, first_name, last_name, friendId: id })
            axios.get('http://localhost:8000/friends/requests/number/' + Number(this.state.friendId)).then(res => this.setState({ friendNumber: res.data.length }))
        }).then(() => {
            axios.get('http://localhost:8000/friends/requests/' + Number(this.state.friendId)).then(res => {
                this.setState({ status: res.data.status, request_from: res.data.request_from_id, request_to: res.data.request_to_id })
            }).catch((err) => err)
        })
    }
    addFriend = () => {
        axios.post('http://localhost:8000/friends/requests/' + Number(this.state.friendId)).then(() => {
            axios.get('http://localhost:8000/friends/requests/' + Number(this.state.friendId)).then(res => {
                this.setState({ status: res.data.status })
            }).catch((err) => err)
            window.location.reload()
        })
    }
    acceptFriend = () => {
        axios.put('http://localhost:8000/friends/requests/' + Number(this.state.friendId)).then((res) => {
            this.setState({ status: res.data.status })
            window.location.reload()
        })
    }
    declineFriend = () => {
        axios.delete('http://localhost:8000/friends/requests/' + Number(this.state.friendId)).then((res) => {
            this.setState({ status: res.data.status })
            window.location.reload()
        })
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
                        <input type="text" placeholder="Search Friends" onChange={(e) => this.setState({ searchFriends: e.target.value })} />
                        <button style={{ border: 'none', padding: '10px' }} onClick={this.findProfile}>Ok</button>
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
                <div className="outerHead">
                    <div className="head">
                        <div className="coverImg" >
                            <img src={this.state.cover_pic} className="coverImage" />
                        </div>
                        <img src={this.state.profile_pic} className="profileImage" />
                        <div className="headerBottom">
                            <h1>{this.state.first_name} {this.state.last_name}</h1>
                        </div>
                        <div className="headerOptions">
                            <ul className="optionList">
                                <li>Timeline</li>
                                <li>About</li>
                                <li style={{display:'flex'}}>
                                    <div style={{marginRight:'3px'}}>Friends</div>
                                    <div className="numberOfFriends">{this.state.friendNumber}</div>
                                </li>
                                <li>Images</li>
                                <li>Videos</li>
                            </ul>

                            {this.state.status === 'Add Friend' && <button onClick={this.addFriend}>{this.state.status}</button>}
                            {this.state.status === 'pending' &&
                                <div>
                                    {this.state.request_to === this.state.my_id && <button onClick={this.acceptFriend}>Accept Friend</button>}
                                    {this.state.request_to === this.state.my_id && <button onClick={this.declineFriend}>Decline Friend</button>}
                                    {this.state.request_from === this.state.my_id && <button>Requested</button>}
                                </div>}
                            {this.state.status === 'friend' && <button>Friends</button>}
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="contentPage">
                        <div className="contentLeft">
                            <div className="about"></div>
                            <div className="about"></div>
                            <div className="about"></div>
                            <div className="about"></div>
                        </div>
                        <div className="contentRight">
                            <div className="addPost">
                                <div className="addPostTop">
                                    <img src={this.state.my_profile_pic} className="userlogo" />
                                    <input type="text" placeholder="What's on your mind" />
                                </div>
                                <div className="addPostBottom">
                                    <input type="text" placeholder="Image url" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default User
