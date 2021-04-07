import React, { Component} from 'react';
import YogaSeqForm from '../components/sequences/YogaSeqForm';
import YogaCategories from '../components/sequences/YogaCategories';


class YogaSeqContainer extends Component {
    render() {
        return (
            <div>Yoga Sequence Container
                <YogaSeqForm />
                <YogaCategories addCategory={this.props.addCategory}/>
            </div>
        )
    }
}

export default YogaSeqContainer;