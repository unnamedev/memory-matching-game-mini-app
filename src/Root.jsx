import {useEffect, useState} from "react"
import {Card} from "./components"
import shuffle from "lodash.shuffle"

// It's creating a new array with the same elements as the `fruits` array, but shuffled.
const fruits = [
    {id: 1, value: "🍎"},
    {id: 2, value: "🍐"},
    {id: 3, value: "🍋"},
    {id: 4, value: "🥝"},
    {id: 5, value: "🍇"},
    {id: 6, value: "🍉"},
]

// It's creating a new array with the same elements as the `fruits` array, but shuffled.
const doubleCards = shuffle([...fruits, ...fruits])

/**
 * @description - ⚙️ Root Component
 * @returns {JSX.Element}
 * @constructor
 */
const Root = () => {
    const [opened, setOpened] = useState([])
    const [matched, setMatched] = useState([])
    const [moves, setMoves] = useState(0)
    const [endGame, setEndGame] = useState(false)

    // check if there is a match
    // if there are 2 in the opened array, check if they match
    useEffect(() => {
        if (opened.length < 2) return
        
        const firstCard = doubleCards[opened[0]]
        const secondCard = doubleCards[opened[1]]
        
        if (firstCard.value === secondCard.value) setMatched(prev => [...prev, firstCard.id])
    }, [opened])

    // clear cards after 2 have been selected
    useEffect(() => {
        if (opened.length === 2) setTimeout(() => setOpened([]), 800)
    }, [opened])

    // check if there is a winner
    useEffect(() => {
        if (matched.length === fruits.length) setEndGame(true)
    }, [matched])

    /* It's checking if the card is already opened. If it is, it will return. If not, it will add the card to the opened
    array and increment the moves counter. */
    const flipCard = (idx) => {
        if (opened.includes(idx)) return

        setMoves((moves) => moves + 1)
        setOpened(opened => [...opened, idx])
    }

    return <div className="h-screen w-full bg-gray-200 p-2 lg:p-10">

        <h2 className="text-center font-semibold text-xl py-[30px] lg:text-4xl">
            Memory Game
        </h2>

        {!endGame ? (
            <>
                {/* Moves */}
                {moves !== 0 &&
                    <p className="text-right text-xl mb-3 max-w-[800px] m-auto w-full flex flex-col items-end">
                        <span
                            className="shadow w-[40px] h-[40px] flex items-center justify-center font-semibold rounded-[50%] bg-white mr-[10px]">{moves}</span> {" "}Moves
                    </p>}

                {/* Grid */}
                <div className="grid grid-cols-4 gap-2 sm:gap-[15px] max-w-[800px] m-auto w-full">
                    {doubleCards.map((item, idx) => {
                        let isFlipped = false
                        // do some logic to check if flipped
                        if (opened.includes(idx)) isFlipped = true
                        if (matched.includes(item.id)) isFlipped = true

                        return <Card key={idx} index={idx}{...item} isFlipped={isFlipped} flipCard={flipCard}/>
                    })}
                </div>
            </>
        ) : (
            <div className="text-center">
                <p className="text-2xl font-semibold mb-3">You win ✨</p>
                <p className="text-lg mb-3">You completed the game in <span> className="font-semibold">{moves}</span> steps</p>
                <button
                    className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg px-5 py-2.5 text-xl"
                    onClick={() => window.location.reload()}
                >
                    Restart
                </button>
            </div>
        )}
    </div>
}

export default Root
