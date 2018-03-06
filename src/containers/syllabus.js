import React, { Component } from 'react';
import { Accordion, Icon, Menu } from 'semantic-ui-react';
import Header from '../components/header';
import ClassInformationSection from './classInformationSection/classInformationSection';
import NotesSection from './notesSection/notesSection';
import './syllabus.css';

export default class Syllabus extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event, data) {
    this.setState({
      activeIndex: this.state.activeIndex === data.index ? -1 : data.index
    });
  }

  render() {
    return (
      <div className='flex-full-height'>
        <Header title='Syllabus' />
        <Accordion as={Menu} vertical fluid className='flex-full-height'>
          <Menu.Item className={this.state.activeIndex === 0 ? 'flex-full-height-item' : ''}>
            <Accordion.Title active={this.state.activeIndex === 0} index={0} onClick={this.handleClick}>
              Class Information
              <Icon name='dropdown' />
            </Accordion.Title>
            <Accordion.Content active={this.state.activeIndex === 0}>
              <ClassInformationSection />
            </Accordion.Content>
          </Menu.Item>
          <Menu.Item className={this.state.activeIndex === 1 ? 'flex-full-height-item' : ''}>
            <Accordion.Title active={this.state.activeIndex === 1} index={1} onClick={this.handleClick}>
              Notes
              <Icon name='dropdown' />
            </Accordion.Title>
            <Accordion.Content active={this.state.activeIndex === 1}>
              <NotesSection />
            </Accordion.Content>
          </Menu.Item>
          <Menu.Item className={this.state.activeIndex === 2 ? 'flex-full-height-item' : ''}>
            <Accordion.Title active={this.state.activeIndex === 2} index={2} onClick={this.handleClick}>
              Assignments
              <Icon name='dropdown' />
            </Accordion.Title>
            <Accordion.Content active={this.state.activeIndex === 2}>
            </Accordion.Content>
          </Menu.Item>
          <Menu.Item className={this.state.activeIndex === 3 ? 'flex-full-height-item' : ''}>
            <Accordion.Title active={this.state.activeIndex === 3} index={3} onClick={this.handleClick}>
              Tests
              <Icon name='dropdown' />
            </Accordion.Title>
            <Accordion.Content active={this.state.activeIndex === 3}>
            </Accordion.Content>
          </Menu.Item>
        </Accordion>
      </div>
    )
  }
}
