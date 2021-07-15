import React, { useEffect, useState } from "react";
import { Slide } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css'

const Slideshow = () => {
  const [words, setWords] = useState(['Loading..']);
  const [autoplay, setAutoplay] = useState(true);

  const [refreshWord, setRefreshWord] = useState(0);

  const shuffle = (array) => {
    var currentIndex = array.length,  randomIndex;
  
    // while there remain elements to shuffle
    while (0 !== currentIndex) {
      // pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // swap it with the current element
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  

  const getWords = () => {
    let isMounted = true;

    fetch('words.txt')
    .then((r) => r.text())
    .then(text  => {
      setWords(shuffle(text.split("\n")))
    })

    // TODO get from api > google sheet?
    // const path = '/api/v1/dashboard/listing?type=quotes';
    // axios.get(path)
    // .then((response) => {
    //   if (isMounted) setQuotes(response.data);
    // }, (error) => {
    //   console.log(error);
    // });

    return () => isMounted = false;
  }

  useEffect(() => {
    getWords();
  }, []); // WARNING - second parameter required to stop an infinite loop (used to supply objects that when changed, trigger rerender)

  const handleRefresh = (e) => {
    e.preventDefault();
    setRefreshWord(refreshWord+1);
  };

  return (
    <div>
      <div>
        <Slide easing="ease" autoplay={autoplay} duration={1000} infinite={false}>
          {words.map((word, i) => (
            <div key={i} className="each-slide">
              <div>
                <span>{word}</span>
              </div>
            </div>
          ))}
        </Slide>
      </div>
      <div className='autoplay'>
        <div>
          <p>Autoplay: {autoplay ? 'On' : 'Off'}</p>
        </div>
        <div>
          <button type='button' onClick={() => setAutoplay(!autoplay)}>Autoplay</button>
        </div>
      </div>
    </div>
  )
};

export default Slideshow;
