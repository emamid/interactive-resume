import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    myself: state.myself,
    employers: state.employers
});

class Home extends Component {

	render() {
		return <Typography>{this.props.myself.homeHTML}</Typography>
	}

}
  
export default connect(mapStateToProps)(Home);