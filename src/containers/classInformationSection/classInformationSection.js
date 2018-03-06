import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGroup } from '../../actions';
import { Grid, Input } from 'semantic-ui-react';
import './classInformationSection.css';

class ClassInformationSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getGroup();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ 
      group: {
        ...nextProps.group
      } 
    });
  }

  handleChange(event) {
    this.setState({ 
      group: { 
        ...this.state.group, 
        [event.target.name]: event.target.value
      } 
    });
  }

  render() {
    if (!this.state.group) {
      return (
        <div />
      )
    } else {
      return (
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
              School
            </Grid.Column>
            <Grid.Column>
              <Input name='school' placeholder='Enter your school' value={this.state.group.school} onChange={this.handleChange} transparent fluid />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              Course #
            </Grid.Column>
            <Grid.Column>
              <Input name='courseNumber' placeholder='Enter the course number' value={this.state.group.courseNumber} onChange={this.handleChange} transparent fluid />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              Course Title
            </Grid.Column>
            <Grid.Column>
              <Input name='courseTitle' placeholder='Enter the course title' value={this.state.group.courseTitle} onChange={this.handleChange} transparent fluid />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              Instructor
            </Grid.Column>
            <Grid.Column>
              <Input name='instructor' placeholder='Enter the instructor' value={this.state.group.instructor} onChange={this.handleChange} transparent fluid />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              Meeting Times
            </Grid.Column>
            <Grid.Column>
              <Input name='meetingTimes' placeholder='Enter the meeting times' value={this.state.group.meetingTimes} onChange={this.handleChange} transparent fluid />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )
    }
  }
}

export default connect(({ group }) => ({ group }), { getGroup })(ClassInformationSection);
