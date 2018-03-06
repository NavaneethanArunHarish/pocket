import React, { Component } from 'react';
import './notesSection.css';
import NotesSectionBody from './notesBody';
import InfiniteScroll from 'react-bidirectional-infinite-scroll';

export default class NotesSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
     imageUrls: [],
     wholeDays:'',
     todayIndex:'',
     scroll: false
    };
    this.handleScrollDown = this.handleScrollDown.bind(this);
    this.handleScrollUp = this.handleScrollUp.bind(this);
    this.handleOnScroll = this.handleOnScroll.bind(this);
  }

  componentWillMount() {
    var days = this.getAllDatesInAYear();
    var wholeDays = [];
    var scrollData = [];
    for(var m=0;m<days.length;m++) {
      var data = {
        "id":m,
        "date":days[m]
      }
      wholeDays.push(data);
    }
    var today = new Date();
    var formattedTodayDate = this.convertDateFormat(today);
    for(var i=0;i<wholeDays.length;i++) {
      if(wholeDays[i].date === formattedTodayDate.trim()) {
          for(var j=2;j>=0;j--) {
            scrollData.push(wholeDays[i-j]);
          }
          for(var k=1;k<3;k++) {
            scrollData.push(wholeDays[i+k]);
          }
      }
    }
    this.setState({wholeDays:wholeDays, scrollItems:scrollData});
  }

    getAllDatesInAYear() {
        var today = new Date();
        var formattedTodayDate = this.convertDateFormat(today);
        var totalMonths = 12;
         var currentYear = this.getCurrentYear();
         var startingDateInAMonth = 1;
         var wholeDays = [];
          for(var month=0; month<totalMonths; month++){
           var date = new Date(currentYear, month, startingDateInAMonth);
              while (date.getMonth() === month) {
                // 'convertDateFormat' method will convert default date format into UI usable date format
                var formattedDate = this.convertDateFormat(date);
                wholeDays.push(formattedDate);
                if(formattedTodayDate.trim() === formattedDate.trim()) {
                  this.setState({todayIndex:wholeDays.length-2});
                }
                date.setDate(date.getDate() + 1);
                 }
            }
       return wholeDays;
    };

    convertDateFormat(date) {
      var dateString = new Date(date)+ '';
      var delimiter = ' ';
      var start = 4;
      var slicedDate = dateString.split(delimiter).slice(0,start);
      var formattedDate = slicedDate.join(delimiter);
      return formattedDate;
    }

    getCurrentYear() {
      var today = new Date();
      var currentYear = today.getFullYear();
      return currentYear;
    };


  handleChange(e) {
        let reader = new FileReader();
        let file = e.target.files[0];
         reader.onloadend = (url) => {
           //for saving images into DB we need to use variable 'file'
             this.setState({ imageUrls: [...this.state.imageUrls, url.target.result] })
          }
      reader.readAsDataURL(file);
  }

  handleScrollDown() {
    var length = this.state.scrollItems.length-1;
    var downScrolledData = this.state.scrollItems;
    for(var i=0;i<this.state.wholeDays.length;i++) {
      if(this.state.wholeDays[i].date === this.state.scrollItems[length].date) {
          for(var k=1;k<3;k++) {
            if(this.state.wholeDays[i+k] !== undefined) {
              downScrolledData.push(this.state.wholeDays[i+k]);
            }
          }
      }
    }
    this.setState({ scrollItems: downScrolledData})
  }

  handleScrollUp() {
    var length = this.state.scrollItems.length-1;
    var scrollData = this.state.scrollItems;
    var data = [];
    var upScrolledData = [];
    var n=2;
      for(var i=0;i<this.state.wholeDays.length;i++) {
        if(this.state.wholeDays[i].date === this.state.scrollItems[0].date) {
          for(var k=0;k<scrollData.length;k++) {
            data[n+k] = scrollData[k];
          }
          for(var j=2;j>=1;j--) {
            upScrolledData.push(this.state.wholeDays[i-j]);
          }
          for(var l=0;l<2;l++) {
            data[l] = upScrolledData[l];
          }
        }
      }
      this.setState({ scrollItems: data})
  }

  handleOnScroll(position) {
    if(position === 0) {
      var element = document.getElementById("nodeSection");
      element.scrollIntoView(true);
      this.handleScrollUp();
    }

  }

  mouseWheel(e) {
    if(this.state.scroll === false) {
      this.setState({ scroll: true})
      var element = document.getElementById("nodeSection");
      element.scrollIntoView(true);
    }
  }


  render() {
    
    return (
      <div className="flexcroll">
      <InfiniteScroll
          onReachBottom={this.handleScrollDown}
          //onReachTop={this.handleScrollUp}
          onScroll={this.handleOnScroll}
          position={5}
       >
    {
      this.state.scrollItems.map((obj, index) => {
      return (
        <div id="nodeSection" key={obj.id} className='notesSectionDiv' onWheel = {this.mouseWheel.bind(this)}>
          <p>{obj.date}</p>
          <NotesSectionBody index={obj.id} indexToScroll={this.state.todayIndex} />
        </div>
          )
        })
    }
      </InfiniteScroll> 
      </div>
    )
  }
}
