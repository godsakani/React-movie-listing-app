import React, { Component } from 'react';

class Card extends Component {
    state = {
        card: 0,
        tags: ['tag1', 'tag2','tag3'],
    };

    handleIncrement = product => {
        this.setState({card: this.state.card + 1});
        console.log(product);
    };

   

    render() { 
        return (
            <div className="m-3">
                <span className={this.getBadgeClasses()}> {this.formatCard()}</span>
                <button 
                onClick={ () => this.handleIncrement(this.product) } 
                className='btn btn-sm btn-secondary'>
                Increment
                </button>
                <ul>
                    {this.state.tags.map(tag => <li key={tag}>{ tag }</li>)} 
                </ul>
            </div>
        );
    }

    getBadgeClasses() {
        let classes = "badge m-2 bg-";
        classes += this.state.card === 0 ? "warning" : "primary";
        return classes;
    }

    formatCard() {
        const { card } = this.state;
        return card ===0 ? "zero" : card;
    }
}
 
export default Card;