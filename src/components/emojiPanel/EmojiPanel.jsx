import React, { useState, useEffect } from "react";

import * as unicodeEmoji from "unicode-emoji";

import "./style.css";

export let Emojis = {
  Laughing: 1,
  Angry: 2,
  Dizzy: 3,
  Expression: 4,
  Frown: 5,
  Hearteyes: 6,
  Neutral: 7,
  Smile: 8,
  Smileupside: 9,
  Sunglasses: 10,
  Wink: 11,
};

const groupBy = "category";
const omitWhere = {
  versionAbove: "11.0",
  category: ["flags"],
  version: ["0.6", "0.7"],
};

const EmojiPanel = (props) => {
  const [selectedEmoji, setSelectedEmoji] = useState(0);
  const [setOfEmojis, setSetOfEmojis] = useState([]);
  const [setOfCategories, setSetOfCategories] = useState([]);

  useEffect(() => {
    const allEmojis = unicodeEmoji.getEmojisGroupedBy(groupBy, omitWhere);
    const allCategories = Object.keys(allEmojis);
    const newSetOfEmojis = [];
    const newSetOfCategories = [];
    allCategories.forEach((item) => {
      const arrayOfEmojis = {
        key: item,
        emojis: allEmojis[item],
      };
      const category = {
        key: item,
        emoji: allEmojis[item][0],
      };
      newSetOfEmojis.push(arrayOfEmojis);
      newSetOfCategories.push(category);
    });
    setSetOfCategories(newSetOfCategories);
    setSetOfEmojis(newSetOfEmojis);
  }, []);

  return (
    <div className="emoji-panel uk-background-muted">
      <ul
        className="uk-subnav uk-subnav-pill"
        data-uk-switcher="animation: uk-animation-slide-left-medium, uk-animation-slide-right-medium"
      >
        {setOfCategories.map((d, i) => {
          return (
            <li key={i}>
              <a href="#">{d.emoji.emoji}</a>
            </li>
          );
        })}
      </ul>
      <ul className="uk-switcher uk-margin">
        {setOfEmojis.map((d, i) => {
          return (
            <li key={i}>
              <div className="uk-text-left" data-uk-grid>
                {d.emojis.map((e, j) => {
                  return (
                    <button key={j} className="emoji-button">
                      {e.emoji}
                    </button>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EmojiPanel;
