import React from 'react'
import { battle } from '../utils/api'
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaUser } from 'react-icons/fa'
import Card from './card'

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
                <div className='grid space-around container-sm'>

                    <Card
                        href={winner.profile.html_url}
                        avatar={winner.profile.avatar_url}
                        subheader={`Score : ${winner.score.toLocaleString()}`}
                        header={winner.score === loser.score ? 'Tie' : 'Winner'}
                        name={winner.profile.login}
                    >

                        <ul className='card-list'>
                            <li>
                                <FaUser color='rgb(239,115,115)' size={22} />
                                {winner.profile.name}
                            </li>
                            <li>
                                <FaCompass color='rgb(114,115,255)' size={22} />
                                {winner.profile.location}
                            </li>
                            <li>
                                <FaBriefcase color='#795548' size={22} />
                                {winner.profile.company}
                            </li>
                            <li>
                                <FaUsers color='rgb(129,195, 245)' size={22} />
                                {winner.profile.followers.toLocaleString()} followers
                            </li>
                            <li>
                                <FaUserFriends color='rgb(64,183,95)' size={22} />
                                {winner.profile.following.toLocaleString()} following
                            </li>
                        </ul>

                    </Card>



                    <Card
                        href={loser.profile.html_url}
                        avatar={loser.profile.avatar_url}
                        subheader={`Score : ${loser.score.toLocaleString()}`}
                        header={winner.score === loser.score ? 'Tie' : 'Winner'}
                        name={loser.profile.login}
                    >

                        <ul className='card-list'>
                            <li>
                                <FaUser color='rgb(239,115,115)' size={22} />
                                {loser.profile.name}
                            </li>
                            <li>
                                <FaCompass color='rgb(114,115,255)' size={22} />
                                {loser.profile.location}
                            </li>
                            <li>
                                <FaBriefcase color='#795548' size={22} />
                                {loser.profile.company}
                            </li>
                            <li>
                                <FaUsers color='rgb(129,195, 245)' size={22} />
                                {loser.profile.followers.toLocaleString()} followers
                            </li>
                            <li>
                                <FaUserFriends color='rgb(64,183,95)' size={22} />
                                {loser.profile.following.toLocaleString()} following
                            </li>
                        </ul>

                    </Card>

                </div>
            )
        }

    }
}