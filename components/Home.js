import { useState, useEffect } from 'react';
import Card from './Card';
import styles from '../styles/Home.module.css';

function Home() {

  //jeu de cartes
  const deck = [
    { id: 1, name: 'billiard ball', image: '/billiardball.svg' },
    { id: 2, name: 'billiard ball', image: '/billiardball.svg' },
    { id: 3, name: 'bubble tea', image: '/bubbletea.svg' },
    { id: 4, name: 'bubble tea', image: '/bubbletea.svg' },
    { id: 5, name: 'cactus', image: '/cactus.svg' },
    { id: 6, name: 'cactus', image: '/cactus.svg' },
    { id: 7, name: 'dog', image: '/dog.svg' },
    { id: 8, name: 'dog', image: '/dog.svg' },
    { id: 9, name: 'laptop', image: '/laptop.svg' },
    { id: 10, name: 'laptop', image: '/laptop.svg' },
    { id: 11, name: 'octopus', image: '/octopus.svg' },
    { id: 12, name: 'octopus', image: '/octopus.svg' },
    { id: 13, name: 'strawberry', image: '/strawberry.svg' },
    { id: 14, name: 'strawberry', image: '/strawberry.svg' },
    { id: 15, name: 'sunglasses', image: '/sunglasses.svg' },
    { id: 16, name: 'sunglasses', image: '/sunglasses.svg' },
  ];

  //SHUFFLE 

  const [cards, setCards] = useState([]);

  //Nouvelle formule de tri 
    function shuffle(array) {
      for (let i = array.length-1 ; i>0 ; i--) {
        let j = Math.floor(Math.random()*(i+1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }


  useEffect(() => {

    
  //arrivée sur la page : random shuffle
    /*
    //Array with unique Ids from 1 to 16
    const randomIds = new Set();
    while(randomIds.size !== 16) {
      randomIds.add(Math.floor(Math.random() * 16) + 1);
      }
    let idArr = Array.from(randomIds);
    //Attribuer le nouveau random ID généré
    deck.map((card, i) => {card.id = idArr[i]
    });

    //trier en fonction du nouvel random ID
    deck.sort(function(a,b) {
      return a.id - b.id;
    })*/
    
    setCards(shuffle(deck));
    console.log(deck);
  }, []);

  //SELECTION

  const [selected, setSelected] = useState([]);

  const selectCard = (id) => {
    setSelected([...selected, id]);
    console.log(selected);
    if (selected.length === cards.length)  {
      setSelected([]);
      setCards(shuffle(deck));
    }


    else if (selected.length > 1 && selected.length %2 == 0) {
      console.log("Matching...");
      const firstCard = (cards.find(card => card.id === selected[selected.length - 1])).name;
      const secondCard = (cards.find(card => card.id === selected[selected.length - 2])).name;
      
      firstCard === secondCard ? (console.log( "it's a match!"))
      : (console.log( "not a match"), setSelected(selected.filter(e => e !== selected[selected.length - 2] && e!== selected[selected.length - 1])))
      //cards.find(cards.id = selected[0]) === selected[1] ? counter ++ : setSelected([]);
    }
  };

  const cardsToDisplay = cards.map((card) => {
    return (
      <Card
        key={card.id}
        id={card.id}
        name={card.name}
        image={card.image}
        selectCard={selectCard}
        selected={selected.includes(card.id)}
      />
    );
  });

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>
          Memory Game 🧠
        </h1>
        <div className={styles.headerDivider} />
      </div>

      <div className={styles.main}>
        <div className={styles.grid}>
          {cardsToDisplay}
        </div>
      </div>
    </div>
  );
}

export default Home;
