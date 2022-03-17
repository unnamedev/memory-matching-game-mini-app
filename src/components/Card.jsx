/**
 * @description - ⚙️ Card Component
 * @param index
 * @param value
 * @param isFlipped
 * @param flipCard
 * @returns {JSX.Element}
 * @constructor
 */
const Card = ({index, value, isFlipped, flipCard}) =>
    <div className={`card ${isFlipped ? "flipped" : ""}`} onClick={() => flipCard(index)}>
        <div className="inner">
            <div className="front">{value}</div>
            <div className="back">?</div>
        </div>
    </div>

export default Card
