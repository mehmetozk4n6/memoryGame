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

  useEffect(() => {
    setFinalizedFrameworks([
      ...finalizedFrameworks.map((item, index) =>
        index === openedFrameworks[0]?.index ||
        index === openedFrameworks[1]?.index
          ? { ...item, close: false }
          : item
      ),
    ]);
    if (openedFrameworks?.length > 1) {
      setTimeout(() => {
        setFinalizedFrameworks([
          ...finalizedFrameworks.map((item, index) =>
            index === openedFrameworks[0].index ||
            index === openedFrameworks[1].index
              ? { ...item, close: true }
              : item
          ),
        ]);
        setTimeout(() => {
          check();
        }, 750);
        setOpenedFrameworks([]);
      }, 1500);
    }
  }, [openedFrameworks]);

  const handleClick = (name, index) => {
    let framework = {
      name,
      index,
    };
    setOpenedFrameworks([...openedFrameworks, framework]);
  };

  const check = () => {
    if (
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
    }
  };
  // console.log(openedFrameworks);
  // console.log(finalizedFrameworks);
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
