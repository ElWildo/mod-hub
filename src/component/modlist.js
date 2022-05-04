import { Component } from "react";
import global from "./../global";
import ModElem from './modelem'
import './styles/modlist.css'

export default class ModList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modsDisplayed: [],
            search: null,
            category: null,
            page: null,
            order: global.orderList[0][1],
            sort: global.sortList[0][1],
            pageSize: global.pageSizeList[0],
        };
    }

    APIQueryHandler = (queryFirstElement, APIPath) => {
        if (queryFirstElement) {
            return APIPath + '?';
        } else {
            return APIPath + '&';
        }
    }

    handleChangePage = (e) => {
        this.setState({
            page: e.target.value
        },
            () => {
                this.listSetter();
            }
        )
    }

    handleChangeSort = (e) => {
        this.setState({
            sort: e.target.value
        },
            () => {
                this.listSetter();
            }
        )
    }

    handleChangePageSize = (e) => {
        this.setState({
            pageSize: e.target.value
        },
            () => {
                this.listSetter();
            }
        )
    }

    handleChangeOrder = (e) => {
        this.setState({
            order: e.target.value
        },
            () => {
                this.listSetter();
            }
        )
    }

    handleCategoryFilter = (e) => {
        let categoryUpdated = (this.state.category === e.target.value) ? null : e.target.value
        this.handleStyleButtonClick(e.target.classList)
        this.setState({
            category: categoryUpdated
        },
            () => {
                this.listSetter();
            }
        )
    }

    handleChangeSearchbar = (e) => {
            this.setState({
                search: e.target.value
            })
    }

    handleClickSearch = () => {
        this.listSetter();
    }

    handleEnterSearch = (e) => {
        if (e.key === 'Enter'){
            this.listSetter();
        }
    }

    handleStyleButtonClick = (currentClass) => {
        if(currentClass[0] === 'active') {
            currentClass.replace('active','disable');
            return
        }
        if(currentClass[0] === 'disable') {
            currentClass.replace('disable','active');
            return
        }
    }

    listSetter = () => {
        let APIPath = global.API
        let queryFirstElement = true;

        if (this.state.search) {
            APIPath = this.APIQueryHandler(queryFirstElement, APIPath) + global.search + this.state.search
            queryFirstElement = false;
        }

        if (this.state.category) {
            APIPath = this.APIQueryHandler(queryFirstElement, APIPath) + global.category + this.state.category
            queryFirstElement = false;
        }

        if (this.state.order) {
            APIPath = this.APIQueryHandler(queryFirstElement, APIPath) + global.order + this.state.order
            queryFirstElement = false;
        }

        if (this.state.sort) {
            APIPath = this.APIQueryHandler(queryFirstElement, APIPath) + global.sort + this.state.sort
            queryFirstElement = false;
        }

        if (this.state.pageSize) {
            APIPath = this.APIQueryHandler(queryFirstElement, APIPath) + global.pageSize + this.state.pageSize
            queryFirstElement = false;
        }

        if (this.state.page) {
            APIPath = this.APIQueryHandler(queryFirstElement, APIPath) + global.page + this.state.page
            queryFirstElement = false;

            //reset page index to avoid adding uneeded paging filter to future research
            this.setState({
                page: null,
            })
        }

        // console.log(APIPath);
        fetch(APIPath)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    modsDisplayed: data.data,
                    metaData: data.meta,
                })
            }
            )
            .catch(function (error) { console.log(error) })
    }

    renderList = () => {
        var mods = this.state.modsDisplayed;
        return mods.map(
            mod => <ModElem data={mod} key={mod.id} />
        )
    }

    renderSelect = (optionList, callback) => {
        let optionListHTML;
        if (!Array.isArray(optionList)) {
            console.log(optionList)
            return
        }

        if (Array.isArray(optionList[0])) {
            optionListHTML = optionList.map(
                ([option, value]) => <option key={value} value={value}>{option}</option>
            )
        } else {
            optionListHTML = optionList.map(
                (value) => <option key={value} value={value}>{value}</option>
            )
        }

        return (
            <select onChange={callback}>
                {optionListHTML}
            </select>
        )
    }

    renderPaging = () => {

        if (!this.state.metaData) {
            return
        }
        let currentPage = parseInt(this.state.metaData.page.current);
        let nextPage = currentPage + 1;
        let previousPage = currentPage - 1;
        let totalPages = parseInt(this.state.metaData.page.total);

        return (
            <div>
                {currentPage > 1 &&
                    <button value={previousPage} onClick={this.handleChangePage}>Previous</button>
                }
                <div>{currentPage}/{totalPages}</div>
                {currentPage < totalPages &&
                    <button value={nextPage} onClick={this.handleChangePage}>Next</button>
                }
            </div>
        )
    }

    componentDidMount() {
        this.listSetter();
    }

    render() {
        return (
            <div>
                <div>
                    <label htmlFor="header-search">
                        <span className="visually-hidden">Search for Mods</span>
                    </label>
                    <input
                        type="text"
                        id="header-search"
                        onChange={this.handleChangeSearchbar}
                        onKeyDown={this.handleEnterSearch}
                        placeholder="Search for Mods"
                    />
                    <button type="submit" onClick={this.handleClickSearch}>Search</button>
                </div>
                <div className="functionBar">
                    <button value='scenario' className="disable" onClick={this.handleCategoryFilter.bind(this)}>Scenario</button>
                    <button value='livery' className="disable" onClick={this.handleCategoryFilter.bind(this)}>Livery</button>
                    {this.renderSelect(global.orderList, this.handleChangeOrder)}
                    {this.renderSelect(global.sortList, this.handleChangeSort)}
                    {this.renderSelect(global.pageSizeList, this.handleChangePageSize)}
                </div>
                <div className="modList">
                    {this.renderList()}
                </div>
                {this.renderPaging()}
            </div>
        )
    }

}