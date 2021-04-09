import React, { Component} from 'react';
import { Route } from 'react-router-dom';
import YogaSeqForm from '../components/sequences/YogaSeqForm';



class YogaSeqContainer extends Component {
    render() {
        return (
            <div>Yoga Sequence Container
                <YogaSeqForm />

            </div>
        )
    }
}

export default YogaSeqContainer;