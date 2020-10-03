import React from 'react'
import { battle } from '../utils/api'
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaUser } from 'react-icons/fa'
import Card from './card'

import PropTypes from 'prop-types'


function ProfileList(profile) {

    return (
        <ul className='card-list'>
            <li>
                <FaUser color='rgb(239,115,115)' size={22} />
                {profile.profile.name}
            </li>
            <li>
                <FaCompass color='rgb(114,115,255)' size={22} />
                {profile.profile.location}
            </li>
            <li>
                <FaBriefcase color='#795548' size={22} />
                {profile.profile.company}
            </li>
            <li>
                <FaUsers color='rgb(129,195, 245)' size={22} />
                {profile.profile.followers.toLocaleString()} followers
                </li>
            <li>
                <FaUserFriends color='rgb(64,183,95)' size={22} />
                {profile.profile.following.toLocaleString()} following
                </li>
        </ul>
    )
}

ProfileList.propType = {
    profile: PropTypes.object.isRequired
}



export default class Results extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    }

    componentDidMount() {
        const { playerOne, playerTwo } = this.props



        battle([playerOne, playerTwo]).then
            ((players) => {
                this.setState({
                    winner: players[0],
                    loser: players[1],
                    error: null,
                    loading: false
                })
            }).catch(({ message }) => {
                this.setState({
                    error: message,
                    loading: false
                })
            })

    }

    render() {

        const { winner, loser, error, loading } = this.state

        if (error) {
            return <p className='center-text error'>{error}</p>
        }

        if (loading === true) {
            return <p >Loading</p>
        }

        if (!loading) {
            return (

                <React.Fragment>
                    <div className='grid space-around container-sm'>

                        <Card
                            href={winner.profile.html_url}
                            avatar={winner.profile.avatar_url}
                            subheader={`Score : ${winner.score.toLocaleString()}`}
                            header={winner.score === loser.score ? 'Tie' : 'Winner'}
                            name={winner.profile.login}
                        >
                            <ProfileList profile={winner.profile} />
                        </Card>



                        <Card
                            href={loser.profile.html_url}
                            avatar={loser.profile.avatar_url}
                            subheader={`Score : ${loser.score.toLocaleString()}`}
                            header={winner.score === loser.score ? 'Tie' : 'Winner'}
                            name={loser.profile.login}
                        >
                            <ProfileList profile={loser.profile} />
                        </Card>


                    </div>

                    <button onClick={this.props.onReset}
                        className='btn dark-btn btn-space'>
                        Reset
                    </button>
                </React.Fragment>
            )
        }

    }
}

Results.propType = {
    playerOne: PropTypes.object.isRequired,
    playerTwo: PropTypes.object.isRequired,
    isReset: PropTypes.func.isRequired
}