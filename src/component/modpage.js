import { Component } from "react";
import { useParams } from "react-router-dom";
import global from "./../global";

import './styles/modpage.css'

class ModPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            apiToCall: global.API + '/' + this.props.params.id,
            data: null,
        };
    }

    collectData = () => {
        fetch(this.state.apiToCall)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({
                    data: data.data,
                    style: {
                        backgroundImage: 'url(' + data.data.screenshots[0].url + ')'
                    }
                })
            }
            )
            .catch(function (error) { console.log(error) })
    }

    componentDidMount() {
        this.collectData();
    }

    render() {
        return (
            <div className="modPage" style={this.state.style} >ModPage {this.props.params.id}</div>
        )
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => (
    <ModPage
        {...props}
        params={useParams()}
    />)