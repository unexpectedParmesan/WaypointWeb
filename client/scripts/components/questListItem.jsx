'use strict';

var React = require('react');


class QuestListItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

  var title = 'Zombie Escape 9: Computers';
  var description = 'Gastropub lumbersexual Pitchfork before they sold out minim, kale chips DIY Banksy Tumblr listicle taxidermy tattooed.';

    // console.log(props);
    return (
      <div>
        <div>{title}</div>
        <div>
          {description}
        </div>
      </div>
    );
  }
}

module.exports = QuestListItem;
