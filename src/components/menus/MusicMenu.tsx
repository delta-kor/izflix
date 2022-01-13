import { Component } from 'react';
import styled from 'styled-components';
import Spaceship from '../../services/spaceship';
import Transmitter from '../../services/transmitter';
import MusicAccordion from '../actions/MusicAccordion';
import { Mobile } from '../tools/MediaQuery';

const AccordionList = styled.div``;

interface State {
  musics: IMusic[];
}

class MusicMenu extends Component<any, State> {
  state: State = { musics: [] };

  componentDidMount = () => {
    this.loadData();
  };

  loadData = async () => {
    const data = await Spaceship.viewAllMusics();
    if (!data.ok) return Transmitter.emit('popup', data.message);

    this.setState({ musics: data.musics });
  };

  render() {
    return (
      <>
        <Mobile>
          <AccordionList>
            {this.state.musics.map((music) => (
              <MusicAccordion music={music} />
            ))}
          </AccordionList>
        </Mobile>
      </>
    );
  }
}

export default MusicMenu;
