import { useState, useEffect } from "react";

import Card from "./Card";

const frameworks = [
  "angular2",
  "vue",
  "react",
  "grunt",
  "phantomjs",
  "ember",
  "babel",
  "ionic",
  "gulp",
  "meteor",
  "yeoman",
  "yarn",
  "nodejs",
  "bower",
  "browserify",
];
const duplicatedFrameworks = [...frameworks, ...frameworks];
const shuffle = (array) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

function PlayGround() {
  const [finalizedFrameworks, setFinalizedFrameworks] = useState(
    shuffle(duplicatedFrameworks).map((name, index) => ({
      name,
      close: true,
      complete: false,
      fail: false,
    }))
  );
  const [openedFrameworks, setOpenedFrameworks] = useState([]);

  const handleClick = (name, index) => {
    // if (openedFrameworks?.length > 1) {
    //   setTimeout(() => {
    //     check();
    //   }, 10);
    // } else {
    let framework = {
      name,
      index,
    };
    setFinalizedFrameworks([
      ...finalizedFrameworks.map((item, index) => {
        if (index === openedFrameworks[0]?.index) {
          return { ...item, close: false };
        } else {
          return item;
        }
      }),
    ]);
    setOpenedFrameworks([...openedFrameworks, framework]);
    // let finalized1Frameworks = finalizedFrameworks;
    // let frameworks = [...openedFrameworks];
    // finalized1Frameworks[index].close = false;
    // frameworks.push(framework);
    // setOpenedFrameworks(frameworks);
    // setFinalizedFrameworks(finalized1Frameworks);

    if (openedFrameworks?.length > 1) {
      setTimeout(() => {
        check();
      }, 750);
    }
    // }
  };

  const check = () => {
    if (
      openedFrameworks.length > 1 &&
      openedFrameworks[0].name === openedFrameworks[1].name &&
      openedFrameworks[0].index !== openedFrameworks[1].index
    ) {
      setFinalizedFrameworks([
        ...finalizedFrameworks.map((item, index) => {
          if (
            index === openedFrameworks[0].index ||
            index === openedFrameworks[1].index
          ) {
            return { ...item, complete: true };
          } else {
            return item;
          }
        }),
      ]);
      setOpenedFrameworks([]);
    } else {
      setFinalizedFrameworks([
        ...finalizedFrameworks.map((item, index) => {
          if (
            index === openedFrameworks[0].index ||
            index === openedFrameworks[1].index
          ) {
            return { ...item, close: true };
          } else {
            return item;
          }
        }),
      ]);
      setOpenedFrameworks([]);
    }
  };
  console.log(openedFrameworks);
  return (
    <div className="playground">
      {finalizedFrameworks?.map((framework, index) => {
        return (
          <Card
            key={index}
            framework={framework.name}
            click={() => {
              handleClick(framework.name, index);
            }}
            close={framework.close}
            complete={framework.complete}
          />
        );
      })}
    </div>
  );
}

export default PlayGround;
