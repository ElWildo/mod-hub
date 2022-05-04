import { Component } from "react";
import { useParams, Link } from "react-router-dom";
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
                this.setState({
                    data: data.data,
                    mainImage: data.data.screenshots[0].url,
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
            <div className="modPage">
                {this.state.data && (
                    <><div className="navigationBar">
                        <div>
                            <Link className="button" to="/">Home</Link>
                        </div>
                        <div>
                            {/* {this.state.data ? this.state.data.title : null} */}
                        </div>
                    </div>
                    <div className="content">
                        <img src={this.state.mainImage} width="auto" height="auto" className="contentImage" alt="missing" />
                        <div className="contentData">
                            <div>Title: {this.state.data.title}</div>
                            <div>Description: {this.state.data.longDescription}</div>
                        </div>
                    </div></>
                )}
            </div>
        )
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => (
    <ModPage
        {...props}
        params={useParams()}
    />)