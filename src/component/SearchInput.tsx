import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { getAllImages } from '../app/actions';



interface IProps {
    search: ((query: string) => void)
}

interface IState {
    query: string
}

class Search extends React.Component<IProps, IState> {

    state = {
        query: ''
    }

    public updateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            query: e.target.value
        });
    };
    
    public updateSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        console.log('the value is ', this.state.query);
        this.props.search(this.state.query);
    }

    public render() {
        return (
            <form onSubmit={this.updateSearch}>
                <input type='text' placeholder='Enter search here' onChange={this.updateInput}></input>
                <button type='submit'>Search</button>
            </form>
        )
    }

}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        search: (query: string) => dispatch(getAllImages(query) as any),
    };
};

export default connect(null,mapDispatchToProps)(Search);
