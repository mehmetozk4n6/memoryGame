import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFramework, updateFramework } from "../redux/frameWorkSlice";
import { frameworkSelectors } from "../redux/frameWorkSlice";

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
  const [openedFrameworks, setOpenedFrameworks] = useState([]);
  const dispatch = useDispatch();
  const frameworks = useSelector(frameworkSelectors.selectAll);

  useEffect(() => {
    shuffle(duplicatedFrameworks).map((name, index) =>
      dispatch(
        addFramework({
          id: index,
          name,
          close: true,
          complete: false,
          fail: false,
        })
      )
    );
  }, [dispatch]);

  useEffect(() => {
    openedFrameworks.length > 0 &&
      openedFrameworks.forEach((openedFramework) =>
        dispatch(
          updateFramework({
            id: openedFramework.index,
            changes: {
              close: false,
            },
          })
        )
      );

    if (openedFrameworks?.length > 1) {
      setTimeout(() => {
        openedFrameworks.forEach((openedFramework) =>
          dispatch(
            updateFramework({
              id: openedFramework.index,
              changes: {
                close: true,
              },
            })
          )
        );

        setTimeout(() => {
          if (
            openedFrameworks[0].name === openedFrameworks[1].name &&
            openedFrameworks[0].index !== openedFrameworks[1].index
          ) {
            openedFrameworks.forEach((openedFramework) =>
              dispatch(
                updateFramework({
                  id: openedFramework.index,
                  changes: {
                    complete: true,
                  },
                })
              )
            );
          }
        }, 750);
        setOpenedFrameworks([]);
      }, 1500);
    }
  }, [openedFrameworks, dispatch]);

  const handleClick = (name, index) => {
    let framework = {
      name,
      index,
    };
    setOpenedFrameworks([...openedFrameworks, framework]);
  };

  return (
    <div className="playground">
      {frameworks?.map((framework, id) => {
        return (
          <Card
            key={id}
            framework={framework.name}
            click={() => {
              handleClick(framework.name, id);
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
