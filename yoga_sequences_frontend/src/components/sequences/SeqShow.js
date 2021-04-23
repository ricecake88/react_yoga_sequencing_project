import React, { Component } from 'react';
import { connect } from 'react-redux';
import PoseShowInSeq from '../sequences/PoseShowInSeq';

class SeqShow extends Component {

    state = {
        seconds: 1
    }

    matchSequence = () => {
        if (this.props.sequences.length !== 0 ) {
            return this.props.sequences.find(sequence =>
                sequence.id === parseInt(this.props.match.params.id))
        } else {
            return null
        }
    }

    matchCategory = (id) => {
        console.log(this.props)
        if (this.props.categories.length !== 0 ) {
            return this.props.categories.find(category => category.id === id)
        } else {
            return null
        }
    }

    displaySequence = () => {
        const sequence = this.matchSequence();
        if (sequence !== null) {
            const category = this.matchCategory(sequence.category_id)
            if (category !== null ){
                console.log(sequence)
                return (
                    <div>
                        Name: {sequence.name}<br></br>
                        Category: {sequence.category.name}
                        {sequence.pose_in_seqs.length !== 0 ?
                            sequence.pose_in_seqs.map(pose =>
                                <span key={pose.id}>{pose.name}</span>)
                        : null
                        }
                        <PoseShowInSeq pose_in_seqs={sequence.poses_in_seqs}/>
                    </div>
                )
            }
        }
    }
    render() {
        return <div>
            {this.displaySequence()}
        </div>
    }
}

const mapStateToProps = (state) => {
    console.log("seqShow -> mapStateToProps")
    return {
        sequences: state.sequences.sequences,
        categories: state.categories.categories,
        poses: state.poses.poses
    }
}
export default connect(mapStateToProps) (SeqShow);

/*const SeqShow = ({match}) => {
    console.log(match)
    return <div>
        Selected: {match.params.id}
    </div>
}

export default SeqShow;*/