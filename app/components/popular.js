import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'
import Card from './card'
import Loading from './Loading'

function LanguagesNav({ selectedLanguage, onUpdateLanguage }) {

    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

    return (

        <ul className='flex-center'>
            {languages.map((language) => (

                <li key={language}>
                    <button className='btn-clear nav-link'
                        style={language === selectedLanguage ?
                            { color: 'rgb(187,46,31)' } : null}
                        onClick={() => onUpdateLanguage(language)}
                    >
                        {language}
                    </button>
                </li>
            ))}
        </ul>
    )
}

LanguagesNav.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired,
}

// styling

function ReposGrid({ repos }) {
    return (
        <ul className='grid space-around'>
            {
                repos.map((repo, index) => {
                    const { name, owner, html_url, stargazers_count, forks, open_issues } = repo
                    const { login, avatar_url } = owner

                    return (
                        <li key={html_url} >

                            <Card
                                header={`#${index + 1}`}
                                avatar={avatar_url}
                                href={html_url}
                                name={login}
                            >
                                <ul className='card-list'>
                                    <li>
                                        <FaUser color='rgb(255,191, 116)' />
                                        <a href={`https://github.com/${login}`}>
                                            {login}
                                        </a>
                                    </li>
                                    <li>
                                        <FaStar color='rgb(255,215, 0)' size={22} />
                                        {stargazers_count.toLocaleString()} stars
                                </li>
                                    <li>
                                        <FaCodeBranch color='rgb(129,195, 245)' size={22} />
                                        {forks.toLocaleString()} forks

                                </li>
                                    <li>
                                        <FaExclamationTriangle color='rgb(255,138, 147)' size={22} />
                                        {open_issues.toLocaleString()} open issues
                                </li>
                                </ul>
                            </Card>



                        </li>
                    )

                })
            }

        </ul>
    )
}






export default class Popular extends React.Component {

    constructor(props) {
        super(props)

        this.updateLanguage = this.updateLanguage.bind(this)
        this.isLoading = this.isLoading.bind(this)
        this.state = {
            selectedLanguage: 'All',
            repos: {},
            error: null
        }
    }

    updateLanguage(selectedLanguage) {
        this.setState(
            {
                selectedLanguage,
                error: null,
            }
        )

        if (!this.state.repos[selectedLanguage]) {


            fetchPopularRepos(selectedLanguage)
                .then((data) => {
                    this.setState(({ repos }) => ({
                        repos: {
                            ...repos,
                            [selectedLanguage]: data
                        }
                    }))
                }).catch((error) => {
                    console.warn('Error while fetching', error)
                    this.setState(
                        { error: 'there is an error' }
                    )

                })
        }


        //     fetchPopularRepos(selectedLanguage)
        // .then((repos) => {
        //     this.setState({
        //         repos,
        //         error:null
        //     })
        // })
        // .catch((error) => {
        //     console.warn('Error while fetching', error)
        //     this.setState(
        //         {error: 'there is an error'}
        //     )
        // })






    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage)
    }


    isLoading() {

        const { selectedLanguage, repos, error } = this.state

        return !repos[selectedLanguage] && error === null

        // return this.state.repos === null && this.state.error === null
    }


    render() {

        const { selectedLanguage, repos, error } = this.state
        return (

            <React.Fragment>
                <LanguagesNav
                    selectedLanguage={selectedLanguage}
                    onUpdateLanguage={this.updateLanguage}
                />

                {this.isLoading() && <Loading text='Repos Loading'></Loading>}

                {error && <p className='center-text error'>{error}</p>}

                {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
            </React.Fragment>
        )

    }
}