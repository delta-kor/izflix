import { Component } from 'react';
import styled from 'styled-components';
import Spaceship from '../../services/spaceship';
import Transmitter from '../../services/transmitter';
import MusicAccordion from '../actions/accordion/MusicAccordion';
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
    const placeholder = [];
    for (let i = 0; i < 51; i++) {
      placeholder.push(<MusicAccordion key={i} />);
    }

    return (
      <>
        <Mobile>
          <AccordionList>
            {this.state.musics.length
              ? this.state.musics.map((music) => (
                  <MusicAccordion music={music} key={music.id} />
                ))
              : placeholder}
          </AccordionList>
        </Mobile>
      </>
    );
  }
}

export default MusicMenu;
