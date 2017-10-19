import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import click1 from './click1.wav';
import click2 from './click2.wav';

class Metronome extends Component {
  constructor(props){
    super(props);

    this.state ={
      playing: false,
      count: 0,
      bpm: 100,
      beatsPerMeasure: 4
    };
    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }
  handleBpmChange = event => {
    const bpm = event.target.value;
    if(this.state.playing) {
      //STOP THE OLD TIMER AND START A NEW ONE (:
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

      // SET THE NEW BPM, AND RESET THE BEAT COUNTER
      this.setState({
        count: 0,
        bpm
      });
    } else {
      //OTHERWISE JUST UPDATE THE BPM 
      this.setState({ bpm });
    }
  }
  startStop = () => {
    if(this.state.playing){
      //STOP THE TIMER
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else {
      // START A TIMER WITH THE CURRENT BPM
      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
      this.setState({
        count: 0,
        playing: true
        //PLAYING A CLICK 'IMMEDIATELY' (AFTER SETSTATE FINISHES)
      }, this.click1.play);
    }   
  }
  playClick = () => {
    const { count, beatsPerMeasure } = this.state;

    //THIS BEAT WILL HAVE A DIFFERENT SOUND THAN THE OTHERS 
    if( count % beatsPerMeasure === 0){
      this.click2.play();
    } else {
      this.click1.play();
    }

    //KEPP TRACK OF WHICH BEAT WE'RE ON
    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  }
 
  render() {
    const { playing, bpm } = this.state;

    return (
      <div className="metronome">
        <div className="bpm-slider">
          <div>{bpm} BPM</div>
          <input
            type ='range'
            min = '60'
            max = '240'
            value = {bpm} 
            onChange={this.handleBpmChange} />
        </div>
        <button onClick={this.startStop}>
          {playing ? 'Stop' : 'Start'}
        </button>
      </div>
    );
  }
}

export default Metronome;
